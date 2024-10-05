import SQLite from 'react-native-sqlite-storage';

SQLite.enablePromise(true);

export const getDBConnection = async () => {
  return new Promise((resolve, reject) => {
    const db = SQLite.openDatabase({ name: 'filename.db', createFromLocation: 1, location: 'Library'},
      (db) => {
        console.log('Database opened successfully!');
        resolve(db);
      },
      (error) => {
        console.error('Error opening database: ', error);
        reject(error);
      }
    );
  });
};
