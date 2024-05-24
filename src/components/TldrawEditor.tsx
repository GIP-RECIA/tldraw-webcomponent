import { CommonProps } from '../types/CommonProps.ts';
import { TldrawEditorProps } from '../types/TldrawEditorProps.ts';
import { setToken } from '../utils/axiosUtils.ts';
import { setUserInfoApiUrl } from '../utils/soffitUtils.ts';
import BottomContainer from './BottomContainer.tsx';
import MultiplayerEditor from './MultiplayerEditor.tsx';
import SingleplayerEditor from './SingleplayerEditor.tsx';
import { useEffect, useState } from 'react';
import { WebsocketProvider } from 'y-websocket';

export default function TldrawEditor({
  debug,
  mode,
  persistanceApiUrl,
  assetsApiUrl,
  token,
  userInfoApiUrl,
  darkMode,
  readOnly,
  autoSave,
  autoSaveDelay,
  open,
  websocketApiUrl,
  roomId,
  initUrl,
  owner,
  clearOnLeave,
  leave,
}: Readonly<TldrawEditorProps>) {
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [isReady, setIsReady] = useState<boolean>(false);
  const [provider, setProvider] = useState<WebsocketProvider>();
  const [cMode, setCMode] = useState<'single' | 'multi'>();

  if (!token && !userInfoApiUrl) throw new Error('Token or userInfoApiUrl is required');

  if (token?.startsWith('Bearer ')) setToken(token);
  else if (token) throw new Error('Invalid token');
  if (userInfoApiUrl) setUserInfoApiUrl(userInfoApiUrl);

  useEffect(() => {
    setIsSaving(false);
    setIsLoading(false);
    setIsReady(false);
    setIsError(false);
    provider?.disconnect();
    setProvider(undefined);
    setTimeout(() => {
      setCMode(mode);
    }, 10); // Fix save when switching to multi mode
  }, [mode]);

  const isSingle: boolean = cMode == 'single';
  const isMulti: boolean = cMode == 'multi' && websocketApiUrl != undefined && roomId != undefined;

  const common: CommonProps = {
    debug: debug ?? false,
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
    token,
    websocketApiUrl: websocketApiUrl!,
    roomId: roomId!,
    initUrl,
    owner: owner ?? false,
    clearOnLeave: clearOnLeave ?? true,
    leave: leave ?? false,
    setProvider,
    ...common,
  };

  const bottomContainer = {
    isLoading,
    isError,
    isSaving,
    provider,
    darkMode,
  };

  return (
    <>
      {isSingle && <SingleplayerEditor {...singleplayerProps} />}
      {isMulti && <MultiplayerEditor {...multiplayerProps} />}
      <BottomContainer {...bottomContainer} />
    </>
  );
}
