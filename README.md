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

## 🚀 Deploy no GitHub Pages

O deploy é automático via GitHub Actions (`.github/workflows/deploy.yml`):
a cada `push` na branch **main**, ele roda `npm ci && npm run build` e publica a
pasta `dist/`.

### 1. Configurar o Pages

1. Suba este projeto para um repositório no GitHub chamado **`Wirtz-LandingPage`**
   (o `base` em `vite.config.js` já está configurado como `/Wirtz-LandingPage/`).
   - Se o repositório tiver **outro nome**, ajuste `base: '/OUTRO-NOME/'` no
     `vite.config.js`.
2. No GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Faça um push na `main`. O workflow publica e o site fica em:
   `https://SEU-USUARIO.github.io/Wirtz-LandingPage/`

### 2. Cadastrar a chave da API em produção (Secrets)

Para que o build de produção use sua API real:

1. No repositório: **Settings → Secrets and variables → Actions**.
2. Aba **Secrets** → **New repository secret**. Crie os dois:
   - `VITE_API_BASE` → a URL base da API
   - `VITE_API_KEY` → a chave/token
3. O workflow já injeta esses Secrets no passo de build (`env:`), então o próximo
   push na `main` usará os valores reais.

> Se você não cadastrar os Secrets, o site publicado simplesmente usa os dados
> mockados — continua funcionando.

---

## 📁 Estrutura

```
.
├─ index.html               # entrada do Vite
├─ vite.config.js           # base: '/Wirtz-LandingPage/'
├─ .env.example             # modelo de variáveis (versionado)
├─ .github/workflows/       # deploy.yml (GitHub Pages)
├─ public/assets/           # logo + fotos (.webp)
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
