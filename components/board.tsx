import React, { useState } from 'react';
import Square from './square';
import CalculateWinner from '../utils/calculateWinner';
import { View, Text, TouchableOpacity } from 'react-native';
import tailwind from 'tailwind-rn';
import { FlatGrid } from 'react-native-super-grid';

export default function Board() {
  const [square, setSquare] = useState(Array(9).fill(null));
  const [xturn, setXTurn] = useState(true);
  const [history, setHistory] = useState([]);

  const onSquareClick = (idx) => {
    if (square[idx] === 'X' || square[idx] === 'O') {
      return;
    }
    if (xturn) {
      setHistory([...history, { square }]);
      let squares = [...square];
      squares[idx] = 'X';
      setSquare(squares);
      setXTurn(!xturn);
    } else {
      setHistory([...history, { square }]);
      let squares = [...square];
      squares[idx] = 'O';
      setSquare(squares);
      setXTurn(!xturn);
    }
  };

  const winner = CalculateWinner(square);

  const renderBoard = () => {
    const color = winner === 'X' ? 'text-green-700' : 'text-red-600';
    const nextPlayerColor = xturn ? 'text-green-700' : 'text-red-600';
    if (winner) {
      return (
        <View>
          <Text style={tailwind('text-3xl font-extrabold tracking-wider text-center')}>
            Winner is:
            <Text style={tailwind(color)}> {winner} </Text>
          </Text>
        </View>
      );
    }
    // 9 moves done, its a draw
    else if (!winner && history.length === 9) {
      return (
        <View>
          <Text style={tailwind('text-3xl font-extrabold tracking-wider text-center')}>
            {' '}
            It's a draw!{' '}
          </Text>
        </View>
      );
    } else {
      return (
        <View style={tailwind('pb-3')}>
          <Text style={tailwind('p-3 text-xl font-extrabold tracking-wider text-center')}>
            Next player is:{' '}
            <Text style={tailwind(` text-green-500 font-extrabold ${nextPlayerColor}`)}>
              {' '}
              {xturn ? 'X' : 'O'}{' '}
            </Text>
          </Text>
          <FlatGrid
            itemDimension={130}
            data={square}
            style={tailwind('')}
            spacing={0}
            renderItem={({ item, index }) => (
              <Square key={index} value={item} index={index} handleClick={onSquareClick} />
            )}
          />
        </View>
      );
    }
  };

  const moveToHistory = (idx) => {
    // Reset Board
    setSquare([...history[idx].square]);
    let newHistory = [...history].slice(0, idx);
    // Change xTurn
    newHistory.length % 2 === 0 ? setXTurn(true) : setXTurn(false);
    setHistory(newHistory);
  };

  const renderHistoryButtons = () => {
    return history.map((item, idx) => {
      return (
        <View key={idx}>
          <TouchableOpacity
            style={tailwind(
              'flex flex-col items-center justify-center m-2 bg-indigo-700 rounded-lg'
            )}
            onPress={() => {
              moveToHistory(idx);
            }}>
            <Text style={tailwind('text-white text-xl font-extrabold mx-2 my-2 px-8 py-3')}>
              {idx === 0 && 'Restart Game'}
              {idx !== 0 && `Jump to move ${idx}`}
            </Text>
          </TouchableOpacity>
        </View>
      );
    });
  };
  return (
    <View>
      {renderBoard()}
      {renderHistoryButtons()}
    </View>
  );
}
