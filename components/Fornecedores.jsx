import React, { useState, useMemo } from 'react';
import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View, FlatList } from 'react-native';

const filtrarFornecedores = (fornecedores, categoriaFiltro) => {
  if (!categoriaFiltro) return fornecedores;
  return fornecedores.filter((fornecedor) =>
    fornecedor.categorias.toLowerCase().includes(categoriaFiltro.toLowerCase())
  );
};

const ListaFornecedores = ({ fornecedores, onRemove }) => {
  const [categoriaFiltro, setCategoriaFiltro] = useState('');

  const fornecedoresFiltrados = useMemo(() => 
    filtrarFornecedores(fornecedores, categoriaFiltro),
    [fornecedores, categoriaFiltro]
  );

  const handleDelete = (fornecedor) => {
    Alert.alert(
      "Confirmar exclusão",
      `Você deseja realmente excluir ${fornecedor.nome}?`,
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Excluir", onPress: () => onRemove(fornecedor.id) },
      ]
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.fornecedorContainer}>
      <Image source={{ uri: item.imagem }} style={styles.imagemFornecedor} />
      <View style={styles.infoContainer}>
        <Text style={styles.nomeFornecedor}>{item.nome}</Text>
        <Text style={styles.detalheFornecedor}>Endereço: {item.endereco}</Text>
        <Text style={styles.detalheFornecedor}>Contato: {item.contato}</Text>
        <Text style={styles.detalheFornecedor}>Categoria: {item.categorias}</Text>
        <TouchableOpacity style={styles.actionButton} onPress={() => handleDelete(item)}>
          <Text style={styles.actionText}>Excluir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Filtrar por Categoria"
        value={categoriaFiltro}
        onChangeText={setCategoriaFiltro}
      />
      <FlatList
        data={fornecedoresFiltrados}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.emptyText}>Nenhum fornecedor encontrado.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F9F9F9',
  },
  input: {
    fontSize: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 8,
    backgroundColor: '#FFF',
    marginBottom: 16,
  },
  fornecedorContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 12,
    elevation: 2,
  },
  infoContainer: {
    flex: 1,
    marginLeft: 12,
  },
  nomeFornecedor: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  detalheFornecedor: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  imagemFornecedor: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  actionButton: {
    marginTop: 8,
    padding: 8,
    backgroundColor: '#DDDDDD',
    borderRadius: 5,
    width: 80,
    alignItems: 'center',
  },
  actionText: {
    color: '#333',
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#999',
    marginTop: 20,
  },
});

export default ListaFornecedores;
