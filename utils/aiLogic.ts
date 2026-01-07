import { Board, Player, CellValue } from '../types';
import { checkWinner } from './gameLogic';

/**
 * IA FÁCIL - Jogadas completamente aleatórias
 */
export const easyAI = (board: Board): number => {
  const availableMoves = board
    .map((cell, index) => (cell === null ? index : null))
    .filter((index) => index !== null) as number[];

  const randomIndex = Math.floor(Math.random() * availableMoves.length);
  return availableMoves[randomIndex];
};

/**
 * IA MÉDIA - Bloqueia vitórias do oponente e tenta vencer
 */
export const mediumAI = (board: Board, aiPlayer: Player): number => {
  const opponent: Player = aiPlayer === 'X' ? 'O' : 'X';

  // 1. Tentar vencer
  const winningMove = findWinningMove(board, aiPlayer);
  if (winningMove !== -1) return winningMove;

  // 2. Bloquear oponente
  const blockingMove = findWinningMove(board, opponent);
  if (blockingMove !== -1) return blockingMove;

  // 3. Pegar centro se disponível
  if (board[4] === null) return 4;

  // 4. Pegar um canto disponível
  const corners = [0, 2, 6, 8];
  const availableCorners = corners.filter((i) => board[i] === null);
  if (availableCorners.length > 0) {
    return availableCorners[Math.floor(Math.random() * availableCorners.length)];
  }

  // 5. Qualquer movimento disponível
  return easyAI(board);
};

/**
 * IA DIFÍCIL - Algoritmo Minimax (jogo perfeito)
 */
export const hardAI = (board: Board, aiPlayer: Player): number => {
  const opponent: Player = aiPlayer === 'X' ? 'O' : 'X';
  let bestScore = -Infinity;
  let bestMove = -1;

  for (let i = 0; i < board.length; i++) {
    if (board[i] === null) {
      board[i] = aiPlayer;
      const score = minimax(board, 0, false, aiPlayer, opponent);
      board[i] = null;

      if (score > bestScore) {
        bestScore = score;
        bestMove = i;
      }
    }
  }

  return bestMove;
};

/**
 * Algoritmo Minimax para IA difícil
 */
const minimax = (
  board: Board,
  depth: number,
  isMaximizing: boolean,
  aiPlayer: Player,
  opponent: Player
): number => {
  const winner = checkWinner(board);

  // Condições de término
  if (winner?.winner === aiPlayer) return 10 - depth;
  if (winner?.winner === opponent) return depth - 10;
  if (board.every((cell) => cell !== null)) return 0;

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < board.length; i++) {
      if (board[i] === null) {
        board[i] = aiPlayer;
        const score = minimax(board, depth + 1, false, aiPlayer, opponent);
        board[i] = null;
        bestScore = Math.max(score, bestScore);
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < board.length; i++) {
      if (board[i] === null) {
        board[i] = opponent;
        const score = minimax(board, depth + 1, true, aiPlayer, opponent);
        board[i] = null;
        bestScore = Math.min(score, bestScore);
      }
    }
    return bestScore;
  }
};

/**
 * Encontra uma jogada que resulta em vitória
 */
const findWinningMove = (board: Board, player: Player): number => {
  for (let i = 0; i < board.length; i++) {
    if (board[i] === null) {
      board[i] = player;
      const winner = checkWinner(board);
      board[i] = null;

      if (winner?.winner === player) {
        return i;
      }
    }
  }
  return -1;
};

/**
 * Executa jogada da IA baseada no nível de dificuldade
 */
export const makeAIMove = (
  board: Board,
  aiPlayer: Player,
  difficulty: 'easy' | 'medium' | 'hard'
): number => {
  switch (difficulty) {
    case 'easy':
      return easyAI(board);
    case 'medium':
      return mediumAI(board, aiPlayer);
    case 'hard':
      return hardAI(board, aiPlayer);
    default:
      return easyAI(board);
  }
};
