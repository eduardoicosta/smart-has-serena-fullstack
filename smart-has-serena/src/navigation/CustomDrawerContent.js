import { Feather } from '@expo/vector-icons';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const COLORS = {
  primary: '#48466D',
  white: '#FFFFFF',
  text: '#333333',
  gray: '#A9A9A9',
  border: '#EAEAEA',
};

const DrawerItem = ({ icon, label, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.drawerItem}>
    <Feather name={icon} size={22} color={COLORS.text} />
    <Text style={styles.drawerLabel}>{label}</Text>
  </TouchableOpacity>
);

const CustomDrawerContent = (props) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        {/* Header do Drawer com o Título */}
        <View style={styles.drawerHeader}>
          <Text style={styles.drawerHeaderText}>Menu</Text>
        </View>

        <View style={styles.container}>
          {/* Itens do Menu */}
          <DrawerItem 
            icon="map" 
            label="Mapa de Profissionais" 
            onPress={() => props.navigation.navigate('AppStack', { screen: 'ProfessionalsMap' })}
          />
          <DrawerItem 
            icon="help-circle" 
            label="Sugestão de bem-estar" 
            onPress={() => props.navigation.navigate('AppStack', { screen: 'Suggestion' })}
          />
          <DrawerItem 
            icon="bar-chart-2" 
            label="Análise emocional" 
            onPress={() => props.navigation.navigate('AppStack', { screen: 'Analysis' })}
          />
          
          {/* Divisória */}
          <View style={styles.separator} />
          
          <Text style={styles.subtitle}>Conversas</Text>
          
          <DrawerItem 
            icon="clock" 
            label="Histórico de conversas" 
            onPress={() => props.navigation.navigate('AppStack', { screen: 'History' })}
          />
        </View>
      </DrawerContentScrollView>
    </SafeAreaView>
  );

};

const styles = StyleSheet.create({
  drawerHeader: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    backgroundColor: COLORS.white,
  },
  drawerHeaderText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  container: {
    paddingTop: 20,
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  drawerLabel: {
    marginLeft: 20,
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.text,
  },
  separator: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 15,
    marginHorizontal: 20,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.gray,
    paddingHorizontal: 20,
    marginBottom: 10,
    marginTop: 10,
    textTransform: 'uppercase',
  }
});

export default CustomDrawerContent;