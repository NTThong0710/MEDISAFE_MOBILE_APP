import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MedicationScreen from './MedicationScreen';
import ProfileScreen from './ProfileScreen';
import HealthConditionLookupScreen from './HealthConditionLookupScreen';
import SymptomSearchScreen from './SymptomSearchScreen';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon1 from 'react-native-vector-icons/MaterialIcons';

const Tab = createBottomTabNavigator();

const HomeScreen = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false, 
        tabBarStyle: {
          backgroundColor: '#003366',
          borderTopColor: '#e0e0e0',
          height: 70,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 5,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: 'bold',
          paddingBottom: 5,
        },
        tabBarIconStyle: {
          marginBottom: 5,
        },
        tabBarActiveTintColor: '#00BFFF',
        tabBarInactiveTintColor: '#fff',
      }}
    >
      <Tab.Screen
        name="Medication"
        component={MedicationScreen}
        options={{
          tabBarLabel: 'Tra cứu thuốc',
          tabBarIcon: ({ color, size }) => (
            <Icon name="medicinebox" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="SymptomSearch"
        component={SymptomSearchScreen}
        options={{
          tabBarLabel: 'Tìm triệu chứng',
          tabBarIcon: ({ color, size }) => (
            <Icon name="search1" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="HealthConditionLookup"
        component={HealthConditionLookupScreen}
        options={{
          tabBarLabel: 'Tra cứu bệnh',
          tabBarIcon: ({ color, size }) => (
            <Icon1 name="local-hospital" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Hồ sơ',
          tabBarIcon: ({ color, size }) => (
            <Icon name="profile" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};



export default HomeScreen;
