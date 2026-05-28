/* SectionsTop.jsx — Nav, Hero, HeroCollage, Welcome, Pillars */

import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Icon } from './Icons.jsx';
import { ATEND_URL, PAGES, asset } from '../constants.js';

// Estilo discreto para os números enquanto a API carrega.
const statLoading = (loading) => ({
  opacity: loading ? 0.45 : 1,
  transition: 'opacity .4s ease',
});

export function Nav() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  // Fecha o drawer ao trocar de rota.
  useEffect(() => { setOpen(false); }, [location.pathname]);

  const linkClass = ({ isActive }) => (isActive ? 'is-active' : '');

  return (
    <>
      <nav className="nav">
        <div className="nav-inner">
          <Link to="/" className="nav-logo" aria-label="Clínica Wirtz">
            <img src={asset('assets/logo.webp')} alt="Clínica Wirtz" />
          </Link>
          <ul className="nav-links">
            {PAGES.map(p => (
              <li key={p.id}>
                <NavLink to={p.path} end={p.path === '/'} className={linkClass}>{p.label}</NavLink>
              </li>
            ))}
          </ul>
          <div className="nav-cta">
            <a className="btn btn-primary nav-btn-desktop" href={ATEND_URL} target="_blank" rel="noopener">
              Agende seu exame
              <Icon.ArrowRight className="arrow" style={{width: 14, height: 14}} />
            </a>
            <button
              className={"nav-burger" + (open ? " is-open" : "")}
              aria-label="Abrir menu"
              aria-expanded={open}
              onClick={() => setOpen(o => !o)}
              type="button"
            >
              <span></span><span></span><span></span>
            </button>
          </div>
        </div>
      </nav>

      <div className={"nav-drawer" + (open ? " is-open" : "")} aria-hidden={!open}>
        <div className="nav-drawer-inner">
          <ul>
            {PAGES.map(p => (
              <li key={p.id}>
                <NavLink to={p.path} end={p.path === '/'} className={linkClass}>{p.label}</NavLink>
              </li>
            ))}
          </ul>
          <a className="btn btn-primary nav-drawer-cta" href={ATEND_URL} target="_blank" rel="noopener">
            <Icon.Heart style={{width: 16, height: 16}} />
            Agende seu exame
          </a>
          <div className="nav-drawer-foot">
            <a href="tel:+552134492766">(21) 3449-2766</a>
            <a href="tel:+5521998102799">(21) 99810-2799 · WhatsApp</a>
          </div>
        </div>
      </div>
      <div className={"nav-drawer-scrim" + (open ? " is-open" : "")} onClick={() => setOpen(false)}></div>
    </>
  );
}

