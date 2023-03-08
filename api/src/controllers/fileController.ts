import { Request, Response } from "express";
import { readdirSync, unlinkSync } from "fs";
import { process } from "../utils/utils";

const uploadFile = async (req: Request, res: Response) =>
  process(
    async (req: Request, res: Response) => {
      if (req.file) {
        return {
          id: req.body.id,
          uri: `/public/uploads/${req.file.filename}`,
        };
      } else throw new Error();
    },
    req,
    res
  );

const deleteFile = (req: Request, res: Response) =>
  process(
    (req: Request, res: Response) => {
      let file = readdirSync("public/uploads").find(
        (file) => file.split(".")[0] === req.params.name
      );
      unlinkSync(`public/uploads/${file}`);
    },
    req,
    res
  );

export { uploadFile, deleteFile };
