export const createTables = async (db) => {
    await db.transaction(
      (tx) => {
        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS habits (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              note TEXT
          );`
        );
      },
      (error) => {
        console.error('Transaction error: ', error);
        throw error;  // Propagate error
      },
      () => {
        console.log('Table created successfully');
      }
    );
  };