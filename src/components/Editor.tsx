import { useAssets } from '../hooks/useAssets.ts';
import { toBlob, usePersistance } from '../hooks/usePersistance.ts';
import { EditorProps } from '../types/EditorProps.ts';
import { setUserInfoApiUrl } from '../utils/soffitUtils.ts';
import { donwloadImageFile } from '../utils/tldrawUtils.ts';
import { faFloppyDisk, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TDExport, Tldraw, TldrawApp, useFileSystem } from '@gip-recia/tldraw-v1';
import debounce from 'lodash.debounce';
import throttle from 'lodash.throttle';
import { useState } from 'react';

function Editor({ persistanceApiUrl, assetsApiUrl, userInfoApiUrl, darkMode }: Readonly<EditorProps>) {
  const { onOpenMedia, onOpenProject, onSaveProject } = useFileSystem();
  const { loadDocument, onSaveProject: onPSaveProject } = usePersistance(
    persistanceApiUrl.endsWith('/') ? persistanceApiUrl.slice(0, -1) : persistanceApiUrl,
  );
  const { onAssetCreate, onAssetDelete } = useAssets(
    assetsApiUrl.endsWith('/') ? assetsApiUrl.slice(0, -1) : assetsApiUrl,
  );

  setUserInfoApiUrl(userInfoApiUrl);

  const [isReady, setIsReady] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [blob, setBlob] = useState<string>();
  const [readOnly, setReadOnly] = useState<boolean>(false);

  const isOk: boolean = userInfoApiUrl.length > 0 && persistanceApiUrl.length > 0 && assetsApiUrl.length > 0;

  const onMount = debounce(async (app: TldrawApp): Promise<void> => {
    app.setSetting('language', window.navigator.language);
    try {
      await loadDocument(app);
    } catch (e) {
      setReadOnly(true);
    }
    setIsReady(true);
  }, 10);

  const onExport = async (app: TldrawApp, info: TDExport): Promise<void> => {
    donwloadImageFile(app, info);
  };

  const onSave = async (app: TldrawApp): Promise<void> => {
    setIsSaving(true);
    try {
      const response = await onPSaveProject(app);
      if (response.status === 200) {
        setTimeout(() => {
          setReadOnly(false);
          setIsSaving(false);
        }, 1000);
      }
    } catch (e) {
      setIsSaving(false);
      setReadOnly(true);
      onSaveProject(app);
    }
  };

  const onPersist = throttle(async (app: TldrawApp): Promise<void> => {
    if (!isReady) return;
    const newBlob = toBlob(app);
    if (blob == newBlob) return;
    setBlob(newBlob);
    await onSave(app);
  }, 3000);

  return (
    <>
      <div className="saving">
        {readOnly && !isSaving && <FontAwesomeIcon icon={faTriangleExclamation} shake size="2xl" />}
        {isSaving && <FontAwesomeIcon icon={faFloppyDisk} beatFade size="2xl" />}
      </div>
      {isOk && (
        <Tldraw
          autofocus
          onMount={onMount}
          showMultiplayerMenu={false}
          onOpenMedia={onOpenMedia}
          onOpenProject={onOpenProject}
          onSaveProject={onSave}
          onExport={onExport}
          onPersist={onPersist}
          onAssetCreate={onAssetCreate}
          onAssetDelete={onAssetDelete}
          darkMode={darkMode}
          hideNewReleaseLink
          hideSocialLinks
          hideSponsorLink
          readOnly={readOnly}
        />
      )}
    </>
  );
}

export default Editor;
