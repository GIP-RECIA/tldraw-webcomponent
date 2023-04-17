import { Tldraw, TldrawApp, useFileSystem } from "@tldraw/tldraw";
import { useAssets } from "../hooks/useAssets";
import { useSave } from "../hooks/useSave";
import { updateDoc } from "../utils/yjs";
import * as Y from "yjs";

type Singleplayer = {
  uploadApi: string | undefined;
  userApi: string | undefined;
  nextcloudUrl: string | undefined;
  saveOnNextcloudState: boolean;
  idbName: string;
  doc: Y.Doc;
  language: string;
  readOnly: boolean;
};

function SingleplayerEditor({
  uploadApi,
  userApi,
  nextcloudUrl,
  saveOnNextcloudState,
  idbName,
  doc,
  language,
  readOnly,
}: Singleplayer) {
  const {
    onSaveProject,
    onSaveProjectAs,
    onNewProject,
    onOpenProject,
    onOpenMedia,
  } = useFileSystem();
  const { onAssetCreate, onAssetDelete, onAssetUpload } = useAssets(uploadApi);
  const {
    onSaveProject: ncOnSaveProject,
    onSaveProjectAs: ncOnSaveProjectAs,
    onExport,
  } = useSave(nextcloudUrl, userApi);

  const canSaveOnNectcloud = nextcloudUrl && saveOnNextcloudState && userApi;

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
      onSaveProject={canSaveOnNectcloud ? ncOnSaveProject : onSaveProject}
      // onSaveProjectAs={canSaveOnNectcloud ? ncOnSaveProjectAs : onSaveProjectAs}
      onExport={canSaveOnNectcloud ? onExport : undefined}
      readOnly={readOnly}
      onChange={(app: TldrawApp) => updateDoc(doc, app)}
      onNewProject={onNewProject}
      onOpenProject={onOpenProject}
      onOpenMedia={onOpenMedia}
    />
  );
}

export default SingleplayerEditor;
