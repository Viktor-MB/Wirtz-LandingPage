/* inspect-api.mjs — busca uma amostra real de cada endpoint público e mostra
 * a estrutura (campos) para mapearmos a UI corretamente.
 *
 * Como rodar (na raiz do projeto, com o .env já preenchido):
 *   node --env-file=.env scripts/inspect-api.mjs
 *
 * Ele NÃO grava nada — só imprime no terminal. Cole a saída para eu finalizar
 * o mapeamento. (Não consulta endpoints /admin/financial/*.)
 */

const BASE = (process.env.VITE_API_BASE || '').replace(/\/$/, '');
const KEY = process.env.VITE_API_KEY || '';

if (!BASE || !KEY) {
  console.error('❌ Defina VITE_API_BASE e VITE_API_KEY no .env antes de rodar.');
  process.exit(1);
}

const ENDPOINTS = [
  ['Serviços',       '/services/?limit=5'],
  ['Serviço (id=8)', '/services/8'],
  ['Médicos',        '/providers/?limit=5'],
  ['Setores',        '/sectors/'],
  ['Perfis (DOCTOR)', '/profiles/?role=DOCTOR&active_only=true&limit=5'],
];

const headers = { 'x-api-key': KEY, 'Accept': 'application/json' };

function describe(json) {
  const arr = Array.isArray(json) ? json
    : (json?.items || json?.data || json?.results || null);
  if (arr) {
    console.log(`  → array com ${arr.length} item(ns).`);
    if (arr[0]) {
      console.log('  → campos do 1º item:', Object.keys(arr[0]).join(', '));
      console.log('  → amostra:', JSON.stringify(arr[0], null, 2).slice(0, 1200));
    }
  } else if (json && typeof json === 'object') {
    console.log('  → objeto. Campos:', Object.keys(json).join(', '));
    console.log('  → amostra:', JSON.stringify(json, null, 2).slice(0, 1200));
  } else {
    console.log('  → resposta:', JSON.stringify(json).slice(0, 400));
  }
}

for (const [label, path] of ENDPOINTS) {
  console.log(`\n========== ${label}  (GET ${path}) ==========`);
  try {
    const res = await fetch(`${BASE}${path}`, { headers });
    console.log(`  status: ${res.status} ${res.statusText}`);
    if (!res.ok) { console.log('  (corpo)', (await res.text()).slice(0, 300)); continue; }
    describe(await res.json());
  } catch (err) {
    console.log('  ERRO de rede:', err.message);
  }
}
console.log('\n✅ Pronto. Copie e cole esta saída.');
