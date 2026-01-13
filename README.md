# Repo: Prácticas del curso de Node 

Este repositorio agrupa ejercicios y pequeñas APIs realizados siguiendo el curso de Node de Fernando Herrera. Contiene proyectos de práctica que cubren fundamentos de Node, manejo de archivos, servidores REST, autenticación con JWT, websockets, colas y ejemplos de estructuras más modernas con TypeScript y herramientas actuales.

**Objetivo**: practicar y migrar ejemplos clásicos del curso a estándares modernos (TypeScript, herramientas de desarrollo y lint/formatters como Biome, uso de `pnpm`, `tsx`/`ts-node`, etc.).

**Estructura principal (carpetas relevantes)**

- `01-fundamentos-node/`: ejemplos básicos de Node (archivos sueltos: `app.js`, `app2.js`, `app3.js`).
- `02-refuerzo-js/`: ejercicios de JavaScript (const/let, template strings, desestructuración, promesas, async/await, callbacks, etc.).
- `03-bases/`: proyecto de bases con ejemplos de scripts y utilitarios (usa `yargs`, `colors`).
- `04-appInteractiva/`: CLI interactiva con `inquirer`, `yargs` y utilidades para guardar tareas.
- `05 sericio estatico/`: ejemplo de servidor estático con `express` y plantillas `hbs`.
- `06 rest server/`: primer servidor REST en TypeScript (usa `express`, `tsx`, `typescript`).
- `07 rest server v2/`: versión extendida con `mongoose`, validaciones y documentación Swagger.
- `08 Json web token/` y `09 jwt y archivos/`: endpoints con autenticación JWT, manejo de archivos y Cloudinary.
- `10 websockets/`: ejemplo de WebSockets y `socket.io`, con configuración moderna y `biome` en scripts.
- `11 colas de web-scokets/`: ejemplo avanzado de colas y gestión de tickets usando websockets.

**Tecnologías y herramientas usadas**

- Lenguajes: JavaScript y TypeScript.
- Servidores: `express`.
- Base de datos / ODM: `mongoose` (en proyectos REST).
- Autenticación: `jsonwebtoken`, `bcryptjs`.
- Archivos y uploads: `express-fileupload`, `cloudinary` (en algunos ejercicios).
- Tiempo de desarrollo / ejecución: `tsx`, `ts-node`, `nodemon`.
- Package manager moderno: algunos proyectos usan `pnpm`.
- Lint / format: `biome` (scripts `lint`, `format`, `check` en proyectos TS modernos).
- WebSockets: `socket.io`.

Cómo ejecutar (ejemplo genérico)

1. Entrar a la carpeta del proyecto que quieras ejecutar, por ejemplo:

   cd 10\ websockets

2. Instalar dependencias (usa `npm` o `pnpm` según el proyecto):

   npm install

   # o

   pnpm install

3. Ejecutar en modo desarrollo (varía por proyecto):

   pnpm  dev

   # o

   pnpm start

Notas

- Algunos subproyectos están en JavaScript puro como ejercicios de práctica; otros ya están migrados a TypeScript y usan herramientas modernas (`tsx`, `ts-node`, `biome`, `pnpm`).
- Este repositorio es un entorno de aprendizaje — los paquetes, scripts y configuraciones pueden variar entre carpetas porque cada carpeta representa una práctica o reto distinto del curso.
- Si quieres, puedo:
  - Normalizar los scripts de todos los proyectos (p. ej. usar `pnpm` y `biome` donde aplique).
  - Añadir un archivo `CONTRIBUTING.md` o mejorar la documentación de cada subproyecto.

---

Creado a partir de las prácticas del curso de Fernando Herrera — autor del curso y material original no incluido aquí. Este repositorio contiene código de estudio y prácticas personales.
