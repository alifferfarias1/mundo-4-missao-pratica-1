import React, { useState } from 'react';
import { Alert, Image, StyleSheet, TextInput, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import CustomButton from './Botao';

const CadastroFornecedor = ({ onCadastroSubmit }) => {
  const [form, setForm] = useState({
    nome: '',
    endereco: '',
    contato: '',
    categorias: '',
    imagem: null,
  });

  const handleInputChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleCadastro = () => {
    const { nome, endereco, contato, categorias, imagem } = form;
    if (!nome || !endereco || !contato || !categorias) {
      Alert.alert("Erro", "Por favor, preencher todos os campos.");
      return;
    }

    const novoFornecedor = { nome, endereco, contato, categorias, imagem };
    onCadastroSubmit(novoFornecedor);
    clearFields();
    Alert.alert("Sucesso", "Fornecedor cadastrado com sucesso!");
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets?.length > 0) {
      handleInputChange('imagem', result.assets[0].uri);
    }
  };

  const clearFields = () => {
    setForm({
      nome: '',
      endereco: '',
      contato: '',
      categorias: '',
      imagem: null,
    });
  };

  const { nome, endereco, contato, categorias, imagem } = form;

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nome Completo"
        value={nome}
        onChangeText={(text) => handleInputChange('nome', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Endereço"
        value={endereco}
        onChangeText={(text) => handleInputChange('endereco', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Contato"
        value={contato}
        onChangeText={(text) => handleInputChange('contato', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Categoria/Produto"
        value={categorias}
        onChangeText={(text) => handleInputChange('categorias', text)}
      />

      {imagem && <Image source={{ uri: imagem }} style={styles.image} />}

      <View style={styles.buttonContainer}>
        <CustomButton title="Escolher Imagem" onPress={pickImage} />
        <CustomButton title="Cadastrar" color="#00A000" onPress={handleCadastro} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  input: {
    width: '100%',
    fontSize: 16,
    marginBottom: 16,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginVertical: 12,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});

export default CadastroFornecedor;
