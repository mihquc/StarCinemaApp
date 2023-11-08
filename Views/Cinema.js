import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { View, TextInput, Image, Text, TouchableOpacity, StyleSheet, SafeAreaView, FlatList } from 'react-native';

export default function Cinema() {
  const [cinemaList, setCinemaList] = useState([]);

  useEffect(() =>{
    const data = [
      {
        id: '01',
        image: <Image style={styles.imageCinema} source={require('./Image/cinema_dn.png')}/>,
        name: 'Star Cinema',
        address: 'Đà Nẵng',
      },
      {
        id: '02',
        image: <Image style={styles.imageCinema} source={require('./Image/cinema_dn.png')}/>,
        name: 'Star Cinema',
        address: 'Đà Nẵng',
      },

    ]
    setCinemaList(data);
  }, [])

  const viewItem = ({item}) => {
    return (
      <View style={{alignItems: 'flex-start', flexDirection: 'row',}}>
        {item.image}
        <View style={{marginTop: 10}}>
          <Text>{item.name}</Text>
          <Text>{item.address}</Text>
        </View>
      </View>
    )
  }

  const itemSeparatorView = ()=>{
    return (
      <View style={{width: '100%', height: 0.5, backgroundColor: 'gray'}}/>
    )
  }

    return(
      <SafeAreaView style={styles.container}>
        <StatusBar style="auto"/>

        <View style={{width: '100%', height: 100, alignItems: 'center', borderBottomWidth: 0.2}}>
          <Text style={{fontSize: 18, fontWeight: '600', marginTop: 13}}>Rạp Phim</Text>
          <View style={{flexDirection: 'row', marginTop: 30, marginRight: 10, alignItems: 'center',}}>
            <Image style={{width: 16, height: 16}} source={require('./Image/icon_map.png')}/>
            <Text style={{color: 'green', fontWeight: '500'}}>Đà Nẵng</Text>
          </View>
        </View>

        <FlatList
          data={cinemaList}
          renderItem={viewItem}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={itemSeparatorView}
          style={{width: '100%',}}
        />
      </SafeAreaView>
    )
  }
  const styles = StyleSheet.create({
    container: {
      backgroundColor: '#F5F5F5',
      flex: 1,
      alignItems: 'flex-start',
    },
    imageCinema: {
      width: 100, 
      height: 80, 
      margin: 10, 
      borderRadius: 5,
    },
  });