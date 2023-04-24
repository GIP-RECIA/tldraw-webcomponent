import { useState } from "react";
import { TDExport, Tldraw, TldrawApp, useFileSystem } from "@tldraw/tldraw";
import { useAssets } from "../hooks/useAssets";
import { useSave } from "../hooks/useSave";
import { useMultiplayer } from "../hooks/useMultiplayer";
import { donwloadImageFile } from "../utils/tldraw";
import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";
import { CustomCursor } from "./Cursor";
import NextcloudModal from "./NextcloudModal";

type Multiplayer = {
  uploadApi: string | undefined;
  userApi: string | undefined;
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
  uploadApi,
  userApi,
  nextcloudUrl,
  doc,
  provider,
  roomId,
  language,
  readOnly,
}: Multiplayer) {
  const { onSaveProject } = useFileSystem();
  const { onAssetCreate, onAssetDelete, onAssetUpload } = useAssets(uploadApi);
  const { onSaveProject: ncOnSaveProject, onExport } = useSave(
    nextcloudUrl,
    userApi
  );
  const { ...events } = useMultiplayer(
    doc,
    provider,
    roomId,
    userApi,
    language
  );

  const [nextcloudModal, setNextcloudModal] = useState<any>(undefined);

  const canSaveOnNectcloud = nextcloudUrl && userApi;

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
        components={components}
        showPages={false}
        showMultiplayerMenu={false}
        onAssetCreate={
          readOnly ? undefined : uploadApi ? onAssetCreate : undefined
        }
        onAssetDelete={uploadApi ? onAssetDelete : undefined}
        onAssetUpload={uploadApi ? onAssetUpload : undefined}
        onSaveProject={canSaveOnNectcloud ? handleSave : onSaveProject}
        onExport={canSaveOnNectcloud ? handleExport : undefined}
        readOnly={readOnly}
        {...events}
      />
    </div>
  );
}

export default MultiplayerEditor;
