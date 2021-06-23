import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import tailwind from 'tailwind-rn';

function Square({ value, index, handleClick }) {
  const color = value === 'X' ? 'text-green-700' : 'text-red-600';
  const vertical = index === 1 || index === 4 || index === 7 ? 'border-l-4 border-r-4 ' : '';
  const horizontal = index === 3 || index === 4 || index === 5 ? 'border-t-4 border-b-4 ' : '';
  return (
    <TouchableOpacity
      style={tailwind(
        `flex h-24 ${vertical} ${horizontal} border-double border-black justify-center`
      )}
      onPress={() => {
        handleClick(index);
      }}>
      <Text style={tailwind(`${color}  font-extrabold text-center justify-center text-3xl`)}>
        {value}
      </Text>
    </TouchableOpacity>
  );
}

export default Square;
