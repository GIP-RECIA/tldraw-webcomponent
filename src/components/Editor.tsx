import { usePersistance } from '../hooks/usePersistance';
import { setUserInfoApiUrl } from '../services/userService';
import { EditorProps } from '../types/EditorProps';
import { Tldraw, TldrawApp, useFileSystem } from '@tldraw/tldraw';

function Editor({ persistanceApiUrl, userInfoApiUrl }: Readonly<EditorProps>) {
  const { onOpenMedia } = useFileSystem();
  const { loadDocument, onSaveProject } = usePersistance(persistanceApiUrl);

  setUserInfoApiUrl(userInfoApiUrl);

  const onMount = (app: TldrawApp) => {
    app.setSetting('language', window.navigator.language);
    loadDocument(app);
  };

  return (
    <Tldraw
      autofocus
      onMount={onMount}
      showMultiplayerMenu={false}
      onOpenMedia={onOpenMedia}
      onSaveProject={onSaveProject}
    />
  );
}

export default Editor;
