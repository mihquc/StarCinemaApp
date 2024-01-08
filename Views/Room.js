import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, FlatList, } from 'react-native';
import axios from 'axios';
import Seat from '../Component/seat';
import { useSelector } from 'react-redux';
import Loader from '../Component/loader';
import URL from '../Component/API';

export default function Room({ navigation, route }) {
  const URLSO = `${URL}/customer/homepage/search/showtime/seatOrderList`;
  const Movie = useSelector((state) => state.movies.selectedMovie);
  const date = route.params.selectedItem;
  const [seatListOder, setSeatListOrder] = useState([]);
  // const idShowtime = route.params.item.item.id;
  const idShowtime = useSelector((state) => state.movies.id);
  const time = useSelector((state) => state.movies.time);
  // const cinemaName = route.params.item.item.cinemaName;
  const cinemaName = useSelector((state) => state.movies.cinemaName);
  const rowCode = [];
  const data1 = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H',]
  useEffect(() => {
    axios.get(`${URLSO}/${idShowtime}`)
      .then((response) => {
        const seatListInfo = [];
        const data = response.data;
        for (let i = 0; i < data.length; i++) {
          for (let j = 0; j < data[i].seatList.length; j++) {
            seatListInfo.push(data[i].seatList[j]);
            // if (data[i].seatList[j].rowCode === data1[j]){

            // }
          }
        }
        setSeatListOrder(seatListInfo);
      }).catch((error) => console.error(error));

  }, [])
  const hallId = seatListOder.hallId;
  console.log(seatListOder);


  const [selectedSeatIds, setSelectedSeatIds] = useState([]);
  const [listSeatId, setListSeatId] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedSeatsCount, setSelectedSeatsCount] = useState(0);
  const [progress, setProgress] = useState(false);
  const [price, setPrice] = useState(0);

  const handleSeatPress = (isPressed, item) => {
    if (item.status === 'N' || item.status === 'P') {
      if (isPressed) {
        setSelectedSeats([...selectedSeats, item]);
        setPrice(price + calculateSeatPrice(item));
        setSelectedSeatsCount(selectedSeatsCount + 1);
        setListSeatId([...listSeatId, item.id]);
        setSelectedSeatIds([...selectedSeatIds, `${item.rowCode}${item.columnCode}`]); // Thêm seatId vào danh sách
      } else {
        const updatedSeats = selectedSeats.filter((selectedSeat) => selectedSeat !== item);
        setSelectedSeats(updatedSeats);
        setPrice(price - calculateSeatPrice(item));
        setSelectedSeatsCount(selectedSeatsCount - 1);
        setSelectedSeatIds(selectedSeatIds.filter((seatId) => seatId !== `${item.rowCode}${item.columnCode}`)); // Loại bỏ seatId khỏi danh sách
        setListSeatId(listSeatId.filter((seatId) => seatId !== item.id));
      }
    }
  };
  console.log(listSeatId);
  // console.log(selectedSeatIds);
  const calculateSeatPrice = (item) => {
    // Giả sử giá của mỗi ghế là 50,000 đồng
    let pricePerTicket = {};
    if (item.seatTypeName === 'Vip') {
      pricePerTicket = item.price;
    } else if (item.seatTypeName === 'Normal') {
      pricePerTicket = item.price;
    } else if (item.seatTypeName === 'Couple') {
      pricePerTicket = item.price;
    }
    return pricePerTicket;
  };

  const sttItem = ({ item, index }) => {
    return (
      <Text style={{ marginTop: index === 0 ? 0 : 10, marginLeft: 10, fontSize: 11 }}>{item}</Text>
    )
  };
  const viewItem = ({ item, index }) => {
    return (
      <Seat style={{
        width: 20, height: 20, borderWidth: 0.5, marginRight: 5, marginLeft: (index % 6 == 0) ? 0 : 0, borderRadius: 3, marginBottom: 3,
        borderColor: (item.status === 'Y') ? 'gray' : ((item.seatTypeName === 'Vip') ? '#CCCC00' : ((item.seatTypeName === 'Couple') ? 'blue' : 'gray')),
      }}
        item={item}
        index={index}
        onPress={handleSeatPress}
      />
    )
  };
  const pressContinue = () => {
    if (price > 0) {
      navigation.navigate('Payment', { time, selectedSeatIds, price, date, cinemaName, hallId, listSeatId });
    }
    setProgress(false);
  }
  // console.log(Movie.rated);
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View style={{ width: '88%', height: '6%', justifyContent: 'flex-start', flexDirection: 'row', }} >
        <TouchableOpacity style={{ width: '10%', height: '100%', justifyContent: 'center', alignItems: 'center' }}
          onPress={() => {
            route.params.isLoggedIn ? navigation.pop(2) : navigation.pop(1);
          }}
        >
          <Image source={require('./Image/icon_back.png')} style={{ width: 30, height: 30 }} />
        </TouchableOpacity>

        <View style={{ width: '80%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontSize: 18, fontWeight: '600' }}>{cinemaName}</Text>
        </View>
      </View>

      <View style={{ width: '100%', height: '12%', borderTopWidth: 0.2, flexDirection: 'row', justifyContent: 'space-evenly', }}>
        <View style={{ width: '100%', height: '100%', }}>
          <View style={{ width: '100%', height: '30%', alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 17, fontWeight: '600', }}>{Movie.title}</Text>
          </View>
          <View style={{ width: '100%', height: '70%', alignItems: 'center', justifyContent: 'center' }}>
            <View style={{ width: '70%', height: '60%', justifyContent: 'center', }}>
              <Text style={{ fontSize: 15, color: 'gray' }}>{Movie.language}</Text>
            </View>
            <View style={{ width: '10%', height: '40%', borderRadius: 3, alignItems: 'center', justifyContent: 'center', backgroundColor: '#999900' }}>
              <Text style={{ fontSize: 15, color: 'white', fontWeight: '500' }}>{(Movie.rated.slice(0, 3) === "P -") ? 'P' : Movie.rated.slice(0, 3)}</Text>
            </View>
          </View>
        </View>
      </View>

      <ScrollView style={{ width: '100%', height: '60%', backgroundColor: 'white' }} maximumZoomScale={2.0}
        showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}
      >
        <View style={{ marginTop: 50, flexDirection: 'row' }}>
          <FlatList
            data={data1}
            renderItem={sttItem}
            nestedScrollEnabled={true}
            scrollEnabled={false}
            keyExtractor={(item, index) => index.toString()}
          />
          <FlatList
            numColumns={8}
            data={seatListOder}
            renderItem={viewItem}
            nestedScrollEnabled={true}
            scrollEnabled={false}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
        <View style={{ width: '100%', height: '5%', alignItems: 'center', marginTop: 50, }}>
          <Text style={{ fontSize: 10, color: 'gray' }}>MÀN HÌNH</Text>
          <View style={{ width: '75%', height: '12%', backgroundColor: '#999900', shadowOffset: { width: 3, height: 2 }, shadowOpacity: 0.4, marginLeft: '3%' }}></View>
        </View>
      </ScrollView>

      <View style={{ width: '100%', height: '10%', }}>
        <View style={{ width: '100%', height: '50%', alignItems: 'center', justifyContent: 'space-evenly', flexDirection: 'row' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', width: '24%', justifyContent: 'space-between', }}>
            <TouchableOpacity style={{ width: 17, height: 17, borderWidth: 0.2, borderRadius: 3, backgroundColor: 'white' }} />
            <Text>Ghế thường</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', width: '18%', justifyContent: 'space-between', }}>
            <TouchableOpacity style={{ width: 17, height: 17, borderWidth: 0.5, borderRadius: 3, backgroundColor: 'white', borderColor: '#CCCC00' }} />
            <Text>Ghế Vip</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', width: '24%', justifyContent: 'space-between', }}>
            <TouchableOpacity style={{ width: 17, height: 17, borderWidth: 0.5, borderRadius: 3, backgroundColor: 'white', borderColor: 'blue' }} />
            <Text>Ghế Couple</Text>
          </View>
        </View>
        <View style={{ width: '100%', height: '50%', alignItems: 'center', justifyContent: 'space-evenly', flexDirection: 'row' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', width: '17%', justifyContent: 'space-between' }}>
            <TouchableOpacity style={{ width: 17, height: 17, borderWidth: 0.2, borderRadius: 3, backgroundColor: 'gray' }} />
            <Text>Đã bán</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', width: '22.5%', justifyContent: 'space-between' }}>
            <TouchableOpacity style={{ width: 17, height: 17, borderWidth: 0.2, borderRadius: 3, backgroundColor: '#999900' }} />
            <Text>Đang chọn</Text>
          </View>
        </View>
      </View>

      <View style={{ width: '100%', flex: 1, flexDirection: 'row', borderTopWidth: 0.2, }}>
        <View style={{ height: '100%', width: '70%', justifyContent: 'center', marginTop: '1%' }}>
          <View style={{ flexDirection: 'row', marginLeft: '3%', height: '50%', alignItems: 'center' }}>
            <Text style={{ fontWeight: '600', color: 'gray', }}>{selectedSeatsCount}x</Text>
            <Text style={{ fontWeight: '500' }}> ghế: </Text>
            <Text style={{ fontWeight: '700', color: '#999900', color: 'gray', width: '78%', height: '70%', }} numberOfLines={1}
            >{selectedSeatIds.join(', ')}</Text>
          </View>
          <View style={{ flexDirection: 'row', marginLeft: '3%', alignItems: 'center', height: '50%' }}>
            <Text style={{ fontWeight: '500', color: 'gray' }}>Tổng cộng: </Text>
            <Text style={{ fontWeight: '700', color: '#999900', fontSize: 15 }}>{price.toLocaleString()}đ</Text>
          </View>
        </View>
        <View style={{ height: '100%', flex: 1, alignItems: 'flex-start', justifyContent: 'center' }}>
          <TouchableOpacity style={{
            width: '88%', height: '75%', alignItems: 'center', justifyContent: 'center', backgroundColor: (price > 0) ? '#999900' : '#CCCCCC',
            borderRadius: 5
          }} onPress={() => {
            setProgress(true);
            pressContinue();
          }}>
            <Text style={{ color: 'white', fontSize: 16, fontWeight: '700' }}>Tiếp tục</Text>
          </TouchableOpacity>
        </View>
      </View>
      {progress ? <Loader indeterminate={progress} /> : null}
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5F5F5',
    flex: 1,
    alignItems: 'center',
  },
  dropdown: {
    width: '100%',
    height: '100%',
    borderColor: 'gray',
    borderWidth: 0.4,
    borderRadius: 5,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 14,
    color: 'gray',
  },
  selectedTextStyle: {
    fontSize: 14,
  },
});