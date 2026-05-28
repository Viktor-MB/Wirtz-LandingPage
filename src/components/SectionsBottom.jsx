/* SectionsBottom.jsx — Team, DrRuy, WhyUs, CTABanner, Footer, FloatingWA */

import { Link } from 'react-router-dom';
import { Icon } from './Icons.jsx';
import { ATEND_URL, PAGES, asset } from '../constants.js';

// Equipe curada (com fotos) — mantida fixa, como no design original.
const TEAM = [
  { name: "Dra. Mariana Crispim", role: "Ultrassonografia · Angiologia · Medicina da Dor", id: "team-1", photo: "assets/dra-mariana.webp" },
  { name: "Kátia Alvim Mendonça", role: "Ginecologia", id: "team-2", photo: "assets/dra-katia.webp" },
  { name: "Dra. Viviane Costanza", role: "Ultrassonografia", id: "team-3", photo: "assets/dra-viviane.webp" },
  { name: "Alessandra Torres", role: "Nutrição", id: "team-4", photo: "assets/dra-alessandra.webp" },
  { name: "Dra. Elizabeth Reis", role: "Pediatria", id: "team-5", photo: "assets/dra-elizabeth.webp" },
  { name: "Dra. Patricia Feliz", role: "Dermatologia", id: "team-6", photo: "assets/dra-patricia.webp" },
];

