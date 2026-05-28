/* App.jsx — orquestrador: rotas (HashRouter), scroll reveal, título por rota */

import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Nav } from './components/SectionsTop.jsx';
import { Footer, FloatingWA } from './components/SectionsBottom.jsx';
import {
  HomePage, SobrePage, AtendimentoPage,
  EspecialidadesPage, EquipePage, ContatoPage,
} from './components/Pages.jsx';

// Revela elementos .reveal / .reveal-stagger conforme entram na viewport.
// Re-executa a cada troca de rota (dep) porque novos elementos são montados.
function useReveal(dep) {
  useEffect(() => {
    const reveal = (el) => {
      if (el.classList.contains('in')) return;
      if (el.classList.contains('reveal-stagger')) {
        const kids = el.children;
        for (let i = 0; i < kids.length; i++) {
          kids[i].style.transitionDelay = (i * 80) + 'ms';
        }
      }
      el.classList.add('in');
    };
    const check = () => {
      const vh = window.innerHeight;
      document.querySelectorAll('.reveal:not(.in), .reveal-stagger:not(.in)').forEach((el) => {
        const r = el.getBoundingClientRect();
        // reveal as soon as the top edge crosses 90% of the viewport
        if (r.top < vh * 0.9 && r.bottom > 0) reveal(el);
      });
    };
    const t1 = setTimeout(check, 60);
    const t2 = setTimeout(check, 400);
    // safety: after 1500ms, reveal everything no matter what
    const t3 = setTimeout(() => {
      document.querySelectorAll('.reveal:not(.in), .reveal-stagger:not(.in)').forEach(reveal);
    }, 1500);
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => { raf = 0; check(); });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      clearTimeout(t1); clearTimeout(t2); clearTimeout(t3);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [dep]);
}

const TITLES = {
  '/': 'Clínica Wirtz · Acolhimento em saúde desde 1999',
  '/sobre': 'Sobre · Clínica Wirtz',
  '/atendimento': 'Atendimento · Clínica Wirtz',
  '/especialidades': 'Especialidades · Clínica Wirtz',
  '/equipe': 'Equipe · Clínica Wirtz',
  '/contato': 'Contato · Clínica Wirtz',
};

export default function App() {
  const location = useLocation();
  useReveal(location.pathname);

  // Sincroniza o título do documento e sobe a página ao trocar de rota.
  useEffect(() => {
    document.title = TITLES[location.pathname] || TITLES['/'];
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [location.pathname]);

  return (
    <>
      <Nav />
      <main key={location.pathname}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/sobre" element={<SobrePage />} />
          <Route path="/atendimento" element={<AtendimentoPage />} />
          <Route path="/especialidades" element={<EspecialidadesPage />} />
          <Route path="/equipe" element={<EquipePage />} />
          <Route path="/contato" element={<ContatoPage />} />
          {/* fallback: qualquer rota desconhecida cai na home */}
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>
      <Footer />
      <FloatingWA />
    </>
  );
}
