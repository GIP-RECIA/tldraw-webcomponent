import { TldrawApp } from '@tldraw/tldraw';
import axios from 'axios';
import { useCallback } from 'react';

export function useAssets(apiUrl: string | undefined) {
  const onAssetCreate = useCallback(async (app: TldrawApp, file: File, id: string): Promise<string | false> => {
    const body = new FormData();
    body.append('name', id);
    body.append('file', file);

    const response = await axios.post(`${apiUrl}/files`, body, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    return apiUrl + response.data.uri;
  }, []);

  const onAssetUpload = useCallback(async (app: TldrawApp, file: File, id: string): Promise<string | false> => {
    console.log('Upload', file, id);

    return false;
  }, []);

  const onAssetDelete = useCallback(async (app: TldrawApp, id: string): Promise<boolean> => {
    await axios.delete(`${apiUrl}/files/${id}`);

    return true;
  }, []);

  return { onAssetCreate, onAssetDelete, onAssetUpload };
}
