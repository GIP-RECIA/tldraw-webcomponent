import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";
import type { TDAsset, TDBinding, TDShape } from "@tldraw/tldraw";

let _doc: Y.Doc = new Y.Doc();
let _provider: WebsocketProvider | undefined;

export function doc(): Y.Doc {
  if (!_doc) throw new Error("_doc not initialized");

  return _doc;
}

export const provider = (): WebsocketProvider => {
  if (!_provider) throw new Error("_provider has not been initialized");

  return _provider;
};

export const initProvider = (wsUrl: string, roomId: string) => {
  _doc = new Y.Doc();
  _provider = new WebsocketProvider(wsUrl, roomId, _doc, {
    connect: true,
  });
};

export const destroyProvider = () => {
  if (_doc) _doc.destroy();
  if (_provider) _provider.destroy();
  _doc = new Y.Doc();
  _provider = undefined;
};

export const awareness = () => provider().awareness;

export const yShapes = (): Y.Map<TDShape> => doc().getMap("shapes");
export const yBindings = (): Y.Map<TDBinding> => doc().getMap("bindings");
export const yAssets = (): Y.Map<TDAsset> => doc().getMap("assets");

export const undoManager = () =>
  new Y.UndoManager([yShapes(), yBindings(), yAssets()]);
