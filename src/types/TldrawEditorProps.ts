export type TldrawEditorProps = {
  debug?: boolean;
  mode?: 'single' | 'multi';

  // Common properties
  persistanceApiUrl?: string;
  assetsApiUrl?: string;
  token?: string;
  userInfoApiUrl?: string;
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
  clearOnLeave?: boolean;
  leave?: boolean;
};
