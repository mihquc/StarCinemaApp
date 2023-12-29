import { StyleSheet, Text, View, Image, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import FormUDPassword from '../Component/FormUDPassword';
import Loader from '../Component/loader';
import axios from 'axios';

export default function UpdatePassword({navigation}) {
    const URL = "https://65742768f941bda3f2af6a27.mockapi.io/api/mq/customer";
    const customer = useSelector((state) => state.loginInfo.customer);
    const [progress, setProgress] = useState(false);
    const [isButtonEnabled, setButtonEnabled] = useState(false);
    const [checkText, setCheckText] = useState(0);
    const [checkText1, setCheckText1] = useState(0);
    const [checkText2, setCheckText2] = useState(0);
    const [currentPassword, setCurrentPassword] = useState('');
    const handleCurrentPChange = (text) => {
        if (text.length >= 0) {
            setCurrentPassword(text);
            checkButtonState(text, newPassword, confirmPassword);
            setCheckText(0);
        } 
    }
    const [newPassword, setNewPassword] = useState('');
    const handleNPChange = (text) => {
        if(text.length >= 0) {
            setNewPassword(text);
            checkButtonState(currentPassword, text, confirmPassword);
            setCheckText1(0);
        }
    }
    const [confirmPassword, setConfirmPassword] = useState('');
    const handleCPChange = (text) => {
        if(text.length >= 0) {
            setConfirmPassword(text);
            checkButtonState(currentPassword, newPassword, text);
            if (text.trim() === newPassword.trim()) {
                setCheckText2(0);
            } else {
                setCheckText2(2);
            }
        } 
    }
    const checkButtonState = (text, text1, text2) => {
        if (text.trim() !== '' && text1.trim() !== '', text2.trim() !== '') {
            if(text1.trim() === text2.trim()){
                setButtonEnabled(true);
            } else{
                setCheckText2(2);
            }
        } else {
            setButtonEnabled(false);
        }
    }
    const UpdatePassword = () => {
        const updateCustomer = {nickName: customer.nickName, email: customer.email, phonenumber: customer.phonenumber, 
        sex: customer.sex, userName: customer.userName, password: newPassword, avatar: customer.avatar}
        if(isButtonEnabled) {
            if(newPassword.trim() === confirmPassword.trim()) {
                axios.get(URL).then((response) => {
                    const data = response.data;
                    const password = data.find(data => data.password === currentPassword); 
                    if (password) {
                        axios.put(`${URL}/${customer.id}`, updateCustomer)
                        .then((response) => {
                            console.log(response.data);
                        })
                        .catch((err) => {console.error(err);});
                        setProgress(false);
                        Alert.alert('Thông báo', 'Thay đổi mật khẩu thành công.')
                    } else {
                        // Alert.alert('Mật khẩu hiện tại không chính xác!');
                        setProgress(false);
                        setCheckText(2);
                        setButtonEnabled(false);
                    }
                }).catch((error) => {console.log(error);});
            }
        } else {
            // Alert.alert('Thông báo!', 'Vui lòng nhập thông tin.');
            setProgress(false);
            setCheckText(1);
            setCheckText1(1);
            setCheckText2(1);
        }
    }
    return (
        <View style={styles.container}>
            <View style={{ width: '100%', height: '11%', alignItems: 'flex-end', flexDirection: 'row' }}>
                <TouchableOpacity style={{ width: '15%', height: '30%', }} onPress={()=>navigation.goBack()}>
                    <Image source={require('./Image/icon_back.png')} style={{ width: '100%', height: '100%', resizeMode: 'contain' }} />
                </TouchableOpacity>
                <View style={{ width: '70%', height: '40%', alignItems: 'center', justifyContent: 'center', }}>
                    <Text style={{ fontSize: 17, fontWeight: '600' }}>Thay đổi mật khẩu</Text>
                </View>
            </View>
            <View style={{height: '74%', width: '100%'}}>
            <FormUDPassword
                currentPassword={currentPassword}
                newPassword={newPassword}
                confirmPassword={confirmPassword}
                handleCurrentPChange={handleCurrentPChange}
                handleNPChange={handleNPChange}
                handleCPChange={handleCPChange}
                checktext={checkText}
                checktext1={checkText1}
                checktext2={checkText2}
            />
            </View>

            <View style={{ width: '100%', height: '15%', alignItems: 'center', justifyContent: 'space-evenly'}}>
                <TouchableOpacity style={{width: '88%', height: '35%', backgroundColor: isButtonEnabled ? '#999900' : '#E5E5E5', borderRadius: 5, 
                shadowOffset: {width: 0, height: 2}, shadowOpacity: 0.2, alignItems: 'center', justifyContent: 'center'}}
                onPress={() => {
                    setProgress(true);
                    UpdatePassword();
                }}>
                    <Text style={{color: 'white', fontSize: 17, fontWeight: '600'}}>Cập nhập</Text>
                </TouchableOpacity>
            </View>
            {progress ? <Loader indeterminate={progress}/> : null}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F5F5F5',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
})