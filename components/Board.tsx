import React from 'react';
import { View, StyleSheet } from 'react-native';
import Cell from './Cell';
import { Board as BoardType, WinnerInfo } from '../types';

interface BoardProps {
  board: BoardType;
  onCellPress: (index: number) => void;
  winner: WinnerInfo;
}

const Board: React.FC<BoardProps> = ({ board, onCellPress, winner }) => {
  const isWinningCell = (index: number): boolean => {
    return winner ? winner.line.includes(index) : false;
  };

  return (
    <View style={styles.board}>
      {[0, 1, 2].map((row) => (
        <View key={row} style={styles.row}>
          {[0, 1, 2].map((col) => {
            const index = row * 3 + col;
            return (
              <Cell
                key={index}
                value={board[index]}
                onPress={() => onCellPress(index)}
                isWinningCell={isWinningCell(index)}
              />
            );
          })}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  board: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
  },
});

export default Board;
