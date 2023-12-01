import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import DatePicker from 'react-native-date-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { View, TextInput, Image, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Platform, Pressable, Modal, KeyboardAvoidingView} from 'react-native';
import TextInputField from '../Component/TextInputField';
import Header from '../Component/header';

export default Register = function({navigation}) {

  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [textDate, setTextDate] = useState('');

  const toggleDatePicker = () => {
    setShow(!show);
  };
  
  const onChange = ({type}, selectedDate) => {
    if(type == 'set'){
      const currentDate = selectedDate;
      setDate(currentDate);

      if(Platform.OS === 'android'){
        toggleDatePicker();
        setTextDate(formatDate(currentDate));
      }
    }else{
      toggleDatePicker();
    }
  };

  const confirm = () => {
    setTextDate(formatDate(date));
    toggleDatePicker();
    checkButtonState(name, email, phone, gender, textDate, password, password1);
  }

  const formatDate = (text) => {
    let date = new Date(text);

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    month = (month < 10) ? `0${month}` : month;
    day = (day < 10) ? `0${day}` : day;

    return `${day}-${month}-${year}`;
  }

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password1, setPassword1] = useState('');
  const [isButtonEnabled, setButtonEnabled] = useState(false);

  const handleNameChange = (text) => {
    setName(text);
    checkButtonState(text, email, phone, gender, textDate, password, password1);
  };

  const handleEmailChange = (text) => {
    setEmail(text);
    checkButtonState(name, text, phone, gender, textDate, password, password1);
  };  

  const handlePhoneChange = (text) => {
    setPhone(text);
    checkButtonState(name, email, text, gender, textDate, password, password1);
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
    checkButtonState(name, email, phone, gender, textDate, text, password1);
  };
  
  const handlePassword1Change = (text) => {
    setPassword1(text);
    checkButtonState(name, email, phone, gender, textDate, password, text);
  };

  const checkButtonState = (nameValue, emailValue, phoneValue, genderValue, dateValue, passwordValue, password1Value) => {
    if (nameValue.trim() !== '' && emailValue.trim() !== '' && phoneValue.trim() !== '' && 
    genderValue.trim() !== '' && dateValue.trim() !== '' && passwordValue.trim() !== '' && password1Value.trim() !== '') {
      setButtonEnabled(true);
    } else {
      setButtonEnabled(false);
    }
  };

  const [gender, setGender] = useState('');

  const handleGenderChange = (value) => {
    setGender(value);
    checkButtonState(name, email, phone, value, textDate, password, password1);
  };

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
          alignItems: 'center',}}>
          
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
  return(
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto"/>
      <Header iconSource={require('./Image/icon_xx.png')} onPress={() => {navigation.goBack()}}/>
      <KeyboardAwareScrollView style={{ width: '100%', height: '88%'}}
        showsVerticalScrollIndicator={false}
        extraScrollHeight={0} // Chiều cao bổ sung khi bàn phím hiện lên
        enableOnAndroid={true} // Cho phép trên Android
        enableAutomaticScroll={true} // Cho phép cuộn tự động khi TextInput được chọn
        >
        <View style={{ alignItems: 'center', justifyContent: 'center', width: '100%', marginVertical: '6%'}}>
          <Image source={require('./Image/Ghe.png')} style={{ width: 190, height: 190,}} />
          <Text style={{ fontSize: 17, color: 'black', fontWeight: '600'}}>Đăng Ký Thành Viên Star</Text>
        </View>

        <View style={{width: '100%', justifyContent: 'flex-start', alignItems: 'center', marginBottom: '6%'}}>
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

          <View style={{marginTop: 15}}>
            <Text>Giới tính (tùy chọn)</Text>
            <View style={{flexDirection: 'row', marginTop: 10}}>
              {renderRadioButton('male', 'Nam')}
              {renderRadioButton('female', 'Nữ')}
              {renderRadioButton('undefined', 'Chưa xác định')}
            </View>
          </View>

          <View style={[styles.inputContainer, {justifyContent: 'space-between'}]}>
            {!show && (
              <Pressable  
                style={{height: '100%', width: '80%'}}
                onPress={toggleDatePicker}
              >
                <TextInput
                  style={[styles.input, {}]}
                  placeholder="Ngày sinh"
                  editable={false}
                  value={textDate}
                  // onTextChange={setTextDate}
                  onPressIn={toggleDatePicker}
                />
              </Pressable>
            )}

            <View style={{height: '100%', width: '13%', justifyContent: 'center', alignItems: 'center'}}>
              <Image source={require('./Image/icon_calendar.png')} style={{width:18, height: 18, tintColor: 'gray'}} />
            </View>
          </View>

                  
          <Modal
              transparent={true}
              animationType="slide"
              visible={show}
              onRequestClose={() => {
                setShow(false);
              }}
            >
              <View style={{flex: 1, justifyContent: 'flex-end',}}>
                
                <View style={{ backgroundColor: 'white', borderTopWidth: 0.1, borderRadius: 30, height: '50%', margin: 20,
                    shadowOffset: { width: 0, height: 5}, shadowOpacity: 0.7}}>
                  <View style={{justifyContent: 'center', alignItems: 'center', height: '8%', borderBottomWidth: 0.2}}>
                    <Text style={{fontSize: 17, fontWeight: '500', color: 'purple'}}>Ngày sinh</Text>
                  </View>
                  {show && (
                    <DateTimePicker
                    style={{width: '100%',height: '65%',}}
                    textColor='black'
                    value={date}
                    mode='date'
                    display='spinner'
                    onChange={onChange}   
                    />
                  )}
                  <TouchableOpacity onPress={confirm} style={{ height: '13%', alignItems: 'center', justifyContent: 'center', borderTopWidth: 0.2, borderBottomWidth: 0.2}}>
                    <Text style={{fontSize: 20, color: 'purple'}}>Xác nhận</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={()=>{setShow(false)}} style={{height: '11%', alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{fontSize: 20, color: 'purple'}}>Đóng</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          
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

      <TouchableOpacity style={[styles.button, { backgroundColor: isButtonEnabled ? '#999900' : '#DCDCDC'}]}
        onPress={() => {
          if(isButtonEnabled)
          {
            if (password.trim() === password1.trim()) {
              navigation.navigate('Login', { email, password1 });
              console.log(email, password1);
            } else {
              alert('Mật khẩu không trùng khớp, vui lòng nhập lại.');
            }
          } else {
            alert('Vui lòng nhập đầy đủ thông tin.');
          }
        }}
        >
        <Text style={{ color: isButtonEnabled ? 'white' : '#F5F5F5', fontSize: 16, fontWeight: '600' }}>Hoàn tất</Text>
      </TouchableOpacity>

      <View style={{flexDirection: 'row', width: '100%', height: '7%', marginTop: 20, borderTopWidth: 0.2, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{marginTop: 10, marginRight: 10}}>Tài khoản đã được đăng ký!</Text>
        <TouchableOpacity style={{borderWidth: 1, width: 100, height: 35, justifyContent: 'center', alignItems: 'center', borderRadius: 3, marginTop: 10}}
          onPress={() => {
            navigation.navigate('Login');
          }}
        >
          <Text style={{color: '#999900', fontWeight: '600'}}>Đăng nhập</Text>
        </TouchableOpacity>
      </View>
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
      shadowOffset: { width: 0, height: 2},
      shadowOpacity: 0.1
    },
});