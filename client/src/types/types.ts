export type Settings = {
  idbName: string;
  apiUrl: string;
  wsUrl?: string;
  roomId?: string;
  readOnly?: boolean;
  language?: string;
};

export type Singleplayer = {
  apiUrl: string;
  language: string;
};

export type Multiplayer = {
  apiUrl: string;
  roomId: string;
  language: string;
};

export type MultiplayerReadOnly = {
  roomId: string;
  language: string;
};
