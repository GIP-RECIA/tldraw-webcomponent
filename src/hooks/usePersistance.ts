import { getFile, saveFile } from '../services/fileService.ts';
import { TDDocument, TldrawApp } from '@gip-recia/tldraw-v1';
import { useCallback } from 'react';

const toBlob = (app: TldrawApp): string => {
  return JSON.stringify({
    name: app.state.document.name,
    fileHandle: null,
    document: app.state.document,
    assets: app.state.document.assets,
  });
};

export function usePersistance(persistanceApiUrl: string) {
  const onSaveProject = useCallback(
    async (app: TldrawApp) => {
      return await saveFile(persistanceApiUrl, toBlob(app));
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

export { toBlob };
