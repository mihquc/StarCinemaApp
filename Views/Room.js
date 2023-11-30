import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { View, TextInput, Image, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';

export default function Room({navigation}) {
    
    const [nameMovie, setNameMovie] = useState('Đất Rừng Phương Nam');

    return(
      <SafeAreaView style={styles.container}>
        <StatusBar style="auto"/>
        <View style={{width: '88%', height: '6%', justifyContent: 'flex-start', flexDirection: 'row',}} >
          <TouchableOpacity style={{width: '10%', height: '100%', justifyContent: 'center', alignItems:'center'}} 
        //   onPress={() => {
        //     navigation.goBack();
        //   }}
          >
            <Image source={require('./Image/icon_back.png')}  style={{width: 30, height: 30}}/>
          </TouchableOpacity>

          <View style={{width: '80%', height: '100%', alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{fontSize: 17, fontWeight: '600'}}>Star Cinema</Text>
          </View>
        </View>

        <View style={{width: '100%', height: '10%', borderTopWidth: 0.2, borderBottomWidth: 0.2}}>
          <View style={{width: '65%', height: '100%', borderRightWidth: 0.2}}>
            <Text>{nameMovie}</Text>
          </View>
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