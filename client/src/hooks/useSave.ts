import { TDExport, TldrawApp } from "@tldraw/tldraw";
import { useCallback } from "react";
import { saveOnNextcloud } from "../services/serviceNextcloud";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { toImageFile, toTLDRFile } from "../utils/tldraw";

export function useSave(nextcloudUrl: string) {
  const { t } = useTranslation();

  const onSaveProject = useCallback(async (app: TldrawApp): Promise<void> => {
    const file = toTLDRFile(app);

    try {
      let response = await saveOnNextcloud(nextcloudUrl, file, "tldr");
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
          fileName: `${file.name}.tldr`,
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
  }, []);

  const onSaveProjectAs = useCallback((app: TldrawApp): void => {}, []);

  const onExport = useCallback(
    async (app: TldrawApp, info: TDExport): Promise<void> => {
      const file = toImageFile(app, info);

      try {
        let response = await saveOnNextcloud(nextcloudUrl, file, info.type);
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
            fileName: `${file.name}.${info.type}`,
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
    },
    []
  );

  return {
    onSaveProject,
    onSaveProjectAs,
    onExport,
  };
}
