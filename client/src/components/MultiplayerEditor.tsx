import { Tldraw, useFileSystem } from "@tldraw/tldraw";
import { WebsocketProvider } from "y-websocket";
import { useAssets } from "../hooks/useAssets";
import { useMultiplayer } from "../hooks/useMultiplayer";
import * as Y from "yjs";
import { CustomCursor } from "./Cursor";
import { useSave } from "../hooks/useSave";

type Multiplayer = {
  apiUrl: string;
  nextcloudUrl: string | undefined;
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
  nextcloudUrl,
  doc,
  provider,
  roomId,
  language,
  readOnly,
}: Multiplayer) {
  const { onSaveProjectAs, onSaveProject } = useFileSystem();
  const { onAssetCreate, onAssetDelete, onAssetUpload } = useAssets(apiUrl);
  const {
    onSaveProject: ncOnSaveProject,
    onSaveProjectAs: ncOnSaveProjectAs,
    onExport,
  } = useSave(nextcloudUrl ? nextcloudUrl : "");
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
      onSaveProject={nextcloudUrl ? ncOnSaveProject : onSaveProject}
      onSaveProjectAs={nextcloudUrl ? ncOnSaveProjectAs : onSaveProjectAs}
      onExport={nextcloudUrl ? onExport : undefined}
      readOnly={readOnly}
      {...events}
    />
  );
}

export default MultiplayerEditor;
