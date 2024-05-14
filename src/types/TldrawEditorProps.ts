export type TldrawEditorProps = {
  mode?: 'single' | 'multi';

  // Common properties
  persistanceApiUrl?: string;
  assetsApiUrl?: string;
  userInfoApiUrl?: string;
  token?: string;
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
