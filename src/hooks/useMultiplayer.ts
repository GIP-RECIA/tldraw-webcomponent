import { useAssets } from '../hooks/useAssets.ts';
import { findLanguage } from '../utils/i18nUtils';
import { getToken } from '../utils/soffitUtils.ts';
import { donwloadImageFile } from '../utils/tldrawUtils.ts';
import { getDocData, updateDoc } from '../utils/yjsUtils.ts';
import { toBlob, usePersistance } from './usePersistance.ts';
import { useYjs } from './useYjs.ts';
import { TDAsset, TDBinding, TDExport, TDShape, TDUser, TldrawApp, useFileSystem } from '@gip-recia/tldraw-v1';
import debounce from 'lodash.debounce';
import throttle from 'lodash.throttle';
import { useCallback, useEffect, useRef, useState } from 'react';
import { WebsocketProvider } from 'y-websocket';

export function useMultiplayer(
  persistanceApiUrl: string | undefined,
  assetsApiUrl: string | undefined,
  websocketApiUrl: string,
  roomId: string,
  initUrl: string | undefined,
  owner: boolean,
  clearOnLeave: boolean,
  leave: boolean,
  autoSave: boolean,
  autoSaveDelay: number,
  open: boolean,
  isReady: boolean,
  setIsSaving: (isSaving: boolean) => void,
  setIsLoading: (value: boolean) => void,
  setIsError: (value: boolean) => void,
  setIsReady: (value: boolean) => void,
  setProvider: (value: WebsocketProvider) => void,
) {
  /* -- Custom work -- */

  const { onSaveProject, onOpenProject } = useFileSystem();
  const { doc, provider, awareness } = useYjs(websocketApiUrl, roomId);
  const { yPersistanceApiUrl, yAssetsApiUrl, yShapes, yBindings, yAssets, undoManager } = getDocData(doc);
  const { onSaveProject: onPSaveProject } = usePersistance(
    yPersistanceApiUrl.toString().length > 0 ? yPersistanceApiUrl.toString() : undefined,
  );
  const { loadDocument } = usePersistance(initUrl);

  /**
   * Force rerendering
   */
  const [key, setKey] = useState<number>(0);

  /**
   * Define persistance API URL on yjs
   */
  useEffect(() => {
    setTimeout(() => {
      if (owner) {
        const oldValue: string = yPersistanceApiUrl.toString();
        if (oldValue !== persistanceApiUrl) {
          yPersistanceApiUrl.delete(0, oldValue.length);
          if (persistanceApiUrl) yPersistanceApiUrl.insert(0, persistanceApiUrl);
        }
      }
    }, 200);

    const handleChanges = throttle(() => setKey((value) => value + 1), 200, { trailing: true });

    yPersistanceApiUrl.observeDeep(handleChanges);

    return () => yPersistanceApiUrl.unobserveDeep(handleChanges);
  }, [persistanceApiUrl, owner]);

  /**
   * Define assets API URL on yjs
   */
  useEffect(() => {
    setTimeout(() => {
      if (owner) {
        const oldValue: string = yAssetsApiUrl.toString();
        if (oldValue !== assetsApiUrl) {
          yAssetsApiUrl.delete(0, oldValue.length);
          if (assetsApiUrl) yAssetsApiUrl.insert(0, assetsApiUrl);
        }
      }
    }, 200);

    const handleChanges = throttle(() => setKey((value) => value + 1), 200, { trailing: true });

    yAssetsApiUrl.observeDeep(handleChanges);

    return () => yAssetsApiUrl.unobserveDeep(handleChanges);
  }, [assetsApiUrl, owner]);

  useEffect(() => {
    setProvider(provider);
  }, [provider]);

  useEffect(() => {
    if (leave) {
      if (owner && clearOnLeave) {
        yPersistanceApiUrl.delete(0, yPersistanceApiUrl.toString().length);
        yAssetsApiUrl.delete(0, yAssetsApiUrl.toString().length);
      }
      provider.disconnect();
    }
  }, [owner, clearOnLeave, leave]);

  /* -- https://github.com/nimeshnayaju/yjs-tldraw/blob/main/src/hooks/useMultiplayerState.ts -- */

  const tldrawRef = useRef<TldrawApp>();

  const onMount = useCallback(
    debounce(async (app: TldrawApp) => {
      app.setSetting('language', findLanguage('en'));
      if (initUrl) {
        setIsLoading(true);
        try {
          await loadDocument(app);
          updateDoc(doc, app);
          setIsLoading(false);
          setIsReady(true);
        } catch (e) {
          setIsLoading(false);
          setIsError(true);
          console.error(e);
        }
      }

      app.loadRoom(roomId);
      app.pause();
      tldrawRef.current = app;

      if (app.currentUser) {
        const {
          decoded: { name },
        } = await getToken();
        app.currentUser.metadata = { name: name != undefined && !name.startsWith('guest') ? name : undefined };
      }

      app.replacePageContent(
        Object.fromEntries(yShapes.entries()),
        Object.fromEntries(yBindings.entries()),
        Object.fromEntries(yAssets.entries()),
      );

      if (!initUrl) setIsReady(true);
    }, 10),
    [roomId],
  );

  const onChangePage = useCallback(
    (
      app: TldrawApp,
      shapes: Record<string, TDShape | undefined>,
      bindings: Record<string, TDBinding | undefined>,
      assets: Record<string, TDAsset | undefined>,
    ) => {
      undoManager.stopCapturing();
      doc.transact(() => {
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
    [],
  );

  const onUndo = useCallback(() => {
    undoManager.undo();
  }, []);

  const onRedo = useCallback(() => {
    undoManager.redo();
  }, []);

  /**
   * Callback to update user's (self) presence
   */
  const onChangePresence = useCallback((app: TldrawApp, user: TDUser) => {
    awareness.setLocalStateField('tdUser', user);
  }, []);

  /**
   * Update app users whenever there is a change in the room users
   */
  useEffect(() => {
    const onChangeAwareness = () => {
      const tldraw = tldrawRef.current;

      if (!tldraw || !tldraw.room) return;

      const others = Array.from(awareness.getStates().entries())
        .filter(([key, _]) => key !== awareness.clientID)
        .map(([_, state]) => state)
        .filter((user) => user.tdUser !== undefined);

      const ids = others.map((other) => other.tdUser.id as string);

      Object.values(tldraw.room.users).forEach((user) => {
        if (user && !ids.includes(user.id) && user.id !== tldraw.room?.userId) {
          tldraw.removeUser(user.id);
        }
      });

      tldraw.updateUsers(others.map((other) => other.tdUser).filter(Boolean));
    };

    awareness.on('change', onChangeAwareness);

    return () => awareness.off('change', onChangeAwareness);
  }, []);

  useEffect(() => {
    function handleChanges() {
      const tldraw = tldrawRef.current;

      if (!tldraw) return;

      tldraw.replacePageContent(
        Object.fromEntries(yShapes.entries()),
        Object.fromEntries(yBindings.entries()),
        Object.fromEntries(yAssets.entries()),
      );

      if (!tldraw.isPointing) tryAutoSave(tldraw);
    }

    yShapes.observeDeep(handleChanges);

    return () => yShapes.unobserveDeep(handleChanges);
  }, [isReady, autoSave, owner, key]);

  useEffect(() => {
    function handleDisconnect() {
      provider.disconnect();
    }
    window.addEventListener('beforeunload', handleDisconnect);

    return () => window.removeEventListener('beforeunload', handleDisconnect);
  }, []);

  /* -- Custom work -- */

  const onSave = useCallback(
    async (app: TldrawApp): Promise<void> => {
      if (!owner) return;

      setIsSaving(true);
      try {
        const response = await onPSaveProject(app);
        if (response?.status === 200) {
          setTimeout(() => {
            setIsSaving(false);
          }, 1000);
        }
      } catch (e) {
        setIsSaving(false);
        onSaveProject(app);
      }
    },
    [owner, key],
  );

  const blob = useRef<string>('');

  const tryAutoSave = useCallback(
    throttle(async (app: TldrawApp): Promise<void> => {
      if (!owner || !isReady || !autoSave || yPersistanceApiUrl.toString().trim() == '') return;

      const newBlob = toBlob(app);
      if (blob.current == newBlob) return;
      blob.current = newBlob;
      await onSave(app);
    }, autoSaveDelay),
    [isReady, autoSave, autoSaveDelay, owner, key],
  );

  const onExport = useCallback(async (app: TldrawApp, info: TDExport): Promise<void> => {
    donwloadImageFile(app, info);
  }, []);

  return {
    onMount,
    onOpenProject: open ? onOpenProject : undefined,
    onSaveProject: persistanceApiUrl ? onSave : onSaveProject,
    onChangePage,
    onUndo,
    onRedo,
    onChangePresence,
    onExport,
    ...useAssets(yAssetsApiUrl.toString().trim() != '' ? yAssetsApiUrl.toString() : undefined),
  };
}
