import { usePersistance } from '../hooks/usePersistance.ts';
import { findLanguage } from '../utils/i18nUtils.ts';
import { Tldraw, TldrawApp } from '@gip-recia/tldraw-v1';
import debounce from 'lodash.debounce';
import { useCallback } from 'react';

type SingleplayerEditorProps = {
  setIsLoading: (value: boolean) => void;
  setIsError: (value: boolean) => void;
  setIsReady: (value: boolean) => void;
  persistanceApiUrl: string;
};

export default function SingleplayerEditor({
  setIsLoading,
  setIsError,
  setIsReady,
  persistanceApiUrl,
  ...tldrawEvents
}: Readonly<SingleplayerEditorProps>) {
  const { loadDocument } = usePersistance(persistanceApiUrl);

  const onMount = useCallback(
    debounce(async (app: TldrawApp): Promise<void> => {
      app.setSetting('language', findLanguage('en'));
      setIsLoading(true);
      try {
        await loadDocument(app);
        setIsLoading(false);
        setIsReady(true);
      } catch (e) {
        setIsLoading(false);
        setIsError(true);
        console.error(e);
      }
    }, 10),
    [persistanceApiUrl],
  );

  return (
    <Tldraw
      autofocus
      onMount={onMount}
      showMultiplayerMenu={false}
      hideNewReleaseLink
      hideSocialLinks
      hideSponsorLink
      {...tldrawEvents}
    />
  );
}
