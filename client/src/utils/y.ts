import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";
import type { TDAsset, TDBinding, TDShape } from "@tldraw/tldraw";

const { VITE_WS_URL } = import.meta.env;

// Create the doc
export const doc = new Y.Doc();

let _provider: WebsocketProvider | null = null;

export const initProvider = (roomId: string) => {
  _provider = new WebsocketProvider(VITE_WS_URL, roomId, doc, {
    connect: true,
  });
};

export const provider = (): WebsocketProvider => {
  if (_provider === null) {
    console.warn("_provider has not been initialized");
    initProvider("y-tldraw");
  }

  return _provider!;
};

// Export the provider's awareness API
export const awareness = () => provider().awareness;

export const yShapes: Y.Map<TDShape> = doc.getMap("shapes");
export const yBindings: Y.Map<TDBinding> = doc.getMap("bindings");
export const yAssets: Y.Map<TDAsset> = doc.getMap("assets");

// Create an undo manager for the shapes and binding maps
export const undoManager = new Y.UndoManager([yShapes, yBindings, yAssets]);
