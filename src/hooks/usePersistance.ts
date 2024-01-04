import { TDDocument, TldrawApp } from '@tldraw/tldraw';
import oidc from '@uportal/open-id-connect';
import axios from 'axios';
import { useCallback } from 'react';

export function usePersistance(persistanceApiUrl: string, userInfoApiUrl: string) {
  const getToken = async (): Promise<string> => {
    const { encoded } = await oidc({ userInfoApiUrl });

    return encoded;
  };

  const onSaveProject = useCallback(async (app: TldrawApp): Promise<void> => {
    const blob = JSON.stringify({
      name: app.state.document.name,
      fileHandle: null,
      document: app.state.document,
      assets: app.state.document.assets,
    });
    await axios.put(
      persistanceApiUrl,
      { blob },
      {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      },
    );
  }, []);

  const loadDocument = useCallback(async (app: TldrawApp): Promise<void> => {
    const response = await axios.get(persistanceApiUrl, {
      headers: {
        Authorization: `Bearer ${await getToken()}`,
      },
    });
    app.loadDocument(JSON.parse(response.data.blob).document as TDDocument);
  }, []);

  return {
    onSaveProject,
    loadDocument,
  };
}
