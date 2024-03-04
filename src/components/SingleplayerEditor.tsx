import { useSingleplayer } from '../hooks/useSingleplayer.ts';
import { SingleplayerEditorProps } from '../types/SingleplayerEditorProps.ts';
import { Tldraw } from '@gip-recia/tldraw-v1';

export default function SingleplayerEditor({
  persistanceApiUrl,
  assetsApiUrl,
  ...params
}: Readonly<SingleplayerEditorProps>) {
  const { autoSave, autoSaveDelay, open, isReady, setIsSaving, setIsLoading, setIsError, setIsReady } = params;

  const props = {
    ...params,
    ...useSingleplayer(
      persistanceApiUrl,
      assetsApiUrl,
      autoSave,
      autoSaveDelay,
      open,
      isReady,
      setIsSaving,
      setIsLoading,
      setIsError,
      setIsReady,
    ),
  };

  return <Tldraw autofocus showMultiplayerMenu={false} hideNewReleaseLink hideSocialLinks hideSponsorLink {...props} />;
}
