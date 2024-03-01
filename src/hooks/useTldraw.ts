import { setUserInfoApiUrl } from '../utils/soffitUtils';
import { donwloadImageFile } from '../utils/tldrawUtils';
import { useAssets } from './useAssets';
import { toBlob, usePersistance } from './usePersistance';
import { TDExport, TldrawApp, useFileSystem } from '@gip-recia/tldraw-v1';
import throttle from 'lodash.throttle';
import { useCallback } from 'react';

export function useTldraw(
  persistanceUrl: string | undefined,
  assetsUrl: string | undefined,
  userInfoApiUrl: string,
  autoSave: boolean,
  autoSaveDelay: number,
  open: boolean,
  isReady: boolean,
  onSaving: (isSaving: boolean) => void,
) {
  setUserInfoApiUrl(userInfoApiUrl);

  const { onOpenProject, onSaveProject } = useFileSystem();
  const { onSaveProject: onPSaveProject } = usePersistance(persistanceUrl ?? '');
  const { onAssetCreate, onAssetDelete } = useAssets(assetsUrl ?? '');

  let blob: string = '';

  const onExport = useCallback(async (app: TldrawApp, info: TDExport): Promise<void> => {
    donwloadImageFile(app, info);
  }, []);

  const onSave = useCallback(
    async (app: TldrawApp): Promise<void> => {
      onSaving(true);
      try {
        const response = await onPSaveProject(app);
        if (response.status === 200) {
          setTimeout(() => {
            onSaving(false);
          }, 1000);
        }
      } catch (e) {
        onSaving(false);
        onSaveProject(app);
      }
    },
    [persistanceUrl],
  );

  const onPersist = useCallback(
    throttle(async (app: TldrawApp): Promise<void> => {
      if (!isReady || !autoSave) return;
      const newBlob = toBlob(app);
      if (blob == newBlob) return;
      blob = newBlob;
      await onSave(app);
    }, autoSaveDelay),
    [isReady, autoSave, autoSaveDelay],
  );

  return {
    onExport,
    onSaveProject: persistanceUrl ? onSave : onSaveProject,
    onOpenProject: open ? onOpenProject : undefined,
    onPersist,
    onAssetCreate: assetsUrl ? onAssetCreate : undefined,
    onAssetDelete: assetsUrl ? onAssetDelete : undefined,
  };
}
