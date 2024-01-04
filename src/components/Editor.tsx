import { usePersistance } from '../hooks/usePersistance.ts';
import { EditorProps } from '../types/EditorProps.ts';
import { setUserInfoApiUrl } from '../utils/soffitUtils.ts';
import { donwloadImageFile } from '../utils/tldrawUtils.ts';
import { TDExport, Tldraw, TldrawApp, useFileSystem } from '@tldraw/tldraw';
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

  const onExport = async (app: TldrawApp, info: TDExport): Promise<void> => {
    donwloadImageFile(app, info);
  };

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
      onExport={onExport}
      onPersist={onPersist}
    />
  );
}

export default Editor;
