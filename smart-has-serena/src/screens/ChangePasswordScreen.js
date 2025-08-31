import { Feather } from '@expo/vector-icons';
import { useState } from 'react';
import { Alert, SafeAreaView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import api from '../services/api';

const COLORS = {
  primary: '#48466D',
  white: '#FFFFFF',
  lightGray: '#F5F5F5',
  text: '#333333',
  placeholder: '#888888'
};

const ChangePasswordScreen = ({ navigation }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmationPassword, setConfirmationPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword || !confirmationPassword) {
      Alert.alert('Atenção', 'Por favor, preencha todos os campos.');
      return;
    }
    if (newPassword !== confirmationPassword) {
      Alert.alert('Erro', 'A nova senha e a confirmação não coincidem.');
      return;
    }

    setIsLoading(true);
    try {
      await api.put('/api/users/change-password', {
        currentPassword,
        newPassword,
        confirmationPassword,
      });

      Alert.alert('Sucesso', 'Sua senha foi alterada!');
      navigation.goBack();

    } catch (error) {
      console.error('Erro ao alterar senha:', error.response?.data || error.message);
      Alert.alert('Erro', 'Não foi possível alterar a senha. Verifique se sua senha atual está correta.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={26} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Alterar Senha</Text>
        <View style={{ width: 26 }} />
      </View>

      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Senha Atual"
          placeholderTextColor={COLORS.placeholder}
          secureTextEntry
          value={currentPassword}
          onChangeText={setCurrentPassword}
        />
        <TextInput
          style={styles.input}
          placeholder="Nova Senha"
          placeholderTextColor={COLORS.placeholder}
          secureTextEntry
          value={newPassword}
          onChangeText={setNewPassword}
        />
        <TextInput
          style={styles.input}
          placeholder="Confirmar Nova Senha"
          placeholderTextColor={COLORS.placeholder}
          secureTextEntry
          value={confirmationPassword}
          onChangeText={setConfirmationPassword}
        />
        <TouchableOpacity style={styles.button} onPress={handleChangePassword} disabled={isLoading}>
          <Text style={styles.buttonText}>
            {isLoading ? 'Salvando...' : 'Salvar Alterações'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: COLORS.lightGray },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        paddingVertical: 12,
        backgroundColor: COLORS.white,
        borderBottomWidth: 1,
        borderBottomColor: '#EAEAEA',
    },
    headerTitle: { fontSize: 20, fontWeight: 'bold', color: COLORS.primary },
    container: { flex: 1, padding: 20 },
    input: {
        backgroundColor: COLORS.white,
        padding: 15,
        borderRadius: 10,
        marginBottom: 20,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#ddd',
        color: COLORS.text,
    },
    button: {
        backgroundColor: COLORS.primary,
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: COLORS.white,
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default ChangePasswordScreen;