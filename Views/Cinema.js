import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import { View, Image, Text, TouchableOpacity, StyleSheet, SafeAreaView, FlatList, Modal } from 'react-native';
import { useDispatch } from 'react-redux';


export default function Cinema({ navigation }) {
  const [address, setAddress] = useState('star cinema Đà Nẵng');
  const [tempAdress, setTempAddress] = useState('star cinema Đà Nẵng');
  const [isPickerVisible, setPickerVisible] = useState(false);
  const [cinemaList, setCinemaList] = useState([]);

  const dispatch = useDispatch();
  const listShowtime = (showtimes) => {
    try {
      dispatch({ type: 'SET_SHOWTIME', showtimes: showtimes });
    } catch (error) {
      console.log(error);
    }
  }

  const togglePicker = () => {
    setPickerVisible(!isPickerVisible);
  };

  const confirm = () => {
    setAddress(tempAdress);
    setPickerVisible(!isPickerVisible);
  };

  const closePicker = () => {
    setPickerVisible(!isPickerVisible);
    setTempAddress(address);
  };

  useEffect(() => {
    const data = [
      {
        id: '01',
        image: require('./Image/cinema_dn.png'),
        name: 'star cinema Đà Nẵng',
        address: '',
      },
      {
        id: '02',
        image: require('./Image/cinema_dn.png'),
        name: 'star cinema Hà Nội',
        address: '',
      },
      {
        id: '03',
        image: require('./Image/cinema_dn.png'),
        name: 'star cinema Hồ Chí Minh',
        address: '',
      },
      {
        id: '04',
        image: require('./Image/cinema_dn.png'),
        name: 'star cinema Hải Phòng',
        address: '',
      },
      {
        id: '05',
        image: require('./Image/cinema_dn.png'),
        name: 'star cinema Cần Thơ',
        address: '',
      },
    ]
    setCinemaList(data);
  }, [])

  const getCinemaByAddress = (address) => {
    const data = [];
    for (let i = 0; i < cinemaList.length; i++) {
      if (cinemaList[i].name === address) {
        data.push(cinemaList[i]);
      } else if (address === 'Toàn quốc') {
        return cinemaList;
      }
    }
    return data;
  }

  const viewItem = ({ item, index }) => {
    return (
      <TouchableOpacity style={{ width: '100%', height: 100, alignItems: 'center', flexDirection: 'row', borderBottomWidth: 0.2 }}
        onPress={() => {
          navigation.navigate('ShowtimeAddress', { item });
        }}>
        <View style={{ width: '32%', height: '80%', alignItems: 'flex-end', }}>
          <Image style={styles.imageCinema} source={require('./Image/cinema_dn.png')} />
        </View>
        <View style={{ width: '68%', height: '80%', justifyContent: 'space-evenly' }}>
          <Text style={{ fontSize: 15, fontWeight: '500', }}>{item.name}</Text>
          <Text style={{ fontSize: 15, fontWeight: '500', }}>{item.address}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />

      <View style={{ width: '100%', height: '12%', alignItems: 'center', justifyContent: 'space-around', borderBottomWidth: 0.2 }}>
        <Text style={{ fontSize: 18, fontWeight: '600' }}>Rạp Phim</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image style={{ width: 16, height: 16 }} source={require('./Image/icon_map.png')} />
          <TouchableOpacity onPress={togglePicker}>
            <Text style={{ color: 'green', fontWeight: '500' }}>{isPickerVisible ? tempAdress : address}</Text>
          </TouchableOpacity>
          <Modal
            transparent={true}
            animationType="slide"
            visible={isPickerVisible}
            onRequestClose={() => {
              setPickerVisible(false);
            }}
          >
            <View style={{ flex: 1, justifyContent: 'flex-end', }}>

              <View style={{
                backgroundColor: 'white', borderTopWidth: 0.1, borderRadius: 30, height: '43%', margin: 20,
                shadowOffset: { width: 0, height: 5 }, shadowOpacity: 0.7
              }}>
                <View style={{ justifyContent: 'center', alignItems: 'center', height: '10%', borderBottomWidth: 0.2 }}>
                  <Text style={{ fontSize: 17, fontWeight: '500', color: 'purple' }}>Chọn vị trí</Text>
                </View>
                <Picker
                  selectedValue={tempAdress}
                  onValueChange={(itemValue, itemIndex) => {
                    setTempAddress(itemValue)
                  }}
                  style={{}}
                >
                  <Picker.Item label="Toàn quốc" value="Toàn quốc" />
                  <Picker.Item label="star cinema Hồ Chí Minh" value="star cinema Hồ Chí Minh" />
                  <Picker.Item label="star cinema Hà Nội" value="star cinema Hà Nội" />
                  <Picker.Item label="star cinema Đà Nẵng" value="star cinema Đà Nẵng" />
                  <Picker.Item label="star cinema Hải Phòng" value="star cinema Hải Phòng" />
                  <Picker.Item label="star cinema Cần Thơ" value="star cinema Cần Thơ" />
                </Picker>

                <TouchableOpacity onPress={confirm} style={{ height: '15%', alignItems: 'center', justifyContent: 'center', borderTopWidth: 0.2, borderBottomWidth: 0.2 }}>
                  <Text style={{ fontSize: 20, color: 'purple' }}>Xác nhận</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={closePicker} style={{ height: '15%', alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={{ fontSize: 20, color: 'purple' }}>Đóng</Text>
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
        style={{ width: '100%' }}
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
  picker: {
    width: 100,
    height: 50
  }
});