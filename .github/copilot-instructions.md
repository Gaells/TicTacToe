# Jogo da Velha - React Native TypeScript Expo

## Contexto do Projeto
Este é um jogo da velha (tic-tac-toe) desenvolvido em React Native com TypeScript e Expo, com suporte a múltiplos idiomas (internacionalização) e sistema de IA com 3 níveis de dificuldade.

## Tecnologias
- React Native
- TypeScript
- Expo SDK
- React Hooks
- Sistema de i18n (internacionalização)
- Algoritmo Minimax para IA

## Estrutura do Projeto
- `/app` - Componentes e telas principais
- `/components` - Componentes reutilizáveis
- `/types` - Definições de tipos TypeScript
- `/utils` - Funções auxiliares e lógica de IA
- `/locales` - Arquivos de tradução (pt-BR, en-US, es-ES, fr-FR, etc.)
- `/contexts` - Contextos React (LanguageContext)

## Internacionalização (i18n)

### Idiomas Suportados
- **pt-BR** - Português do Brasil (padrão)
- **en-US** - English (United States)
- **es-ES** - Español (España)
- **fr-FR** - Français (France)
- **de-DE** - Deutsch (Deutschland)
- **it-IT** - Italiano (Italia)
- **ja-JP** - 日本語 (Japanese)
- **zh-CN** - 中文 (Chinese Simplified)

### Estrutura de Tradução
Cada arquivo de tradução em `/locales` deve conter:
```typescript
{
  title: string;
  playerXWins: string;
  playerOWins: string;
  draw: string;
  playerTurn: string;
  newGame: string;
  resetScores: string;
  draws: string;
  language: string;
}
```

### Como Adicionar um Novo Idioma
1. Criar arquivo em `/locales/[código].ts` (ex: `/locales/pt-BR.ts`)
2. Exportar objeto com todas as traduções
3. Adicionar ao array `AVAILABLE_LANGUAGES` em `/locales/index.ts`
4. Atualizar tipo `SupportedLanguage` em `/types/index.ts`

### Uso no Código
- Sempre usar `useLanguage()` hook para acessar traduções
- Nunca usar textos hardcoded
- Exemplo: `const { t } = useLanguage(); <Text>{t.title}</Text>`

## Convenções de Código
- Use TypeScript para type safety
- Componentes funcionais com Hooks
- Nomes de componentes em PascalCase
- Funções auxiliares em camelCase
- Comentários em português quando necessário
- **NUNCA usar textos hardcoded - sempre usar sistema de tradução**

## Regras de Desenvolvimento
- Sempre tipar props e estados
- Usar interfaces para definir tipos customizados
- Manter lógica de negócio separada dos componentes visuais
- Priorizar componentização e reutilização de código
- **Toda string visível ao usuário deve ser traduzível**
- Usar Context API para gerenciar idioma global
- Preferir abreviações internacionais (X, O) que não precisam tradução
- Implementar delays em jogadas da IA para melhor UX
- Otimizar algoritmos de IA para performance

## Sistema de IA

### Níveis de Dificuldade
- **Fácil (easy)**: Jogadas aleatórias simples
- **Médio (medium)**: Bloqueia vitórias e tenta vencer, prioriza centro e cantos
- **Difícil (hard)**: Algoritmo Minimax (jogo perfeito)

### Regras de Implementação
- Sempre usar delays (300-800ms) antes da jogada da IA
- Bloquear interação do usuário durante turno da IA
- Mostrar indicador visual "IA pensando..."
- IA sempre joga como jogador 'O'
- Jogador humano sempre começa (jogador 'X')
- Minimax deve considerar profundidade para otimização

### Modos de Jogo
- **PvP (Player vs Player)**: Dois jogadores humanos
- **PvAI (Player vs AI)**: Jogador humano vs IA

## Acessibilidade e UX
- Seletor de idioma deve ser facilmente acessível
- Salvar preferência de idioma do usuário localmente
- Interface deve adaptar-se a diferentes comprimentos de texto
- Considerar direção de leitura (LTR/RTL) em futuras implementações
