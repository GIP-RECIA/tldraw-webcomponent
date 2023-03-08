import * as Y from "yjs";
import { IndexeddbPersistence } from "y-indexeddb";
import type { TDAsset, TDBinding, TDShape } from "@tldraw/tldraw";

const doc = new Y.Doc();

const initPersistence = (idbName: string) =>
  new IndexeddbPersistence(idbName, doc);

const yShapes: Y.Map<TDShape> = doc.getMap("shapes");
const yBindings: Y.Map<TDBinding> = doc.getMap("bindings");
const yAssets: Y.Map<TDAsset> = doc.getMap("assets");

const undoManager = new Y.UndoManager([yShapes, yBindings, yAssets]);

export { doc, initPersistence, yShapes, yBindings, yAssets, undoManager };
