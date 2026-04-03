import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LoginScreen from "./screens/LoginScreen";
import DashboardScreen from "./screens/DashboardScreen";
import UploadScreen from "./screens/UploadScreen";
import PracticeScreen from "./screens/PracticeScreen";
import CodingScreen from "./screens/CodingScreen";
import ResultsScreen from "./screens/ResultsScreen";
import { AuthProvider, useAuth } from "./context/AuthContext";

const Tab = createBottomTabNavigator();

function AppTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Upload" component={UploadScreen} />
      <Tab.Screen name="Practice" component={PracticeScreen} />
      <Tab.Screen name="Coding" component={CodingScreen} />
      <Tab.Screen name="Results" component={ResultsScreen} />
    </Tab.Navigator>
  );
}

function Root() {
  const { token } = useAuth();
  return <NavigationContainer>{token ? <AppTabs /> : <LoginScreen />}</NavigationContainer>;
}

export default function App() {
  return (
    <AuthProvider>
      <Root />
    </AuthProvider>
  );
}
