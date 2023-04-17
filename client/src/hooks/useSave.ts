import { TDExport, TldrawApp } from "@tldraw/tldraw";
import { useCallback } from "react";
import { saveOnNextcloud } from "../services/serviceNextcloud";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { toImageFile, toTLDRFile } from "../utils/tldraw";

export function useSave(nextcloudUrl: string) {
  const { t } = useTranslation();

  const handleSave = async (nextcloudUrl: string, file: File, type: string) => {
    try {
      let response = await saveOnNextcloud(nextcloudUrl, file, type);
      let state;
      switch (response.status) {
        case 201:
          state = t("nextcloud.stateMessage.created");
          break;
        case 204:
          state = t("nextcloud.stateMessage.updated");
          break;
      }
      toast.success(
        t("nextcloud.toast.success", {
          fileName: `${file.name}.${type}`,
          state: state,
        }),
        {
          theme: "colored",
        }
      );
    } catch (error: any) {
      if (error.response.status === 401) {
        toast.error(t("nextcloud.toast.error"), {
          theme: "colored",
          onClose: () => window.open(`${nextcloudUrl}/`, "_blank"),
        });
      } else {
        toast.error(t("nextcloud.toast.unknown"), {
          theme: "colored",
          autoClose: false,
        });
      }
    }
  };

  const onSaveProject = useCallback(async (app: TldrawApp): Promise<void> => {
    const file = toTLDRFile(app);
    handleSave(nextcloudUrl, file, "tldr");
  }, []);

  const onSaveProjectAs = useCallback(async (app: TldrawApp): Promise<void> => {
    const file = toTLDRFile(app);
    handleSave(nextcloudUrl, file, "tldr");
  }, []);

  const onExport = useCallback(
    async (app: TldrawApp, info: TDExport): Promise<void> => {
      const file = toImageFile(app, info);
      handleSave(nextcloudUrl, file, info.type);
    },
    []
  );

  return {
    onSaveProject,
    onSaveProjectAs,
    onExport,
  };
}
