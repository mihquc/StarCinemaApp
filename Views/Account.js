import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { View, TextInput, Image, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';

export default function Account({navigation}) {

    return(
      <SafeAreaView style={styles.container}>
        <StatusBar style="auto"/>

        <Text style={{fontSize: 18, fontWeight: '600', marginTop: 10}}>Tài khoản</Text>

        <ScrollView>
            <View style={{alignItems: 'center'}}>
            <Image source={require('./Image/Bap.png')} style={{ width: 190, height: 190, marginTop: 60}} />
            <Text style={{ fontSize: 17, color: 'black', fontWeight: '600', marginTop: 40}}>Đăng Ký Thành Viên Star</Text>
            </View>

            <View style={{flexDirection: 'row', justifyContent:'center', alignItems: 'center', marginTop: 20}}>
                <View style={{}}>
                    <Image source={require('./Image/icon_card.png')} style={{ width: 30, height: 30, marginRight: 100, marginBottom: 10, tintColor: '#999900'}}/>
                    <Text style={{fontWeight: '400'}}>Star</Text>
                </View>
                <View>
                    <Image source={require('./Image/icon_gift.png')} style={{ width: 30, height: 30, marginBottom: 10, marginLeft: 5, tintColor: '#999900'}}/>
                    <Text style={{fontWeight: '400'}}>Ưu đãi</Text>
                </View>
            </View>

            <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 40}}>
                <TouchableOpacity style={{backgroundColor: '#999900', marginBottom: 25, width: 200, height: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 3}}
                    onPress={() => {
                        navigation.navigate('Login');
                    }}>
                    <Text style={{color: 'white', fontWeight: '600', fontSize: 20}}>
                        Đăng nhập
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={{borderWidth: 0.5, width: 200, height: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 3}}
                    onPress={() => {
                        navigation.navigate('Register');
                    }}>
                    <Text style={{color: '#999900', fontWeight: '600', fontSize: 20}}>
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