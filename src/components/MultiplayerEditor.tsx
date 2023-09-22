import { useAssets } from '../hooks/useAssets';
import { useMultiplayer } from '../hooks/useMultiplayer';
import { CustomCursor } from './Cursor';
import { TDExport, Tldraw, TldrawApp } from '@tldraw/tldraw';
import { WebsocketProvider } from 'y-websocket';
import * as Y from 'yjs';

type Multiplayer = {
  uploadApi: string | undefined;
  userApi: string | undefined;
  doc: Y.Doc;
  provider: WebsocketProvider;
  roomId: string;
  language: string;
  readOnly: boolean;
  onSaveProject: (app: TldrawApp) => void;
  onExport: (app: TldrawApp, info: TDExport) => Promise<void>;
};

const components = {
  Cursor: CustomCursor,
};

function MultiplayerEditor({
  uploadApi,
  userApi,
  doc,
  provider,
  roomId,
  language,
  readOnly,
  onSaveProject,
  onExport,
}: Multiplayer) {
  const { onAssetCreate, onAssetDelete, onAssetUpload } = useAssets(uploadApi);
  const { ...events } = useMultiplayer(doc, provider, roomId, userApi, language);

  return (
    <Tldraw
      autofocus
      components={components}
      showPages={false}
      showMultiplayerMenu={false}
      onAssetCreate={readOnly ? undefined : uploadApi ? onAssetCreate : undefined}
      onAssetDelete={uploadApi ? onAssetDelete : undefined}
      onAssetUpload={uploadApi ? onAssetUpload : undefined}
      onSaveProject={onSaveProject}
      onExport={onExport}
      readOnly={readOnly}
      {...events}
    />
  );
}

export default MultiplayerEditor;
