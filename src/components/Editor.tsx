import '../assets/scss/editor.scss';
import {
  RecursivePartial,
  StoreSnapshot,
  TLRecord,
  TLStore,
  TLStoreWithStatus,
  Tldraw,
  TldrawEditorBaseProps,
  TldrawUiProps,
} from '@tldraw/tldraw';

function Editor(
  props: TldrawEditorBaseProps &
    (
      | {
          store: TLStore | TLStoreWithStatus;
        }
      | {
          store?: undefined;
          persistenceKey?: string;
          sessionId?: string;
          defaultName?: string;
          snapshot?: StoreSnapshot<TLRecord>;
        }
    ) &
    TldrawUiProps &
    Partial<{
      maxImageDimension: number;
      maxAssetSize: number;
      acceptedImageMimeTypes: string[];
      acceptedVideoMimeTypes: string[];
    }> & {
      assetUrls?: RecursivePartial<{
        fonts: {
          monospace: string;
          serif: string;
          sansSerif: string;
          draw: string;
        };
      }>;
    },
) {
  return <Tldraw {...props} />;
}

export default Editor;
