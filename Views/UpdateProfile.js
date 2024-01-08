import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import FormUpdate from '../Component/FormUpdate';
import { useDispatch, useSelector } from 'react-redux';

export default function UpdateProfile({ navigation }) {
    const customer = useSelector((state) => state.loginInfo.customer);
    const getNamebyGender = (gender) => {
        if (gender === '0') {
            return 'male';
        } else if (gender === '1') {
            return 'female';
        } else {
            return 'undefined';
        }
    }
    const name = (customer.nickName);
    const phone = customer.phonenumber;
    const avatar = customer.avatar;
    const [email, setEmail] = useState(customer.userName);
    const [gender, setGender] = useState(getNamebyGender(customer.sex));

    const [isButtonEnabled, setButtonEnabled] = useState(false);
    const handleEmailChange = (text) => {
        setEmail(text);
        checkButtonState(text);
    }
    const checkButtonState = (emailValue) => {
        if (emailValue.trim() !== email) {
            setButtonEnabled(true);
        } else {
            setButtonEnabled(false);
        }
    }
    return (
        <>
            <View style={styles.container}>
                <View style={{ width: '100%', height: '11%', alignItems: 'flex-end', flexDirection: 'row' }}>
                    <TouchableOpacity style={{ width: '15%', height: '35%', }}
                        onPress={() => { navigation.goBack() }}>
                        <Image source={require('./Image/icon_back.png')} style={{ width: '100%', height: '100%', resizeMode: 'contain' }} />
                    </TouchableOpacity>
                    <View style={{ width: '70%', height: '40%', alignItems: 'center', justifyContent: 'center', }}>
                        <Text style={{ fontSize: 17, fontWeight: '600' }}>Cập Nhật</Text>
                    </View>
                </View>
                <View style={{ height: '74%', width: '100%' }}>
                    <FormUpdate
                        name={name}
                        phone={phone}
                        email={email}
                        gender={gender}
                        avatar={avatar}
                    />
                </View>

                <View style={{ width: '100%', height: '15%', alignItems: 'center', justifyContent: 'space-evenly' }}>
                    <TouchableOpacity style={{
                        width: '88%', height: '35%', backgroundColor: isButtonEnabled ? '#999900' : '#E5E5E5', borderRadius: 5,
                        shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, alignItems: 'center', justifyContent: 'center'
                    }}>
                        <Text style={{ color: 'white', fontSize: 17, fontWeight: '600' }}>Cập nhập</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flexDirection: 'row', height: '20%' }}
                        onPress={() => { navigation.navigate('UpdatePassword') }}>
                        <Text style={{ fontSize: 15, color: 'purple' }}>Thay đổi </Text>
                        <Text style={{ fontSize: 15, fontWeight: '600', color: 'purple' }}>mật khẩu</Text>
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