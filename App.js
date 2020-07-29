import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import HabitList from './components/HabitList';

export default function App() {
  return (
    <View style={{backgroundColor: Platform.OS === 'android' ? '#e7dec5' : '#e7dfd5', flex: 1}}>
      <HabitList/>
    </View>
  );
}
