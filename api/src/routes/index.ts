import { deleteFile, uploadFile } from "../controllers/fileController";
import { mUpload } from "../middleware/multer";
import { Router } from "express";

const router = Router();

router.post("/files", mUpload("uploads", "file"), uploadFile);
router.delete("/files/:name", deleteFile);

export default router;
