import { donwloadImageFile } from '../utils/tldrawUtils.ts';
import { TDDocument, TDExport, Tldraw, TldrawApp, useFileSystem } from '@tldraw/tldraw';
import { FC, useEffect, useState } from 'react';

type EditorProps = {
  blob: string;
  readOnly: boolean;
  onChange: (blob: string) => void;
};

const Editor: FC<EditorProps> = ({ blob, readOnly, onChange }) => {
  const { onOpenMedia, onOpenProject } = useFileSystem();

  const [globalApp, setGlobalApp] = useState<TldrawApp>();

  const onMount = async (app: TldrawApp): Promise<void> => {
    app.setSetting('language', window.navigator.language);
    setGlobalApp(app);
  };

  const onSaveProject = async (app: TldrawApp): Promise<void> => {
    if (!globalApp) return;
    await saveProject(app);
  };

  const onExport = async (app: TldrawApp, info: TDExport): Promise<void> => {
    donwloadImageFile(app, info);
  };

  const saveProject = async (app: TldrawApp): Promise<void> => {
    onChange(
      JSON.stringify({
        name: app.state.document.name,
        fileHandle: null,
        document: app.state.document,
        assets: app.state.document.assets,
      }),
    );
  };

  useEffect((): void => {
    if (!globalApp) return;
    if (blob != '') globalApp.loadDocument(JSON.parse(blob).document as TDDocument);
  });

  return (
    <Tldraw
      autofocus
      onMount={onMount}
      showMultiplayerMenu={false}
      onOpenMedia={onOpenMedia}
      onOpenProject={onOpenProject}
      onSaveProject={onSaveProject}
      onExport={onExport}
      onPersist={onSaveProject}
      readOnly={readOnly}
    />
  );
};

export default Editor;
