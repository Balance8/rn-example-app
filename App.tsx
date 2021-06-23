import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView, View, Text, ScrollView } from 'react-native';
import tailwind from 'tailwind-rn';
import Board from './components/board';

export default function App() {
  return (
    <SafeAreaView style={tailwind('h-full bg-indigo-800 ')}>
      <View style={tailwind('pt-1 items-center')}>
        <ScrollView style={tailwind('bg-indigo-200 px-3 py-10 rounded-full h-full w-full ')}>
          <Text
            style={tailwind(
              'text-indigo-700 text-center py-5 uppercase text-4xl font-extrabold tracking-wider'
            )}>
            Tic tac toe
          </Text>
          <Board />
        </ScrollView>
      </View>
      <StatusBar style='auto' />
    </SafeAreaView>
  );
}
