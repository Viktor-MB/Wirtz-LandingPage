import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// base: precisa ser '/NOME-DO-REPOSITORIO/' para o GitHub Pages servir os
// arquivos sob o subcaminho correto. Repositório: Wirtz-LandingPage.
// Se um dia publicar em domínio próprio (raiz), troque para base: '/'.
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const target = (env.VITE_API_BASE || '').replace(/\/$/, '');

  return {
    base: '/Wirtz-LandingPage/',
    plugins: [react()],
    build: {
      // Publicação via GitHub Pages "Deploy from a branch" (main → /docs).
      outDir: 'docs',
      emptyOutDir: true,
    },
    // Proxy de desenvolvimento: a API do parceiro NÃO envia cabeçalhos CORS,
    // então o navegador bloqueia chamadas diretas. Em `npm run dev`, o Vite
    // encaminha /api/* para a API (server-to-server, sem CORS) — assim o
    // demo local mostra dados reais e a chave fica só na sua máquina.
    server: target ? {
      proxy: {
        '/api': {
          target,
          changeOrigin: true,
          secure: true,
          rewrite: (p) => p.replace(/^\/api/, ''),
        },
      },
    } : undefined,
  };
});
