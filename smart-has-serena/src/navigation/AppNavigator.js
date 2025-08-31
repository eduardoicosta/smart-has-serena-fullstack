import { createStackNavigator } from '@react-navigation/stack';

import AnalysisScreen from '../screens/AnalysisScreen';
import ChangePasswordScreen from '../screens/ChangePasswordScreen';
import DetailsScreen from '../screens/DetailsScreen';
import HistoryScreen from '../screens/HistoryScreen';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import ProfessionalsMapScreen from '../screens/ProfessionalsMapScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SignUpScreen from '../screens/SignUpScreen';
import SuggestionScreen from '../screens/SuggestionScreen';
import WelcomeScreen from '../screens/WelcomeScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {

  return (
    <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
      <Stack.Screen name="Details" component={DetailsScreen} options={{ headerShown: true }} />
      <Stack.Screen name="Suggestion" component={SuggestionScreen} options={{ title: 'Sugestão de Bem-Estar', headerShown: true }} />
      <Stack.Screen name="Analysis" component={AnalysisScreen} options={{ title: 'Análise Emocional', headerShown: true }} />
      <Stack.Screen name="History" component={HistoryScreen} options={{ headerShown: false }} />
      <Stack.Screen name="ProfessionalsMap" component={ProfessionalsMapScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;