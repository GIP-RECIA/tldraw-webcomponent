export type CommonProps = {
  // Tldraw props
  darkMode: boolean;
  readOnly: boolean;

  // Custom props
  autoSave: boolean;
  autoSaveDelay: number;
  open: boolean;

  // State props
  isReady: boolean;

  // Setters for common state
  setIsSaving: (value: boolean) => void;
  setIsLoading: (value: boolean) => void;
  setIsError: (value: boolean) => void;
  setIsReady: (value: boolean) => void;
};
