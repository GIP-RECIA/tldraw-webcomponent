import * as Y from "yjs";
import type { TDAsset, TDBinding, TDShape } from "@tldraw/tldraw";
import { IndexeddbPersistence } from "y-indexeddb";
import { WebsocketProvider } from "y-websocket";

const initPersistence = (idbName: string, doc: Y.Doc): IndexeddbPersistence =>
  new IndexeddbPersistence(idbName, doc);

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

export { initPersistence, initProvider, newDoc, cloneDoc, getDocData };
