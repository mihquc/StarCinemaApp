import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { View, TextInput, Image, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import Header from '../Component/header';
import moment from 'moment';

export default function Discount({ navigation, route }) {
  const [description, setDescription] = useState('');
  const [name, setName] = useState('');
  const fromdate = moment(route.params.item.fromDate, 'YYYY/MM/DD HH:mm:ss');
  const todate = moment(route.params.item.toDate, 'YYYY/MM/DD HH:mm:ss');
  useEffect(() => {
    setName(route.params.item.title);
  })

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <Header iconSource={require('./Image/icon_xx.png')} onPress={() => { navigation.goBack() }} />
      <View style={{ width: '100%', height: '35%', alignItems: 'flex-start', justifyContent: 'flex-start', }}>
        <Image style={{ width: '100%', height: '100%', resizeMode: 'stretch' }} source={{ uri: route.params.item.imageUrl }} />
      </View>
      <View style={{ width: '92%', height: '20%', marginTop: '2%', justifyContent: 'space-evenly' }}>
        <Text style={{ fontSize: 16, fontWeight: '500' }}>{name}</Text>
        <Text style={{ fontSize: 15, fontWeight: '400' }}>-{route.params.item.promotionDescription}</Text>
        <Text style={{ fontSize: 15, fontWeight: '400' }}>-Giảm giá cho tổng hóa đơn: {route.params.item.discount}%</Text>
        <Text style={{ fontSize: 15, fontWeight: '400' }}>{`-Từ ngày: ${fromdate.date()}-${fromdate.month() + 1}-${fromdate.year()} đến ngày: ${todate.date()}-${todate.month() + 1}-${todate.year()}`}</Text>
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