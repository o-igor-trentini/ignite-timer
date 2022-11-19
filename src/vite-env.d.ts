/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_MIN_CYCLE_VALUE: number
  readonly VITE_MAX_CYCLE_VALUE: number
}

export interface ImportMeta {
  readonly env: ImportMetaEnv
}
