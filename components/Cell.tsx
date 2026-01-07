import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';
import { CellValue } from '../types';

interface CellProps {
  value: CellValue;
  onPress: () => void;
  isWinningCell: boolean;
}

const Cell: React.FC<CellProps> = ({ value, onPress, isWinningCell }) => {
  return (
    <TouchableOpacity
      style={[styles.cell, isWinningCell && styles.winningCell]}
      onPress={onPress}
      disabled={value !== null}
    >
      <Text style={[
        styles.cellText,
        value === 'X' ? styles.playerX : styles.playerO,
        isWinningCell && styles.winningText
      ]}>
        {value || ''}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cell: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#333',
    margin: 2,
    borderRadius: 10,
  },
  cellText: {
    fontSize: 48,
    fontWeight: 'bold',
  },
  playerX: {
    color: '#2196F3',
  },
  playerO: {
    color: '#FF5722',
  },
  winningCell: {
    backgroundColor: '#4CAF50',
  },
  winningText: {
    color: '#fff',
  },
});

export default Cell;
