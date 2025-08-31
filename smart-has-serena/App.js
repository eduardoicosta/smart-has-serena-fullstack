import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import AppNavigator from './src/navigation/AppNavigator';
import CustomDrawerContent from './src/navigation/CustomDrawerContent';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={{ headerShown: false }} 
        drawerContent={props => <CustomDrawerContent {...props} />}
      >
        {/*Stack inteiro*/}
        <Drawer.Screen name="AppStack" component={AppNavigator} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}