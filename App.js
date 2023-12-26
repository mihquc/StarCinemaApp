import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, TextInput, Image, Text, TouchableOpacity, StyleSheet, SafeAreaView, LogBox } from 'react-native';
LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);
import Home from './Views/Home';
import Login from './Views/Login';
import Register from './Views/Register';
import Film from './Views/Film';
import Cinema from './Views/Cinema';
import Account from './Views/Account';
import Profile from './Views/Profile';
import Movies from './Views/Movies';
import Showtime from './Views/Showtime';
import Room from './Views/Room';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Discount from './Views/Discount';
import ShowtimeAddress from './Views/ShowtimebyAddress';
import { Provider } from 'react-redux';
// import { store } from './Redux/store';
import { createStore } from 'redux';
import rootReducer from './Redux/reducers';
import Payment from './Views/Payment';
import UpdateProfile from './Views/UpdateProfile';
import UpdatePassword from './Views/UpdatePassword';


const Tab = createBottomTabNavigator();

function MyTabs({isLoggedIn, onLogout, customer}) {

  return (
    <Tab.Navigator screenOptions={{headerShown: false, tabBarShowLabel: false}}>
      <Tab.Screen name="Trang chủ" component={Home} 
        options={{
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', justifyContent: 'center', top: 8}}>
              <Image source={require('./Views/Image/icon_home.png')} style={{width: 20, height: 20, tintColor: focused ? '#6600CC' : 'gray'}}/>
              <Text style={{color: focused ? '#6600CC' : 'white', fontSize: 12, marginTop: 3}}>Trang chủ</Text>
            </View>
          )
        }}
      />
      <Tab.Screen name="Rạp phim" component={Cinema}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', justifyContent: 'center', top: 8}}>
              <Image source={require('./Views/Image/icon_cinema1.png')} style={{width: 20, height: 20, tintColor: focused ? '#6600CC' : 'gray'}}/>
              <Text style={{color: focused ? '#6600CC' : 'white', fontSize: 12, marginTop: 3}}>Rạp phim</Text>
            </View>
          )
        }}
      />
      <Tab.Screen name="Điện ảnh" component={Film}
        options={{  
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', justifyContent: 'center', top: 8}}>
              <Image source={require('./Views/Image/icon_film.png')} style={{width: 20, height: 20, tintColor: focused ? '#6600CC' : 'gray'}}/>
              <Text style={{color: focused ? '#6600CC' : 'white', fontSize: 12, marginTop: 3}}>Điện ảnh</Text>
            </View>
          )
        }}
      />
      <Tab.Screen name="Tài khoản" component={isLoggedIn ? Profile : Account}
        options={({}) => ({
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', justifyContent: 'center', top: 8}}>
              <Image source={require('./Views/Image/icon_person.png')} style={{width: 20, height: 20, tintColor: focused ? '#6600CC' : 'gray'}}/>
              <Text style={{color: focused ? '#6600CC' : 'white', fontSize: 12, marginTop: 3}}>Tài khoản</Text>
            </View>
          ),
        })}
        initialParams={{ onLogout }}
      />
    </Tab.Navigator>
  );
}

const Stack = createNativeStackNavigator();
const store = createStore(rootReducer);

export default function App({navigation}) {
  const [isLoggedIn, setLoggedIn] = useState(false);
  // const [customer, setCustomer] = useState(null);
  const handleLogin = () => {
    setLoggedIn(true);
  };
  const handleLogout = () => {
    setLoggedIn(false);
  };

  return(
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="MyTabs" screenOptions={{headerShown: false}}>
          <Stack.Screen name="Login">{(props) => <Login {...props} onLogin={handleLogin} />}</Stack.Screen>
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="MyTabs" >{(props) => <MyTabs {...props} isLoggedIn={isLoggedIn} onLogout={handleLogout}/>}</Stack.Screen>
          <Stack.Screen name="Movies" component={Movies} />
          <Stack.Screen name="Showtime">{(props) => <Showtime {...props} isLoggedIn={isLoggedIn} onLogout={handleLogout}/>}</Stack.Screen>
          <Stack.Screen name="Room" component={Room} />
          <Stack.Screen name="Discount" component={Discount} />
          <Stack.Screen name="Payment" component={Payment} />
          <Stack.Screen name="UpdateProfile" component={UpdateProfile}/>
          <Stack.Screen name="UpdatePassword" component={UpdatePassword}/>
          <Stack.Screen name="ShowtimeAddress">{(props) => <ShowtimeAddress {...props} isLoggedIn={isLoggedIn} onLogout={handleLogout}/>}</Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}
const styles = StyleSheet.create({
});