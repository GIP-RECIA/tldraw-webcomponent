import { downloadBlob } from './fileUtils.ts';
import { TDExport, TldrawApp } from '@tldraw/tldraw';

const getName = (app: TldrawApp, info?: TDExport): string => {
  return `${app.document.name}${info ? ' - ' + info.name : ''}`;
};

const toTLDRFile = (app: TldrawApp): File => {
  return new File([JSON.stringify({ document: app.state.document })], getName(app), {
    type: 'application/tldr;charset=utf-8',
  });
};

const toImageFile = (app: TldrawApp, info: TDExport): File => {
  return new File([info.blob], getName(app, info), { type: info.blob.type });
};

const donwloadImageFile = (app: TldrawApp, info: TDExport): void => {
  downloadBlob(info.blob, getName(app, info));
};

export { toTLDRFile, toImageFile, donwloadImageFile };
