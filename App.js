import { SQLiteProvider, useSQLiteContext } from 'expo-sqlite';
import { View, Text, StyleSheet } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <SQLiteProvider databaseName="test.db" assetSource={{ assetId: require('./app/assets/test.db') }}>
        <Main />
      </SQLiteProvider>
    </View>
  );
}

export function Main() {
  const db = useSQLiteContext();
  console.log('sqlite version', db.getFirstSync('SELECT sqlite_version()'));
  return (
  <View>
    <Text>Panda Habit</Text>
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 200,
  },
});
