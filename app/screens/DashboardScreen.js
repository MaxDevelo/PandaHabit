import React from 'react';
import { View, StyleSheet } from 'react-native';
import CalendarSchedule from '../components/Calendar/CalendarSchedule';

export default function DashboardScreen() {
  return (
    <View style={styles.appContainer}>
      <CalendarSchedule />
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});
