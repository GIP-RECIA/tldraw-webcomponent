import { Tldraw, TldrawProps, useFileSystem } from "@tldraw/tldraw";
import { useAssets } from "../hooks/useAssets";
import { useMultiplayer } from "../hooks/useMultiplayer";
import { initProvider } from "../utils/y";
import { CustomCursor } from "./Cursor";

interface Props {
  roomId: string | undefined;
  readOnly?: boolean;
}

const components = {
  Cursor: CustomCursor,
};

function Editor({ roomId, readOnly }: Props) {
  let editor = <DefaultEditor />;
  if (roomId) {
    initProvider(roomId);
    editor = readOnly ? (
      <MultiplayerReadOnlyEditor roomId={roomId} />
    ) : (
      <MultiplayerEditor roomId={roomId} />
    );
  }

  return editor;
}

function DefaultEditor({ ...rest }: Partial<TldrawProps>) {
  const fileSystemEvents = useFileSystem();
  const { onAssetCreate, onAssetDelete, onAssetUpload } = useAssets();

  return (
    <Tldraw
      autofocus
      components={components}
      onAssetCreate={onAssetCreate}
      onAssetDelete={onAssetDelete}
      onAssetUpload={onAssetUpload}
      {...fileSystemEvents}
      {...rest}
    />
  );
}

function MultiplayerEditor({ roomId }: Props) {
  const fileSystemEvents = useFileSystem();
  const { onAssetCreate, onAssetDelete, onAssetUpload } = useAssets();
  const { ...events } = useMultiplayer(roomId!);

  return (
    <Tldraw
      autofocus
      components={components}
      showPages={false}
      onAssetCreate={onAssetCreate}
      onAssetDelete={onAssetDelete}
      onAssetUpload={onAssetUpload}
      {...fileSystemEvents}
      {...events}
    />
  );
}

function MultiplayerReadOnlyEditor({ roomId }: Props) {
  const { onSaveProjectAs, onSaveProject } = useFileSystem();
  const { ...events } = useMultiplayer(roomId!);

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
