# Clínica Wirtz — Landing Page

Protótipo da landing page da **Clínica Wirtz** (Centro Médico Wirtz · Ilha do Governador, RJ),
migrado de HTML + React-via-Babel para um projeto **Vite + React** real, com roteamento
(`react-router-dom` / HashRouter) e consumo opcional de uma API.

> Mesmo design do protótipo original (paleta *heritage*: bordô `#4a0824`, rosa `#a82156`,
> dourado `#b08968`), fontes Cormorant Garamond + Inter.

---

## 🧰 Stack

- [Vite](https://vitejs.dev/) + [React 18](https://react.dev/)
- [react-router-dom](https://reactrouter.com/) (HashRouter — funciona no GitHub Pages sem 404)
- CSS puro (`src/styles.css`) — design system com variáveis CSS

---

## ▶️ Rodar localmente

Pré-requisito: **Node.js 18+** (recomendado 20).

```bash
# 1. Copie o arquivo de exemplo de variáveis e preencha (opcional)
#    PowerShell:
Copy-Item .env.example .env
#    bash:
cp .env.example .env

# 2. Instale as dependências
npm install

# 3. Rode em modo desenvolvimento
npm run dev
```

Abra o endereço que o Vite mostrar (ex.: `http://localhost:5173`).

> Se você **não** preencher o `.env`, o site funciona normalmente usando dados
> mockados (25+ anos, 29 profissionais, 21 especialidades). Nada quebra.

### Build de produção

```bash
npm run build      # gera a pasta dist/
npm run preview    # serve a dist/ localmente para conferir
```

---

## 🔑 Onde colocar a URL e a chave da API

A aplicação lê duas variáveis de ambiente (prefixo `VITE_` é exigido pelo Vite):

| Variável         | O que é                                   | Exemplo                       |
| ---------------- | ----------------------------------------- | ----------------------------- |
| `VITE_API_BASE`  | URL base da API (sem barra no final)      | `https://api.suaclinica.com`  |
| `VITE_API_KEY`   | Chave/token de acesso                      | `sk_live_xxxxxxxx`            |

**Para rodar localmente:** preencha o arquivo **`.env`** (na raiz do projeto):

```dotenv
VITE_API_BASE=https://api.suaclinica.com
VITE_API_KEY=sua-chave-aqui
```

> ⚠️ O `.env` está no `.gitignore` e **nunca** deve ser commitado.
> Para produção, use os **Secrets** do GitHub (veja abaixo) — não coloque a chave no código.

### Como a API é consumida

- `src/lib/api.js` → função `fetchClinicData()`. Usa o header
  `Authorization: Bearer <VITE_API_KEY>`. **Se a sua API usar outro formato de
  autenticação, há um comentário no arquivo mostrando exatamente qual linha trocar**
  (ex.: header `x-api-key`, token sem `Bearer`, esquema `Apikey`, etc.).
- `src/hooks/useClinicData.js` → hook `useClinicData()` que popula os números do
  **hero** e do **TrustStrip**, com carregamento discreto e *fallback* para os
  dados mockados se a API falhar ou o `.env` estiver vazio.

---

## 🚀 Deploy no GitHub Pages (branch main → /docs)

A publicação é feita a partir da branch **main**, servindo a pasta **`docs/`**
(que contém o site já buildado pelo Vite — `build.outDir: 'docs'`).

### Configurar o Pages (uma única vez)

1. Suba o projeto para o repositório **`Wirtz-LandingPage`** no GitHub
   (o `base` em `vite.config.js` já está como `/Wirtz-LandingPage/`).
   - Se o repositório tiver **outro nome**, ajuste `base: '/OUTRO-NOME/'`.
2. No GitHub: **Settings → Pages → Build and deployment**:
   - **Source:** `Deploy from a branch`
   - **Branch:** `main` · pasta **`/docs`** → **Save**
3. Aguarde o deploy. O site fica em:
   `https://Viktor-MB.github.io/Wirtz-LandingPage/`

### Publicar uma atualização

Sempre que mudar o site, rebuilde e commite a pasta `docs/`:

```bash
npm run build
git add -A
git commit -m "Atualiza site"
git push
```

> O GitHub Pages republica sozinho a cada push que altere o `docs/`.

### Chave da API em produção

Como o build é feito **localmente**, os valores do seu **`.env`** são embutidos no
site no momento do `npm run build`. Para publicar com a API real:

1. Preencha `VITE_API_BASE` e `VITE_API_KEY` no `.env`.
2. Rode `npm run build` e commite o `docs/` atualizado.

> ⚠️ Variáveis `VITE_*` ficam **visíveis no JavaScript publicado** (é assim que o
> Vite funciona no front-end). Para um protótipo tudo bem; para produção real,
> prefira uma chave restrita/somente-leitura ou um proxy de backend.
> Se o `.env` estiver vazio, o site publicado usa os dados mockados.

---

## 📁 Estrutura

```
.
├─ index.html               # entrada do Vite (dev)
├─ vite.config.js           # base: '/Wirtz-LandingPage/', build.outDir: 'docs'
├─ .env.example             # modelo de variáveis (versionado)
├─ docs/                    # site buildado, publicado pelo GitHub Pages
├─ public/                  # assets estáticos + .nojekyll
│  └─ assets/               # logo + fotos (.webp)
└─ src/
   ├─ main.jsx              # entrada React (HashRouter)
   ├─ App.jsx               # rotas, scroll reveal, título por rota
   ├─ styles.css            # design system (paleta heritage)
   ├─ constants.js          # ATEND_URL, PAGES, helper de assets
   ├─ lib/api.js            # fetchClinicData() + dados mockados
   ├─ hooks/useClinicData.js
   └─ components/           # Icons, Sections*, Conversion, Pages, image-slot
```

---

## 🔗 Rotas

`/` · `/sobre` · `/atendimento` · `/especialidades` · `/equipe` · `/contato`

O CTA **"Agende seu exame / sua consulta"** aponta para
[atendimentowirtz.com](https://atendimentowirtz.com) (abre em nova aba).
