import { useAssets } from "../hooks/useAssets";
import { updateDoc } from "../utils/yjs";
import { TDExport, Tldraw, TldrawApp, useFileSystem } from "@tldraw/tldraw";
import * as Y from "yjs";

type Singleplayer = {
  uploadApi: string | undefined;
  idbName: string;
  doc: Y.Doc;
  language: string;
  readOnly: boolean;
  onSaveProject: (app: TldrawApp) => void;
  onExport: (app: TldrawApp, info: TDExport) => Promise<void>;
};

function SingleplayerEditor({
  uploadApi,
  idbName,
  doc,
  language,
  readOnly,
  onSaveProject,
  onExport,
}: Singleplayer) {
  const { onNewProject, onOpenProject, onOpenMedia } = useFileSystem();
  const { onAssetCreate, onAssetDelete, onAssetUpload } = useAssets(uploadApi);

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
      onAssetCreate={uploadApi ? onAssetCreate : undefined}
      onAssetDelete={uploadApi ? onAssetDelete : undefined}
      onAssetUpload={uploadApi ? onAssetUpload : undefined}
      onSaveProject={onSaveProject}
      onExport={onExport}
      readOnly={readOnly}
      onChange={(app: TldrawApp) => updateDoc(doc, app)}
      onNewProject={onNewProject}
      onOpenProject={onOpenProject}
      onOpenMedia={onOpenMedia}
    />
  );
}

export default SingleplayerEditor;
