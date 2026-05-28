/* constants.js — valores compartilhados entre componentes */

// CTA principal — portal de atendimento (abre em nova aba).
export const ATEND_URL = "https://atendimentowirtz.com";

// Páginas / rotas (HashRouter). O destaque do item ativo no header usa `path`.
export const PAGES = [
  { id: "home", label: "Início", path: "/" },
  { id: "sobre", label: "Sobre", path: "/sobre" },
  { id: "atendimento", label: "Atendimento", path: "/atendimento" },
  { id: "especialidades", label: "Especialidades", path: "/especialidades" },
  { id: "equipe", label: "Equipe", path: "/equipe" },
  { id: "contato", label: "Contato", path: "/contato" },
];

// Resolve o caminho de um asset estático (public/assets) respeitando o `base`
// do Vite — necessário para as imagens funcionarem sob o subcaminho do
// GitHub Pages (ex.: /Wirtz-LandingPage/assets/logo.webp).
export const asset = (p) => import.meta.env.BASE_URL + p.replace(/^\//, '');
