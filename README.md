# 🚀 VOAR - Produtividade Máxima

Sistema de autoconhecimento e produtividade baseado no Método VOAR: **V**er, **O**rganizar, **A**justar, **R**epetir.

## ✨ Características

- **Interface Read-Only**: Consome APIs existentes sem gravar dados localmente
- **Mobile First**: Design responsivo otimizado para dispositivos móveis
- **Dark/Light Mode**: Suporte completo a temas
- **Dados Mockados**: Funciona independente das APIs para desenvolvimento
- **TypeScript**: Type safety completa
- **Performance**: Otimizado para carregamento rápido

## 🛠️ Stack Tecnológica

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS + Shadcn/ui
- **Charts**: Recharts
- **State**: Zustand
- **Theme**: next-themes
- **Icons**: Lucide React
- **Deploy**: Vercel

## 🏗️ Estrutura do Projeto

```
src/
├── app/                    # App Router (Next.js 14)
│   ├── (auth)/            # Rotas de autenticação
│   ├── (dashboard)/       # Rotas do dashboard
│   ├── globals.css        # Estilos globais
│   └── layout.tsx         # Layout raiz
├── components/            # Componentes reutilizáveis
│   ├── ui/               # Shadcn/ui components
│   ├── dashboard/        # Componentes do dashboard
│   ├── audio/           # Componentes de áudio
│   └── layout/          # Layouts e navegação
├── lib/                  # Utilitários
├── stores/               # Zustand stores
├── types/                # TypeScript types
└── mock-data/           # Dados simulados
```

## 🎯 Funcionalidades

### Dashboard
- KPIs principais (registros, metas, tempo médio, sequência)
- Gráfico de evolução semanal
- Distribuição por categorias
- Ações rápidas

### Áudios
- Lista de gravações com player
- Tags de emoção e categoria
- Status de processamento
- Filtros e busca

### Análise
- Gráfico de emoções (pie chart)
- Padrões identificados automaticamente
- Insights e recomendações
- Tendências semanais

### Metas
- Progresso visual com barras
- Conquistas e badges
- Tipos diferentes de meta
- Status tracking

### Configurações
- Perfil do usuário
- Tema (claro/escuro/sistema)
- Notificações
- Integração WhatsApp

## 🚦 Como Executar

```bash
# Instalar dependências
npm install

# Executar em desenvolvimento
npm run dev

# Build para produção
npm run build

# Executar build
npm start
```

## 📱 Páginas

- `/` - Landing page
- `/login` - Login com credenciais demo
- `/dashboard` - Overview principal
- `/audios` - Listagem de áudios
- `/analise` - Análises e insights
- `/metas` - Metas e conquistas
- `/settings` - Configurações

## 🎨 Design System

### Cores Principais
- **Primary**: `#6366f1` (Indigo)
- **Secondary**: `#10b981` (Emerald)
- **Accent**: `#f59e0b` (Amber)
- **Danger**: `#ef4444` (Red)

### Componentes
- Cards com hover effects
- Progress bars animadas
- Badges para status
- Loading states consistentes

## 🔧 Configurações

### Ambiente
O projeto funciona totalmente com dados mockados, não requer configuração de ambiente específica.

### Tema
Suporte automático a:
- Modo claro
- Modo escuro  
- Modo sistema (segue preferência do OS)

## 📊 Dados Mockados

Todos os dados são simulados em `src/lib/mock-data.ts`:
- Dashboard stats
- Lista de áudios
- Distribuição de emoções
- Metas e progresso
- Conquistas

## 🚀 Deploy na Vercel

```bash
# Conectar repositório à Vercel
npx vercel

# Deploy automático a cada push na main
git push origin main
```

## 📋 Próximos Passos

### Integrações Futuras
- [ ] Conectar APIs reais
- [ ] Sistema de autenticação
- [ ] Banco de dados para configs
- [ ] PWA (Progressive Web App)
- [ ] Notificações push

### Melhorias UX
- [ ] Animações micro-interações
- [ ] Skeleton loading states
- [ ] Infinite scroll
- [ ] Drag & drop
- [ ] Keyboard shortcuts

## 🤝 Método VOAR

### V - Ver
Captura imediata de pensamentos via áudio. Zero atrito.

### O - Organizar  
Processamento automático em 5 eixos:
- Autoconhecimento
- Disciplina  
- Treino Mental
- Execução e Foco
- Evolução Contínua

### A - Ajustar
Análise estruturada com relatórios e gráficos que mostram padrões e áreas de melhoria.

### R - Repetir
Ciclo semanal de evolução com progresso contínuo e sustentável.

---

**Simples de aplicar, impossível de ignorar.** ✈️