import { Tldraw, TldrawApp, useFileSystem } from "@tldraw/tldraw";
import { useAssets } from "../hooks/useAssets";
import { updateDoc } from "../utils/yjs";
import * as Y from "yjs";

type Singleplayer = {
  apiUrl: string;
  idbName: string;
  doc: Y.Doc;
  language: string;
  readOnly: boolean;
};

function SingleplayerEditor({
  apiUrl,
  idbName,
  doc,
  language,
  readOnly,
}: Singleplayer) {
  const fileSystemEvents = useFileSystem();
  const { onAssetCreate, onAssetDelete, onAssetUpload } = useAssets(apiUrl);

  const onMount = (app: TldrawApp) => {
    app.setSetting("language", language);
    app.setSetting("keepStyleMenuOpen", true);
  };

  return (
    <Tldraw
      autofocus
      id={idbName}
      onMount={onMount}
      showMultiplayerMenu={false}
      onAssetCreate={onAssetCreate}
      onAssetDelete={onAssetDelete}
      onAssetUpload={onAssetUpload}
      readOnly={readOnly}
      onChange={(app: TldrawApp) => updateDoc(doc, app)}
      {...fileSystemEvents}
    />
  );
}

export default SingleplayerEditor;
