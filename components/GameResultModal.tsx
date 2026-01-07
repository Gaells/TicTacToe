import React, { useEffect } from 'react';
import { 
  Modal, 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet,
  Animated
} from 'react-native';
import { useLanguage } from '../contexts/LanguageContext';
import { Player, GameMode } from '../types';

interface GameResultModalProps {
  visible: boolean;
  winner: Player | null;
  isDraw: boolean;
  gameMode: GameMode;
  aiPlayer: Player;
  onNewGame: () => void;
  onClose: () => void;
}

const GameResultModal: React.FC<GameResultModalProps> = ({
  visible,
  winner,
  isDraw,
  gameMode,
  aiPlayer,
  onNewGame,
  onClose,
}) => {
  const { t } = useLanguage();
  const scaleAnim = new Animated.Value(0);
  const rotateAnim = new Animated.Value(0);

  useEffect(() => {
    if (visible) {
      // Animação de entrada
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 50,
          friction: 7,
          useNativeDriver: true,
        }),
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      scaleAnim.setValue(0);
      rotateAnim.setValue(0);
    }
  }, [visible]);

  const getResultData = () => {
    if (isDraw) {
      return {
        emoji: '🤝',
        title: t.draw,
        message: gameMode === 'pvai' 
          ? 'Que partida equilibrada! A IA também é forte!' 
          : 'Empate perfeito! Vocês são igualmente habilidosos!',
        color: '#FF9800',
        backgroundColor: '#FFF3E0',
      };
    }

    if (gameMode === 'pvai') {
      const playerWon = winner !== aiPlayer;
      
      if (playerWon) {
        return {
          emoji: '🏆',
          title: t.youWin,
          message: 'Parabéns! Você derrotou a IA! 🎉',
          color: '#4CAF50',
          backgroundColor: '#E8F5E9',
        };
      } else {
        return {
          emoji: '🤖',
          title: t.aiWins,
          message: 'A IA venceu dessa vez! Tente novamente!',
          color: '#2196F3',
          backgroundColor: '#E3F2FD',
        };
      }
    } else {
      // PvP
      return {
        emoji: winner === 'X' ? '❌' : '⭕',
        title: winner === 'X' ? t.playerXWins : t.playerOWins,
        message: `Jogador ${winner} foi o vencedor! 🎊`,
        color: winner === 'X' ? '#2196F3' : '#FF5722',
        backgroundColor: winner === 'X' ? '#E3F2FD' : '#FFEBEE',
      };
    }
  };

  const resultData = getResultData();

  const rotation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <Animated.View 
          style={[
            styles.modal,
            { backgroundColor: resultData.backgroundColor },
            {
              transform: [
                { scale: scaleAnim },
              ],
            },
          ]}
        >
          {/* Emoji animado */}
          <Animated.Text 
            style={[
              styles.emoji,
              {
                transform: [{ rotate: rotation }],
              },
            ]}
          >
            {resultData.emoji}
          </Animated.Text>

          {/* Título */}
          <Text style={[styles.title, { color: resultData.color }]}>
            {resultData.title}
          </Text>

          {/* Mensagem */}
          <Text style={styles.message}>
            {resultData.message}
          </Text>

          {/* Botões */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.newGameButton, { backgroundColor: resultData.color }]}
              onPress={onNewGame}
            >
              <Text style={styles.buttonText}>🔄 {t.newGame}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.closeButton]}
              onPress={onClose}
            >
              <Text style={[styles.buttonText, styles.closeButtonText]}>
                Ver Tabuleiro
              </Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    borderRadius: 30,
    padding: 30,
    width: '85%',
    maxWidth: 400,
    alignItems: 'center',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  emoji: {
    fontSize: 80,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  message: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 24,
  },
  buttonContainer: {
    width: '100%',
    gap: 12,
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 15,
    alignItems: 'center',
  },
  newGameButton: {
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  closeButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#999',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  closeButtonText: {
    color: '#666',
  },
});

export default GameResultModal;
