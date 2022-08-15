import { Picker } from '@react-native-picker/picker';
import React, { useEffect, useState } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { addNote, deleteNote, updateNote } from '../services/Notes';

export default function NotaEditor({ getAllNotes, selectedNote, setSelectedNote }) {
  const [texto, setTexto] = useState('');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Pessoal');

  const [modalVisivel, setModalVisivel] = useState(false);
  const [noteToUptade, setNoteToUpdate] = useState(false);

  const fillModal = () => {
    setTitle(selectedNote.titulo);
    setCategory(selectedNote.categoria);
    setTexto(selectedNote.texto);
  };

  const clearModal = () => {
    setTitle('');
    setCategory('Pessoal');
    setTexto('');
    setSelectedNote({});
    setModalVisivel(false);
  };

  const saveNote = async () => {
    const note = {
      title: title,
      category: category,
      text: texto,
    };

    await addNote(note);

    await getAllNotes();
    clearModal();
  };

  const noteUpdate = async () => {
    const note = {
      id: selectedNote.id,
      title: title,
      category: category,
      text: texto,
    };

    await updateNote(note);
    await getAllNotes();
    clearModal();
  };

  const noteDelete = async () => {
    await deleteNote(selectedNote);
    clearModal();
    getAllNotes();
  };

  useEffect(() => {
    if (selectedNote.id) {
      fillModal();
      setNoteToUpdate(true);
      setModalVisivel(true);
      return;
    }
    setNoteToUpdate(false);
  }, [selectedNote]);

  return (
    <>
      <Modal animationType="slide" transparent={true} visible={modalVisivel} onRequestClose={clearModal}>
        <View style={estilos.centralizaModal}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={estilos.modal}>
              <Text style={estilos.modalTitulo}>Criar nota</Text>
              <Text style={estilos.modalSubTitulo}>Titulo da nota</Text>
              <TextInput
                style={estilos.modalInput}
                onChangeText={(newTitle) => setTitle(newTitle)}
                placeholder="Digite aqui o Titulo"
                value={title}
              />

              <Text style={estilos.modalSubTitulo}>Categoria da nota</Text>

              <View style={estilos.modalPicker}>
                <Picker selectedValue={category} onValueChange={(newCategory) => setCategory(newCategory)}>
                  <Picker.Item label="Pessoal" value="Pessoal" />
                  <Picker.Item label="Trabalho" value="Trabalho" />
                  <Picker.Item label="Outros" value="Outros" />
                </Picker>
              </View>

              <Text style={estilos.modalSubTitulo}>Conteúdo da nota</Text>
              <TextInput
                style={estilos.modalInput}
                multiline={true}
                numberOfLines={3}
                onChangeText={(novoTexto) => setTexto(novoTexto)}
                placeholder="Digite aqui seu lembrete"
                value={texto}
              />

              <View style={estilos.modalBotoes}>
                <TouchableOpacity
                  style={estilos.modalBotaoSalvar}
                  onPress={() => (noteToUptade ? noteUpdate() : saveNote())}
                >
                  <Text style={estilos.modalBotaoTexto}>Salvar</Text>
                </TouchableOpacity>
                {noteToUptade && (
                  <TouchableOpacity style={estilos.modalBotaoDeletar} onPress={noteDelete}>
                    <Text style={estilos.modalBotaoTexto}>Deletar</Text>
                  </TouchableOpacity>
                )}
                <TouchableOpacity style={estilos.modalBotaoCancelar} onPress={clearModal}>
                  <Text style={estilos.modalBotaoTexto}>Cancelar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      </Modal>
      <TouchableOpacity
        onPress={() => {
          setModalVisivel(true);
        }}
        style={estilos.adicionarMemo}
      >
        <Text style={estilos.adicionarMemoTexto}>+</Text>
      </TouchableOpacity>
    </>
  );
}

const estilos = StyleSheet.create({
  centralizaModal: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  modal: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 32,
    marginTop: 8,
    marginHorizontal: 16,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  modalTitulo: {
    fontSize: 28,
    fontWeight: '600',
    marginBottom: 18,
  },
  modalInput: {
    fontSize: 18,
    marginBottom: 12,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#FF9A94',
  },
  modalPicker: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#EEEEEE',
    marginBottom: 12,
  },
  modalSubTitulo: {
    fontSize: 14,
    marginBottom: 8,
    fontWeight: '600',
  },
  modalBotoes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalBotaoSalvar: {
    backgroundColor: '#2ea805',
    borderRadius: 5,
    padding: 8,
    width: 80,
    alignItems: 'center',
  },
  modalBotaoDeletar: {
    backgroundColor: '#d62a18',
    borderRadius: 5,
    padding: 8,
    width: 80,
    alignItems: 'center',
  },
  modalBotaoCancelar: {
    backgroundColor: '#057fa8',
    borderRadius: 5,
    padding: 8,
    width: 80,
    alignItems: 'center',
  },
  modalBotaoTexto: {
    color: '#FFFFFF',
  },
  adicionarMemo: {
    backgroundColor: '#54ba32',
    justifyContent: 'center',
    height: 64,
    width: 64,
    margin: 16,
    alignItems: 'center',
    borderRadius: 9999,
    position: 'absolute',
    bottom: 0,
    right: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  adicionarMemoTexto: {
    fontSize: 32,
    lineHeight: 40,
    color: '#FFFFFF',
  },
});
