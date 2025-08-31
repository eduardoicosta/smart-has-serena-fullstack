import { Feather } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import api from '../services/api';

const COLORS = {
  primary: '#48466D',
  white: '#FFFFFF',
  lightGray: '#F5F5F5',
  text: '#333333',
  gray: '#A9A9A9',
  border: '#EAEAEA',
  danger: '#D9534F',
};

const HistoryScreen = ({ navigation }) => {
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await api.get('/api/history');
        const sortedHistory = response.data.sort((a, b) => new Date(b.eventTimestamp) - new Date(a.eventTimestamp));
        setHistory(sortedHistory);
      } catch (err) {
        console.error("Erro ao buscar histórico:", err);
        setError('Não foi possível carregar o histórico. Tente novamente mais tarde.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchHistory();
  }, []);

  const handleDelete = (recordId) => {
    Alert.alert(
      "Apagar Registro",
      "Tem certeza que deseja apagar este item do histórico?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Sim, Apagar",
          style: "destructive",
          onPress: async () => {
            try {
              await api.delete(`/api/history/${recordId}`);
              setHistory(currentHistory => 
                currentHistory.filter(item => item.id !== recordId)
              );
            } catch (err) {
              console.error("Erro ao apagar registro:", err);
              Alert.alert("Erro", "Não foi possível apagar o registro.");
            }
          },
        },
      ]
    );
  };

  const renderHistoryItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <View style={styles.itemContent}>
        <Text style={styles.itemText}>{item.eventDescription}</Text>
        <Text style={styles.itemTimestamp}>
          {new Date(item.eventTimestamp).toLocaleString('pt-BR', {
            day: '2-digit', month: '2-digit', year: 'numeric',
            hour: '2-digit', minute: '2-digit'
          })}
        </Text>
      </View>
      <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.deleteButton}>
        <Feather name="trash-2" size={20} color={COLORS.danger} />
      </TouchableOpacity>
    </View>
  );

  const renderContent = () => {
    if (isLoading) {
      return <ActivityIndicator size="large" color={COLORS.primary} style={styles.centered} />;
    }
    if (error) {
      return <Text style={styles.centeredText}>{error}</Text>;
    }
    if (history.length === 0) {
      return <Text style={styles.centeredText}>Nenhum registro de histórico encontrado.</Text>;
    }
    return (
      <FlatList
        data={history}
        renderItem={renderHistoryItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.listContainer}
      />
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={26} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Histórico de Conversas</Text>
        <View style={{ width: 26 }} />
      </View>
      <View style={styles.content}>
        {renderContent()}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.lightGray,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 12,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  content: {
    flex: 1,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredText: {
    flex: 1,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 16,
    color: COLORS.gray,
  },
  listContainer: {
    padding: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  itemContent: {
    flex: 1,
  },
  itemText: {
    fontSize: 16,
    color: COLORS.text,
    marginBottom: 8,
  },
  itemTimestamp: {
    fontSize: 12,
    color: COLORS.gray,
    textAlign: 'right',
  },
  deleteButton: {
    paddingLeft: 12,
  },
});

export default HistoryScreen;