import { FlatList, SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import NotaEditor from './src/componentes/NotaEditor';
import { Nota } from './src/componentes/Nota';
import { useEffect, useState } from 'react';
import { createTable, getNotes } from './src/services/Notes';

export default function App() {
  const [selectedNote, setSelectedNote] = useState({});
  const [notes, setNotes] = useState([]);

  const getAllNotes = async () => {
    const allNotes = await getNotes();
    setNotes(allNotes);
  };

  useEffect(() => {
    createTable();
    getAllNotes();
  }, []);

  return (
    <SafeAreaView style={estilos.container}>
      <FlatList
        data={notes}
        renderItem={(note) => <Nota {...note} setSelectedNote={setSelectedNote} />}
        keyExtractor={(note) => note.id}
      />
      <NotaEditor getAllNotes={getAllNotes} selectedNote={selectedNote} setSelectedNote={setSelectedNote} />
      <StatusBar />
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'flex-start',
  },
});