export function Team() {
  return (
    <section className="team section-pad" id="equipe">
      <div className="container">
        <div className="team-head reveal">
          <span className="eyebrow">Nossa equipe</span>
          <h2>Conheça por dentro<br/>da Clínica Wirtz.</h2>
          <p>Profissionais com mais de duas décadas de experiência, formados nas maiores universidades do país, prontos para te receber na Ilha do Governador.</p>
        </div>
        <div className="team-grid reveal-stagger">
          {TEAM.map((m) => (
            <article key={m.id} className="team-card">
              <div className="team-photo">
                <img src={asset(m.photo)} alt={m.name} loading="lazy" />
              </div>
              <div className="team-info">
                <h4>{m.name}</h4>
                <div className="role">{m.role}</div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function DrRuy() {
  return (
    <section className="drruy section-pad">
      <div className="container drruy-grid">
        <div className="drruy-portrait reveal">
          <img src={asset('assets/dr-ruy.webp')} alt="Dr. Ruy Wirtz" loading="lazy" />
        </div>
        <div className="reveal">
          <span className="eyebrow on-dark">Fundador · desde 1999</span>
          <h2>Dr. Ruy Wirtz</h2>
          <div className="credential">Ginecologista &amp; Obstetra · UERJ</div>
          <p>
            Médico, ginecologista e obstetra há mais de 25 anos, formado pela UERJ. Conhecido por seu compromisso inabalável com o cuidado, a qualidade e o acolhimento.
          </p>
          <p>
            Sua expertise e dedicação conquistaram a confiança de gerações, fazendo dele uma referência na área médica no Rio de Janeiro — um oásis de cuidado e acolhimento no coração da Ilha do Governador.
          </p>
          <div className="credentials-row">
            <div>
              <div className="lab">Formação</div>
              <div className="val">UERJ</div>
            </div>
            <div>
              <div className="lab">Especialidade</div>
              <div className="val">Ginecologia &amp; Obstetrícia</div>
            </div>
            <div>
              <div className="lab">Experiência</div>
              <div className="val">25+ anos</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function WhyUs() {
  const reasons = [
    { icon: <Icon.Tag />, title: "Preços acessíveis", body: "Qualidade máxima, com excelente custo-benefício para a sua família." },
    { icon: <Icon.Users />, title: "Equipe diversificada", body: "Mais de 29 profissionais formados nas maiores universidades do país." },
    { icon: <Icon.Pin />, title: "Localização privilegiada", body: "No coração da Ilha do Governador, ao lado do Ilha Plaza Shopping." },
    { icon: <Icon.Heart />, title: "Atendimento humanizado", body: "Cuidado integral, multidisciplinar e sem pressa em cada consulta." },
    { icon: <Icon.Shield />, title: "Ambiente seguro", body: "Projetado para ser aconchegante, acolhedor e protegido em cada detalhe." },
    { icon: <Icon.Clock />, title: "Resultados no prazo", body: "Exames com retorno em tempo hábil — sem que a ansiedade ganhe espaço." },
    { icon: <Icon.Stethoscope />, title: "Atendimento integrado", body: "Toda a sua jornada acompanhada por especialistas em um só lugar." },
    { icon: <Icon.Sparkle />, title: "Horários flexíveis", body: "Possibilidade de encaixes em diferentes horários da semana." },
  ];
  return (
    <section className="whyus section-pad">
      <div className="container">
        <div className="whyus-head reveal">
          <span className="eyebrow">Por que escolher</span>
          <h2>Tudo o que você precisa<br/>para se sentir em boas mãos.</h2>
          <p>Viva um dos momentos mais felizes da sua vida com segurança e o apoio de médicos verdadeiramente capacitados e experientes.</p>
        </div>
        <div className="whyus-grid reveal-stagger">
          {reasons.map((r, i) => (
            <div key={i} className="why-card">
              <div className="why-icon">{r.icon}</div>
              <h4>{r.title}</h4>
              <p>{r.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CTABanner() {
  return (
    <section className="cta-banner">
      <div className="container">
        <div className="cta-banner-inner reveal">
          <span className="eyebrow on-dark" style={{justifyContent: 'center', display: 'flex'}}>Alguma dúvida?</span>
          <h2>Vamos cuidar de você<br/>com o carinho de sempre.</h2>
          <p>Agende seu exame ou tire suas dúvidas pelo nosso portal de atendimento. Nossa equipe está pronta para te receber com o acolhimento que você merece.</p>
          <a className="btn btn-light" href={ATEND_URL} target="_blank" rel="noopener">
            <Icon.Heart style={{width: 16, height: 16}} />
            Entre em contato
          </a>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  const navPages = PAGES.filter(p => p.id !== 'home');
  return (
    <footer className="footer" id="contato">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <span className="logo-mark">
              <img src={asset('assets/logo.webp')} alt="Clínica Wirtz" />
            </span>
            <p>
              Um oásis de cuidado e acolhimento no coração da Ilha do Governador, RJ. Há mais de 25 anos cuidando de gerações de famílias.
            </p>
            <div className="footer-social">
              <a href="https://www.instagram.com/centromedicowirtz/" target="_blank" rel="noopener" aria-label="Instagram"><Icon.Instagram style={{width: 18, height: 18, color: '#fff'}} /></a>
              <a href="https://www.facebook.com/clinicawirtz/?locale=pt_BR" target="_blank" rel="noopener" aria-label="Facebook"><Icon.Facebook style={{width: 18, height: 18, color: '#fff'}} /></a>
            </div>
          </div>
          <div>
            <h5>Contato</h5>
            <ul>
              <li>WhatsApp <strong style={{color: '#fff'}}>(21) 99810-2799</strong></li>
              <li>Telefone (21) 3449-2766</li>
              <li><a href={ATEND_URL} target="_blank" rel="noopener">Agende seu exame →</a></li>
            </ul>
          </div>
          <div>
            <h5>Endereço</h5>
            <ul>
              <li>Av. Maestro Paulo e Silva, 350</li>
              <li>Loja A · Ilha do Governador</li>
              <li>Rio de Janeiro · RJ · 21920-445</li>
              <li>Ao lado do Ilha Plaza Shopping</li>
            </ul>
          </div>
          <div>
            <h5>Navegação</h5>
            <ul>
              {navPages.map(p => (
                <li key={p.id}><Link to={p.path}>{p.label}</Link></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Clínica Wirtz · Todos os direitos reservados.</span>
          <span>Centro Médico Wirtz · Acolhimento em saúde desde 1999.</span>
        </div>
      </div>
    </footer>
  );
}

export function FloatingWA() {
  return (
    <a className="fab-atend" href={ATEND_URL} target="_blank" rel="noopener" aria-label="Agendar atendimento Clínica Wirtz">
      <span className="pulse"></span>
      <Icon.Heart />
      <span className="fab-label">Agende sua consulta</span>
    </a>
  );
}
