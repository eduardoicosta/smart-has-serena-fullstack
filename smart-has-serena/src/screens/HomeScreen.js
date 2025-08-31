import { Feather } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SerenaLogo from '../../assets/images/serena_logotipo.png';
import api from '../services/api';


const COLORS = {
  primary: '#48466D',
  secondary: '#E6EBF9',
  white: '#FFFFFF',
  lightGray: '#F5F5F5',
  text: '#333333',
  textLight: '#FFFFFF',
};

const HomeScreen = ({ navigation }) => {
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api.get('/api/profile');
        const user = response.data;
        
        const firstName = user.name.split(' ')[0]; 

        const initialMessage = {
          id: '1',
          text: `Olá, ${firstName}! Como você está se sentindo hoje?`,
          sender: 'serena',
        };
        
        setMessages([initialMessage]);

      } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error);
        const errorMessage = {
            id: '1',
            text: 'Olá! Não consegui carregar seu nome, mas como você está?',
            sender: 'serena',
        };
        setMessages([errorMessage]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleSendMessage = async () => {
    if (inputText.trim() === '') return;

    const userMessage = {
      id: Math.random().toString(),
      text: inputText,
      sender: 'user',
    };

    setMessages(prevMessages => [...prevMessages, userMessage]);
    
    const messageToSave = inputText;
    setInputText('');
    
    try {
      await api.post('/api/history', { eventDescription: messageToSave });
      console.log(`Mensagem salva com sucesso no BD: "${messageToSave}"`);
    } catch (error) {
      console.error('Erro ao salvar a mensagem no BD:', error);
    }

    setTimeout(() => {
        const serenaResponse = {
            id: Math.random().toString(),
            text: 'Entendo. Você gostaria de conversar mais sobre isso?',
            sender: 'serena',
        };
        setMessages(prevMessages => [...prevMessages, serenaResponse]);
    }, 1000);
  };

  const renderMessageItem = ({ item }) => {
    const isSerena = item.sender === 'serena';
    
    return (
      <View style={[
        styles.messageContainer,
        isSerena ? styles.serenaMessageContainer : styles.userMessageContainer
      ]}>
        <View style={[
          styles.chatBubble,
          isSerena ? styles.serenaChatBubble : styles.userChatBubble
        ]}>
          <Text style={isSerena ? styles.serenaChatText : styles.userChatText}>
            {item.text}
          </Text>
        </View>
      </View>
    );
  };

  if (isLoading) {
    return (
        <SafeAreaView style={[styles.safeArea, { justifyContent: 'center', alignItems: 'center' }]}>
            <ActivityIndicator size="large" color={COLORS.primary} />
        </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Feather name="menu" size={24} color={COLORS.primary} />
        </TouchableOpacity>

        <Image source={SerenaLogo} style={styles.logo} resizeMode="contain" />

        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Feather name="user" size={24} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.content}
        keyboardVerticalOffset={90}
      >
        <FlatList
          data={messages}
          renderItem={renderMessageItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.chatList}
          inverted
        />

        <View style={styles.chatInputContainer}>
          <TextInput
            style={styles.chatInput}
            placeholder="Converse com a Serena"
            placeholderTextColor="#888"
            value={inputText}
            onChangeText={setInputText}
          />
          <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
            <Feather name="send" size={22} color={COLORS.white} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
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
    paddingVertical: 10,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3.84,
    elevation: 3,
  },
  logo: {
    width: 100,
    height: 30,
  },
  content: {
    flex: 1,
  },
  chatList: {
    paddingHorizontal: 10,
    paddingTop: 10,
    flexGrow: 1,
    justifyContent: 'flex-end',
    flexDirection: 'column-reverse',
  },
  messageContainer: {
    marginVertical: 5,
    width: '100%',
  },
  serenaMessageContainer: {
    alignItems: 'flex-start',
  },
  userMessageContainer: {
    alignItems: 'flex-end',
  },
  chatBubble: {
    borderRadius: 20,
    padding: 15,
    maxWidth: '80%',
  },
  serenaChatBubble: {
    backgroundColor: COLORS.primary,
    borderBottomLeftRadius: 5,
  },
  userChatBubble: {
    backgroundColor: COLORS.white,
    borderBottomRightRadius: 5,
    borderColor: COLORS.primary,
    borderWidth: 1,
  },
  serenaChatText: {
    color: COLORS.textLight,
    fontSize: 16,
  },
  userChatText: {
    color: COLORS.text,
    fontSize: 16,
  },
  chatInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: COLORS.white,
  },
  chatInput: {
    flex: 1,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.secondary,
    paddingHorizontal: 20,
    fontSize: 16,
    color: COLORS.text,
  },
  sendButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
});

export default HomeScreen;