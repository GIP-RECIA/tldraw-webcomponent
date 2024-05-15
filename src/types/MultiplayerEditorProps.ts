import { CommonProps } from './CommonProps';
import { WebsocketProvider } from 'y-websocket';

export type MultiplayerEditorProps = {
  persistanceApiUrl?: string;
  assetsApiUrl?: string;
  token?: string;
  websocketApiUrl: string;
  roomId: string;
  initUrl?: string;
  owner: boolean;
  clearOnLeave: boolean;
  leave: boolean;
  setProvider: (value: WebsocketProvider) => void;
} & CommonProps;
