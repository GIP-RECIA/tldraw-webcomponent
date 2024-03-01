import { useTldraw } from '../hooks/useTldraw';
import BottomContainer from './BottomContainer';
import MultiplayerEditor from './MultiplayerEditor';
import SingleplayerEditor from './SingleplayerEditor';
import { useEffect, useState } from 'react';
import { WebsocketProvider } from 'y-websocket';

type TldrawEditorProps = {
  // Common properties
  mode?: 'single' | 'multi';
  persistanceApiUrl?: string;
  assetsApiUrl?: string;
  userInfoApiUrl: string;
  darkMode?: boolean;
  autoSave?: boolean;
  autoSaveDelay?: number;
  open?: boolean;
  readOnly?: boolean;

  // Multi properties
  websocketApiUrl?: string;
  roomId?: string;
  initUrl?: string;
};

export default function TldrawEditor({
  mode,
  persistanceApiUrl,
  assetsApiUrl,
  userInfoApiUrl,
  darkMode,
  autoSave,
  autoSaveDelay,
  open,
  readOnly,
  websocketApiUrl,
  roomId,
  initUrl,
}: Readonly<TldrawEditorProps>) {
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [isReady, setIsReady] = useState<boolean>(false);
  const [provider, setProvider] = useState<WebsocketProvider>();
  const [cMode, setCMode] = useState<'single' | 'multi'>('single');

  const tldrawEvents = useTldraw(
    persistanceApiUrl,
    assetsApiUrl,
    userInfoApiUrl,
    autoSave ?? true,
    autoSaveDelay ?? 3000,
    open ?? false,
    isReady,
    setIsSaving,
  );

  useEffect(() => {
    setIsSaving(false);
    setIsLoading(false);
    setIsReady(false);
    setIsError(false);
    provider?.destroy();
    setProvider(undefined);
    setTimeout(() => setCMode(mode ?? 'single'), 200); // Fix save when switching to multi mode
  }, [mode]);

  const isSingle: boolean = cMode == 'single' && persistanceApiUrl != undefined;
  const isMulti: boolean = cMode == 'multi' && websocketApiUrl != undefined && roomId != undefined;

  const common = {
    darkMode: darkMode ?? false,
    readOnly: readOnly ?? isError,
    setIsLoading,
    setIsError,
    setIsReady,
  };

  const bottomContainer = {
    isLoading,
    isError,
    isSaving,
    provider,
  };

  return (
    <>
      {isSingle && <SingleplayerEditor {...common} persistanceApiUrl={persistanceApiUrl!} {...tldrawEvents} />}
      {isMulti && (
        <MultiplayerEditor
          {...common}
          websocketApiUrl={websocketApiUrl!}
          roomId={roomId!}
          initUrl={initUrl}
          setProvider={setProvider}
          {...tldrawEvents}
        />
      )}
      <BottomContainer {...bottomContainer} />
    </>
  );
}
