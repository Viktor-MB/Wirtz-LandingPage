/* check-key-scope.mjs — verifica O QUE a sua chave consegue LER.
 *
 * Mostra APENAS o código HTTP de cada endpoint (não imprime nenhum dado).
 *   200 = a chave CONSEGUE ler esse endpoint
 *   401/403 = bloqueado (bom, para os sensíveis)
 *
 * Como rodar (na raiz, com .env preenchido):
 *   node --env-file=.env scripts/check-key-scope.mjs
 *
 * Regra de bolso para publicar num site estático:
 *   - SENSÍVEIS (pacientes, agenda, financeiro) devem dar 401/403.
 *   - Se algum SENSÍVEL der 200, a chave NÃO pode ir para o site público.
 */

const BASE = (process.env.VITE_API_BASE || '').replace(/\/$/, '');
const KEY = process.env.VITE_API_KEY || '';
if (!BASE || !KEY) { console.error('❌ Defina VITE_API_BASE e VITE_API_KEY no .env.'); process.exit(1); }

const headers = { 'x-api-key': KEY, 'Accept': 'application/json' };

const PUBLIC = [
  ['Serviços',  '/services/'],
  ['Médicos',   '/providers/?limit=1'],
  ['Setores',   '/sectors/'],
];
const SENSITIVE = [
  ['Pacientes (PII)',        '/patients/?limit=1'],
  ['Agendamentos',           '/appointments/?limit=1'],
  ['Financeiro · summary',   '/admin/financial/summary?start_date=2026-05-01&end_date=2026-05-31'],
  ['Financeiro · por médico','/admin/financial/by-doctor?start_date=2026-05-01&end_date=2026-05-31'],
  ['Financeiro · repasses',  '/admin/financial/payouts?month=2026-05'],
];

async function status(path) {
  try { const r = await fetch(`${BASE}${path}`, { headers }); return r.status; }
  catch (e) { return `ERRO(${e.message})`; }
}

console.log('\n── PÚBLICOS (esperado 200) ──');
for (const [label, path] of PUBLIC) console.log(`  ${String(await status(path)).padEnd(6)} ${label}`);

console.log('\n── SENSÍVEIS (esperado 401/403; se vier 200 = NÃO publicar a chave) ──');
let leak = false;
for (const [label, path] of SENSITIVE) {
  const s = await status(path);
  if (s === 200) leak = true;
  console.log(`  ${String(s).padEnd(6)} ${label}`);
}

console.log('\n──────────────────────────────────────────');
console.log(leak
  ? '🚨 RESULTADO: a chave LÊ dados sensíveis (200 acima). NÃO publique no site estático.\n   Use a Opção A (demo local) ou B (proxy serverless).'
  : '✅ RESULTADO: a chave NÃO acessa os sensíveis (tudo 401/403). Publicar é aceitável.');
