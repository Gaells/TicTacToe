import { Board, Player, WinnerInfo } from '../types';

// Combinações vencedoras do jogo da velha
const WINNING_COMBINATIONS = [
  [0, 1, 2], // linha 1
  [3, 4, 5], // linha 2
  [6, 7, 8], // linha 3
  [0, 3, 6], // coluna 1
  [1, 4, 7], // coluna 2
  [2, 5, 8], // coluna 3
  [0, 4, 8], // diagonal 1
  [2, 4, 6], // diagonal 2
];

/**
 * Verifica se há um vencedor no tabuleiro
 */
export const checkWinner = (board: Board): WinnerInfo => {
  for (const combination of WINNING_COMBINATIONS) {
    const [a, b, c] = combination;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return {
        winner: board[a] as Player,
        line: combination,
      };
    }
  }
  return null;
};

/**
 * Verifica se o jogo terminou em empate
 */
export const checkDraw = (board: Board): boolean => {
  return board.every((cell) => cell !== null) && !checkWinner(board);
};

/**
 * Cria um tabuleiro vazio
 */
export const createEmptyBoard = (): Board => {
  return Array(9).fill(null);
};

/**
 * Troca o jogador atual
 */
export const togglePlayer = (currentPlayer: Player): Player => {
  return currentPlayer === 'X' ? 'O' : 'X';
};
