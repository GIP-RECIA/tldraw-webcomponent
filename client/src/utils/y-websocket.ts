import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";
import type { TDAsset, TDBinding, TDShape } from "@tldraw/tldraw";

let _doc: Y.Doc = new Y.Doc();
let _provider: WebsocketProvider | undefined;

function doc(): Y.Doc {
  if (!_doc) throw new Error("_doc not initialized");

  return _doc;
}

const provider = (): WebsocketProvider => {
  if (!_provider) throw new Error("_provider has not been initialized");

  return _provider;
};

const initProvider = (wsUrl: string, roomId: string, doc?: Y.Doc) => {
  _doc = new Y.Doc();
  if (doc) Y.applyUpdate(_doc, Y.encodeStateAsUpdate(doc));
  _provider = new WebsocketProvider(wsUrl, roomId, _doc, {
    connect: true,
  });
};

const destroyProvider = () => {
  if (_doc) _doc.destroy();
  if (_provider) _provider.destroy();
  _doc = new Y.Doc();
  _provider = undefined;
};

const awareness = () => provider().awareness;

const yShapes = (): Y.Map<TDShape> => doc().getMap("shapes");
const yBindings = (): Y.Map<TDBinding> => doc().getMap("bindings");
const yAssets = (): Y.Map<TDAsset> => doc().getMap("assets");

const undoManager = () =>
  new Y.UndoManager([yShapes(), yBindings(), yAssets()]);

export {
  doc,
  provider,
  initProvider,
  destroyProvider,
  awareness,
  yShapes,
  yBindings,
  yAssets,
  undoManager,
};
