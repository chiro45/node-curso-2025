import { UploadedFile } from "express-fileupload";
import { existsSync, mkdirSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { v4 as uuid } from "uuid";

const __dirname = dirname(fileURLToPath(import.meta.url));

export const uploadFileHelper = (
  files: UploadedFile | UploadedFile[],
  validExtensions = ["png", "jpg", "jpeg", "gif"],
  carpeta = ""
) => {
  return new Promise((resolve, reject) => {
    const sampleFile = files as UploadedFile;

    const nameSplit = sampleFile.name.split(".");
    const extension = nameSplit[nameSplit.length - 1];

    const nombreTemp = uuid() + "." + extension;

    const uploadDir = join(__dirname, `../uploads/`, carpeta);

    if (!validExtensions.includes(extension)) {
      reject(
        `La extension ${extension} no se permite, extensiones validas son ${validExtensions}`
      );
      return;
    }

    if (!existsSync(uploadDir)) {
      mkdirSync(uploadDir, { recursive: true });
    }

    const uploadPath = join(uploadDir, nombreTemp);

    // Usar mv() que funciona tanto con archivos temporales como con buffers
    sampleFile.mv(uploadPath, (err) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(nombreTemp);
    });
  });
};
