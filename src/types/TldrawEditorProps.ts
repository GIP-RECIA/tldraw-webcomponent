export type TldrawEditorProps = {
  mode?: 'single' | 'multi';
  wsDestroy?: boolean;

  // Common properties
  persistanceApiUrl?: string;
  assetsApiUrl?: string;
  userInfoApiUrl: string;
  darkMode?: boolean;
  readOnly?: boolean;
  autoSave?: boolean;
  autoSaveDelay?: number;
  open?: boolean;

  // Multi properties
  websocketApiUrl?: string;
  roomId?: string;
  initUrl?: string;
  owner?: boolean;
};
