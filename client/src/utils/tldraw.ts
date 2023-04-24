import { downloadBlob } from "./file";
import { TDExport, TldrawApp } from "@tldraw/tldraw";

const toTLDRFile = (app: TldrawApp) => {
  return new File(
    [JSON.stringify({ document: app.state.document })],
    `tldraw - ${app.document.name}`,
    {
      type: "application/tldr;charset=utf-8",
    }
  );
};

const toImageFile = (app: TldrawApp, info: TDExport) => {
  return new File([info.blob], `tldraw - ${app.document.name} - ${info.name}`, {
    type: info.blob.type,
  });
};

const donwloadImageFile = (app: TldrawApp, info: TDExport) => {
  downloadBlob(info.blob, `tldraw - ${app.document.name} - ${info.name}`);
};

export { toTLDRFile, toImageFile, donwloadImageFile };
