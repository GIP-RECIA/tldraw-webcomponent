import { useState } from "react";
import { TDExport, Tldraw, TldrawApp, useFileSystem } from "@tldraw/tldraw";
import { useAssets } from "../hooks/useAssets";
import { useSave } from "../hooks/useSave";
import { updateDoc } from "../utils/yjs";
import { donwloadImageFile } from "../utils/tldraw";
import * as Y from "yjs";
import NextcloudModal from "./NextcloudModal";

type Singleplayer = {
  uploadApi: string | undefined;
  userApi: string | undefined;
  nextcloudUrl: string | undefined;
  idbName: string;
  doc: Y.Doc;
  language: string;
  readOnly: boolean;
};

function SingleplayerEditor({
  uploadApi,
  userApi,
  nextcloudUrl,
  idbName,
  doc,
  language,
  readOnly,
}: Singleplayer) {
  const { onSaveProject, onNewProject, onOpenProject, onOpenMedia } =
    useFileSystem();
  const { onAssetCreate, onAssetDelete, onAssetUpload } = useAssets(uploadApi);
  const { onSaveProject: ncOnSaveProject, onExport } = useSave(
    nextcloudUrl,
    userApi
  );

  const [nextcloudModal, setNextcloudModal] = useState<any>(undefined);

  const canSaveOnNectcloud = nextcloudUrl && userApi;

  const onMount = (app: TldrawApp) => {
    app.setSetting("language", language);
    app.setSetting("keepStyleMenuOpen", true);
  };

  const handleSave = (app: TldrawApp) => {
    if (nextcloudModal) return;
    setNextcloudModal(
      <NextcloudModal
        document={app.document}
        onNextcloud={() => {
          ncOnSaveProject(app);
          resetNextcloudModal();
        }}
        onDownload={() => {
          onSaveProject(app);
          resetNextcloudModal();
        }}
        onCancel={resetNextcloudModal}
      />
    );
  };

  const handleExport = async (app: TldrawApp, info: TDExport) => {
    if (nextcloudModal) return;
    setNextcloudModal(
      <NextcloudModal
        document={app.document}
        onNextcloud={() => {
          onExport(app, info);
          resetNextcloudModal();
        }}
        onDownload={() => {
          donwloadImageFile(app, info);
          resetNextcloudModal();
        }}
        onCancel={resetNextcloudModal}
      />
    );
  };

  const resetNextcloudModal = () => {
    setNextcloudModal(undefined);
  };

  return (
    <div>
      {nextcloudModal}
      <Tldraw
        autofocus
        id={idbName}
        onMount={onMount}
        showMultiplayerMenu={false}
        onAssetCreate={uploadApi ? onAssetCreate : undefined}
        onAssetDelete={uploadApi ? onAssetDelete : undefined}
        onAssetUpload={uploadApi ? onAssetUpload : undefined}
        onSaveProject={canSaveOnNectcloud ? handleSave : onSaveProject}
        onExport={canSaveOnNectcloud ? handleExport : undefined}
        readOnly={readOnly}
        onChange={(app: TldrawApp) => updateDoc(doc, app)}
        onNewProject={onNewProject}
        onOpenProject={onOpenProject}
        onOpenMedia={onOpenMedia}
      />
    </div>
  );
}

export default SingleplayerEditor;
