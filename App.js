import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, TextInput, Image, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';

import Home from './Views/Home';
import Login from './Views/Login';
import Register from './Views/Register';
import Film from './Views/Film';
import Cinema from './Views/Cinema';
import Account from './Views/Account';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen name="Trang chủ" component={Home} 
        options={{
          tabBarIcon: () => (
            <Image source={require('./Views/Image/icon_home.png')} style={{width: 20, height: 20}}/>
          )
        }}
      />
      <Tab.Screen name="Rạp phim" component={Cinema}
        options={{
          tabBarIcon: () => (
            <Image source={require('./Views/Image/icon_cinema.png')} style={{width: 20, height: 20}}/>
          )
        }}
      />
      <Tab.Screen name="Điện ảnh" component={Film}
        options={{
          tabBarIcon: () => (
            <Image source={require('./Views/Image/icon_film.png')} style={{width: 20, height: 20}}/>
          )
        }}
      />
      <Tab.Screen name="Tài khoản" component={Account}
        options={{
          tabBarIcon: () => (
            <Image source={require('./Views/Image/icon_person.png')} style={{width: 20, height: 20}}/>
          )
        }}
      />
    </Tab.Navigator>
  );
}

const Stack = createNativeStackNavigator();

export default function App() {

  return(
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MyTabs" screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="MyTabs" component={MyTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
