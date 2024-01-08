import { StyleSheet, Text, View, Image, TouchableOpacity, Modal, FlatList, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import moment from 'moment';
import QRCode from 'react-native-qrcode-svg';
import URL from '../Component/API';

const { width: screenWidth } = Dimensions.get('window');
export default function BillHistory({ navigation }) {
  const URLI = `${URL}/customer/booking/info`;
  const token = useSelector((state) => state.loginInfo.token);
  const [openDetail, setOpenDetail] = useState(false);
  const [bill, setBill] = useState({
    bookingId: "",
    bookingQr: "",
    cinemaName: "",
    genre: "",
    hallName: "",
    movieName: "",
    posterUrl: "",
    price: 0,
    promotionId: 0, seatIds: [],
    startTime: ""
  });
  const [listBills, setListBills] = useState([]);
  const getDatetime = (date, mode) => {
    const dateObject = moment(date, 'YYYY/MM/DD HH:mm:ss');
    let result = {};
    if (mode === '1') {
      let date = dateObject.date();
      let month = dateObject.month() + 1;
      let year = dateObject.year();
      date = (date < 10) ? `0${date}` : (date);
      month = (month < 10) ? `0${month}` : (month);
      result = `${date}-${month}-${year}`;
    } else {
      let hour = dateObject.hours();
      let minute = dateObject.minutes();
      minute = (minute < 10) ? `0${minute}` : (minute);
      result = `${hour}:${minute}`;
    }
    return result
  }
  const getBills = () => {
    axios.get(`${URLI}?Authorization=Customer-Bearer ${token}`)
      .then((response) => {
        const data = response.data.data;
        // console.log(data);
        // console.log(data1);
        setListBills(data);
      })
      .catch((error) => { console.log(error); });
  }
  useEffect(() => {
    getBills();
  }, [])
  const data = [
    { id: 1 },
    { id: 1 },
    { id: 1 },
    { id: 1 },
    { id: 1 },
    { id: 1 },
    { id: 1 },
  ]
  const viewItem = (item, index) => {
    // console.log(item)
    return (
      <TouchableOpacity style={{
        width: screenWidth - (16 / 100 * screenWidth), height: 150, borderRadius: 2, flexDirection: 'row',
        alignItems: 'center', backgroundColor: 'white', borderRadius: 33, shadowOffset: 1, shadowOpacity: 0.3, marginBottom: '10%'
      }} onPress={() => {
        setOpenDetail(true);
        setBill(item.item);
      }}>
        <Image source={require('./Image/Ticket.png')} style={{
          width: '100%', height: '100%', resizeMode: 'stretch',
          tintColor: '#999900', position: 'absolute',
        }} />
        <View style={{ width: '40%', height: '95%', alignItems: 'center', justifyContent: 'center' }}>
          <Image source={{ uri: item.item.posterUrl }} style={{ width: '62%', height: '90%', resizeMode: 'stretch', borderRadius: 3 }} />
        </View>
        <View style={{ width: '60%', height: '95%', justifyContent: 'space-evenly', left: '-14%' }}>
          <Text style={{ fontWeight: '600', fontSize: 16 }}>{item.item.movieName}</Text>
          <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', alignContent: 'center' }}>
            <Text>Thể loại: {item.item.genre}</Text>
          </View>
          <Text>{item.item.cinemaName}</Text>
          <View>
            <Text style={{ fontWeight: '600' }}>{getDatetime(item.item.startTime, '2')} - {getDatetime(item.item.startTime, '1')}</Text>
          </View>
        </View>

      </TouchableOpacity>
    )
  }
  return (
    <View style={styles.container}>
      <View style={{ width: '100%', height: '12%', alignItems: 'flex-end', justifyContent: 'flex-start', flexDirection: 'row', backgroundColor: 'white' }}>
        <TouchableOpacity style={{ width: '20%', height: '50%', alignItems: 'center', justifyContent: 'center' }}
          onPress={() => { navigation.goBack() }}>
          <Image style={{ width: '50%', height: '60%', resizeMode: 'contain', }} source={require('./Image/icon_back.png')} />
        </TouchableOpacity>
        <View style={{ width: '60%', height: '50%', alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontSize: 17, fontWeight: '500' }}>Lịch Sử Giao Dịch</Text>
        </View>
      </View>
      <Modal transparent visible={openDetail} animationType="slide">
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.6)', }}>
          <View style={{ backgroundColor: 'white', borderRadius: 4, alignItems: 'center', width: '75%', height: '68%', }}>
            <View style={{ width: '90%', height: '10%', alignItems: 'center', justifyContent: 'flex-end', flexDirection: 'row' }}>
              <View style={{ width: '84%', alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 16, fontWeight: '600' }}>Chi tiết giao dịch</Text>
              </View>
              <TouchableOpacity style={{ width: '8%', height: '50%', justifyContent: 'center', alignItems: 'center' }}
                onPress={() => { setOpenDetail(false) }}>
                <Image source={require('./Image/icon_xx.png')} style={{ width: '70%', height: '70%', resizeMode: 'contain', tintColor: 'gray' }} />
              </TouchableOpacity>
            </View>
            <View style={{ width: '100%', height: '35%', alignItems: 'center', justifyContent: 'space-between', }}>
              <Image source={{ uri: bill.posterUrl }} style={{ width: '40%', height: '75%', resizeMode: 'contain', }} />
              <Text style={{ fontSize: 16, fontWeight: '600' }}>{bill.movieName}</Text>
              <Text style={{ fontSize: 16, }}>{bill.genre}</Text>
            </View>
            <View style={{ width: '100%', height: '1%', backgroundColor: '#eeeeee', marginVertical: '3%' }}></View>
            <View style={{ width: '100%', height: '28%', alignItems: 'center', justifyContent: 'space-around' }}>
              <Text style={{ fontSize: 15, fontWeight: '500' }}>{bill.cinemaName} - {bill.hallName}</Text>
              <Text style={{ fontSize: 15, fontWeight: '500' }}>Suất: {getDatetime(bill.startTime, '2')}, {getDatetime(bill.startTime, '1')}</Text>
              <QRCode
                value={bill.bookingQr}
              />
            </View>
            <View style={{ width: '100%', height: '0.2%', backgroundColor: '#eeeeee', marginVertical: '3%' }}></View>
            <View style={{ width: '90%', height: '5%', justifyContent: 'center' }}>
              <Text style={{ fontWeight: '500', fontSize: 16 }}>
                Ghế - {bill.seatIds.join(', ')}
              </Text>
            </View>
            <View style={{ width: '100%', flex: 1, flexDirection: 'row' }}>
              <View style={{ width: '33%', height: '90%', alignItems: 'center', justifyContent: 'space-evenly' }}>
                <Text style={{ fontSize: 16, fontWeight: '600' }}>Mã vé</Text>
                <Text>{bill.bookingId}</Text>
              </View>
              <View style={{ width: '33%', height: '90%', alignItems: 'center', justifyContent: 'space-evenly' }}>
                <Text style={{ fontSize: 16, fontWeight: '600' }}>Khuyến mãi</Text>
                <Text>{(bill.promotionId) ? bill.promotionId : '0'}</Text>
              </View>
              <View style={{ width: '33%', height: '90%', alignItems: 'center', justifyContent: 'space-evenly' }}>
                <Text style={{ fontSize: 16, fontWeight: '600' }}>Giá</Text>
                <Text>{bill.price.toLocaleString()}đ</Text>
              </View>
            </View>
          </View>
        </View>
      </Modal>
      <View style={{ width: '100%', flex: 1, alignItems: 'center' }}>
        {listBills.length !== 0 ? <FlatList
          showsVerticalScrollIndicator={false}
          data={listBills}
          renderItem={viewItem}
          keyExtractor={(item, index) => index.toString()}
        /> :
          <View style={{ width: '100%', height: '50%', alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 16, fontWeight: '600' }}>Bạn chưa có lịch sử giao dịch!</Text>
          </View>
        }
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
})