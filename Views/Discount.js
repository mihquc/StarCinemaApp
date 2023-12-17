import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { View, TextInput, Image, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import Header from '../Component/header';

export default function Discount({navigation, route}) {
  const [description, setDescription] = useState('');
  const [name, setName] = useState('');
  // console.log(route.params.item.image);
  useEffect(() => {
    setName(route.params.item.name);
  })

  return(
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto"/>
      <Header iconSource={require('./Image/icon_xx.png')} onPress={() => {navigation.goBack()}}/>
      <View style={{width: '100%', height: '35%', alignItems: 'flex-start', justifyContent: 'flex-start',}}>
        <Image style={{width: '100%', height: '100%', resizeMode: 'stretch'}} source={route.params.item.image}/>
      </View>
      <View style={{width: '92%', height: '57%', marginTop: '2%'}}>
        <Text style={{fontSize: 16, fontWeight: '500'}}>{name}</Text>
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