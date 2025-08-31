import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Logo from '../../assets/images/serena_logotipo.png';
import api from '../services/api';


const SignUpScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const handleSignUp = async () => {
    if (!name || !email || !password) {
      Alert.alert('Atenção', 'Por favor, preencha nome, e-mail e senha.');
      return;
    }

    setIsLoading(true);
    const fullName = `${name} ${lastName}`.trim();
    try {
      const response = await api.post('/api/auth/register', {
        name: fullName,
        email: email,
        password: password,
      });

      const { token } = response.data;

      await AsyncStorage.setItem('userToken', token);

      navigation.replace('Home');

    } catch (error) {
      console.error('Falha no cadastro:', error.response?.data || error.message);
      Alert.alert('Erro no Cadastro', 'Não foi possível criar a conta. Verifique os dados ou tente outro e-mail.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* JSX (a parte visual)*/}
      <Image source={Logo} style={styles.logo} />
      <Text style={styles.title}>Faça sua conta</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Nome"
        placeholderTextColor="#48466D"
        value={name}
        onChangeText={setName}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Sobrenome"
        placeholderTextColor="#48466D"
        value={lastName}
        onChangeText={setLastName}
      />

      <TextInput
        style={styles.input}
        placeholder="E-mail"
        placeholderTextColor="#48466D"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="#48466D"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <View style={styles.checkboxContainer}>
        <TouchableOpacity style={styles.checkbox} />
        <Text style={styles.termsText}>Li e concordo com os Termos de Uso e Política de Privacidade.</Text>
      </View>
      
      {/*botão*/}
      <TouchableOpacity 
        style={styles.button} 
        onPress={handleSignUp} 
        disabled={isLoading}
      >
        <Text style={styles.buttonText}>
          {isLoading ? 'Criando...' : 'Criar'}
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.loginText}>Já possuo uma conta</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6EBF9',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    width: 230,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#48466D',
  },
  input: {
    width: '100%',
    color: '#48466D',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#48466D',
  },  
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#777',
    marginRight: 10,
  },
  termsText: {
    flex: 1,
    color: '#555',
  },
  button: {
    width: '100%',
    backgroundColor: '#48466D',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginText: {
    marginTop: 20,
    color: '#48466D',
    fontWeight: 'bold',
  },
});

export default SignUpScreen;