import React, { useEffect, useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';
import * as SQLite from 'expo-sqlite/legacy';

const db = SQLite.openDatabase('habits.db');

export default function App() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState(""); // State for the input text

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY AUTOINCREMENT, note TEXT);',
        [],
        () => {
          console.log('Table created successfully');
        },
        (_, error) => {
          console.error('Error creating table: ', error);
        }
      );

      tx.executeSql(
        'SELECT * FROM notes;',
        [],
        (_, { rows }) => {
          setNotes(rows._array);
          console.log("Number of notes fetched: " + rows.length);
        },
        (_, error) => {
          console.error('Error fetching notes: ', error);
        }
      );
    });
  }, []);

  const addNote = () => {
    if (!newNote.trim()) return; // Prevent adding empty notes

    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO notes (note) values (?);',
        [newNote],
        (_, { insertId }) => {
          setNotes(prev => [...prev, { id: insertId, note: newNote }]);
          setNewNote(""); // Clear input field after adding
        },
        (_, error) => {
          console.error('Error inserting note: ', error);
        }
      );
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Habit Tracker</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Enter your habit..."
        value={newNote}
        onChangeText={setNewNote} // Update state on text change
      />

      <Button title="Add Habit" onPress={addNote} />
      
      {notes.map(note => (
        <Text key={note.id} style={styles.note}>
          {note.note}
        </Text>
      ))}
    </View>
  );
}

// Styles for the component
const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
  },
  note: {
    marginTop: 10,
    fontSize: 18,
  },
});
