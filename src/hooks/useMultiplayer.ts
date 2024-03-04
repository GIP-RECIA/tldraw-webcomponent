import { useAssets } from '../hooks/useAssets.ts';
import { findLanguage } from '../utils/i18nUtils';
import { getToken } from '../utils/soffitUtils';
import { donwloadImageFile } from '../utils/tldrawUtils';
import { getDocData, updateDoc } from '../utils/yjsUtils';
import { toBlob, usePersistance } from './usePersistance';
import { useYjs } from './useYjs';
import { TDAsset, TDBinding, TDExport, TDShape, TDUser, TldrawApp, useFileSystem } from '@gip-recia/tldraw-v1';
import debounce from 'lodash.debounce';
import throttle from 'lodash.throttle';
import { useCallback, useEffect, useRef } from 'react';
import { WebsocketProvider } from 'y-websocket';

// Based on https://github.com/nimeshnayaju/yjs-tldraw
export function useMultiplayer(
  persistanceApiUrl: string | undefined,
  assetsApiUrl: string | undefined,
  websocketApiUrl: string,
  roomId: string,
  initUrl: string | undefined,
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
  const { onSaveProject, onOpenProject } = useFileSystem();
  const { onSaveProject: onPSaveProject, loadDocument } = usePersistance(persistanceApiUrl);
  const { doc, provider, awareness } = useYjs(websocketApiUrl, roomId);
  const { yShapes, yBindings, yAssets, undoManager } = getDocData(doc);
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
  }, [isReady, autoSave]);

  useEffect(() => {
    setProvider(provider);

    function handleDisconnect() {
      provider.disconnect();
    }
    window.addEventListener('beforeunload', handleDisconnect);

    return () => window.removeEventListener('beforeunload', handleDisconnect);
  }, []);

  const onSave = useCallback(
    async (app: TldrawApp): Promise<void> => {
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
    [persistanceApiUrl],
  );

  const blob = useRef<string>('');

  const tryAutoSave = useCallback(
    throttle(async (app: TldrawApp): Promise<void> => {
      if (!isReady || !autoSave) return;
      const newBlob = toBlob(app);
      if (blob.current == newBlob) return;
      blob.current = newBlob;
      await onSave(app);
    }, autoSaveDelay),
    [isReady, autoSave, autoSaveDelay],
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
    ...useAssets(assetsApiUrl),
  };
}
