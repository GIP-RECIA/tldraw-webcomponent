import { CommonProps } from './CommonProps';
import { WebsocketProvider } from 'y-websocket';

export type MultiplayerEditorProps = {
  persistanceApiUrl?: string;
  assetsApiUrl?: string;
  websocketApiUrl: string;
  roomId: string;
  initUrl?: string;
  owner: boolean;
  clearOnLeave: boolean;
  setProvider: (value: WebsocketProvider) => void;
} & CommonProps;
