import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";

export type Settings = {
  idbName: string;
  apiUrl: string;
  wsUrl?: string;
  roomId?: string;
  readOnly?: boolean;
  language?: string;
  cantJoin?: boolean;
  cantLeave?: boolean;
  cantShare?: boolean;
};

export type Singleplayer = {
  apiUrl: string;
  language: string;
};

export type Multiplayer = {
  apiUrl: string;
  doc: Y.Doc;
  provider: WebsocketProvider;
  roomId: string;
  language: string;
};

export type MultiplayerReadOnly = {
  doc: Y.Doc;
  provider: WebsocketProvider;
  roomId: string;
  language: string;
};
