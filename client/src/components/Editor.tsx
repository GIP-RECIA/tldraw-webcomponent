import { Tldraw, useFileSystem } from "@tldraw/tldraw";
import { CustomCursor } from "./Cursor";
import { useAssets } from "../hooks/useAssets";
import { useMultiplayer } from "../hooks/useMultiplayer";
import { useSingleplayer } from "../hooks/useSingleplayer";
import { initPersistence } from "../utils/y-indexeddb";
import { destroyProvider, initProvider } from "../utils/y-websocket";
import PropTypes from "prop-types";
import {
  Multiplayer,
  MultiplayerReadOnly,
  Settings,
  Singleplayer,
} from "../types/types";

Editor.propTypes = {
  idbName: PropTypes.string.isRequired,
  apiUrl: PropTypes.string.isRequired,
  wsUrl: PropTypes.string,
  roomId: PropTypes.string,
  readOnly: PropTypes.bool,
  language: PropTypes.string,
};

const components = {
  Cursor: CustomCursor,
};

function Editor({
  idbName,
  apiUrl,
  wsUrl,
  roomId,
  readOnly,
  language,
}: Settings) {
  language = language || "en";
  initPersistence(idbName);
  let editor = <SingleplayerEditor apiUrl={apiUrl} language={language} />;
  if (wsUrl && roomId) {
    initProvider(wsUrl, roomId);
    editor = readOnly ? (
      <MultiplayerReadOnlyEditor roomId={roomId} language={language} />
    ) : (
      <MultiplayerEditor apiUrl={apiUrl} roomId={roomId} language={language} />
    );
  }

  return editor;
}

function SingleplayerEditor({ apiUrl, language }: Singleplayer) {
  const fileSystemEvents = useFileSystem();
  const { onAssetCreate, onAssetDelete, onAssetUpload } = useAssets(apiUrl);
  const { ...events } = useSingleplayer(language);

  return (
    <Tldraw
      autofocus
      showMultiplayerMenu={false}
      onAssetCreate={onAssetCreate}
      onAssetDelete={onAssetDelete}
      onAssetUpload={onAssetUpload}
      {...fileSystemEvents}
      {...events}
    />
  );
}

function MultiplayerEditor({ apiUrl, roomId, language }: Multiplayer) {
  const { onSaveProjectAs, onSaveProject } = useFileSystem();
  const { onAssetCreate, onAssetDelete, onAssetUpload } = useAssets(apiUrl);
  const { ...events } = useMultiplayer(roomId, language);

  return (
    <Tldraw
      autofocus
      components={components}
      showPages={false}
      showMultiplayerMenu={false}
      onAssetCreate={onAssetCreate}
      onAssetDelete={onAssetDelete}
      onAssetUpload={onAssetUpload}
      onSaveProjectAs={onSaveProjectAs}
      onSaveProject={onSaveProject}
      {...events}
    />
  );
}

function MultiplayerReadOnlyEditor({ roomId, language }: MultiplayerReadOnly) {
  const { onSaveProjectAs, onSaveProject } = useFileSystem();
  const { ...events } = useMultiplayer(roomId, language);

  return (
    <Tldraw
      autofocus
      components={components}
      showPages={false}
      showMultiplayerMenu={false}
      onSaveProjectAs={onSaveProjectAs}
      onSaveProject={onSaveProject}
      readOnly
      {...events}
    />
  );
}

export default Editor;
