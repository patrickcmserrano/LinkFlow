// Define tipos personalizados para o Vite
interface ImportMetaEnv {
  readonly BASE_URL: string;
  // adicione outras variáveis de ambiente conforme necessário
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
