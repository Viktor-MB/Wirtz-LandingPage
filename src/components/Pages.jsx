/* Pages.jsx — page-level components that compose section primitives */

import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from './Icons.jsx';
import { ATEND_URL } from '../constants.js';
import { useClinicData } from '../hooks/useClinicData.js';
import { Hero, Welcome, Pillars } from './SectionsTop.jsx';
import { Specialties, Exams, Testimonials } from './SectionsMid.jsx';
import { Team, DrRuy, WhyUs, CTABanner } from './SectionsBottom.jsx';
import { Audiences, TrustStrip, HowItWorks, SectionCTA } from './Conversion.jsx';

function PageHero({ crumb, eyebrow, title, titleEm, sub }) {
  return (
    <section className="page-hero">
      <div className="container">
        {crumb !== false && (
          <div className="crumb">
            <Link to="/">Início</Link>
            <span className="sep">/</span>
            <span>{crumb || eyebrow}</span>
          </div>
        )}
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h1>
          {title}
          {titleEm && <Fragment> <em>{titleEm}</em></Fragment>}
        </h1>
        {sub && <p>{sub}</p>}
      </div>
    </section>
  );
}

/* ============ HOME PAGE — conversion-focused landing ============ */
export function HomePage() {
  // Números do hero e do TrustStrip vêm da API (com fallback para mock).
  const { data, loading } = useClinicData();
  return (
    <Fragment>
      <Hero data={data} loading={loading} />
      <Audiences />
      <TrustStrip data={data} loading={loading} />
      <HowItWorks />
      <Pillars />
      <SectionCTA note="Conheça nossa equipe ou agende já o seu exame." />
      <Testimonials />
      <SectionCTA note="Pronta para começar essa jornada com a gente?" button="Agendar pelo portal" />
      <CTABanner />
    </Fragment>
  );
}

/* ============ SOBRE ============ */
export function SobrePage() {
  return (
    <Fragment>
      <PageHero
        crumb="Sobre"
        eyebrow="Centro Médico Wirtz · desde 1999"
        title="Um oásis de cuidado no coração da"
        titleEm="Ilha do Governador."
        sub="Há mais de 25 anos, atendemos gerações de famílias com a mesma dedicação do primeiro dia. Esta é a nossa história."
      />
      <Welcome />
      <DrRuy />
      <WhyUs />
      <CTABanner />
    </Fragment>
  );
}

/* ============ ATENDIMENTO ============ */
export function AtendimentoPage() {
  return (
    <Fragment>
      <PageHero
        crumb="Atendimento"
        eyebrow="Um ciclo pensado em você"
        title="Três pilares que sustentam o"
        titleEm="ciclo materno-fetal completo."
        sub="Da preparação para a maternidade ao primeiro sorriso do seu bebê — caminhamos com você em cada momento."
      />
      <Pillars />
      <section className="welcome section-pad" style={{paddingTop: 0}}>
        <div className="container">
          <p className="welcome-quote">
            Para você tentante, gestante e para quem já teve seu pequeno e precisa realizar o seu acompanhamento.
          </p>
          <div className="welcome-body">
            <p>
              Em nossa equipe, contamos com profissionais com mais de 2 décadas de experiência em Ginecologia, Obstetrícia, Pediatria e Cardiologia, prontos para te atender na Ilha do Governador.
            </p>
            <p>
              Além dos exames, nosso foco também está no acompanhamento médico e no check-up de cada paciente — desde ultrassonografias até exames endocrinológicos e cardiovasculares. Nosso objetivo é criar um ambiente seguro e agradável, onde você se sinta valorizada e bem cuidada durante todas as fases da sua gestação e no crescimento do seu filho.
            </p>
          </div>
        </div>
      </section>
      <Testimonials />
      <CTABanner />
    </Fragment>
  );
}

/* ============ ESPECIALIDADES ============ */
export function EspecialidadesPage() {
  return (
    <Fragment>
      <PageHero
        crumb="Especialidades"
        eyebrow="Atendimento multidisciplinar"
        title="21 especialidades, mais de"
        titleEm="29 profissionais — em um só lugar."
        sub="Da rotina preventiva ao acompanhamento de toda a família. Encontre, sob o mesmo teto, a especialidade que você precisa."
      />
      <Specialties />
      <Exams />
      <CTABanner />
    </Fragment>
  );
}

