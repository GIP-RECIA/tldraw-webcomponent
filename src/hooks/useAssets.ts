import { deleteAsset, saveAsset } from '../services/assetService.ts';
import { TldrawApp } from '@gip-recia/tldraw-v1';
import { useCallback } from 'react';

export function useAssets(assetApiUrl: string | undefined) {
  const onAssetCreate = useCallback(
    async (app: TldrawApp, file: File, id: string): Promise<string | false> => {
      try {
        const body = new FormData();
        body.append('name', id);
        body.append('file', file);
        const response = await saveAsset(assetApiUrl!, body);

        return `${assetApiUrl}/${response.data.uri}`;
      } catch (e) {
        return false;
      }
    },
    [assetApiUrl],
  );

  const onAssetDelete = useCallback(
    async (app: TldrawApp, id: string): Promise<boolean> => {
      try {
        await deleteAsset(assetApiUrl!, id);

        return true;
      } catch (e) {
        return false;
      }
    },
    [assetApiUrl],
  );

  return {
    onAssetCreate: assetApiUrl ? onAssetCreate : undefined,
    onAssetDelete: assetApiUrl ? onAssetDelete : undefined,
  };
}
