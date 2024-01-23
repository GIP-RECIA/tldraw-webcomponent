import { getFile, saveFile } from '../services/fileService.ts';
import { TDDocument, TldrawApp } from '@gip-recia/tldraw-v1';
import { useCallback } from 'react';

export function usePersistance(persistanceApiUrl: string) {
  const onSaveProject = useCallback(
    async (app: TldrawApp) => {
      const blob = JSON.stringify({
        name: app.state.document.name,
        fileHandle: null,
        document: app.state.document,
        assets: app.state.document.assets,
      });
      return await saveFile(persistanceApiUrl, blob);
    },
    [persistanceApiUrl],
  );

  const loadDocument = useCallback(
    async (app: TldrawApp): Promise<void> => {
      const response = await getFile(persistanceApiUrl);
      if (response.data.blob != '') {
        app.loadDocument(JSON.parse(response.data.blob).document as TDDocument);
        app.document.name = response.data.title;
      }
    },
    [persistanceApiUrl],
  );

  return {
    onSaveProject,
    loadDocument,
  };
}
