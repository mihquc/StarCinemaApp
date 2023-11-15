import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { View, TextInput, Image, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';

export default function Profile(navigation, onLogout){

    const handleLogout = () => {
        onLogout();
        navigation.navigate('MyTabs', { screen: 'Tài khoản' });
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style='auto'/>

            <View style={{width: '100%', height: '5%', alignItems: 'center', justifyContent: 'center',}}>
                <Text style={{fontSize: 18, fontWeight: '600'}}>Tài khoản</Text>
            </View>

            <View style={{width: '100%', height: '40%', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-evenly'}}>
                <View style={{width: '30%', height: '40%', backgroundColor: 'gray', borderRadius: '60%', alignItems: 'center', justifyContent: 'center'}}>
                    <Image style={{width: '50%', height: '50%', }} source={require('./Image/icon_person.png')} resizeMode='stretch'/>
                </View>
                <View style={{width: '90%', height: '30%', flexDirection: 'row',}}>
                    <View style={{width: '75%', height: '100%',}}>
                        <View style={{flexDirection: 'row', width: '100%', height: '50%', alignItems: 'center', justifyContent: 'space-evenly'}}>
                            <Image style={{width: '7%', height:'50%', tintColor: 'purple'}} source={require('./Image/icon_medal.png')}/>
                            <Text style={{width: '88%', fontSize: 16, fontWeight: '600', }}>Nguyễn Minh Quốc</Text>
                        </View>
                        
                        <Text>bbbbbb</Text>
                    </View>

                    <View style={{width: '25%', height: '100%', alignItems: 'center', justifyContent: 'flex-start',}}>
                        <Image style={{width: '50%', height:'50%', tintColor: '#ADB04E',}} source={require('./Image/icon_qr.png')}/>
                        <Text style={{fontSize: 13, color: '#ADB04E', fontWeight: '500'}}>Mã thành viên</Text>
                    </View>
                </View>
            </View> 
            
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      flex: 1,
      alignItems: 'center',
    },
});