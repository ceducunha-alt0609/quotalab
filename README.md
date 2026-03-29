# QuotaLab

**Laboratório de análise financeira condominial**

Ferramenta completa para síndicos calcularem, analisarem e apresentarem cotas condominiais. 100% client-side — sem servidor, sem cadastro, funciona offline.

---

## Funcionalidades

| Categoria | Funcionalidades |
|-----------|----------------|
| **Cálculo** | Cota com breakdown completo · Rateio igualitário ou por fração ideal · Rateios extras parcelados |
| **Análise** | Fundo de Reserva com juros compostos · Comparativo sem/com rendimento · Calculadora de inadimplência por unidade |
| **Índices** | IPCA · IGP-M · INPC · IPC-Fipe · Salário mínimo · Busca automática via API do Banco Central |
| **Compartilhamento** | Link com estado completo em base64 · WhatsApp · E-mail |
| **GitHub Sync** | Sincronização via Gist privado · Enviar e receber dados entre dispositivos |
| **IA** | Assistente com contexto do cálculo · Sugestão de conteúdo para impressão (requer chave Claude API) |
| **Impressão** | Resumo configurável para assembleia · Seleção de seções · Campo de observações |
| **Exportação** | PDF circular · Carta ao morador · Export/Import JSON |
| **PWA** | Instalável no celular e desktop · Funciona offline |

---

## Como usar

Abra `index.html` diretamente no navegador — não precisa de servidor.

### Publicar no GitHub Pages

1. Fork ou clone este repositório
2. Vá em **Settings → Pages**
3. Source: **Deploy from branch → main → / (root)**
4. Acesse `https://seu-usuario.github.io/quotalab`

---

## Estrutura do repositório

```
quotalab/
├── index.html                      # App completo (single-file)
├── manifest.json                   # PWA manifest
├── README.md
├── LICENSE
├── .gitignore
├── icons/
│   ├── icon-72x72.png
│   ├── icon-76x76.png
│   ├── icon-114x114.png
│   ├── icon-120x120.png
│   ├── icon-144x144.png
│   ├── icon-152x152.png
│   ├── icon-180x180.png             ← Apple Touch Icon
│   ├── icon-192x192.png             ← PWA Android / Chrome
│   ├── icon-256x256.png
│   └── icon-512x512.png             ← App Store / Play Store
└── splashes/
    ├── splash-iphone-max.png        (1242×2688 — iPhone 14 Pro Max)
    ├── splash-iphone.png            (750×1334 — iPhone 8/SE)
    ├── splash-ipad-pro.png          (2048×2732 — iPad Pro 12.9")
    └── splash-android-fhd.png       (1080×1920 — Android FHD)
```

---

## Instalação como PWA

| Plataforma | Instrução |
|-----------|-----------|
| iOS Safari | Compartilhar → Adicionar à Tela de Início |
| Android Chrome | Menu ⋮ → Adicionar à tela inicial |
| Desktop Chrome/Edge | Ícone ⊕ na barra de endereço → Instalar QuotaLab |

---

## Sincronização GitHub

1. Gere um Personal Access Token em [github.com/settings/tokens](https://github.com/settings/tokens/new?scopes=gist&description=QuotaLab) com escopo `gist`
2. Abra **Configurações → GitHub** no app
3. Cole o token e clique Salvar
4. Use **↑ Enviar** para salvar dados e **↓ Receber** para restaurar

---

## Tecnologias

- HTML5 / CSS3 / JavaScript puro — zero dependências de framework
- [jsPDF](https://github.com/parallax/jsPDF) + jsPDF-AutoTable — geração de PDF
- [API Banco Central do Brasil](https://dadosabertos.bcb.gov.br/) — índices econômicos
- [API Anthropic Claude](https://anthropic.com) — assistente IA (opcional)
- localStorage — persistência local
- GitHub Gist API — sincronização entre dispositivos

---

## Licença

MIT — uso livre, pessoal e comercial.
