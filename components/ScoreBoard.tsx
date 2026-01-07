import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GameState } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

interface ScoreBoardProps {
  scores: GameState['scores'];
}

const ScoreBoard: React.FC<ScoreBoardProps> = ({ scores }) => {
  const { t } = useLanguage();
  
  return (
    <View style={styles.container}>
      <View style={styles.scoreItem}>
        <Text style={[styles.player, styles.playerX]}>X</Text>
        <Text style={styles.score}>{scores.X}</Text>
      </View>
      <View style={styles.scoreItem}>
        <Text style={styles.drawText}>{t.draws}</Text>
        <Text style={styles.score}>{scores.draws}</Text>
      </View>
      <View style={styles.scoreItem}>
        <Text style={[styles.player, styles.playerO]}>O</Text>
        <Text style={styles.score}>{scores.O}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingVertical: 20,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    marginVertical: 10,
  },
  scoreItem: {
    alignItems: 'center',
  },
  player: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  playerX: {
    color: '#2196F3',
  },
  playerO: {
    color: '#FF5722',
  },
  drawText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
    marginBottom: 5,
  },
  score: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default ScoreBoard;
