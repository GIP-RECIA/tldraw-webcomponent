import { useMultiplayer } from '../hooks/useMultiplayer.ts';
import { MultiplayerEditorProps } from '../types/MultiplayerEditorProps.ts';
import { CustomCursor } from './Cursor.tsx';
import { Tldraw } from '@gip-recia/tldraw-v1';

const components = {
  Cursor: CustomCursor,
};

export default function MultiplayerEditor({
  persistanceApiUrl,
  assetsApiUrl,
  websocketApiUrl,
  roomId,
  initUrl,
  owner,
  clearOnLeave,
  leave,
  setProvider,
  ...params
}: Readonly<MultiplayerEditorProps>) {
  const { autoSave, autoSaveDelay, open, isReady, setIsSaving, setIsLoading, setIsError, setIsReady } = params;

  const props = {
    ...params,
    ...useMultiplayer(
      persistanceApiUrl,
      assetsApiUrl,
      websocketApiUrl,
      roomId,
      initUrl,
      owner,
      clearOnLeave,
      leave,
      autoSave,
      autoSaveDelay,
      open,
      isReady,
      setIsSaving,
      setIsLoading,
      setIsError,
      setIsReady,
      setProvider,
    ),
  };

  return (
    <Tldraw
      autofocus
      components={components}
      showPages={false}
      showMultiplayerMenu={false}
      hideNewReleaseLink
      hideSocialLinks
      hideSponsorLink
      {...props}
    />
  );
}
