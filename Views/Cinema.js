import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import { View, TextInput, Image, Text, TouchableOpacity, StyleSheet, SafeAreaView, FlatList, Modal } from 'react-native';

export default function Cinema() {
  const [address, setAddress] = useState('Đà Nẵng');
  const [tempAdress, setTempAddress] = useState('Đà Nẵng');
  const [isPickerVisible, setPickerVisible] = useState(false);
  const [cinemaList, setCinemaList] = useState([]);

  const togglePicker = () => {
    setPickerVisible(!isPickerVisible);
    // if (!isPickerVisible) {
    //   setTempAddress(address);
    // }
  };

  const confirm = () => {
    setAddress(tempAdress);
    setPickerVisible(!isPickerVisible);
  };

  const closePicker = () => {
    setPickerVisible(!isPickerVisible);
    setTempAddress(address);
  };

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
        name: 'Star Cinema 1',
        address: 'Đà Nẵng',
      },
      {
        id: '03',
        image: <Image style={styles.imageCinema} source={require('./Image/cinema_dn.png')}/>,
        name: 'Star Cinema',
        address: 'Hà Nội',
      },
      {
        id: '04',
        image: <Image style={styles.imageCinema} source={require('./Image/cinema_dn.png')}/>,
        name: 'Star Cinema',
        address: 'TP Hồ Chí Minh',
      },
      {
        id: '05',
        image: <Image style={styles.imageCinema} source={require('./Image/cinema_dn.png')}/>,
        name: 'Star Cinema 1',
        address: 'TP Hồ Chí Minh',
      },
      {
        id: '06',
        image: <Image style={styles.imageCinema} source={require('./Image/cinema_dn.png')}/>,
        name: 'Star Cinema 2',
        address: 'TP Hồ Chí Minh',
      },
      {
        id: '07',
        image: <Image style={styles.imageCinema} source={require('./Image/cinema_dn.png')}/>,
        name: 'Star Cinema',
        address: 'Huế',
      },
      {
        id: '08',
        image: <Image style={styles.imageCinema} source={require('./Image/cinema_dn.png')}/>,
        name: 'Star Cinema',
        address: 'Quảng Nam',
      },
      {
        id: '09',
        image: <Image style={styles.imageCinema} source={require('./Image/cinema_dn.png')}/>,
        name: 'Star Cinema',
        address: 'An Giang',
      },
      {
        id: '10',
        image: <Image style={styles.imageCinema} source={require('./Image/cinema_dn.png')}/>,
        name: 'Star Cinema',
        address: 'Cà Mau',
      },
    ]
    setCinemaList(data);
  }, [])

  const getCinemaByAddress = (address) => {
    const data = [];
    for (let i = 0; i < cinemaList.length; i++) {
      if (cinemaList[i].address === address) {
        data.push(cinemaList[i]);
      } else if (address === 'Toàn quốc') {
        return cinemaList;
      }
    }
    return data;
  }

  const viewItem = ({item}) => {
    return (
      <View style={{alignItems: 'flex-start', flexDirection: 'row', margin: 15, justifyContent: 'flex-start', }}>
        {item.image}
        <View>
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

        <View style={{width: '100%', height: '12%', alignItems: 'center', justifyContent: 'space-around', borderBottomWidth: 0.2}}>
          <Text style={{fontSize: 18, fontWeight: '600'}}>Rạp Phim</Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image style={{width: 16, height: 16}} source={require('./Image/icon_map.png')}/>
            <TouchableOpacity onPress={togglePicker}>
              <Text style={{color: 'green', fontWeight: '500'}}>{isPickerVisible ? tempAdress : address}</Text>
            </TouchableOpacity>
            <Modal
              transparent={true}
              animationType="slide"
              visible={isPickerVisible}
              onRequestClose={() => {
                setPickerVisible(false);
              }}
            >
              <View style={{flex: 1, justifyContent: 'flex-end',}}>
                
                <View style={{ backgroundColor: 'white', borderTopWidth: 0.1, borderRadius: 30, height: '43%', margin: 20,
                    shadowOffset: { width: 0, height: 5}, shadowOpacity: 0.7}}>
                  <View style={{justifyContent: 'center', alignItems: 'center', height: '10%', borderBottomWidth: 0.2}}>
                    <Text style={{fontSize: 17, fontWeight: '500', color: 'purple'}}>Chọn vị trí</Text>
                  </View>
                  <Picker
                    selectedValue={tempAdress}
                    onValueChange={(itemValue, itemIndex) => {
                      setTempAddress(itemValue)
                    }}
                    style={{}}
                  >
                    <Picker.Item label="Toàn quốc" value="Toàn quốc" />
                    <Picker.Item label="TP Hồ Chí Minh" value="TP Hồ Chí Minh" />
                    <Picker.Item label="Hà Nội" value="Hà Nội" />
                    <Picker.Item label="Đà Nẵng" value="Đà Nẵng" />
                    <Picker.Item label="Huế" value="Huế" />
                    <Picker.Item label="Quảng Nam" value="Quảng Nam" />
                    <Picker.Item label="An Giang" value="An Giang" />
                    <Picker.Item label="Cà Mau" value="Cà Mau" />
                  </Picker>

                  <TouchableOpacity onPress={confirm} style={{ height: '15%', alignItems: 'center', justifyContent: 'center', borderTopWidth: 0.2, borderBottomWidth: 0.2}}>
                    <Text style={{fontSize: 20, color: 'purple'}}>Xác nhận</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={closePicker} style={{height: '15%', alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{fontSize: 20, color: 'purple'}}>Đóng</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </View>
        </View>

        <FlatList
          data={getCinemaByAddress(address)}
          renderItem={viewItem}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={itemSeparatorView}
          style={{width: '100%'}}
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
      height: 75,  
      marginRight: 10,
      borderRadius: 5,
    },
    picker:{
      width: 100,
      height: 50
    }
  });