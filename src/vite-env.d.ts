/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_PRODUCTION: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}