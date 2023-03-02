import type { TDAsset, TDBinding, TDShape, TldrawApp } from "@tldraw/tldraw";
import { useCallback, useEffect, useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import {
  doc,
  undoManager,
  yAssets,
  yBindings,
  yShapes,
} from "../utils/y-indexeddb";

export function useSingleplayer(language: string) {
  const [app, setApp] = useState<TldrawApp>();
  const [loading, setLoading] = useState(true);

  const onUndo = useCallback(() => {
    undoManager.undo();
  }, []);
  const onRedo = useCallback(() => {
    undoManager.redo();
  }, []);

  // Callbacks --------------

  // Put the state into the window, for debugging.
  const onMount = useCallback((app: TldrawApp) => {
    app.setSetting("language", language);
    app.setSetting("keepStyleMenuOpen", true);
    app.pause(); // Turn off the app's own undo / redo stack
    setApp(app);
  }, []);

  // Update the live shapes when the app's shapes change.
  const onChangePage = useCallback(
    (
      app: TldrawApp,
      shapes: Record<string, TDShape | undefined>,
      bindings: Record<string, TDBinding | undefined>,
      assets: Record<string, TDAsset | undefined>
    ) => {
      doc.transact(() => {
        if (!(yShapes && yBindings && yAssets)) return;

        Object.entries(shapes).forEach(([id, shape]) => {
          if (!shape) {
            yShapes.delete(id);
          } else {
            yShapes.set(shape.id, shape);
          }
        });

        Object.entries(bindings).forEach(([id, binding]) => {
          if (!binding) {
            yBindings.delete(id);
          } else {
            yBindings.set(binding.id, binding);
          }
        });

        Object.entries(assets).forEach(([id, asset]) => {
          if (!asset) {
            yAssets.delete(id);
          } else {
            yAssets.set(asset.id, asset);
          }
        });
      });
    },
    []
  );

  // Document Changes --------

  useEffect(() => {
    if (!app) return;

    // Subscribe to changes
    function handleChanges() {
      if (!app) return;

      app.replacePageContent(
        Object.fromEntries(yShapes.entries()),
        Object.fromEntries(yBindings.entries()),
        Object.fromEntries(yAssets.entries())
      );
    }

    async function setup() {
      yShapes.observe(handleChanges);
      handleChanges();
      setLoading(false);
    }

    setup();

    return () => {
      yShapes.unobserveDeep(handleChanges);
    };
  }, [app]);

  const onSessionStart = useCallback(() => {}, []);

  const onSessionEnd = useCallback(() => {}, []);

  useHotkeys(
    "ctrl+shift+l;,⌘+shift+l",
    () => {
      if (window.confirm("Reset the document?")) {
        undoManager.stopCapturing();
        doc.transact(() => {
          if (!(yShapes && yBindings && yAssets)) return;

          yShapes.forEach((shape) => {
            yShapes.delete(shape.id);
          });

          yBindings.forEach((shape) => {
            yBindings.delete(shape.id);
          });

          yAssets.forEach((shape) => {
            yAssets.delete(shape.id);
          });
        });
      }
    },
    []
  );

  return {
    onMount,
    onUndo,
    onRedo,
    onChangePage,
    onSessionStart,
    onSessionEnd,
    loading,
  };
}
