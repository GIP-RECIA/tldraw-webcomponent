import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";

export type Settings = {
  idbName: string;
  apiUrl: string;
  wsUrl?: string;
  roomId?: string;
  readOnly?: boolean;
  language?: string;
  noJoin?: boolean;
  noLeave?: boolean;
  noShare?: boolean;
};

export type Singleplayer = {
  apiUrl: string;
  idbName: string;
  doc: Y.Doc;
  language: string;
  readOnly: boolean;
};

export type Multiplayer = {
  apiUrl: string;
  doc: Y.Doc;
  provider: WebsocketProvider;
  roomId: string;
  language: string;
  readOnly: boolean;
};
