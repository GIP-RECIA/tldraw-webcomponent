import { useCallback } from "react";

export function useSave() {
  const onSaveProject = useCallback(() => {}, []);
  const onSaveProjectAs = useCallback(() => {}, []);
  const onOpenProject = useCallback(() => {}, []);
  const onOpenMedia = useCallback(() => {}, []);
  const onExport = useCallback(() => {}, []);

  return {
    onSaveProject,
    onSaveProjectAs,
    onOpenProject,
    onOpenMedia,
    onExport,
  };
}
