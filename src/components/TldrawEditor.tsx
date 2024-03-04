import { CommonProps } from '../types/CommonProps';
import { TldrawEditorProps } from '../types/TldrawEditorProps';
import { setUserInfoApiUrl } from '../utils/soffitUtils';
import BottomContainer from './BottomContainer';
import MultiplayerEditor from './MultiplayerEditor';
import SingleplayerEditor from './SingleplayerEditor';
import { useEffect, useState } from 'react';
import { WebsocketProvider } from 'y-websocket';

export default function TldrawEditor({
  mode,
  wsDestroy,
  persistanceApiUrl,
  assetsApiUrl,
  userInfoApiUrl,
  darkMode,
  readOnly,
  autoSave,
  autoSaveDelay,
  open,
  websocketApiUrl,
  roomId,
  initUrl,
}: Readonly<TldrawEditorProps>) {
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [isReady, setIsReady] = useState<boolean>(false);
  const [provider, setProvider] = useState<WebsocketProvider>();
  const [cMode, setCMode] = useState<'single' | 'multi'>();

  setUserInfoApiUrl(userInfoApiUrl);

  useEffect(() => {
    setIsSaving(false);
    setIsLoading(false);
    setIsReady(false);
    setIsError(false);
    provider?.disconnect();
    setProvider(undefined);
    setTimeout(() => setCMode(mode), 10); // Fix save when switching to multi mode
  }, [mode]);

  useEffect(() => {
    if (wsDestroy) provider?.destroy();
  }, [wsDestroy]);

  const isSingle: boolean = cMode == 'single';
  const isMulti: boolean = cMode == 'multi' && websocketApiUrl != undefined && roomId != undefined;

  const common: CommonProps = {
    darkMode: darkMode ?? false,
    autoSave: autoSave ?? true,
    autoSaveDelay: autoSaveDelay ?? 3000,
    open: open ?? false,
    readOnly: readOnly ?? isError,
    isReady,
    setIsSaving,
    setIsLoading,
    setIsError,
    setIsReady,
  };

  const singleplayerProps = {
    persistanceApiUrl,
    assetsApiUrl,
    ...common,
  };

  const multiplayerProps = {
    persistanceApiUrl,
    assetsApiUrl,
    websocketApiUrl: websocketApiUrl!,
    roomId: roomId!,
    initUrl,
    setProvider,
    ...common,
  };

  const bottomContainer = {
    isLoading,
    isError,
    isSaving,
    provider,
  };

  return (
    <>
      {isSingle && <SingleplayerEditor {...singleplayerProps} />}
      {isMulti && <MultiplayerEditor {...multiplayerProps} />}
      <BottomContainer {...bottomContainer} />
    </>
  );
}
