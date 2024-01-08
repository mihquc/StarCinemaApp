import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import DatePicker from 'react-native-date-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { View, TextInput, Image, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Platform, Pressable, Modal, KeyboardAvoidingView, Alert } from 'react-native';
import TextInputField from '../Component/TextInputField';
import Header from '../Component/header';
import axios from 'axios';
import Loader from '../Component/loader';
import URL from '../Component/API';

export default Register = function ({ navigation }) {
  // const URL = "https://65742768f941bda3f2af6a27.mockapi.io/api/mq/";
  const URLR = `${URL}/customer/auth/register`;

  const [name, setName] = useState('');
  const [userName, setUserName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password1, setPassword1] = useState('');
  const [isButtonEnabled, setButtonEnabled] = useState(false);

  const handleNameChange = (text) => {
    setName(text);
    checkButtonState(text, email, phone, gender, userName, password, password1);
  };

  const handleUserNameChange = (text) => {
    setUserName(text);
    checkButtonState(name, email, phone, gender, text, password, password1);
  };

  const handleEmailChange = (text) => {
    setEmail(text);
    checkButtonState(name, text, phone, gender, userName, password, password1);
  };

  const handlePhoneChange = (text) => {
    if (text.length <= 10) {
      setPhone(text);
      checkButtonState(name, email, text, gender, userName, password, password1);
    }
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
    checkButtonState(name, email, phone, gender, userName, text, password1);
  };

  const handlePassword1Change = (text) => {
    setPassword1(text);
    checkButtonState(name, email, phone, gender, userName, password, text);
  };

  const checkButtonState = (nameValue, emailValue, phoneValue, genderValue, userNameValue, passwordValue, password1Value) => {
    if (nameValue.trim() !== '' && emailValue.trim() !== '' && phoneValue.trim() !== '' &&
      genderValue.trim() !== '' && userNameValue.trim() !== '' && passwordValue.trim() !== '' && password1Value.trim() !== '') {
      setButtonEnabled(true);
    } else {
      setButtonEnabled(false);
    }
  };

  const [gender, setGender] = useState('');

  const handleGenderChange = (value) => {
    setGender(value);
    checkButtonState(name, email, phone, value, userName, password, password1);
  };
  const [progress, setProgress] = useState(false);
  const register = () => {
    if (isButtonEnabled) {
      if (password.trim() === password1.trim()) {
        const formatData = {
          nickName: name, email: email, phonenumber: phone, sex: (gender === "male") ? '0' : ((gender === "female") ? '1' : '2'),
          username: userName, password: password, avatar: ""
        }
        console.log("Post...");
        axios.post(URLR, formatData) // call api
          .then((response) => {
            console.log(response.data);
            if (response.data.code === 200) {
              navigation.navigate('Login', {
                onLoginSuccess: () => {
                  // Callback được gọi khi người dùng đăng nhập thành công
                  navigation.navigate('MyTabs', { screen: 'Profile' });
                }, userName, password1
              }
              );
              setProgress(false);
            } else {
              Alert.alert('Thông báo', response.data.msg);
              setProgress(false);
            }
          })
          .catch((error) => {
            console.log(error);
            setProgress(false);
          });

      } else {
        Alert.alert('Thông báo!', 'Mật khẩu không trùng khớp, vui lòng nhập lại.');
        setProgress(false);
      }
    } else {
      Alert.alert('Thông báo!', 'Vui lòng nhập đầy đủ thông tin.');
      setProgress(false);
    }
  }

  const renderRadioButton = (value, label) => (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 50,
      }}
      onPress={() => handleGenderChange(value)}>
      <View
        style={{
          marginRight: 8,
          width: 16,
          height: 16,
          borderRadius: 10,
          borderWidth: 0.5,
          borderColor: gender === value ? 'green' : 'gray',
          backgroundColor: gender === value ? 'green' : 'transparent',
          justifyContent: 'center',
          alignItems: 'center',
        }}>

        {gender === value && (
          <View
            style={{
              width: 7,
              height: 7,
              borderRadius: 5,
              backgroundColor: 'white',
            }}
          />
        )}
      </View>
      <Text>{label}</Text>
    </TouchableOpacity>
  );
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <Header iconSource={require('./Image/icon_xx.png')} onPress={() => { navigation.goBack() }} />
      <KeyboardAwareScrollView style={{ width: '100%', height: '88%' }}
        showsVerticalScrollIndicator={false}
        extraScrollHeight={0} // Chiều cao bổ sung khi bàn phím hiện lên
        enableOnAndroid={true} // Cho phép trên Android
        enableAutomaticScroll={true} // Cho phép cuộn tự động khi TextInput được chọn
      >
        <View style={{ alignItems: 'center', justifyContent: 'center', width: '100%', marginVertical: '6%' }}>
          <Image source={require('./Image/Ghe.png')} style={{ width: 190, height: 190, }} />
          <Text style={{ fontSize: 17, color: 'black', fontWeight: '600' }}>Đăng Ký Thành Viên Star</Text>
        </View>

        <View style={{ width: '100%', justifyContent: 'flex-start', alignItems: 'center', marginBottom: '6%' }}>
          <TextInputField
            iconSource={require('./Image/icon_person.png')}
            placeholder="Họ và tên"
            onChangeText={handleNameChange}
            value={name}
          />
          <TextInputField
            iconSource={require('./Image/icon_mail.png')}
            placeholder="Email"
            onChangeText={handleEmailChange}
            value={email}
            keyboardType="email-address"
          />

          <TextInputField
            iconSource={require('./Image/icon_iphone.png')}
            placeholder="Số điện thoại"
            onChangeText={handlePhoneChange}
            value={phone}
            keyboardType="numeric"
          />

          <View style={{ marginTop: 15, width: '88%', height: '10%', justifyContent: 'center' }}>
            <Text>Giới tính (tùy chọn)</Text>
            <View style={{ width: '100%', flexDirection: 'row', marginTop: 10 }}>
              {renderRadioButton('male', 'Nam')}
              {renderRadioButton('female', 'Nữ')}
              {renderRadioButton('undefined', 'Chưa xác định')}
            </View>
          </View>

          <TextInputField
            iconSource={require('./Image/icon_person.png')}
            placeholder="Tên tài khoản"
            onChangeText={handleUserNameChange}
            value={userName}
          />

          <TextInputField
            iconSource={require('./Image/icon_lock.png')}
            placeholder="Mật khẩu"
            onChangeText={handlePasswordChange}
            keyboardType='visible-password'
            value={password}
            secureTextEntry={true}
            autoCapitalize="none"
          />
          <TextInputField
            iconSource={require('./Image/icon_lock.png')}
            placeholder="Nhập lại mật khẩu"
            onChangeText={handlePassword1Change}
            keyboardType='visible-password'
            value={password1}
            secureTextEntry={true}
            autoCapitalize="none"
          />
        </View>

      </KeyboardAwareScrollView>

      <TouchableOpacity style={[styles.button, { backgroundColor: isButtonEnabled ? '#999900' : '#DCDCDC' }]}
        onPress={() => {
          setProgress(true);
          register();
        }}
      >
        <Text style={{ color: isButtonEnabled ? 'white' : '#F5F5F5', fontSize: 16, fontWeight: '600' }}>Hoàn tất</Text>
      </TouchableOpacity>

      <View style={{ flexDirection: 'row', width: '100%', height: '7%', marginTop: 20, borderTopWidth: 0.2, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ marginTop: 10, marginRight: 10 }}>Tài khoản đã được đăng ký!</Text>
        <TouchableOpacity style={{ borderWidth: 1, width: 100, height: 35, justifyContent: 'center', alignItems: 'center', borderRadius: 3, marginTop: 10 }}
          onPress={() => {
            navigation.navigate('Login');
          }}
        >
          <Text style={{ color: '#999900', fontWeight: '600' }}>Đăng nhập</Text>
        </TouchableOpacity>
      </View>
      {progress ? <Loader indeterminate={progress} /> : null}
    </SafeAreaView>
  )
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
    marginTop: '5%'
  },
  input: {
    marginLeft: 10,
    width: '100%',
    height: '100%',
  },
  icon: {
    width: 15,
    height: 15,
    marginTop: 14,
    marginLeft: 10,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '88%',
    height: 45,
    borderRadius: 5,
    opacity: 1,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1
  },
});