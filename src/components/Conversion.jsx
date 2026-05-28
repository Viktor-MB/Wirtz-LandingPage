/* Conversion.jsx — high-conversion sections for the home landing */

import { Icon } from './Icons.jsx';
import { ATEND_URL } from '../constants.js';

const AUDIENCES = [
  {
    icon: <Icon.Sparkle />,
    eyebrow: "Para você que está",
    title: "Tentando engravidar",
    body: "Cuidado preconcepcional, planejamento familiar e investigação completa para uma gestação saudável.",
    cta: "Agende sua consulta",
  },
  {
    icon: <Icon.Heart />,
    eyebrow: "Para você que está",
    title: "Grávida",
    body: "Pré-natal humanizado, ultrassonografias detalhadas e acompanhamento próximo em cada semana.",
    cta: "Agende seu pré-natal",
  },
  {
    icon: <Icon.Baby />,
    eyebrow: "Para você que",
    title: "Já é mãe",
    body: "Pediatria atenta ao desenvolvimento do seu pequeno e acompanhamento ginecológico para você.",
    cta: "Agende uma consulta",
  },
  {
    icon: <Icon.Shield />,
    eyebrow: "Para você que quer",
    title: "Cuidar de si",
    body: "Check-up completo, prevenção e acompanhamento multidisciplinar — em qualquer fase da vida.",
    cta: "Agende seu check-up",
  },
];

export function Audiences() {
  return (
    <section className="audiences section-pad">
      <div className="container">
        <div className="audiences-head">
          <span className="eyebrow">Por onde começar</span>
          <h2>A Clínica Wirtz cuida<br/>de você em cada fase.</h2>
          <p>Escolha o momento em que você está hoje. Em poucos cliques, você fala com nossa equipe e marca a sua consulta.</p>
        </div>
        <div className="audiences-grid">
          {AUDIENCES.map((a, i) => (
            <a key={i} className="aud-card" href={ATEND_URL} target="_blank" rel="noopener">
              <div className="aud-ico">{a.icon}</div>
              <div className="aud-eyebrow">{a.eyebrow}</div>
              <h3>{a.title}</h3>
              <p>{a.body}</p>
              <span className="aud-link">
                {a.cta}
                <Icon.ArrowRight style={{width: 14, height: 14}} />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TrustStrip({ data, loading }) {
  return (
    <section className="trust-strip">
      <div className="container trust-grid" style={{ opacity: loading ? 0.6 : 1, transition: 'opacity .4s ease' }}>
        <div className="trust-stat">
          <div className="n">{data.years}</div>
          <div className="l">anos de história</div>
        </div>
        <div className="trust-stat">
          <div className="n">{data.professionals}</div>
          <div className="l">profissionais</div>
        </div>
        <div className="trust-stat">
          <div className="n">{data.specialties}</div>
          <div className="l">especialidades</div>
        </div>
        <div className="trust-stat">
          <div className="n">{data.families}</div>
          <div className="l">famílias atendidas</div>
        </div>
      </div>
    </section>
  );
}

export function HowItWorks() {
  const steps = [
    {
      n: "01",
      mark: "1",
      title: "Escolha o exame ou consulta",
      body: "Acesse o portal de atendimento e selecione a especialidade ou exame que precisa.",
    },
    {
      n: "02",
      mark: "2",
      title: "Selecione data e horário",
      body: "Veja a agenda em tempo real, com possibilidade de encaixes em horários alternativos.",
    },
    {
      n: "03",
      mark: "3",
      title: "Confirme e venha nos visitar",
      body: "Você recebe a confirmação e lembrete. Chegue 10 min antes — vamos te receber com carinho.",
    },
  ];
  return (
    <section className="howitworks section-pad">
      <div className="container">
        <div className="how-head">
          <span className="eyebrow">Como agendar</span>
          <h2>Em três passos simples,<br/>você fala com a gente.</h2>
          <p>Todo o agendamento é feito pelo nosso portal de atendimento online — rápido, sem fila e disponível 24h.</p>
        </div>
        <div className="how-steps">
          <article className="how-step">
            <div className="step-mark">{steps[0].mark}</div>
            <div className="step-n">PASSO {steps[0].n}</div>
            <h3>{steps[0].title}</h3>
            <p>{steps[0].body}</p>
          </article>
          <div className="how-arrow"><Icon.ArrowRight /></div>
          <article className="how-step">
            <div className="step-mark">{steps[1].mark}</div>
            <div className="step-n">PASSO {steps[1].n}</div>
            <h3>{steps[1].title}</h3>
            <p>{steps[1].body}</p>
          </article>
          <div className="how-arrow"><Icon.ArrowRight /></div>
          <article className="how-step">
            <div className="step-mark">{steps[2].mark}</div>
            <div className="step-n">PASSO {steps[2].n}</div>
            <h3>{steps[2].title}</h3>
            <p>{steps[2].body}</p>
          </article>
        </div>
        <div className="how-final">
          <a className="btn btn-primary" href={ATEND_URL} target="_blank" rel="noopener">
            <Icon.Heart style={{width: 18, height: 18}} />
            Agendar agora pelo portal
            <Icon.ArrowRight className="arrow" style={{width: 16, height: 16}} />
          </a>
        </div>
      </div>
    </section>
  );
}

export function SectionCTA({ note, button = "Agende seu exame" }) {
  return (
    <section className="section-cta-wrap">
      <div className="container">
        <div className="section-cta">
          {note && <span className="section-cta-note">{note}</span>}
          <a className="btn btn-primary" href={ATEND_URL} target="_blank" rel="noopener">
            <Icon.Heart style={{width: 14, height: 14}} />
            {button}
            <Icon.ArrowRight className="arrow" style={{width: 14, height: 14}} />
          </a>
        </div>
      </div>
    </section>
  );
}
