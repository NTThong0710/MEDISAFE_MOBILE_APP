import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import MedicationScreen from '../screens/MedicationScreen';
import ProfileScreen from '../screens/ProfileScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import SymptomSearchScreen from '../screens/SymptomSearchScreen';
import HealthConditionLookupScreen from '../screens/HealthConditionLookupScreen';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{
          //tabBarLabel: 'Trang Chủ',
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" color={color} size={size} />
          ),
        }} 
      />
      <Tab.Screen 
        name="Medication" 
        component={MedicationScreen} 
        options={{
          tabBarLabel: 'Thuốc',
          tabBarIcon: ({ color, size }) => (
            <Icon name="local-hospital" color={color} size={size} />
          ),
        }} 
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen} 
        options={{
          tabBarLabel: 'Hồ sơ',
          tabBarIcon: ({ color, size }) => (
            <Icon name="person" color={color} size={size} />
          ),
        }} 
      />
      <Tab.Screen 
        name="SymptomSearch" 
        component={SymptomSearchScreen} 
        options={{
          tabBarLabel: 'Triệu chứng',
          tabBarIcon: ({ color, size }) => (
            <Icon name="search" color={color} size={size} />
          ),
        }} 
      />
      <Tab.Screen 
        name="HealthConditionLookup" 
        component={HealthConditionLookupScreen} 
        options={{
          tabBarLabel: 'Tra Cứu Bệnh',
          tabBarIcon: ({ color, size }) => (
            <Icon name="info" color={color} size={size} />
          ),
        }} 
      />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Main" component={MainTabNavigator} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
