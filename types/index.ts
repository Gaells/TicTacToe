// Tipos do jogo da velha

export type Player = 'X' | 'O';
export type CellValue = Player | null;
export type Board = CellValue[];
export type WinnerInfo = {
  winner: Player;
  line: number[];
} | null;

export type GameMode = 'pvp' | 'pvai';
export type AIDifficulty = 'easy' | 'medium' | 'hard';

export interface GameState {
  board: Board;
  currentPlayer: Player;
  winner: WinnerInfo;
  isDraw: boolean;
  scores: {
    X: number;
    O: number;
    draws: number;
  };
  gameMode: GameMode;
  aiDifficulty: AIDifficulty;
  aiPlayer: Player;
}

// Re-exportar tipos de idioma
export type { SupportedLanguage, Translation } from '../locales';
