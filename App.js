import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider } from './src/AuthContext';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import HomeScreen from './src/screens/HomeScreen';
import MedicationScreen from './src/screens/MedicationScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import HealthConditionLookupScreen from './src/screens/HealthConditionLookupScreen';
import SymptomSearchScreen from './src/screens/SymptomSearchScreen';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Import biểu tượng

const Stack = createNativeStackNavigator();

const HeaderTitle = () => (
  <View style={styles.headerContainer}>
    {/* <Icon name="home" size={28} color="#FFFFFF" /> */}
    {/* <Text style={styles.headerText}>Trang Chủ</Text> */}
  </View>
);

const App = () => {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen 
            name="Login" 
            component={LoginScreen} 
            options={{ headerShown: false }} 
          />
          <Stack.Screen 
            name="Register" 
            component={RegisterScreen} 
            options={{ headerShown: false }} 
          />
          <Stack.Screen 
            name="Home" 
            component={HomeScreen} 
            options={{ 
              headerStyle: styles.headerStyle,
              headerTitle: HeaderTitle, 
              headerTintColor: '#FFFFFF',
              headerTitleAlign: 'center',
            }} 
          />
          <Stack.Screen 
            name="Medication" 
            component={MedicationScreen} 
            options={{ 
              headerStyle: styles.headerStyle,
              headerTitle: () => <HeaderTitle />,
              headerTintColor: '#FFFFFF',
              headerTitleAlign: 'center',
            }} 
          />
          <Stack.Screen 
            name="Profile" 
            component={ProfileScreen} 
            options={{ 
              headerStyle: styles.headerStyle,
              headerTitle: () => <HeaderTitle />,
              headerTintColor: '#FFFFFF',
              headerTitleAlign: 'center',
            }} 
          />
          <Stack.Screen 
            name="HealthConditionLookup" 
            component={HealthConditionLookupScreen} 
            options={{ 
              headerStyle: styles.headerStyle,
              headerTitle: () => <HeaderTitle />,
              headerTintColor: '#FFFFFF',
              headerTitleAlign: 'center',
            }} 
          />
          <Stack.Screen 
            name="SymptomSearch" 
            component={SymptomSearchScreen} 
            options={{ 
              headerStyle: styles.headerStyle,
              headerTitle: () => <HeaderTitle />,
              headerTintColor: '#FFFFFF',
              headerTitleAlign: 'center',
            }} 
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
};

// Style cho Header
const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: '#003366',
    elevation: 10, // Tạo bóng đổ
    shadowColor: '#000', // Màu bóng đổ
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    color: '#FFFFFF',
    fontSize: 20, // Kích thước chữ lớn hơn
    marginLeft: 8, // Khoảng cách giữa biểu tượng và chữ
  },
});



export default App;
