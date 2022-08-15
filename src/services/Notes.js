import { db } from './sqlite';

export const createTable = () => {
  db.transaction((transaction) => {
    transaction.executeSql(
      `CREATE TABLE IF NOT EXISTS Notas (id INTEGER PRIMARY KEY AUTOINCREMENT, titulo TEXT, categoria TEXT, texto TEXT);`
    );
  });
};

export const addNote = async (note) => {
  return new Promise((resolve, _reject) => {
    db.transaction((transaction) => {
      transaction.executeSql(
        `INSERT INTO Notas (titulo, categoria, texto) VALUES (?, ?, ?);`,
        [note.title, note.category, note.text],
        () => {
          resolve('Nota Adicionada com Sucesso');
        }
      );
    });
  });
};

export const getNotes = async () => {
  return new Promise((resolve, _reject) => {
    db.transaction((transaction) => {
      transaction.executeSql(`SELECT * FROM Notas;`, [], (transaction, result) => {
        resolve(result.rows._array);
      });
    });
  });
};

export const updateNote = async (note) => {
  return new Promise((resolve, _reject) => {
    db.transaction((transaction) => {
      transaction.executeSql(
        `UPDATE Notas SET titulo = ?, categoria = ?, texto = ?  WHERE id = ?;`,
        [note.title, note.category, note.text, note.id],
        () => {
          resolve('Nota Atualizada com Sucesso');
        }
      );
    });
  });
};

export const deleteNote = async (note) => {
  return new Promise((resolve, _reject) => {
    db.transaction((transaction) => {
      transaction.executeSql(`DELETE FROM Notas WHERE id = ?;`, [note.id], () => {
        resolve('Nota Removida com Sucesso');
      });
    });
  });
};
