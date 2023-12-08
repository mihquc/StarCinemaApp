import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { View, TextInput, Image, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';

export default function Account({navigation}) {

    return(
      <SafeAreaView style={styles.container}>
        <StatusBar style="auto"/>

        <View style={{width: '100%', height: '5%', alignItems: 'center', justifyContent: 'center',}}>
            <Text style={{fontSize: 18, fontWeight: '600'}}>Tài khoản</Text>
        </View>

        <ScrollView>
            <View style={{alignItems: 'center'}}>
                <Image source={require('./Image/Bap.png')} style={{ width: 190, height: 190, marginTop: 60}} />
                <Text style={{ fontSize: 17, color: 'black', fontWeight: '600', marginTop: 20}}>Đăng Ký Thành Viên Star</Text>
            </View>

            <View style={{flexDirection: 'row', justifyContent:'space-around', marginTop: 40}}>
                <View style={{alignItems: 'center'}}>
                    <Image source={require('./Image/icon_card.png')} style={{ width: 40, height: 40, marginBottom: 10, tintColor: '#999900'}}/>
                    <Text style={{fontWeight: '400', color: 'purple'}}>Star</Text>
                </View>
                <View style={{alignItems: 'center'}}>
                    <Image source={require('./Image/icon_gift.png')} style={{ width: 40, height: 40, marginBottom: 10, tintColor: '#999900'}}/>
                    <Text style={{fontWeight: '400', color: 'purple'}}>Ưu đãi</Text>
                </View>
            </View>

            <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 140}}>
                <TouchableOpacity style={{backgroundColor: '#999900', marginBottom: 20, width: 300, height: 50, justifyContent: 'center', 
                    alignItems: 'center', borderRadius: 8, shadowOffset: { width: 0, height: 3}, shadowOpacity: 0.2}}
                    onPress={() => {
                        navigation.navigate('Login', {
                            onLoginSuccess: () => {
                            // Callback khi đăng nhập thành công, dựa vào trang xuất phát để xác định nơi điều hướng tiếp theo
                                navigation.navigate('MyTabs', {screen: "Tài khoản"});
                            },
                        });
                    }}>
                    <Text style={{color: 'white', fontWeight: '600', fontSize: 18}}>
                        Đăng nhập
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ width: 300, height: 50, justifyContent: 'center', alignItems: 'center', 
                    backgroundColor: 'white', borderRadius: 8, shadowOffset: { width: 0, height: 3}, shadowOpacity: 0.1,}}
                    onPress={() => {
                        navigation.navigate('Register');
                    }}>
                    <Text style={{color: '#999900', fontWeight: '600', fontSize: 18}}>
                        Đăng ký
                    </Text>
                </TouchableOpacity>
            </View>
            
        </ScrollView>

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