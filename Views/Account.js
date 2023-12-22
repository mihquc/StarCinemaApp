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

        <ScrollView style={{width: '100%'}}>
            <View style={{alignItems: 'center', justifyContent: 'space-evenly', width: '100%', height: 350}}>
                <Image source={require('./Image/Bap.png')} style={{ width: '54%', height: '62%', resizeMode: 'stretch'}} />
                <Text style={{ fontSize: 19, color: 'black', fontWeight: '600',}}>Đăng Ký Thành Viên Star</Text>
            </View>

            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent:'space-evenly', width: '100%', height: '20%',}}>
                <View style={{alignItems: 'center', justifyContent: 'space-between', width: '13%', height: '65%',}}>
                    <Image source={require('./Image/icon_card.png')} style={{ width: '88%', height: '80%', tintColor: '#999900', resizeMode: 'stretch'}}/>
                    <Text style={{fontWeight: '400', color: 'purple'}}>Star</Text>
                </View>
                <View style={{alignItems: 'flex-start', justifyContent: 'space-between', width: '13%', height: '65%',}}>
                    <Image source={require('./Image/icon_gift.png')} style={{width: '90%', height: '80%', tintColor: '#999900', resizeMode: 'stretch'}}/>
                    <Text style={{fontWeight: '400', color: 'purple'}}>Ưu đãi</Text>
                </View>
            </View>

            <View style={{justifyContent: 'space-between', alignItems: 'center', marginTop: '10%', width: '100%', height: '26%',}}>
                <TouchableOpacity style={{backgroundColor: '#999900', width: '80%', height: '45%', justifyContent: 'center', 
                    alignItems: 'center', borderRadius: 6, shadowOffset: { width: 0, height: 3}, shadowOpacity: 0.2}}
                    onPress={() => {
                        navigation.navigate('Login', {
                            onLoginSuccess: () => {
                            // Callback khi đăng nhập thành công, dựa vào trang xuất phát để xác định nơi điều hướng tiếp theo
                                // console.log(matchingCustomer);
                                navigation.navigate('MyTabs', {screen: "Tài khoản"});
                            },
                        });
                    }}>
                    <Text style={{color: 'white', fontWeight: '600', fontSize: 18}}>
                        Đăng nhập
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ width: '80%', height: '45%', justifyContent: 'center', alignItems: 'center', 
                    backgroundColor: 'white', borderRadius: 6, shadowOffset: { width: 0, height: 3}, shadowOpacity: 0.1,}}
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