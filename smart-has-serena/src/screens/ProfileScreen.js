import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
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

const ProfileMenuItem = ({ icon, text, onPress, isInfo = false, color = COLORS.text }) => (
  <TouchableOpacity
    style={styles.menuItem}
    onPress={onPress}
    disabled={isInfo}
  >
    <Feather name={icon} size={22} color={color === COLORS.danger ? COLORS.danger : COLORS.primary} />
    <Text style={[styles.menuItemText, { color: color }]}>{text}</Text>
    {!isInfo && (
      <Feather name="chevron-right" size={22} color={COLORS.gray} />
    )}
  </TouchableOpacity>
);

const ProfileScreen = ({ navigation }) => {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get('/api/profile');
        setProfile(response.data);
      } catch (error) {
        console.error("Erro ao buscar perfil:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleLogout = () => {
    Alert.alert(
      "Sair",
      "Tem certeza que deseja sair da sua conta?",
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Sim, Sair", 
          onPress: async () => {
            await AsyncStorage.removeItem('userToken');
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: 'Login' }],
              })
            );
          },
          style: 'destructive'
        }
      ]
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
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={26} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Perfil</Text>
        <View style={{ width: 26 }} />
      </View>

      <ScrollView style={styles.container}>
        <View style={styles.menuSection}>
          <ProfileMenuItem
            icon="user"
            text={profile ? profile.name : 'Carregando nome...'}
            isInfo={true}
          />
          <View style={styles.separator} />
          <ProfileMenuItem
            icon="mail"
            text={profile ? profile.email : 'Carregando email...'}
            isInfo={true}
          />
        </View>

        <View style={styles.menuSection}>
          {/* ***** LINHA ALTERADA ***** */}
          <ProfileMenuItem
            icon="lock"
            text="Alterar senha"
            onPress={() => navigation.navigate('ChangePassword')} 
          />
          <View style={styles.separator} />
          <ProfileMenuItem
            icon="help-circle"
            text="Ajuda"
            onPress={() => console.log('Navegar para Ajuda')}
          />
        </View>

        <View style={styles.menuSection}>
          <ProfileMenuItem
            icon="log-out"
            text="Sair"
            onPress={handleLogout}
            color={COLORS.danger}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: COLORS.lightGray, },
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 15, paddingVertical: 12, backgroundColor: COLORS.white, borderBottomWidth: 1, borderBottomColor: COLORS.border, },
    headerTitle: { fontSize: 20, fontWeight: 'bold', color: COLORS.primary, },
    container: { flex: 1, paddingHorizontal: 16, paddingTop: 20, },
    menuSection: { backgroundColor: COLORS.white, borderRadius: 12, marginBottom: 20, shadowColor: "#000", shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.08, shadowRadius: 4, elevation: 3, },
    menuItem: { flexDirection: 'row', alignItems: 'center', padding: 18, },
    menuItemText: { flex: 1, marginLeft: 18, fontSize: 16, color: COLORS.text, },
    separator: { height: 1, backgroundColor: COLORS.border, marginHorizontal: 18, },
});

export default ProfileScreen;