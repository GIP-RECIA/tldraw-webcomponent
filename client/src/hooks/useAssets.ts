import { TldrawApp } from "@tldraw/tldraw";
import axios from "axios";
import { useCallback } from "react";

const { VITE_API_URL } = import.meta.env;

export function useAssets() {
  const onAssetCreate = useCallback(
    async (app: TldrawApp, file: File, id: string): Promise<string | false> => {
      let body = new FormData();
      body.append("name", id);
      body.append("file", file);

      let response = await axios.post(`${VITE_API_URL}/files`, body, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      return VITE_API_URL + response.data.uri;
    },
    []
  );

  const onAssetUpload = useCallback(
    async (app: TldrawApp, file: File, id: string): Promise<string | false> => {
      console.log("Upload", file, id);

      return false;
    },
    []
  );

  const onAssetDelete = useCallback(
    async (app: TldrawApp, id: string): Promise<boolean> => {
      await axios.delete(`${VITE_API_URL}/files/${id}`);

      return true;
    },
    []
  );

  return { onAssetCreate, onAssetDelete, onAssetUpload };
}
