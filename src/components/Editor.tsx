import { usePersistance } from '../hooks/usePersistance';
import { setUserInfoApiUrl } from '../services/userService';
import { EditorProps } from '../types/EditorProps';
import { Tldraw, TldrawApp, useFileSystem } from '@tldraw/tldraw';
import debounce from 'lodash.debounce';
import throttle from 'lodash.throttle';

function Editor({ persistanceApiUrl, userInfoApiUrl }: Readonly<EditorProps>) {
  const { onOpenMedia, onOpenProject } = useFileSystem();
  const { loadDocument, onSaveProject } = usePersistance(persistanceApiUrl);

  setUserInfoApiUrl(userInfoApiUrl);

  let isReady: boolean = false;

  const onMount = debounce(async (app: TldrawApp): Promise<void> => {
    app.setSetting('language', window.navigator.language);
    await loadDocument(app);
    isReady = true;
  }, 10);

  const onPersist = throttle(async (app: TldrawApp): Promise<void> => {
    if (isReady) await onSaveProject(app);
  }, 3000);

  return (
    <Tldraw
      autofocus
      onMount={onMount}
      showMultiplayerMenu={false}
      onOpenMedia={onOpenMedia}
      onOpenProject={onOpenProject}
      onSaveProject={onSaveProject}
      onPersist={onPersist}
    />
  );
}

export default Editor;
