import multer, { diskStorage } from "multer";
import { existsSync, mkdirSync } from "fs";
import { extname } from "path";
import { NextFunction, Request, Response } from "express";

const mUpload =
  (uploadPath: string, identifier: string) =>
  (req: Request, res: Response, next: NextFunction) => {
    const storage = diskStorage({
      destination: (req, file, cb) => {
        if (!existsSync("./public/")) mkdirSync("./public/");
        if (!existsSync(`./public/${uploadPath}`))
          mkdirSync(`./public/${uploadPath}`);
        cb(null, `./public/${uploadPath}`);
      },
      filename: (req, file, cb) => {
        cb(null, req.body.name + extname(file.originalname));
      },
    });

    const uploadFile = multer({ storage }).single(identifier);

    uploadFile(req, res, next);
  };

export { mUpload };
