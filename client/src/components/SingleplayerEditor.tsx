import { Tldraw, TldrawApp, useFileSystem } from "@tldraw/tldraw";
import { useAssets } from "../hooks/useAssets";
import { useSave } from "../hooks/useSave";
import { updateDoc } from "../utils/yjs";
import * as Y from "yjs";

type Singleplayer = {
  apiUrl: string;
  nextcloudUrl: string | undefined;
  saveOnNextcloudState: boolean;
  idbName: string;
  doc: Y.Doc;
  language: string;
  readOnly: boolean;
};

function SingleplayerEditor({
  apiUrl,
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
  const { onAssetCreate, onAssetDelete, onAssetUpload } = useAssets(apiUrl);
  const {
    onSaveProject: ncOnSaveProject,
    onSaveProjectAs: ncOnSaveProjectAs,
    onExport,
  } = useSave(nextcloudUrl ? nextcloudUrl : "");

  const canSaveOnNectcloud = nextcloudUrl && saveOnNextcloudState;

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
