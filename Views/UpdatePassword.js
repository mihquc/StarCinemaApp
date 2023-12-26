import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import FormUDPassword from '../Component/FormUDPassword';

export default function UpdatePassword({navigation}) {
    const customer = useSelector((state) => state.loginInfo.customer);
    const [isButtonEnabled, setButtonEnabled] = useState(false);
    const [currentPassword, setCurrentPassword] = useState('');
    const handleCurrentPChange = (text) => {
        setCurrentPassword(text);
    }
    const [newPassword, setNewPassword] = useState('');
    const handleNPChange = (text) => {
        setNewPassword(text);
    }
    const [confirmPassword, setConfirmPassword] = useState('');
    const handleCPChange = (text) => {
        setConfirmPassword(text);
    }
    return (
        <>
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
                />
                </View>

                <View style={{ width: '100%', height: '15%', alignItems: 'center', justifyContent: 'space-evenly'}}>
                    <TouchableOpacity style={{width: '88%', height: '35%', backgroundColor: isButtonEnabled ? '#999900' : '#E5E5E5', borderRadius: 5, 
                    shadowOffset: {width: 0, height: 2}, shadowOpacity: 0.2, alignItems: 'center', justifyContent: 'center'}}>
                        <Text style={{color: 'white', fontSize: 17, fontWeight: '600'}}>Cập nhập</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
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