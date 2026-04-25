# QuotaLab — Laboratório de Análise Condominial

> Simulações de reajuste, cota calculada, comunicado para moradores e muito mais.

---

## 🚀 Deploy no GitHub Pages (recomendado)

### 1. Criar repositório
```bash
# No GitHub, crie um repositório público chamado "quotalab"
# Depois, no seu computador:

git clone https://github.com/SEU_USUARIO/quotalab.git
cd quotalab
```

### 2. Copiar os arquivos
Copie todos os arquivos deste projeto para dentro da pasta `quotalab/`.

### 3. Subir para o GitHub
```bash
git add .
git commit -m "feat: deploy inicial QuotaLab"
git push origin main
```

### 4. Ativar GitHub Pages
- Acesse seu repositório no GitHub
- Vá em **Settings → Pages**
- Em **Source**, selecione **GitHub Actions**
- O workflow `.github/workflows/deploy.yml` fará o deploy automaticamente

### 5. Acessar o app
Após o deploy (~ 1 minuto), acesse:
```
https://SEU_USUARIO.github.io/quotalab/
```

---

## 📱 Instalar como app (PWA)

### iPhone / iPad
1. Abra o link no **Safari**
2. Toque no botão **Compartilhar** (quadrado com seta)
3. Role até **"Adicionar à Tela de Início"**
4. Toque em **Adicionar**

### Android
1. Abra o link no **Chrome**
2. Toque no menu **(⋮)** no canto superior direito
3. Toque em **"Adicionar à tela inicial"**
4. Confirme

### PC (Windows / Mac / Linux)
1. Abra o link no **Chrome** ou **Edge**
2. Clique no ícone de **instalação** na barra de endereço (ícone de computador com seta)
3. Clique em **Instalar**
4. O app abrirá como janela independente

---

## 💻 Rodar localmente (sem internet)

### Opção A — Python (mais simples)
```bash
# Na pasta do projeto:
python3 -m http.server 8080
# Acesse: http://localhost:8080
```

### Opção B — Node.js
```bash
npx serve .
# Acesse: http://localhost:3000
```

### Opção C — VS Code
Instale a extensão **Live Server** e clique em "Go Live".

> ⚠️ Não abra o `index.html` diretamente pelo navegador (file://) — o Service Worker e o manifest precisam de um servidor HTTP.

---

## 📁 Estrutura do projeto

```
quotalab/
├── index.html              # App principal (single-file)
├── manifest.json           # Configuração PWA
├── sw.js                   # Service Worker (cache offline)
├── icons/
│   ├── icon-512x512.png    # Ícone principal
│   ├── icon-192x192.png    # Android / PWA
│   ├── icon-180x180.png    # iOS (iPhone Retina)
│   ├── icon-152x152.png    # iPad Retina
│   ├── icon-144x144.png    # Android HDPI
│   └── icon-120x120.png    # iPhone legacy
├── splashes/
│   ├── splash-iphone.png       # iPhone 14/15
│   ├── splash-iphone-max.png   # iPhone 14/15 Plus / Pro Max
│   └── splash-ipad-pro.png     # iPad Pro 12.9"
├── .github/
│   └── workflows/
│       └── deploy.yml      # Auto-deploy para GitHub Pages
└── README.md               # Este arquivo
```

---

## 🔒 Dados e privacidade

- Todos os dados são salvos **localmente no navegador** (localStorage)
- Nenhum dado é enviado para servidores externos
- A autenticação Supabase é opcional — o app funciona sem ela
- O Service Worker mantém o app funcional **offline**

---

## 🛠️ Atualizações

Para atualizar o app após mudanças:
```bash
# Substitua o index.html pelo novo arquivo
# Depois:
git add index.html
git commit -m "chore: atualizar app"
git push origin main
```
O GitHub Actions fará o redeploy automaticamente em ~1 minuto.

Para forçar a atualização nos dispositivos instalados, atualize a versão do cache em `sw.js`:
```js
const CACHE_NAME = 'quotalab-v2'; // incrementar versão
```

---

## 📞 Suporte

Desenvolvido com ❤️ para simplificar a gestão condominial.
