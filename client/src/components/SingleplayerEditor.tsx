import { Tldraw, TldrawApp, useFileSystem } from "@tldraw/tldraw";
import { useAssets } from "../hooks/useAssets";
import { useSave } from "../hooks/useSave";
import { updateDoc } from "../utils/yjs";
import * as Y from "yjs";

type Singleplayer = {
  apiUrl: string;
  nextcloudUrl: string | undefined;
  idbName: string;
  doc: Y.Doc;
  language: string;
  readOnly: boolean;
};

function SingleplayerEditor({
  apiUrl,
  nextcloudUrl,
  idbName,
  doc,
  language,
  readOnly,
}: Singleplayer) {
  const fileSystemEvents = useFileSystem();
  const { onAssetCreate, onAssetDelete, onAssetUpload } = useAssets(apiUrl);
  const { onExport } = useSave(nextcloudUrl ? nextcloudUrl : "");

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
      onExport={nextcloudUrl ? onExport : undefined}
      readOnly={readOnly}
      onChange={(app: TldrawApp) => updateDoc(doc, app)}
      {...fileSystemEvents}
    />
  );
}

export default SingleplayerEditor;
