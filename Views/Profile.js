import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { View, TextInput, Image, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

export default function Profile({navigation, route}){
    const dispatch = useDispatch();

    const isLoggedIn = useSelector((state) => state.loginInfo.isLoggedIn);
    const customer = useSelector((state) => state.loginInfo.customer);
    // console.log("isLoggedIn: ", isLoggedIn);
    // console.log("customer: ", customer);

    const {onLogout} = route.params;

    const handleLogout = () => {
        onLogout();
        dispatch({ type: 'LOGOUT' });
        navigation.navigate('MyTabs', { screen: 'Tài khoản' });
    }
    

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style='auto'/>

            <View style={{width: '100%', height: '5%', alignItems: 'center', justifyContent: 'center',}}>
                <Text style={{fontSize: 18, fontWeight: '600'}}>Tài khoản</Text>
            </View>

            <View style={{width: '100%', height: '40%', alignItems: 'center', justifyContent: 'space-evenly',}}>
                <View style={{width: '30%', height: '40%', backgroundColor: 'gray', borderRadius: '60%', alignItems: 'center', justifyContent: 'center'}}>
                    <Image style={{width: '95%', height: '95%', borderRadius: 100}} source={{uri: customer.image || "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/800px-Unknown_person.jpg"}} resizeMode='stretch'/>
                </View>
                <View style={{width: '90%', height: '18%', flexDirection: 'row', alignItems: 'baseline'}}>
                    <View style={{width: '75%', height: '100%',}}>
                        <View style={{flexDirection: 'row', width: '100%', height: '50%', alignItems: 'center', justifyContent: 'space-evenly'}}>
                            <Image style={{width: '6%', height: '56%', tintColor: 'purple'}} source={require('./Image/icon_medal.png')}/>
                            <Text style={{width: '88%', fontSize: 18, fontWeight: '600', }}>{customer.name}</Text>
                        </View>
                    </View>

                    <TouchableOpacity style={{width: '25%', height: '100%', alignItems: 'center', justifyContent: 'center',}}>
                        <Image style={{width: '50%', height:'50%', tintColor: '#ADB04E',}} source={require('./Image/icon_qr.png')}/>
                        <Text style={{fontSize: 13, color: '#ADB04E', fontWeight: '500'}}>Mã thành viên</Text>
                    </TouchableOpacity>
                </View>
                <View style={{width: '95%', height: '15%', justifyContent: 'center', flexDirection: 'row', }}>
                    <TouchableOpacity style={{alignItems: 'center', flexDirection: 'row', justifyContent: 'center', borderRightWidth: 0.2, borderColor: 'silver'}}>
                        <Image style={{width: '13%', height: '38%', marginHorizontal: '2%', tintColor: 'black', }} source={require('./Image/icon_pencil.png')} resizeMode='contain' />
                        <Text style={{fontWeight: '600', fontSize: 15}}>Thông tin</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{alignItems: 'center', flexDirection: 'row', justifyContent: 'center', borderRightWidth: 0.2, borderColor: 'silver'}}>
                        <Image style={{width: '13%', height: '38%', marginHorizontal: '2%', tintColor: 'purple',}} source={require('./Image/icon_hisTime.png')} resizeMode='contain' />
                        <Text style={{fontWeight: '600', fontSize: 15}}>Giao dịch</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{alignItems: 'center', flexDirection: 'row', justifyContent: 'center'}}>
                        <Image style={{width: '14%', height: '40%', marginHorizontal: '1%', tintColor: 'black'}} source={require('./Image/icon_bell.png')} resizeMode='contain' />
                        <Text style={{fontWeight: '600', fontSize: 15}}>Thông báo</Text>
                    </TouchableOpacity>
                </View>
            </View> 

            <View style={{width: '100%', height: '20%', alignItems: 'center', justifyContent: 'center'}}>
                <TouchableOpacity style={{width: '30%', height: '30%', backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', 
                    borderRadius: 5, shadowOffset: { width: 0, height: 3}, shadowOpacity: 0.2}}
                    onPress={handleLogout}>
                    <Text style={{fontSize: 17, fontWeight: '600', color: '#999900'}}>Đăng xuất</Text>
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