export function Hero({ data, loading }) {
  return (
    <section className="hero" id="top">
      <div className="container hero-grid">
        <div className="hero-text reveal">
          <span className="eyebrow">
            <Icon.Sparkle style={{width: 12, height: 12}} /> Centro Médico Wirtz · desde 1999
          </span>
          <h1 className="hero-h1" style={{marginTop: 20}}>
            Cuidado e acolhimento para tornar sua maternidade <em>ainda mais segura e mágica.</em>
          </h1>
          <p className="hero-sub">
            Conte com uma equipe médica especialista em Ginecologia, Obstetrícia, Pediatria e Cardiologia há mais de 25 anos, e faça seus exames com alta qualidade, no prazo certo e com um atendimento impecável.
          </p>
          <div className="hero-cta-row">
            <a className="btn btn-primary" href={ATEND_URL} target="_blank" rel="noopener">
              <Icon.Heart style={{width: 16, height: 16}} />
              Agende seu exame
            </a>
            <a className="btn btn-ghost" href="#pilares">
              Conheça a clínica
              <Icon.ArrowRight className="arrow" style={{width: 14, height: 14}} />
            </a>
          </div>
          <div className="hero-meta" style={statLoading(loading)}>
            <div>
              <div className="stat-n">{data.years}</div>
              <div className="stat-l">anos de história</div>
            </div>
            <div>
              <div className="stat-n">{data.professionals}</div>
              <div className="stat-l">profissionais</div>
            </div>
            <div>
              <div className="stat-n">{data.specialties}</div>
              <div className="stat-l">especialidades</div>
            </div>
          </div>
        </div>

        <div className="hero-art reveal">
          <div className="frame frame-main">
            <img src={asset('assets/hero-belly.webp')} alt="Gestante com sapatinhos de bebê" />
          </div>
          <div className="frame frame-small">
            <img src={asset('assets/birth.webp')} alt="Nascimento de um bebê na Clínica Wirtz" />
          </div>
          <div className="badge">
            <div>
              <strong>25</strong>
              anos cuidando<br/>de gerações
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const HERO_COLLAGE_SLOTS = [
  { id: 'hc-1', placeholder: 'Gestante · perfil' },
  { id: 'hc-2', placeholder: 'Ultrassom · momento' },
  { id: 'hc-3', placeholder: 'Mãe & bebê' },
  { id: 'hc-4', placeholder: 'Consulta acolhedora' },
  { id: 'hc-5', placeholder: 'Equipe médica' },
  { id: 'hc-6', placeholder: 'Ambiente da clínica' },
  { id: 'hc-7', placeholder: 'Mãos · cuidado' },
  { id: 'hc-8', placeholder: 'Família com bebê' },
];

export function HeroCollage({ data, loading }) {
  return (
    <section className="hero-collage">
      <div className="hero-collage-grid">
        {HERO_COLLAGE_SLOTS.map((s) => (
          <image-slot
            key={s.id}
            id={s.id}
            shape="rect"
            placeholder={s.placeholder}
          ></image-slot>
        ))}
      </div>
      <div className="hero-collage-overlay">
        <div className="hero-collage-text">
          <span className="eyebrow">
            <Icon.Sparkle style={{width: 12, height: 12}} /> Centro Médico Wirtz · desde 1999
          </span>
          <h1>
            Acolhimento e <em>cuidado</em> para a sua maternidade.
          </h1>
          <p>
            Equipe especialista em Ginecologia, Obstetrícia, Pediatria e Cardiologia há mais de 25 anos, na Ilha do Governador.
          </p>
          <div className="hero-cta-row">
            <a className="btn btn-primary" href={ATEND_URL} target="_blank" rel="noopener">
              <Icon.Heart style={{width: 16, height: 16}} />
              Agende seu exame
            </a>
          </div>
          <div className="hero-meta" style={statLoading(loading)}>
            <div>
              <div className="stat-n">{data.years}</div>
              <div className="stat-l">anos</div>
            </div>
            <div>
              <div className="stat-n">{data.professionals}</div>
              <div className="stat-l">médicos</div>
            </div>
            <div>
              <div className="stat-n">{data.specialties}</div>
              <div className="stat-l">especialidades</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Welcome() {
  const values = [
    "Atendimento com máxima qualidade e profundidade",
    "Cuidado que vai além do exame ou da conversa",
    "Atenção aos mínimos detalhes da sua jornada",
    "Tirar um peso das suas costas, sem ter pressa",
    "Tirar e explicar todas as suas dúvidas",
    "Tudo isso com excelente custo-benefício",
  ];
  return (
    <section className="welcome section-pad" id="sobre">
      <div className="container">
        <div className="welcome-collage reveal">
          <img src={asset('assets/hero-mom-baby.webp')} alt="Mãe com bebê e gestante — Clínica Wirtz" loading="lazy" />
        </div>
        <p className="welcome-quote reveal">
          Vocês estiveram presentes no meu nascimento, e agora estou aqui porque eu também estou grávida!
        </p>
        <div className="welcome-body reveal">
          <p>
            Esse é o nível de cuidado, acolhimento e segurança que buscamos oferecer em cada exame, contato e conversa. Estamos há mais de <strong>25 anos atendendo gerações de famílias</strong>, e somos apaixonados pela magia da maternidade.
          </p>
          <p>
            Ter o privilégio de escutar cada batida de um novo coração, de se emocionar junto com a família, e acolher cada casal durante a realização desse sonho… essa é uma benção que nossa equipe recebe com um sorriso no rosto, todos os dias.
          </p>
        </div>
        <ul className="value-list reveal">
          {values.map((v, i) => (
            <li key={i}>
              <span className="check"><Icon.Check style={{width: 12, height: 12}} /></span>
              <span>{v}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Pillars() {
  const pillars = [
    {
      num: "I",
      icon: <Icon.Heart />,
      name: "Ginecologia",
      lead: "Nossa abordagem começa antes mesmo da gravidez — cuidado preventivo e contínuo para que você esteja sempre saudável e preparada.",
      items: [
        "Consultas de rotina",
        "Exames preventivos",
        "Planejamento familiar",
        "Tratamento de condições ginecológicas",
      ],
    },
    {
      num: "II",
      icon: <Icon.Sparkle />,
      name: "Obstetrícia",
      lead: "Ao descobrir a gravidez, a Clínica Wirtz se torna seu parceiro mais confiável, acompanhando cada fase com o máximo de cuidado e atenção.",
      items: [
        "Consultas pré-natais regulares",
        "Monitoramento fetal",
        "Ultrassonografias detalhadas",
        "Preparação para o parto",
        "Suporte emocional e orientação",
      ],
    },
    {
      num: "III",
      icon: <Icon.Baby />,
      name: "Pediatria",
      lead: "O cuidado não termina no parto. Acompanhamos o crescimento e desenvolvimento do seu bebê para um começo de vida saudável e feliz.",
      items: [
        "Consultas de rotina para recém-nascidos",
        "Monitoramento do desenvolvimento infantil",
        "Vacinação",
        "Tratamento de doenças infantis",
        "Orientação para pais",
      ],
    },
  ];
  return (
    <section className="pillars section-pad" id="pilares">
      <div className="container">
        <div className="pillars-head reveal">
          <span className="eyebrow">Um ciclo pensado em você</span>
          <h2>Três pilares que sustentam o<br/>ciclo materno-fetal completo</h2>
          <p>
            A jornada para a maternidade é composta de momentos únicos. Aqui, oferecemos suporte integral e contínuo para você e seu bebê em cada etapa.
          </p>
        </div>
        <div className="pillars-grid reveal-stagger">
          {pillars.map((p, i) => (
            <article key={i} className="pillar-card">
              <div className="pillar-icon">{p.icon}</div>
              <div className="pillar-num">PILAR {p.num}</div>
              <h3>{p.name}</h3>
              <p className="pillar-lead">{p.lead}</p>
              <ul>
                {p.items.map((it, j) => <li key={j}>{it}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
