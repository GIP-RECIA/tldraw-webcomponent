import { Request, Response } from 'express';

const process = async (call: any, req: Request, res: Response) => {
  let status: number = 200;
  let body: object = {};

  try {
    body = await call(req, res);
  } catch (e: any) {
    status = status !== 200 ? status : 500;
    body = {
      error: e.error,
      message: e.message,
    };
  }

  return res.status(status).json(body);
};

export { process };
