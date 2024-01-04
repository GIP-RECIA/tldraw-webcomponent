import { getFile, saveFile } from '../services/fileService.ts';
import { TDDocument, TldrawApp } from '@tldraw/tldraw';
import { useCallback } from 'react';

export function usePersistance(persistanceApiUrl: string) {
  const onSaveProject = useCallback(
    async (app: TldrawApp): Promise<void> => {
      const blob = JSON.stringify({
        name: app.state.document.name,
        fileHandle: null,
        document: app.state.document,
        assets: app.state.document.assets,
      });
      await saveFile(persistanceApiUrl, blob);
    },
    [persistanceApiUrl],
  );

  const loadDocument = useCallback(
    async (app: TldrawApp): Promise<void> => {
      const response = await getFile(persistanceApiUrl);
      app.loadDocument(JSON.parse(response.data.blob).document as TDDocument);
      app.document.name = response.data.title;
    },
    [persistanceApiUrl],
  );

  return {
    onSaveProject,
    loadDocument,
  };
}
