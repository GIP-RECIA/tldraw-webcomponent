import { TDExport, TldrawApp } from "@tldraw/tldraw";
import { useCallback } from "react";
import { saveOnNextcloud } from "../services/serviceNextcloud";
import { DialogState } from "@tldraw/tldraw/dist/hooks";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

export function useSave(nextcloudUrl: string) {
  const { t } = useTranslation();

  const onSaveProject = useCallback((app: TldrawApp): void => {}, []);

  const onSaveProjectAs = useCallback((app: TldrawApp): void => {}, []);

  const onOpenProject = useCallback(
    (
      app: TldrawApp,
      openDialog: (
        dialogState: DialogState,
        onYes: () => Promise<void>,
        onNo: () => Promise<void>,
        onCancel: () => Promise<void>
      ) => void
    ): Promise<void> => {
      return new Promise<void>((resolve, reject) => {});
    },
    []
  );

  const onOpenMedia = useCallback((app: TldrawApp): Promise<void> => {
    return new Promise<void>((resolve, reject) => {});
  }, []);

  const onExport = useCallback(
    async (app: TldrawApp, info: TDExport): Promise<void> => {
      const file = new File(
        [info.blob],
        `tldraw - ${app.document.name} - ${info.name}`,
        {
          type: info.blob.type,
        }
      );

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
      } catch (ignore) {
        toast.error(t("nextcloud.toast.error"), {
          theme: "colored",
          onClose: () => window.open(`${nextcloudUrl}/`, "_blank"),
        });
      }
    },
    []
  );

  return {
    onSaveProject,
    onSaveProjectAs,
    onOpenProject,
    onOpenMedia,
    onExport,
  };
}
