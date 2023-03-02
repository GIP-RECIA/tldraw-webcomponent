import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";
import type { TDAsset, TDBinding, TDShape } from "@tldraw/tldraw";

// Create the doc
export const doc = new Y.Doc();

let _provider: WebsocketProvider;

export const initProvider = (wsUrl: string, roomId: string) => {
  _provider = new WebsocketProvider(wsUrl, roomId, doc, {
    connect: true,
  });
};

export const provider = (): WebsocketProvider => {
  if (!_provider) throw new Error("_provider has not been initialized");

  return _provider;
};

export const awareness = () => provider().awareness;

export const yShapes: Y.Map<TDShape> = doc.getMap("shapes");
export const yBindings: Y.Map<TDBinding> = doc.getMap("bindings");
export const yAssets: Y.Map<TDAsset> = doc.getMap("assets");

// Create an undo manager for the shapes and binding maps
export const undoManager = new Y.UndoManager([yShapes, yBindings, yAssets]);
