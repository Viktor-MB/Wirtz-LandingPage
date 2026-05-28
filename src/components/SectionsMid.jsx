/* SectionsMid.jsx — Specialties, Exams, Testimonials */

import { useState, useEffect } from 'react';
import { Icon } from './Icons.jsx';
import { ATEND_URL, formatBRL } from '../constants.js';
import { distinctSpecialties } from '../lib/api.js';
import { useProviders } from '../hooks/useProviders.js';
import { useServices } from '../hooks/useServices.js';

// Fallback curado (usado se a API estiver indisponível ou vier vazia).
const FALLBACK_SPECS = [
  "Ginecologia", "Obstetrícia", "Ultrassonografia", "Pediatria",
  "Cardiologia", "Psicologia", "Fonoaudiologia", "Neurologia",
  "Otorrinolaringologia", "Mastologia", "Endocrinologia", "Nutrição",
  "Nutrição Pediátrica", "Odontologia", "Odontopediatria", "Homeopatia",
  "Angiologia", "Urologia", "Psiquiatria", "Ortopedia",
  "Gastroenterologia", "Dermatologia",
];

export function Specialties() {
  // Especialidades reais = especialidades distintas dos médicos da API.
  const { providers } = useProviders();
  const real = distinctSpecialties(providers || []);
  const specs = real.length ? real : FALLBACK_SPECS;
  // Split into two columns
  const half = Math.ceil(specs.length / 2);
  const cols = [specs.slice(0, half), specs.slice(half)];
  return (
    <section className="specs section-pad" id="especialidades">
      <div className="container">
        <div className="specs-head reveal">
          <div>
            <span className="eyebrow">Especialidades</span>
            <h2>Atendimento multidisciplinar<br/>sob o mesmo teto.</h2>
          </div>
          <p>
            Mais de 29 profissionais, formados nas maiores universidades do país. Da rotina preventiva ao acompanhamento de toda a família — encontre, em um só lugar, a especialidade que você precisa.
          </p>
        </div>
        <div className="specs-index reveal">
          {cols.map((col, ci) => (
            <ul key={ci} className="specs-col">
              {col.map((s, i) => {
                const num = ci === 0 ? i + 1 : i + 1 + half;
                return (
                  <li key={s}>
                    <a className="spec-row" href={ATEND_URL} target="_blank" rel="noopener">
                      <span className="spec-num">{String(num).padStart(2, '0')}</span>
                      <span className="spec-name">{s}</span>
                      <span className="spec-rule"></span>
                      <Icon.ArrowRight className="spec-arrow" style={{width: 16, height: 16}} />
                    </a>
                  </li>
                );
              })}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}

// Fallback curado (só nomes; sem preço).
const FALLBACK_EXAMS = [
  "Ultrassonografia Transvaginal",
  "Ultrassonografia Obstétrica",
  "Morfológica",
  "Doppler colorido",
  "Ecocardiograma fetal",
  "Ultrassom da tireoide",
  "Ultrassom das mamas",
  "Abdômen total",
  "MAPA / Eletro / Holter",
  "Audiometria",
  "Histeroscopia",
  "Colposcopia",
].map((name) => ({ id: name, name, price: null }));

export function Exams() {
  // Serviços reais da API (nome + preço "a partir de"); fallback ao curado.
  const { services } = useServices();
  const exams = (services && services.length) ? services : FALLBACK_EXAMS;
  const half = Math.ceil(exams.length / 2);
  const cols = [exams.slice(0, half), exams.slice(half)];
  return (
    <section className="exams section-pad">
      <div className="container">
        <div className="exams-head reveal">
          <span className="eyebrow">Serviços e exames</span>
          <h2>Resultados em tempo hábil,<br/>com a precisão que você merece.</h2>
        </div>
        <div className="exams-index reveal">
          {cols.map((col, ci) => (
            <ul key={ci} className="exams-col">
              {col.map((e, i) => {
                const num = ci === 0 ? i + 1 : i + 1 + half;
                const priceLabel = formatBRL(e.price);
                return (
                  <li key={e.id}>
                    <a className="exam-row" href={ATEND_URL} target="_blank" rel="noopener">
                      <span className="exam-num">{String(num).padStart(2, '0')}</span>
                      <span className="exam-name">
                        {e.name}
                        {priceLabel && (
                          <em style={{
                            display: 'block', fontStyle: 'normal', fontSize: 13,
                            color: 'var(--c-pink)', fontWeight: 600, marginTop: 2,
                          }}>
                            a partir de {priceLabel}
                          </em>
                        )}
                      </span>
                      <Icon.ArrowRight className="exam-arrow" style={{width: 16, height: 16}} />
                    </a>
                  </li>
                );
              })}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}

const TESTIMONIALS = [
  {
    quote: "Vocês estiveram presentes no meu nascimento, e agora estou aqui porque eu também estou grávida! Não consigo imaginar viver esse momento em outro lugar.",
    name: "Beatriz M.",
    meta: "Gestante · Ilha do Governador",
  },
  {
    quote: "A Dra. me recebeu com tanto carinho na primeira consulta que parecia que nos conhecíamos há anos. Cada exame é explicado com calma — sem pressa, sem ansiedade.",
    name: "Marina S.",
    meta: "Acompanhamento pré-natal",
  },
  {
    quote: "Trouxe minha filha na pediatria desde o primeiro mês. Hoje ela tem 4 anos e adora vir à clínica. O ambiente é seguro, acolhedor e a equipe é simplesmente especial.",
    name: "Larissa P.",
    meta: "Mãe · Paciente desde 2020",
  },
  {
    quote: "Depois de anos tentando engravidar, finalmente recebi a notícia ali. O Dr. Ruy chorou junto. Esse é o nível de vínculo que a Clínica Wirtz constrói.",
    name: "Camila R.",
    meta: "Tentante · Hoje mãe de gêmeos",
  },
];

export function Testimonials() {
  const [idx, setIdx] = useState(0);
  const total = TESTIMONIALS.length;
  const next = () => setIdx((i) => (i + 1) % total);
  const prev = () => setIdx((i) => (i - 1 + total) % total);

  useEffect(() => {
    const id = setInterval(next, 7000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="testi section-pad">
      <div className="container">
        <div className="testi-head reveal">
          <span className="eyebrow on-dark">Depoimentos</span>
          <h2>Famílias que nos deixaram fazer parte<br/>do maior milagre da vida.</h2>
          <p>O nascimento de um filho. Esse é o privilégio que nossa equipe recebe, todos os dias, com um sorriso no rosto.</p>
        </div>
        <div className="testi-carousel reveal">
          <div className="testi-track">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className={"testi-slide" + (i === idx ? " is-active" : "")}>
                <div className="testi-quote-mark">“</div>
                <p className="testi-quote">{t.quote}</p>
                <div className="testi-author">
                  <div className="testi-avatar"></div>
                  <div className="testi-author-text">
                    <div className="testi-author-name">{t.name}</div>
                    <div className="testi-author-meta">{t.meta}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="testi-controls">
            <button className="testi-btn" onClick={prev} aria-label="Anterior">
              <Icon.ArrowLeft style={{width: 18, height: 18}} />
            </button>
            <div className="testi-dots">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  className={"testi-dot" + (i === idx ? " is-active" : "")}
                  onClick={() => setIdx(i)}
                  aria-label={`Ir para depoimento ${i + 1}`}
                />
              ))}
            </div>
            <button className="testi-btn" onClick={next} aria-label="Próximo">
              <Icon.ArrowRight style={{width: 18, height: 18}} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
