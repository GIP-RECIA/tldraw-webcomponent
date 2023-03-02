import * as Y from "yjs";
import { IndexeddbPersistence } from "y-indexeddb";
import type { TDAsset, TDBinding, TDShape } from "@tldraw/tldraw";

// Create the doc
export const doc = new Y.Doc();

export const initPersistence = (idbName: string) =>
  new IndexeddbPersistence(idbName, doc);

export const yShapes: Y.Map<TDShape> = doc.getMap("shapes");
export const yBindings: Y.Map<TDBinding> = doc.getMap("bindings");
export const yAssets: Y.Map<TDAsset> = doc.getMap("assets");

// Create an undo manager for the shapes and binding maps
export const undoManager = new Y.UndoManager([yShapes, yBindings, yAssets]);
