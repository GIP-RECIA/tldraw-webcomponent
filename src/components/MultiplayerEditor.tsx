import { useMultiplayer } from '../hooks/useMultiplayer.ts';
import { CustomCursor } from './Cursor.tsx';
import { Tldraw } from '@gip-recia/tldraw-v1';
import { WebsocketProvider } from 'y-websocket';

type MultiplayerEditorProps = {
  setIsLoading: (value: boolean) => void;
  setIsError: (value: boolean) => void;
  setIsReady: (value: boolean) => void;
  websocketApiUrl: string;
  roomId: string;
  initUrl?: string;
  setProvider: (value: WebsocketProvider) => void;
};

const components = {
  Cursor: CustomCursor,
};

export default function MultiplayerEditor({
  setIsLoading,
  setIsError,
  setIsReady,
  websocketApiUrl,
  roomId,
  initUrl,
  setProvider,
  ...tldrawEvents
}: Readonly<MultiplayerEditorProps>) {
  const { ...multiCallbacks } = useMultiplayer(
    websocketApiUrl,
    roomId,
    initUrl,
    setIsLoading,
    setIsError,
    setIsReady,
    setProvider,
  );

  return (
    <Tldraw
      autofocus
      components={components}
      showPages={false}
      showMultiplayerMenu={false}
      hideNewReleaseLink
      hideSocialLinks
      hideSponsorLink
      {...tldrawEvents}
      {...multiCallbacks}
    />
  );
}
