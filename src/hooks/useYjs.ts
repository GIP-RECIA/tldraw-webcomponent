import { initProvider, newDoc } from '../utils/yjsUtils.ts';
import { useMemo } from 'react';

export function useYjs(websocketApiUrl: string, roomId: string) {
  const doc = useMemo(() => newDoc(), []);

  const provider = useMemo(() => initProvider(websocketApiUrl, roomId, doc), [websocketApiUrl, roomId, doc]);

  return {
    doc,
    provider,
    awareness: provider.awareness,
  };
}
