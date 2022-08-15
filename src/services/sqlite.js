import * as SQLite from 'expo-sqlite';

const openConnection = () => {
  const db = SQLite.openDatabase('db.db');
  return db;
};

export const db = openConnection();
