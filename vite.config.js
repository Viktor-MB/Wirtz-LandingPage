import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base: precisa ser '/NOME-DO-REPOSITORIO/' para o GitHub Pages servir os
// arquivos sob o subcaminho correto. Repositório: Wirtz-LandingPage.
// Se um dia publicar em domínio próprio (raiz), troque para base: '/'.
export default defineConfig({
  base: '/Wirtz-LandingPage/',
  plugins: [react()],
  build: {
    // Publicação via GitHub Pages "Deploy from a branch" (main → /docs):
    // o site buildado é gerado em docs/ e commitado no repositório.
    outDir: 'docs',
    emptyOutDir: true,
  },
});
