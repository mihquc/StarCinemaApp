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
import Profile from './Views/Profile';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

function MyTabs({isLoggedIn, onLogout}) {

  return (
    <Tab.Navigator screenOptions={{headerShown: false, tabBarShowLabel: false}}>
      <Tab.Screen name="Trang chủ" component={Home} 
        options={{
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', justifyContent: 'center', top: 8}}>
              <Image source={require('./Views/Image/icon_home.png')} style={{width: 20, height: 20, tintColor: focused ? 'red' : 'gray'}}/>
              <Text style={{color: focused ? 'red' : 'white', fontSize: 12}}>Trang chủ</Text>
            </View>
          )
        }}
      />
      <Tab.Screen name="Rạp phim" component={Cinema}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', justifyContent: 'center', top: 8}}>
              <Image source={require('./Views/Image/icon_cinema1.png')} style={{width: 20, height: 20, tintColor: focused ? 'red' : 'gray'}}/>
              <Text style={{color: focused ? 'red' : 'white', fontSize: 12}}>Rạp phim</Text>
            </View>
          )
        }}
      />
      <Tab.Screen name="Điện ảnh" component={Film}
        options={{  
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', justifyContent: 'center', top: 8}}>
              <Image source={require('./Views/Image/icon_film.png')} style={{width: 20, height: 20, tintColor: focused ? 'red' : 'gray'}}/>
              <Text style={{color: focused ? 'red' : 'white', fontSize: 12}}>Điện ảnh</Text>
            </View>
          )
        }}
      />
      <Tab.Screen name="Tài khoản" component={isLoggedIn ? (props) => <Profile {...props}
            isLoggedIn={isLoggedIn}
            onLogout={() => {
              onLogout(); // Gọi hàm từ prop để cập nhật trạng thái từ component cha
            }}/> : Account}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', justifyContent: 'center', top: 8}}>
              <Image source={require('./Views/Image/icon_person.png')} style={{width: 20, height: 20, tintColor: focused ? 'red' : 'gray'}}/>
              <Text style={{color: focused ? 'red' : 'white', fontSize: 12}}>Tài khoản</Text>
            </View>
          )
        }}
      />
    </Tab.Navigator>
  );
}

const Stack = createNativeStackNavigator();

export default function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    setLoggedIn(true);
  };

  return(
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MyTabs" screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login">{(props) => <Login {...props} onLogin={handleLogin} />}</Stack.Screen>
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="MyTabs" >{(props) => <MyTabs {...props} isLoggedIn={isLoggedIn} />}</Stack.Screen>
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
