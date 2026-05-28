/* api.js — consumo da API do parceiro (Wirtz / ZapOrto).
 *
 * Credenciais vêm do .env (Vite expõe variáveis prefixadas com VITE_):
 *   VITE_API_BASE  → URL base da API (ex.: https://api.exemplo.com, SEM barra no final)
 *   VITE_API_KEY   → chave de acesso (header x-api-key)
 *
 * ⚠️ Em um site estático a chave fica visível no bundle do navegador. Use uma
 * chave de leitura/restrita. NÃO consumimos endpoints /admin/financial/* aqui
 * (dados sensíveis) — apenas dados públicos: serviços, médicos, setores.
 */

const RAW_BASE = (import.meta.env.VITE_API_BASE || '').replace(/\/$/, '');
const API_KEY = import.meta.env.VITE_API_KEY || '';

// Em DEV chamamos o proxy do Vite (/api) para contornar o CORS da API; em
// produção (site estático) usaríamos a URL direta — que a API hoje bloqueia
// por CORS, então o site publicado cai no mock (ver README / proxy serverless).
const API_BASE = import.meta.env.DEV ? '/api' : RAW_BASE;

// Só ativa o consumo real se houver URL + chave configuradas no .env.
export const hasApiConfig = Boolean(RAW_BASE && API_KEY);

// Dados mockados — usados quando o .env está vazio ou a API falha, para o
// site NUNCA quebrar.
export const MOCK_CLINIC_DATA = {
  years: "25+",
  professionals: "29",
  specialties: "21",
  families: "10k+",
};

// ── helper de requisição ──────────────────────────────────────────────────
async function apiGet(path) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: {
      // 🔑 Autenticação por header x-api-key (conforme a doc do parceiro).
      "x-api-key": API_KEY,
      "Accept": "application/json",
    },
  });
  if (!res.ok) throw new Error(`API ${res.status} em ${path}`);
  return res.json();
}

// Normaliza a resposta para um array (array puro ou envelope paginado).
function asArray(json) {
  if (Array.isArray(json)) return json;
  if (!json || typeof json !== 'object') return [];
  return json.items || json.data || json.results || json.records || [];
}

// ── Serviços ────────────────────────────────────────────────────────────────
// prices[] tem um preço por forma de pagamento; mostramos o MENOR preço
// particular (category_type PRIVATE) como "a partir de".
function servicePrice(prices) {
  if (!Array.isArray(prices) || !prices.length) return null;
  const priv = prices.filter(p => p?.category_type === 'PRIVATE');
  const pool = (priv.length ? priv : prices)
    .map(p => Number(p?.price))
    .filter(n => Number.isFinite(n) && n > 0);
  return pool.length ? Math.min(...pool) : null;
}

export function mapService(s) {
  return {
    id: s.id,
    name: s.name || 'Serviço',
    sectorId: s.sector_id ?? null,
    price: servicePrice(s.prices),
  };
}

export async function fetchServices() {
  // /services/ não pagina (retorna todos). Filtramos os visíveis ao paciente
  // e que não são "material", e ordenamos por nome.
  const raw = asArray(await apiGet('/services/'));
  return raw
    .filter(s => s.is_visible_to_patient !== false && s.is_material !== true)
    .map(mapService)
    .sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'));
}

// ── Médicos (providers) ─────────────────────────────────────────────────────
export function mapProvider(p) {
  const specs = Array.isArray(p.specialties)
    ? p.specialties.filter(s => s && s.is_active !== false).map(s => s.name).filter(Boolean)
    : [];
  return {
    id: p.id ?? p.profile_id,
    name: p.name || 'Profissional',
    specialties: specs,
    specialty: specs.join(' · '),
    // a API de providers não traz foto; cai no avatar de iniciais.
    photo: p.photo_url || p.photo || '',
  };
}

export async function fetchProviders() {
  const raw = asArray(await apiGet('/providers/?limit=200'));
  return raw.filter(p => p.is_active !== false).map(mapProvider);
}

// Especialidades distintas a partir dos médicos (case-insensitive).
export function distinctSpecialties(providers) {
  const seen = new Map();
  for (const p of providers || []) {
    for (const name of p.specialties || []) {
      const key = String(name).trim().toLowerCase();
      if (key && !seen.has(key)) seen.set(key, String(name).trim());
    }
  }
  return [...seen.values()].sort((a, b) => a.localeCompare(b, 'pt-BR'));
}

// ── Setores ─────────────────────────────────────────────────────────────────
export async function fetchSectors() {
  return asArray(await apiGet('/sectors/')).map(s => ({
    id: s.id,
    name: s.name || 'Setor',
  }));
}

// ── Números do hero / TrustStrip (contagens reais) ──────────────────────────
export async function fetchClinicData() {
  if (!hasApiConfig) return MOCK_CLINIC_DATA;
  try {
    const providers = await fetchProviders();
    const specialties = distinctSpecialties(providers);
    return {
      years: MOCK_CLINIC_DATA.years,            // não há endpoint para "anos de história"
      professionals: providers.length ? String(providers.length) : MOCK_CLINIC_DATA.professionals,
      specialties: specialties.length ? String(specialties.length) : MOCK_CLINIC_DATA.specialties,
      families: MOCK_CLINIC_DATA.families,        // idem
    };
  } catch (err) {
    console.warn('[clinic-data] fallback para mock:', err.message);
    return MOCK_CLINIC_DATA;
  }
}
