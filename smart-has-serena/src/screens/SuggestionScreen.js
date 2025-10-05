import { Feather } from '@expo/vector-icons';
import { useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { getSuggestion } from '../services/api';

const SuggestionScreen = () => {
  const [suggestion, setSuggestion] = useState('Clique no botão abaixo para receber uma sugestão de bem-estar para o seu dia.');
  const [loading, setLoading] = useState(false);

  const fetchSuggestion = async () => {
    setLoading(true);
    setSuggestion('');
    try {
      const response = await getSuggestion();
      setSuggestion(response.data.suggestion);
    } catch (error) {
      console.error("Erro ao buscar sugestão:", error);
      Alert.alert("Erro", "Não foi possível buscar uma sugestão. Verifique sua conexão e tente novamente.");
      setSuggestion('Ocorreu um erro. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {loading ? (
          <ActivityIndicator size="large" color="#48466D" />
        ) : (
          <Text style={styles.suggestionText}>{suggestion}</Text>
        )}
      </View>
      <TouchableOpacity style={styles.button} onPress={fetchSuggestion} disabled={loading}>
        <Feather name="sun" size={24} color="white" />
        <Text style={styles.buttonText}>Gerar Nova Sugestão</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f2f5',
    padding: 20,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 25,
    width: '100%',
    minHeight: 200,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    marginBottom: 40,
  },
  suggestionText: {
    fontSize: 22,
    textAlign: 'center',
    color: '#333',
    fontStyle: 'italic',
    lineHeight: 30,
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#48466D',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  }
});

export default SuggestionScreen;