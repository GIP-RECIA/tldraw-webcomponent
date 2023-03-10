import { Tldraw, useFileSystem } from "@tldraw/tldraw";
import { WebsocketProvider } from "y-websocket";
import { useAssets } from "../hooks/useAssets";
import { useMultiplayer } from "../hooks/useMultiplayer";
import * as Y from "yjs";
import { CustomCursor } from "./Cursor";

type Multiplayer = {
  apiUrl: string;
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
  apiUrl,
  doc,
  provider,
  roomId,
  language,
  readOnly,
}: Multiplayer) {
  const { onSaveProjectAs, onSaveProject } = useFileSystem();
  const { onAssetCreate, onAssetDelete, onAssetUpload } = useAssets(apiUrl);
  const { ...events } = useMultiplayer(doc, provider, roomId, language);

  return (
    <Tldraw
      autofocus
      components={components}
      showPages={false}
      showMultiplayerMenu={false}
      onAssetCreate={readOnly ? undefined : onAssetCreate}
      onAssetDelete={onAssetDelete}
      onAssetUpload={onAssetUpload}
      onSaveProjectAs={onSaveProjectAs}
      onSaveProject={onSaveProject}
      readOnly={readOnly}
      {...events}
    />
  );
}

export default MultiplayerEditor;
