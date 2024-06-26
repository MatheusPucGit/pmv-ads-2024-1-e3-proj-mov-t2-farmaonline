import React, { useState } from 'react';
import { View, Button, Image, StyleSheet, Text, Alert } from 'react-native';
import { TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import Header2 from '../../template/header2';

export default function Cadastro() {
  const navigation = useNavigation();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  const handleNomeChange = (novoNome) => {
    setNome(novoNome);
  };

  const handleEmailChange = (novoEmail) => {
    setEmail(novoEmail);
  };

  const handleTelefoneChange = (novoTelefone) => {
    setTelefone(novoTelefone);
  };

  const handleSenhaChange = (novaSenha) => {
    setSenha(novaSenha);
  };

  const handleConfirmarSenhaChange = (novaConfirmacaoSenha) => {
    setConfirmarSenha(novaConfirmacaoSenha);
  };

  const isPasswordValid = (password) => {
    return password.length >= 8 && password.length <= 16; // Mínimo de 8 e máximo de 16 caracteres
  };

  const handleCadastro = async () => {
    if (senha !== confirmarSenha) {
      Alert.alert('Atenção', 'As senhas digitadas não coincidem.');
      return;
    }

    if (!isPasswordValid(senha)) {
      Alert.alert('Atenção', 'A senha deve ter entre 8 e 16 caracteres.');
      return;
    }

    try {
      const response = await fetch("http://10.0.2.2:5035/api/Cadastro", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nomeCompleto: nome,
          email: email,
          telefone: telefone,
          senha: senha,
          enderecoEntrega: {
            cep: "",
            estado: "",
            cidade: "",
            bairro: "",
            rua: "",
            numero: "",
            complemento: ""
          }
        })
      });

      if (!response.ok) {
        throw new Error('Erro na requisição: ' + response.status);
      }

      const data = await response.json();
      console.log(data);
      Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
      navigation.navigate('Login');
    } catch (error) {
      console.error('Erro:', error);
      if (error.message.includes('409')) {
        Alert.alert('Atenção', 'A conta com este e-mail já existe.');
      } else {
        Alert.alert('Atenção', 'Não foi possível cadastrar o usuário');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Header2/>
      <Image source={require('../../../assets/Logo1.png')} style={styles.sair} />
      <Text style={[styles.description, { color: '#74B0FF' }]}>Para criar sua conta, preencha todos os campos.</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome completo"
        placeholderTextColor="#999"
        value={nome}
        onChangeText={handleNomeChange}
        left={<TextInput.Icon icon="account" color="#74B0FF"> </TextInput.Icon>}
      />
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        placeholderTextColor="#999"
        value={email}
        onChangeText={handleEmailChange}
        keyboardType="email-address"
        left={<TextInput.Icon icon="email-outline" color="#74B0FF"> </TextInput.Icon>}
      />
      <TextInput
        style={styles.input}
        placeholder="Telefone"
        placeholderTextColor="#999"
        value={telefone}
        onChangeText={handleTelefoneChange}
        keyboardType="phone-pad"
        left={<TextInput.Icon icon="cellphone" color="#74B0FF"> </TextInput.Icon>}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="#999"
        value={senha}
        onChangeText={handleSenhaChange}
        secureTextEntry
        left={<TextInput.Icon icon="lock-outline" color="#74B0FF"> </TextInput.Icon>}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirmar Senha"
        placeholderTextColor="#999"
        value={confirmarSenha}
        onChangeText={handleConfirmarSenhaChange}
        secureTextEntry
        left={<TextInput.Icon icon="lock-outline" color="#74B0FF"> </TextInput.Icon>}
      />

      <View style={styles.buttonContainer}>
        <Button
          title="Criar conta"
          onPress={handleCadastro}
          color={'#74B0FF'}
        />
      </View>

      <View style={{ marginTop: 3 }}>
        <Text>Já tem uma conta? Clique aqui.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 25,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 2,
    marginBottom: 10,
    width: '100%',
    textAlign: 'left',
    backgroundColor: 'rgba(137, 137, 137, 0.1)',
  },
  logo: {
    width: 200,
    height: 150,
    resizeMode: 'contain',
    marginBottom: 35,
  },
  description: {
    marginBottom: 20,
    fontSize: 15,
    textAlign: 'justify',
  },
  buttonContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  sair: {
    height: 100,
  width:100,
  }
});
