import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

// Lembre-se de trocar pelo IP da sua máquina!
const API_URL = 'http://192.168.1.8:8080';

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('userToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;