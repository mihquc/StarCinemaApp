import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { View, TextInput, Image, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import URL from '../Component/API';

export default function Profile({ navigation, route }) {
    const dispatch = useDispatch();
    const URLP = `${URL}/customer/system/user/profile`;
    const isLoggedIn = useSelector((state) => state.loginInfo.isLoggedIn);
    const customer1 = useSelector((state) => state.loginInfo.customer);
    const token = useSelector((state) => state.loginInfo.token);
    const [user, setUser] = useState({
        avatar: null,
        customerType: null,
        email: "",
        nickName: "",
        password: "",
        phonenumber: "",
        remark: null,
        sex: "",
        status: "",
        userId: "",
        userName: ""
    });
    const { onLogout } = route.params;

    const handleLogout = () => {
        onLogout();
        dispatch({ type: 'LOGOUT' });
        navigation.navigate('MyTabs', { screen: 'Tài khoản' });
    }
    const updateData = (customer) => {
        try {
            dispatch({ type: 'LOGIN', customer: customer });
        } catch (error) {
            console.log(error);
        }
    }
    const getProfile = () => {
        axios.get(`${URLP}?Authorization=Customer-Bearer ${token}`)
            .then((response) => {
                const data = response.data.data.user;
                console.log(data);
                updateData(data);
                setUser(data);
            })
            .catch((error) => { console.log(error); });
    }
    useEffect(() => {
        getProfile();

    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style='auto' />

            <View style={{ width: '100%', height: '5%', alignItems: 'center', justifyContent: 'center', }}>
                <Text style={{ fontSize: 18, fontWeight: '600' }}>Tài khoản</Text>
            </View>

            <View style={{ width: '100%', height: '60%', alignItems: 'center', justifyContent: 'space-evenly', }}>
                <View style={{ width: '30%', height: '26%', backgroundColor: 'gray', borderRadius: '60%', alignItems: 'center', justifyContent: 'center' }}>
                    <Image style={{ width: '97%', height: '97%', borderRadius: 100 }} source={{
                        uri:
                            user.avatar ||
                            "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/800px-Unknown_person.jpg"
                    }} resizeMode='stretch' />
                </View>
                <View style={{ width: '100%', height: '50%', alignItems: 'center', }}>

                    <View style={{ flexDirection: 'row', width: '90%', height: '30%', alignItems: 'center', justifyContent: 'space-evenly', }}>
                        <Image style={{ width: '6%', height: '56%', tintColor: 'purple', resizeMode: 'contain' }} source={require('./Image/icon_medal.png')} />
                        <Text style={{ width: '80%', fontSize: 18, fontWeight: '600', }}>
                            {user.nickName}
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row', width: '90%', height: '30%', alignItems: 'center', justifyContent: 'space-evenly', }}>
                        <Image style={{ width: '8%', height: '56%', tintColor: 'purple', resizeMode: 'contain' }} source={require('./Image/icon_phone.png')} />
                        <Text style={{ width: '80%', fontSize: 18, fontWeight: '600', }}>
                            {user.phonenumber}
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row', width: '90%', height: '30%', alignItems: 'center', justifyContent: 'space-evenly', }}>
                        <Image style={{ width: '6%', height: '50%', tintColor: 'purple', resizeMode: 'contain' }} source={require('./Image/icon_mail.png')} />
                        <Text style={{ width: '80%', fontSize: 18, fontWeight: '600', }}>
                            {user.email}
                        </Text>
                    </View>

                </View>
                <View style={{ width: '95%', height: '15%', justifyContent: 'center', flexDirection: 'row', }}>
                    <TouchableOpacity style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'center', borderRightWidth: 0.2, borderColor: 'silver' }}
                        onPress={() => { navigation.navigate('UpdateProfile') }}>
                        <Image style={{ width: '13%', height: '38%', marginHorizontal: '2%', tintColor: 'black', }} source={require('./Image/icon_pencil.png')} resizeMode='contain' />
                        <Text style={{ fontWeight: '600', fontSize: 15 }}>Thông tin</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'center', borderRightWidth: 0.2, borderColor: 'silver' }}
                        onPress={() => { navigation.navigate('BillHistory') }}>
                        <Image style={{ width: '13%', height: '38%', marginHorizontal: '2%', tintColor: 'purple', }} source={require('./Image/icon_hisTime.png')} resizeMode='contain' />
                        <Text style={{ fontWeight: '600', fontSize: 15 }}>Giao dịch</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}>
                        <Image style={{ width: '14%', height: '40%', marginHorizontal: '1%', tintColor: 'black' }} source={require('./Image/icon_bell.png')} resizeMode='contain' />
                        <Text style={{ fontWeight: '600', fontSize: 15 }}>Thông báo</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={{ width: '100%', height: '20%', alignItems: 'center', justifyContent: 'center' }}>
                <TouchableOpacity style={{
                    width: '30%', height: '30%', backgroundColor: 'white', alignItems: 'center', justifyContent: 'center',
                    borderRadius: 5, shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.2
                }}
                    onPress={handleLogout}>
                    <Text style={{ fontSize: 17, fontWeight: '600', color: '#999900' }}>Đăng xuất</Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F5F5F5',
        flex: 1,
        alignItems: 'center',
    },
});