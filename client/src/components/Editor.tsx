import { Tldraw, useFileSystem } from "@tldraw/tldraw";
import { useAssets } from "../hooks/useAssets";
import { useMultiplayer } from "../hooks/useMultiplayer";
import { initProvider } from "../utils/y-websocket";
import { CustomCursor } from "./Cursor";
import PropTypes from "prop-types";
import { Default, Multiplayer, Settings } from "../types/types";
import { useSingleplayer } from "../hooks/useSingleplayer";

Editor.propTypes = {
  roomId: PropTypes.string,
  readOnly: PropTypes.string,
  language: PropTypes.string,
};

const components = {
  Cursor: CustomCursor,
};

function Editor({ roomId, readOnly, language }: Settings) {
  language = language || "en";
  let editor = <DefaultEditor language={language} />;
  if (roomId) {
    initProvider(roomId);
    editor = readOnly ? (
      <MultiplayerReadOnlyEditor roomId={roomId} language={language} />
    ) : (
      <MultiplayerEditor roomId={roomId} language={language} />
    );
  }

  return editor;
}

function DefaultEditor({ language }: Default) {
  const fileSystemEvents = useFileSystem();
  const { onAssetCreate, onAssetDelete, onAssetUpload } = useAssets();
  const { ...events } = useSingleplayer(language);

  return (
    <Tldraw
      autofocus
      components={components}
      onAssetCreate={onAssetCreate}
      onAssetDelete={onAssetDelete}
      onAssetUpload={onAssetUpload}
      {...fileSystemEvents}
      {...events}
    />
  );
}

function MultiplayerEditor({ roomId, language }: Multiplayer) {
  const { onSaveProjectAs, onSaveProject } = useFileSystem();
  const { onAssetCreate, onAssetDelete, onAssetUpload } = useAssets();
  const { ...events } = useMultiplayer(roomId, language);

  return (
    <Tldraw
      autofocus
      components={components}
      showPages={false}
      onAssetCreate={onAssetCreate}
      onAssetDelete={onAssetDelete}
      onAssetUpload={onAssetUpload}
      onSaveProjectAs={onSaveProjectAs}
      onSaveProject={onSaveProject}
      {...events}
    />
  );
}

function MultiplayerReadOnlyEditor({ roomId, language }: Multiplayer) {
  const { onSaveProjectAs, onSaveProject } = useFileSystem();
  const { ...events } = useMultiplayer(roomId, language);

  return (
    <Tldraw
      autofocus
      components={components}
      showPages={false}
      onSaveProjectAs={onSaveProjectAs}
      onSaveProject={onSaveProject}
      readOnly
      {...events}
    />
  );
}

export default Editor;
