import { Response, Request, RequestHandler } from "express";

export const getUsers: RequestHandler = (req: Request, res: Response) => {
  const params= req.params
  
  return res.json({
    msg: "get API",
  });
};
export const putUsers: RequestHandler = (req: Request, res: Response) => {
  const id = req.params;
  return res.status(500).json({
    msg: "put API",
    id,
  });
};
export const deleteUsers: RequestHandler = (_req: Request, res: Response) => {
  res.status(201).json({
    msg: "delete API",
  });
};
export const postUsers: RequestHandler = (req: Request, res: Response) => {
  const body: { name: string; edad: number } = req.body;

  res.json({
    msg: `${body.name} ${body.edad}`,
  });
};
