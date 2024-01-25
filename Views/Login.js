import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { View, Alert, Image, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import TextInputField from '../Component/TextInputField';
import Header from '../Component/header';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import Loader from '../Component/loader';
import URL from '../Component/API';

export default Login = function ({ navigation, onLogin, route }) {
  const URLAuth = `${URL}/customer/auth/login`;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [progress, setProgress] = useState(false);
  const [isButtonEnabled, setButtonEnabled] = useState(false);

  const handleEmailChange = (text) => {
    setEmail(text);
    checkButtonState(text, password);
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
    checkButtonState(email, text);
  };

  const checkButtonState = (emailValue, passwordValue) => {
    if (emailValue.trim() !== '' && passwordValue.trim() !== '') {
      setButtonEnabled(true);
    } else {
      setButtonEnabled(false);
    }
  };

  const handleKeyPress1 = ({ nativeEvent }) => {
    if (nativeEvent.key === 'Backspace') {
      // Xóa ký tự cuối cùng từ nội dung TextInput
      const newEmail = email.slice(0, -1);
      setEmail(newEmail);
    }
  };

  const handleKeyPress2 = ({ nativeEvent }) => {
    if (nativeEvent.key === 'Backspace') {
      // Xóa ký tự cuối cùng từ nội dung TextInput
      const newPassword = password.slice(0, -1);
      setPassword(newPassword);
    }
  };

  const dispatch = useDispatch();
  const updateData = (customer) => {
    try {
      dispatch({ type: 'LOGIN', customer: customer });
    } catch (error) {
      console.log(error);
    }
  }
  const setToken = (token) => {
    try {
      dispatch({ type: 'SET_TOKEN', token: token });
    } catch (error) {
      console.log(error);
    }
  }

  const checkLogin = () => {
    const format = {
      username: email,
      password: password
    }
    axios.post(URLAuth, format)
      .then((response) => {
        if (isButtonEnabled) {
          if (response.data.code === 200) {
            const data = response.data.data;
            console.log(response.data);
            setToken(data.token);
            onLogin();
            const { onLoginSuccess } = route.params || {};
            if (onLoginSuccess) {
              onLoginSuccess();
              setProgress(false);
            }
          }
          else {
            Alert.alert('Thông Báo!', 'Tài khoản hoặc mật khẩu không chính xác. Vui lòng thử lại!');
            setProgress(false);
          }
        } else {
          Alert.alert('Thông Báo!', 'Vui lòng nhập thông tin đăng nhập!');
          setProgress(false);
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <Header iconSource={require('./Image/icon_xx.png')} onPress={() => { navigation.goBack() }} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ alignItems: 'center' }}>
          <Image source={require('./Image/Bap.png')} style={{ width: 190, height: 190, marginTop: '10%' }} />
          <Text style={{ fontSize: 17, color: 'black', fontWeight: '600', marginTop: 10 }}>Đăng Nhập Với Tài Khoản Của Bạn</Text>
        </View>

        <View style={{ alignItems: 'center', width: '100%', marginTop: 40 }}>
          <TextInputField style={{ marginTop: 80 }}
            iconSource={require('./Image/icon_person.png')}
            placeholder="Tên tài khoản"
            onChangeText={handleEmailChange}
            value={email}
            autoCapitalize="none"
            onKeyPress={handleKeyPress1}
          />

          <TextInputField
            iconSource={require('./Image/icon_lock.png')}
            placeholder="Mật khẩu"
            onChangeText={handlePasswordChange}
            value={password}
            secureTextEntry={true}
            autoCapitalize="none"
            onKeyPress={handleKeyPress2}
          />
        </View>
      </ScrollView>


      <TouchableOpacity style={[styles.button, { backgroundColor: isButtonEnabled ? '#999900' : '#DCDCDC' }]}
        onPress={() => {
          setProgress(true);
          checkLogin();
        }
        }
      >
        <Text style={{ color: isButtonEnabled ? 'white' : '#F5F5F5', fontSize: 16, fontWeight: '600' }}>Đăng nhập</Text>
      </TouchableOpacity>

      <View style={{ flexDirection: 'row', width: '100%', height: '7%', marginTop: 20, borderTopWidth: 0.2, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ marginTop: 10, marginRight: 10 }}>Người dùng mới?</Text>
        <TouchableOpacity style={{ borderWidth: 1, width: 100, height: 35, justifyContent: 'center', alignItems: 'center', borderRadius: 3, marginTop: 10 }}
          onPress={() => {
            navigation.navigate('Register');
          }}
        >
          <Text style={{ color: '#999900', fontWeight: '600' }}>Đăng ký</Text>
        </TouchableOpacity>
      </View>
      {progress ? <Loader indeterminate={progress} /> : null}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    width: '88%',
    height: 45,
    backgroundColor: 'white',
    borderWidth: 0.2,
    borderRadius: 4,
    marginTop: 15,
  },
  icon: {
    width: 15,
    height: 15,
    marginTop: 14,
    marginLeft: 10,
  },
  input: {
    marginLeft: 10,
    width: '100%',
    height: '100%',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 360,
    height: 45,
    borderRadius: 5,
    opacity: 1,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1
  },
});
