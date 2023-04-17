import { Tldraw, useFileSystem } from "@tldraw/tldraw";
import { WebsocketProvider } from "y-websocket";
import { useAssets } from "../hooks/useAssets";
import { useMultiplayer } from "../hooks/useMultiplayer";
import * as Y from "yjs";
import { CustomCursor } from "./Cursor";
import { useSave } from "../hooks/useSave";

type Multiplayer = {
  uploadApi: string | undefined;
  userApi: string | undefined;
  nextcloudUrl: string | undefined;
  saveOnNextcloudState: boolean;
  doc: Y.Doc;
  provider: WebsocketProvider;
  roomId: string;
  language: string;
  readOnly: boolean;
};

const components = {
  Cursor: CustomCursor,
};

function MultiplayerEditor({
  uploadApi,
  userApi,
  nextcloudUrl,
  saveOnNextcloudState,
  doc,
  provider,
  roomId,
  language,
  readOnly,
}: Multiplayer) {
  const { onSaveProjectAs, onSaveProject } = useFileSystem();
  const { onAssetCreate, onAssetDelete, onAssetUpload } = useAssets(uploadApi);
  const {
    onSaveProject: ncOnSaveProject,
    onSaveProjectAs: ncOnSaveProjectAs,
    onExport,
  } = useSave(nextcloudUrl, userApi);
  const { ...events } = useMultiplayer(
    doc,
    provider,
    roomId,
    userApi,
    language
  );

  const canSaveOnNectcloud = nextcloudUrl && saveOnNextcloudState && userApi;

  return (
    <Tldraw
      autofocus
      components={components}
      showPages={false}
      showMultiplayerMenu={false}
      onAssetCreate={
        readOnly ? undefined : uploadApi ? onAssetCreate : undefined
      }
      onAssetDelete={uploadApi ? onAssetDelete : undefined}
      onAssetUpload={uploadApi ? onAssetUpload : undefined}
      onSaveProject={canSaveOnNectcloud ? ncOnSaveProject : onSaveProject}
      // onSaveProjectAs={canSaveOnNectcloud ? ncOnSaveProjectAs : onSaveProjectAs}
      onExport={canSaveOnNectcloud ? onExport : undefined}
      readOnly={readOnly}
      {...events}
    />
  );
}

export default MultiplayerEditor;
