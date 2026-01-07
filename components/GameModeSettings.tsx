import React from 'react';
import { 
  Modal, 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet 
} from 'react-native';
import { useLanguage } from '../contexts/LanguageContext';
import { GameMode, AIDifficulty } from '../types';

interface GameModeSettingsProps {
  visible: boolean;
  onClose: () => void;
  currentMode: GameMode;
  currentDifficulty: AIDifficulty;
  onModeChange: (mode: GameMode) => void;
  onDifficultyChange: (difficulty: AIDifficulty) => void;
}

const GameModeSettings: React.FC<GameModeSettingsProps> = ({
  visible,
  onClose,
  currentMode,
  currentDifficulty,
  onModeChange,
  onDifficultyChange,
}) => {
  const { t } = useLanguage();

  const handleModeSelect = (mode: GameMode) => {
    onModeChange(mode);
    if (mode === 'pvp') {
      onClose();
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>{t.selectMode}</Text>
          
          {/* Seleção de Modo */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t.gameMode}</Text>
            
            <TouchableOpacity
              style={[
                styles.optionButton,
                currentMode === 'pvp' && styles.selectedOption,
              ]}
              onPress={() => handleModeSelect('pvp')}
            >
              <Text style={[
                styles.optionText,
                currentMode === 'pvp' && styles.selectedOptionText,
              ]}>
                👥 {t.playerVsPlayer}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.optionButton,
                currentMode === 'pvai' && styles.selectedOption,
              ]}
              onPress={() => handleModeSelect('pvai')}
            >
              <Text style={[
                styles.optionText,
                currentMode === 'pvai' && styles.selectedOptionText,
              ]}>
                🤖 {t.playerVsAI}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Seleção de Dificuldade (apenas para modo IA) */}
          {currentMode === 'pvai' && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>{t.difficulty}</Text>
              
              <TouchableOpacity
                style={[
                  styles.difficultyButton,
                  styles.easyButton,
                  currentDifficulty === 'easy' && styles.selectedDifficulty,
                ]}
                onPress={() => onDifficultyChange('easy')}
              >
                <Text style={[
                  styles.difficultyText,
                  currentDifficulty === 'easy' && styles.selectedDifficultyText,
                ]}>
                  😊 {t.easy}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.difficultyButton,
                  styles.mediumButton,
                  currentDifficulty === 'medium' && styles.selectedDifficulty,
                ]}
                onPress={() => onDifficultyChange('medium')}
              >
                <Text style={[
                  styles.difficultyText,
                  currentDifficulty === 'medium' && styles.selectedDifficultyText,
                ]}>
                  🤔 {t.medium}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.difficultyButton,
                  styles.hardButton,
                  currentDifficulty === 'hard' && styles.selectedDifficulty,
                ]}
                onPress={() => onDifficultyChange('hard')}
              >
                <Text style={[
                  styles.difficultyText,
                  currentDifficulty === 'hard' && styles.selectedDifficultyText,
                ]}>
                  😈 {t.hard}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.startButton}
                onPress={onClose}
              >
                <Text style={styles.startButtonText}>{t.newGame}</Text>
              </TouchableOpacity>
            </View>
          )}

          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    width: '85%',
    maxHeight: '80%',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 25,
    textAlign: 'center',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666',
    marginBottom: 15,
  },
  optionButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#f5f5f5',
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#f5f5f5',
  },
  selectedOption: {
    backgroundColor: '#2196F3',
    borderColor: '#2196F3',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    fontWeight: '500',
  },
  selectedOptionText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  difficultyButton: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 2,
  },
  easyButton: {
    backgroundColor: '#E8F5E9',
    borderColor: '#4CAF50',
  },
  mediumButton: {
    backgroundColor: '#FFF3E0',
    borderColor: '#FF9800',
  },
  hardButton: {
    backgroundColor: '#FFEBEE',
    borderColor: '#F44336',
  },
  selectedDifficulty: {
    borderWidth: 3,
  },
  difficultyText: {
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '500',
  },
  selectedDifficultyText: {
    fontWeight: 'bold',
  },
  startButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  startButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 24,
    color: '#666',
  },
});

export default GameModeSettings;
