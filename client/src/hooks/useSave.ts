import { saveOnNextcloud } from '../services/serviceNextcloud';
import { getUserID } from '../services/serviceUser';
import { toImageFile, toTLDRFile } from '../utils/tldraw';
import { TDExport, TldrawApp } from '@tldraw/tldraw';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

export function useSave(nextcloudUrl: string | undefined, userApi: string | undefined) {
  const { t } = useTranslation();

  const handleSave = async (file: File, type: string) => {
    if (!nextcloudUrl || !userApi) {
      throw new Error(t('nextcloud.toast.unconfigured') as string);
    }
    try {
      const userID = await getUserID(userApi);
      const response = await saveOnNextcloud(nextcloudUrl, userID, file, type);
      let state;
      switch (response.status) {
        case 201:
          state = t('nextcloud.stateMessage.created');
          break;
        case 204:
          state = t('nextcloud.stateMessage.updated');
          break;
      }
      toast.success(
        t('nextcloud.toast.success', {
          fileName: `${file.name}.${type}`,
          state: state,
        }),
        {
          theme: 'colored',
        },
      );
    } catch (error: any) {
      if (error.response?.status === 401) {
        toast.error(t('nextcloud.toast.error'), {
          theme: 'colored',
          onClose: () => window.open(`${nextcloudUrl}/`, '_blank'),
        });
      } else if (error.message == 'guest') {
        toast.error(t('nextcloud.toast.guest'), {
          theme: 'colored',
        });
      } else {
        toast.error(t('nextcloud.toast.unknown'), {
          theme: 'colored',
          autoClose: false,
        });
        console.error(error);
      }
    }
  };

  const onSaveProject = useCallback(async (app: TldrawApp): Promise<void> => {
    const file = toTLDRFile(app);
    handleSave(file, 'tldr');
  }, []);

  const onSaveProjectAs = useCallback(async (app: TldrawApp): Promise<void> => {
    const file = toTLDRFile(app);
    handleSave(file, 'tldr');
  }, []);

  const onExport = useCallback(async (app: TldrawApp, info: TDExport): Promise<void> => {
    const file = toImageFile(app, info);
    handleSave(file, info.type);
  }, []);

  return {
    onSaveProject,
    onSaveProjectAs,
    onExport,
  };
}
