import type { TDAsset, TDBinding, TDShape, TldrawApp } from "@tldraw/tldraw";
import { WebsocketProvider } from "y-websocket";
import * as Y from "yjs";

const initProvider = (
  wsUrl: string,
  room: string,
  doc: Y.Doc
): WebsocketProvider =>
  new WebsocketProvider(wsUrl, room, doc, { connect: true });

const newDoc = () => new Y.Doc();

const cloneDoc = (doc: Y.Doc): Y.Doc => {
  const newDoc = new Y.Doc();
  Y.applyUpdate(newDoc, Y.encodeStateAsUpdate(doc));

  return newDoc;
};

const getDocData = (doc: Y.Doc) => {
  const yShapes: Y.Map<TDShape> = doc.getMap("shapes");
  const yBindings: Y.Map<TDBinding> = doc.getMap("bindings");
  const yAssets: Y.Map<TDAsset> = doc.getMap("assets");

  const undoManager = new Y.UndoManager([yShapes, yBindings, yAssets]);

  return {
    yShapes,
    yBindings,
    yAssets,
    undoManager,
  };
};

const updateDoc = (doc: Y.Doc, app: TldrawApp) => {
  const { currentPageId } = app.state.appState;
  const { assets } = app.document;
  const { shapes, bindings } = app.document.pages[currentPageId];
  const { yShapes, yBindings, yAssets } = getDocData(doc);

  doc.transact(() => {
    if (!(yShapes && yBindings && yAssets)) return;

    yShapes.clear();
    yBindings.clear();
    yAssets.clear();

    Object.entries(shapes).forEach(([id, shape]) => {
      yShapes.set(shape.id, shape);
    });
    Object.entries(bindings).forEach(([id, binding]) => {
      yBindings.set(binding.id, binding);
    });
    Object.entries(assets).forEach(([id, asset]) => {
      yAssets.set(asset.id, asset);
    });
  });
};

export { initProvider, newDoc, cloneDoc, getDocData, updateDoc };