/* ============ EQUIPE ============ */
export function EquipePage() {
  return (
    <Fragment>
      <PageHero
        crumb="Equipe"
        eyebrow="Nossa equipe"
        title="Conheça por dentro da"
        titleEm="Clínica Wirtz."
        sub="Profissionais com mais de duas décadas de experiência, formados nas maiores universidades do país — prontos para te receber."
      />
      <Team />
      <DrRuy />
      <CTABanner />
    </Fragment>
  );
}

/* ============ CONTATO ============ */
export function ContatoPage() {
  return (
    <Fragment>
      <PageHero
        crumb="Contato"
        eyebrow="Fale conosco"
        title="Estamos prontos para"
        titleEm="te receber."
        sub="Agende seu exame, tire suas dúvidas ou venha nos conhecer pessoalmente. Nossa equipe está à disposição."
      />
      <section className="section-pad" style={{background: 'var(--c-cream)', paddingTop: 'clamp(48px,6vw,80px)'}}>
        <div className="container">

          <div className="contact-grid">
            <div className="contact-card">
              <div className="ico"><Icon.Phone /></div>
              <h3>Telefones</h3>
              <div className="info">
                <strong>(21) 99810-2799</strong>
                WhatsApp · atendimento direto
              </div>
              <div className="info">
                <strong>(21) 3449-2766</strong>
                Recepção
              </div>
              <div className="actions">
                <a className="btn btn-primary" href={ATEND_URL} target="_blank" rel="noopener">
                  <Icon.Heart style={{width: 14, height: 14}} />
                  Agende seu exame
                </a>
              </div>
            </div>

            <div className="contact-card">
              <div className="ico"><Icon.Pin /></div>
              <h3>Endereço</h3>
              <div className="info">
                <strong>Av. Maestro Paulo e Silva, 350</strong>
                Loja A · Ilha do Governador<br/>
                Rio de Janeiro · RJ · 21920-445<br/>
                <span style={{color: 'var(--c-pink)', fontWeight: 500}}>Ao lado do Ilha Plaza Shopping</span>
              </div>
              <div className="actions">
                <a
                  className="btn btn-ghost"
                  href="https://maps.google.com/?q=Av.+Maestro+Paulo+e+Silva+350+Ilha+do+Governador"
                  target="_blank"
                  rel="noopener"
                >
                  Abrir no Google Maps
                  <Icon.ArrowRight className="arrow" style={{width: 12, height: 12}} />
                </a>
              </div>
            </div>

            <div className="contact-card">
              <div className="ico"><Icon.Clock /></div>
              <h3>Horários</h3>
              <ul className="hours-grid">
                <li><strong>Segunda</strong><span>08h – 19h</span></li>
                <li><strong>Terça</strong><span>08h – 19h</span></li>
                <li><strong>Quarta</strong><span>08h – 19h</span></li>
                <li><strong>Quinta</strong><span>08h – 19h</span></li>
                <li><strong>Sexta</strong><span>08h – 18h</span></li>
                <li><strong>Sábado</strong><span>08h – 13h</span></li>
              </ul>
              <p className="info" style={{fontSize: 14, marginTop: 8}}>
                Possibilidade de encaixes em diferentes horários — fale conosco.
              </p>
            </div>

            <div className="contact-card">
              <div className="ico"><Icon.Instagram /></div>
              <h3>Redes sociais</h3>
              <p className="info">
                Fique por dentro das novidades, acompanhe gestações reais e veja por dentro da clínica.
              </p>
              <div className="actions">
                <a className="btn btn-ghost" href="https://www.instagram.com/centromedicowirtz/" target="_blank" rel="noopener">
                  <Icon.Instagram style={{width: 14, height: 14}} />
                  Instagram
                </a>
                <a className="btn btn-ghost" href="https://www.facebook.com/clinicawirtz/?locale=pt_BR" target="_blank" rel="noopener">
                  <Icon.Facebook style={{width: 14, height: 14}} />
                  Facebook
                </a>
              </div>
            </div>
          </div>

          <div className="map-frame">
            <div className="map-pin">
              <div className="marker"><Icon.Pin /></div>
              <div className="label">Clínica Wirtz · Ilha do Governador</div>
            </div>
          </div>

        </div>
      </section>
      <CTABanner />
    </Fragment>
  );
}
