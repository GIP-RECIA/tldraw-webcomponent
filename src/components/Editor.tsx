import { usePersistance } from '../hooks/usePersistance.ts';
import { EditorProps } from '../types/EditorProps.ts';
import { setUserInfoApiUrl } from '../utils/soffitUtils.ts';
import { donwloadImageFile } from '../utils/tldrawUtils.ts';
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TDExport, Tldraw, TldrawApp, useFileSystem } from '@tldraw/tldraw';
import debounce from 'lodash.debounce';
import throttle from 'lodash.throttle';
import { useState } from 'react';

function Editor({ persistanceApiUrl, userInfoApiUrl }: Readonly<EditorProps>) {
  const { onOpenMedia, onOpenProject } = useFileSystem();
  const { loadDocument, onSaveProject } = usePersistance(persistanceApiUrl);

  setUserInfoApiUrl(userInfoApiUrl);

  const [isReady, setIsReady] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const onMount = debounce(async (app: TldrawApp): Promise<void> => {
    app.setSetting('language', window.navigator.language);
    await loadDocument(app);
    setIsReady(true);
  }, 10);

  const onExport = async (app: TldrawApp, info: TDExport): Promise<void> => {
    donwloadImageFile(app, info);
  };

  const onSave = throttle(async (app: TldrawApp): Promise<void> => {
    if (isReady) {
      setIsSaving(true);
      try {
        const response = await onSaveProject(app);
        if (response.status === 200) {
          setTimeout(() => {
            setIsSaving(false);
          }, 1000);
        }
      } catch (e) {
        alert('Unable to save project');
        setIsSaving(false);
      }
    }
  }, 3000);

  return (
    <>
      <div className="saving">{isSaving && <FontAwesomeIcon icon={faFloppyDisk} beat />}</div>
      <Tldraw
        autofocus
        onMount={onMount}
        showMultiplayerMenu={false}
        onOpenMedia={onOpenMedia}
        onOpenProject={onOpenProject}
        onSaveProject={onSave}
        onExport={onExport}
        onPersist={onSave}
      />
    </>
  );
}

export default Editor;
