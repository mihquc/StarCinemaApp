import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import DatePicker from 'react-native-date-picker';
import { View, TextInput, Image, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView} from 'react-native';
import Login from './Login';

export default Register = function({navigation}) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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

  const [gender, setGender] = useState('');
  const [openPicker, setOpenPicker] = useState(false);
  const [date, setDate] = useState(new Date());

  const renderRadioButton = (value, label) => (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 50,
      }}
      onPress={() => setGender(value)}>
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
      <TouchableOpacity style={{width: '87%', height: '5%', justifyContent: 'flex-end'}} onPress={() => {
        navigation.goBack();
      }}>
        <Image source={require('./Image/icon_xx.png')}  style={{width: 16, height: 16,}}/>
      </TouchableOpacity>
      <ScrollView style={{ width: '100%', height: '88%'}} showsVerticalScrollIndicator={false}>
        <View style={{ alignItems: 'center', justifyContent: 'center', width: '100%', marginVertical: '6%'}}>
          <Image source={require('./Image/Ghe.png')} style={{ width: 190, height: 190,}} />
          <Text style={{ fontSize: 17, color: 'black', fontWeight: '600'}}>Đăng Ký Thành Viên Star</Text>
        </View>

        <View style={{width: '100%', justifyContent: 'flex-start', alignItems: 'center', marginBottom: '6%'}}>
          <View style={[styles.inputContainer]}>
            <Image source={require('./Image/icon_person.png')} style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Họ và tên"
              // onChangeText={handleNameChange}
              // value={name1}
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputContainer}>
            <Image source={require('./Image/icon_mail.png')} style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Email"
              // onChangeText={handleEmailChange}
              // value={email}
              autoCapitalize="none"
            />
          </View>

          <View style={[styles.inputContainer]}>
            <Image source={require('./Image/icon_phone.png')} style={{width:20, height: 20, marginLeft: 7, marginTop: 12}} />
            <TextInput
              style={[styles.input, {marginLeft: 8}]}
              placeholder="Số điện thoại"
              // onChangeText={handlePhoneChange}
              // value={phone}
              autoCapitalize="none"
            />
          </View>

          <View style={{marginTop: 15}}>
            <Text>Giới tính (tùy chọn)</Text>
            <View style={{flexDirection: 'row', marginTop: 10}}>
              {renderRadioButton('male', 'Nam')}
              {renderRadioButton('female', 'Nữ')}
              {renderRadioButton('undefined', 'Chưa xác định')}
            </View>
          </View>

          <TouchableOpacity style={[styles.inputContainer, {justifyContent: 'space-between'}]} onPress={() => {setOpenPicker(true)}}>
            <View style={{height: '100%', width: '24%', justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{color: '#D3D3D3',}}>
                Ngày sinh
              </Text>
            </View>
            <View style={{height: '100%', width: '13%', justifyContent: 'center', alignItems: 'center'}}>
              <Image source={require('./Image/icon_calendar.png')} style={{width:18, height: 18}} />
            </View>

            {(!openPicker) && ( 
              <DatePicker
                modal
                mode='date'
                
                open = {openPicker}
                date={date}
                onConfirm={(newDate) => {
                  setDate(newDate);
                  setOpenPicker(false);
                }}
                onCancel={()=>{
                  setOpenPicker(false);
                }}
              />
            )}
          </TouchableOpacity>

          <View style={styles.inputContainer}>
            <Image source={require('./Image/icon_lock.png')} style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Mật khẩu" 
              secureTextEntry={true}
              autoCapitalize="none" 
            />
          </View>

          <View style={[styles.inputContainer]}>
            <Image source={require('./Image/icon_lock.png')} style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Nhập lại mật khẩu"
              secureTextEntry={true}
              autoCapitalize="none" 
            />
          </View>
        </View>
      </ScrollView>

      <TouchableOpacity style={[styles.button, { backgroundColor: isButtonEnabled ? '#999900' : '#DCDCDC'}]}>
        <Text style={{ color: isButtonEnabled ? 'white' : '#F5F5F5', fontSize: 16, fontWeight: '600' }}>Đăng ký</Text>
      </TouchableOpacity>

      <View style={{flexDirection: 'row', width: '100%', height: '7%', marginTop: 20, borderTopWidth: 0.2, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{marginTop: 10, marginRight: 10}}>Tài khoản đã được đăng ký!</Text>
        <TouchableOpacity style={{borderWidth: 1, width: 100, height: 35, justifyContent: 'center', alignItems: 'center', borderRadius: 3, marginTop: 10}}
          onPress={() => {
            navigation.navigate('Login')
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