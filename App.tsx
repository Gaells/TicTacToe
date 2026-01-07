import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from 'react-native';
import Board from './components/Board';
import ScoreBoard from './components/ScoreBoard';
import LanguageSelector from './components/LanguageSelector';
import GameModeSettings from './components/GameModeSettings';
import GameResultModal from './components/GameResultModal';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import { GameState, GameMode, AIDifficulty } from './types';
import { 
  checkWinner, 
  checkDraw, 
  createEmptyBoard, 
  togglePlayer 
} from './utils/gameLogic';
import { makeAIMove } from './utils/aiLogic';

function GameContent() {
  const { t } = useLanguage();
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);
  const [showGameModeSettings, setShowGameModeSettings] = useState(false);
  const [showResultModal, setShowResultModal] = useState(false);
  const [isAIThinking, setIsAIThinking] = useState(false);
  const [gameState, setGameState] = useState<GameState>({
    board: createEmptyBoard(),
    currentPlayer: 'X',
    winner: null,
    isDraw: false,
    scores: {
      X: 0,
      O: 0,
      draws: 0,
    },
    gameMode: 'pvp',
    aiDifficulty: 'medium',
    aiPlayer: 'O',
  });

  const handleCellPress = (index: number) => {
    // Bloquear jogadas durante pensamento da IA ou se a célula já estiver preenchida
    if (isAIThinking || gameState.winner || gameState.isDraw || gameState.board[index]) {
      return;
    }

    // No modo IA, bloquear jogadas do jogador humano se não for sua vez (exceto quando chamado pela IA)
    if (gameState.gameMode === 'pvai' && gameState.currentPlayer === gameState.aiPlayer && !isAIThinking) {
      return;
    }

    // Atualizar o tabuleiro
    const newBoard = [...gameState.board];
    newBoard[index] = gameState.currentPlayer;

    // Verificar vencedor
    const winner = checkWinner(newBoard);
    const isDraw = checkDraw(newBoard);

    // Atualizar scores se houver vencedor ou empate
    const newScores = { ...gameState.scores };
    if (winner) {
      newScores[winner.winner]++;
    } else if (isDraw) {
      newScores.draws++;
    }

    setGameState({
      ...gameState,
      board: newBoard,
      currentPlayer: togglePlayer(gameState.currentPlayer),
      winner,
      isDraw,
      scores: newScores,
    });

    // Mostrar modal após um pequeno delay
    if (winner || isDraw) {
      setTimeout(() => setShowResultModal(true), 500);
    }
  };

  // Efeito para jogada da IA
  useEffect(() => {
    if (
      gameState.gameMode === 'pvai' &&
      gameState.currentPlayer === gameState.aiPlayer &&
      !gameState.winner &&
      !gameState.isDraw &&
      !isAIThinking
    ) {
      console.log('IA vai jogar!');
      setIsAIThinking(true);
      
      // Delay para simular "pensamento" da IA
      const delay = gameState.aiDifficulty === 'easy' ? 300 : 
                    gameState.aiDifficulty === 'medium' ? 500 : 800;
      
      const timer = setTimeout(() => {
        console.log('Executando jogada da IA...');
        
        // Usar o estado atual através de setGameState com callback
        setGameState(prevState => {
          // Verificar se ainda é o turno da IA
          if (prevState.currentPlayer !== prevState.aiPlayer || prevState.winner || prevState.isDraw) {
            console.log('Não é mais turno da IA, cancelando...');
            setIsAIThinking(false);
            return prevState;
          }

          const currentBoard = [...prevState.board];
          
          const aiMoveIndex = makeAIMove(
            currentBoard,
            prevState.aiPlayer,
            prevState.aiDifficulty
          );
          
          console.log('IA escolheu posição:', aiMoveIndex);
          
          if (aiMoveIndex !== -1 && currentBoard[aiMoveIndex] === null) {
            // Fazer a jogada
            currentBoard[aiMoveIndex] = prevState.aiPlayer;

            const winner = checkWinner(currentBoard);
            const isDraw = checkDraw(currentBoard);

            const newScores = { ...prevState.scores };
            if (winner) {
              newScores[winner.winner]++;
            } else if (isDraw) {
              newScores.draws++;
            }
            
            console.log('Jogada concluída!');
            setIsAIThinking(false);
            
            const newState = {
              ...prevState,
              board: currentBoard,
              currentPlayer: togglePlayer(prevState.aiPlayer),
              winner,
              isDraw,
              scores: newScores,
            };

            // Mostrar modal após um pequeno delay se houver resultado
            if (winner || isDraw) {
              setTimeout(() => setShowResultModal(true), 500);
            }
            
            return newState;
          }
          
          console.log('Jogada inválida');
          setIsAIThinking(false);
          return prevState;
        });
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [gameState.currentPlayer, gameState.gameMode, gameState.winner, gameState.isDraw, gameState.aiPlayer, gameState.aiDifficulty, gameState.board]);

  const resetGame = () => {
    setShowResultModal(false);
    setGameState({
      ...gameState,
      board: createEmptyBoard(),
      currentPlayer: 'X',
      winner: null,
      isDraw: false,
    });
    setIsAIThinking(false);
  };

  const resetScores = () => {
    setGameState({
      ...gameState,
      board: createEmptyBoard(),
      currentPlayer: 'X',
      winner: null,
      isDraw: false,
      scores: {
        X: 0,
        O: 0,
        draws: 0,
      },
    });
    setIsAIThinking(false);
  };

  const handleModeChange = (mode: GameMode) => {
    setGameState({
      ...gameState,
      gameMode: mode,
      board: createEmptyBoard(),
      currentPlayer: 'X',
      winner: null,
      isDraw: false,
      scores: {
        X: 0,
        O: 0,
        draws: 0,
      },
    });
    setIsAIThinking(false);
  };

  const handleDifficultyChange = (difficulty: AIDifficulty) => {
    setGameState({
      ...gameState,
      aiDifficulty: difficulty,
    });
  };

  const getStatusMessage = () => {
    if (isAIThinking) {
      return t.aiThinking;
    }
    
    if (gameState.winner) {
      if (gameState.gameMode === 'pvai') {
        return gameState.winner.winner === gameState.aiPlayer ? t.aiWins : t.youWin;
      }
      return gameState.winner.winner === 'X' ? t.playerXWins : t.playerOWins;
    }
    
    if (gameState.isDraw) {
      return t.draw;
    }
    
    if (gameState.gameMode === 'pvai' && gameState.currentPlayer === gameState.aiPlayer) {
      return `${t.playerTurn} 🤖`;
    }
    
    return `${t.playerTurn} ${gameState.currentPlayer}`;
  };

  const getModeButtonText = () => {
    if (gameState.gameMode === 'pvp') {
      return '👥';
    }
    const difficultyEmoji = gameState.aiDifficulty === 'easy' ? '😊' :
                           gameState.aiDifficulty === 'medium' ? '🤔' : '😈';
    return `🤖 ${difficultyEmoji}`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => setShowGameModeSettings(true)}
        >
          <Text style={styles.iconButtonText}>{getModeButtonText()}</Text>
        </TouchableOpacity>
        
        <Text style={styles.title}>{t.title}</Text>
        
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => setShowLanguageSelector(true)}
        >
          <Text style={styles.iconButtonText}>🌐</Text>
        </TouchableOpacity>
      </View>
      
      <ScoreBoard scores={gameState.scores} />
      
      <Text style={[
        styles.status,
        gameState.winner && styles.winnerStatus,
        isAIThinking && styles.thinkingStatus
      ]}>
        {getStatusMessage()}
      </Text>
      
      <Board
        board={gameState.board}
        onCellPress={handleCellPress}
        winner={gameState.winner}
      />
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={resetGame}
        >
          <Text style={styles.buttonText}>{t.newGame}</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.button, styles.resetButton]}
          onPress={resetScores}
        >
          <Text style={styles.buttonText}>{t.resetScores}</Text>
        </TouchableOpacity>
      </View>

      <LanguageSelector
        visible={showLanguageSelector}
        onClose={() => setShowLanguageSelector(false)}
      />


      <GameResultModal
        visible={showResultModal}
        winner={gameState.winner?.winner || null}
        isDraw={gameState.isDraw}
        gameMode={gameState.gameMode}
        aiPlayer={gameState.aiPlayer}
        onNewGame={resetGame}
        onClose={() => setShowResultModal(false)}
      />
      <GameModeSettings
        visible={showGameModeSettings}
        onClose={() => setShowGameModeSettings(false)}
        currentMode={gameState.gameMode}
        currentDifficulty={gameState.aiDifficulty}
        onModeChange={handleModeChange}
        onDifficultyChange={handleDifficultyChange}
      />
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <GameContent />
    </LanguageProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
    textAlign: 'center',
  },
  iconButton: {
    width: 80,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 25,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  iconButtonText: {
    fontSize: 24,
  },
  status: {
    fontSize: 24,
    fontWeight: '600',
    color: '#666',
    marginVertical: 20,
    textAlign: 'center',
  },
  winnerStatus: {
    color: '#4CAF50',
    fontSize: 28,
  },
  thinkingStatus: {
    color: '#FF9800',
    fontStyle: 'italic',
  },
  buttonContainer: {
    marginTop: 30,
    gap: 10,
  },
  button: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 10,
    minWidth: 200,
    alignItems: 'center',
  },
  resetButton: {
    backgroundColor: '#FF5722',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
