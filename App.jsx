import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CadastroFornecedor from './components/Cadastro';
import ListaFornecedores from './components/Fornecedores';

const Stack = createNativeStackNavigator();

const App = () => {
  const [fornecedores, setFornecedores] = useState([]);

  const adicionarFornecedor = (novoFornecedor) => {
    setFornecedores((prevFornecedores) => [...prevFornecedores, novoFornecedor]);
  };

  const removerFornecedor = (fornecedorId) => {
    setFornecedores((prevFornecedores) =>
      prevFornecedores.filter((fornecedor) => fornecedor.id !== fornecedorId)
    );
  };

  const editarFornecedor = (fornecedorId, dadosAtualizados) => {
    setFornecedores((prevFornecedores) =>
      prevFornecedores.map((fornecedor) =>
        fornecedor.id === fornecedorId ? { ...fornecedor, ...dadosAtualizados } : fornecedor
      )
    );
  };

  const CadastroScreen = ({ navigation }) => (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.formContainer}>
        <CadastroFornecedor onCadastroSubmit={adicionarFornecedor} />
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Fornecedores')}
        >
          <Text style={styles.buttonText}>Ver Fornecedores</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );

  const FornecedoresScreen = () => (
    <ListaFornecedores
      fornecedores={fornecedores}
      onRemove={removerFornecedor}
      onEdit={editarFornecedor}
    />
  );

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Cadastro"
        screenOptions={{
          headerStyle: { backgroundColor: '#EAEAEA' },
          headerTintColor: '#444',
          headerTitleStyle: { fontWeight: '600' },
        }}
      >
        <Stack.Screen
          name="Cadastro"
          component={CadastroScreen}
          options={{ title: 'Cadastrar Fornecedor' }}
        />
        <Stack.Screen
          name="Fornecedores"
          component={FornecedoresScreen}
          options={{ title: 'Lista de Fornecedores' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  formContainer: {
    flex: 1,
    alignItems: 'center',
  },
  button: {
    marginTop: 20,
    paddingVertical: 14,
    paddingHorizontal: 30,
    backgroundColor: '#FFA500',
    borderRadius: 12,
    elevation: 4,
    shadowColor: '#333',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default App;
