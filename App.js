import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import database from '@react-native-firebase/database';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>PandaHabit</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 200
  },
});
