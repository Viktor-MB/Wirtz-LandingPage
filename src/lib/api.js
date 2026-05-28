/* api.js — consumo da API da clínica, com fallback para dados mockados.
 *
 * As credenciais vêm do .env (Vite expõe variáveis prefixadas com VITE_):
 *   VITE_API_BASE  → URL base da API (ex.: https://api.suaclinica.com)
 *   VITE_API_KEY   → chave/token de acesso
 *
 * Em produção (GitHub Pages) esses valores são injetados no build pelo
 * GitHub Actions a partir dos Secrets do repositório.
 */

const API_BASE = import.meta.env.VITE_API_BASE;
const API_KEY = import.meta.env.VITE_API_KEY;

// Dados mockados — usados quando o .env está vazio ou a API falha, para o
// site NUNCA quebrar. Estes são os números reais do protótipo.
export const MOCK_CLINIC_DATA = {
  years: "25+",          // anos de história
  professionals: "29",   // profissionais
  specialties: "21",     // especialidades
  families: "10k+",      // famílias atendidas
};

/**
 * Busca os dados da clínica. Sempre resolve (nunca rejeita): em qualquer
 * erro ou ausência de configuração, retorna MOCK_CLINIC_DATA.
 */
export async function fetchClinicData() {
  // Sem .env preenchido → usa o mock direto, sem nem tentar a rede.
  if (!API_BASE || !API_KEY) {
    return MOCK_CLINIC_DATA;
  }

  try {
    const res = await fetch(`${API_BASE}/clinic-data`, {
      headers: {
        // 🔑 AUTENTICAÇÃO — assumimos Bearer token no header Authorization.
        //
        // Se a sua API usar OUTRO formato, troque APENAS esta linha. Exemplos:
        //   Header customizado:  "x-api-key": API_KEY
        //   Token sem "Bearer":  "Authorization": API_KEY
        //   Esquema "Apikey":    "Authorization": `Apikey ${API_KEY}`
        "Authorization": `Bearer ${API_KEY}`,
        "Accept": "application/json",
      },
    });

    if (!res.ok) throw new Error(`API respondeu ${res.status}`);

    const json = await res.json();

    // Mapeie os campos conforme o formato real da sua API. Se algum campo
    // não vier, caímos no valor mockado correspondente.
    return {
      years: json.years ?? MOCK_CLINIC_DATA.years,
      professionals: json.professionals ?? MOCK_CLINIC_DATA.professionals,
      specialties: json.specialties ?? MOCK_CLINIC_DATA.specialties,
      families: json.families ?? MOCK_CLINIC_DATA.families,
    };
  } catch (err) {
    console.warn('[clinic-data] falha na API, usando dados mockados:', err.message);
    return MOCK_CLINIC_DATA;
  }
}
