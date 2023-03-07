import * as Y from "yjs";
import { IndexeddbPersistence } from "y-indexeddb";
import type { TDAsset, TDBinding, TDShape } from "@tldraw/tldraw";

export const doc = new Y.Doc();

export const initPersistence = (idbName: string) =>
  new IndexeddbPersistence(idbName, doc);

export const yShapes: Y.Map<TDShape> = doc.getMap("shapes");
export const yBindings: Y.Map<TDBinding> = doc.getMap("bindings");
export const yAssets: Y.Map<TDAsset> = doc.getMap("assets");

export const undoManager = new Y.UndoManager([yShapes, yBindings, yAssets]);
