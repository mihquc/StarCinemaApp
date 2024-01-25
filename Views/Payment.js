import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { View, Alert, Image, Text, TouchableOpacity, StyleSheet, SafeAreaView, Modal } from 'react-native';
import { useSelector } from 'react-redux'
import { Dropdown } from 'react-native-element-dropdown';
import Loader from '../Component/loader';
import SeatTimer from '../Component/seatTimer';
import axios from 'axios';
import * as Linking from 'expo-linking';
import URL from '../Component/API';
import * as WebBrowser from 'expo-web-browser';

export default function Payment({ navigation, route }) {
  const URLPromotions = `${URL}/customer/homepage/search/promotions`;
  const URLLink = `${URL}/customer/booking/vnpay/url`;
  const movie = useSelector((state) => state.movies.selectedMovie);
  const token = useSelector((state) => state.loginInfo.token);
  const listSeatId = route.params.listSeatId;
  const date = route.params.date;
  const time = route.params.time;
  const cinemaName = route.params.cinemaName;
  const selectedSeatIds = route.params.selectedSeatIds;
  const price = route.params.price;
  const [isFocus, setIsFocus] = useState(false);
  const [titlePromotion, setPromotion] = useState('');
  const [discount, setDiscount] = useState(0);
  const [link, setLink] = useState('');
  const [listDiscount, setListDiscount] = useState([]);
  const [alertVisible, setAlertVisible] = useState(true);
  const [alertBack, setAlertBack] = useState(false);
  const [progress, setProgress] = useState(false);

  const confirmAlert = () => {
    setAlertVisible(false);
  };
  const cancelAlert = () => {
    setAlertVisible(false);
    navigation.popToTop();
    setProgress(false);
  };
  const continueAlert = () => {
    setAlertBack(false);
    navigation.goBack();
    setProgress(false);
  };
  const getLink = (seatId, id) => {
    console.log(`${URLLink}/${seatId.join(',')}/${id}?Authorization=Customer-Bearer ${token}`);
    axios.get(`${URLLink}/${seatId.join(',')}/${id}?Authorization=Customer-Bearer ${token}`)
      .then((response) => {
        const data = response.data;
        setLink(data.data);
      })
      .catch((error) => { console.log(error); });
  }
  useEffect(() => {
    axios.get(URLPromotions)
      .then((response) => {
        const data = response.data;
        setListDiscount(data);
      })
      .catch((error) => { console.log(error); });

  }, [])

  const formatDay = (text) => {
    const dayofweek = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
    let date = new Date(text);
    let dayIndex = date.getDay();
    return dayofweek[dayIndex];
  }
  const formatDate = (text) => {
    let date = new Date(text);
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    month = (month < 10) ? `0${month}` : month;
    day = (day < 10) ? `0${day}` : day;
    return `${day}/${month}/${year}`;
  }


  const total = price - (price * discount / 100);

  const [vnpay, setVnpay] = useState(false);

  const handleVnpayChange = () => {
    setVnpay(!vnpay);
  };
  const vnpayRadioButton = (label) => (
    <TouchableOpacity
      style={{
        width: '100%',
        height: '25%',
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
      onPress={() => handleVnpayChange()}>
      <View style={{ flexDirection: 'row', alignItems: 'center', width: '35%', height: '100%', justifyContent: 'space-evenly' }}>
        <Image style={{ width: 50, height: 50 }} source={require('./Image/vnpay.png')} />
        <Text style={{ fontWeight: '500' }}>{label}</Text>
      </View>
      <View
        style={{
          marginRight: 8,
          width: 16,
          height: 16,
          borderRadius: 10,
          borderWidth: 0.5,
          borderColor: vnpay ? 'green' : 'gray',
          backgroundColor: vnpay ? 'green' : 'transparent',
          justifyContent: 'center',
          alignItems: 'center',
        }}>

        {vnpay && (
          <View
            style={{
              width: 7,
              height: 7,
              borderRadius: 5,
              backgroundColor: 'white',
            }}
          />
        )}
      </View>
    </TouchableOpacity>
  );
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />

      <Modal transparent visible={alertVisible} animationType="slide">
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.6)', }}>
          <View style={{ backgroundColor: 'white', borderRadius: 2, alignItems: 'center', width: '88%', height: '27%', }}>
            <View style={{ width: '100%', height: '23%', alignItems: 'center', justifyContent: 'flex-end' }}>
              <View style={{ width: '12%', height: '50%', backgroundColor: '#999900', alignItems: 'center', justifyContent: 'center', borderRadius: 3 }}>
                <Text style={{ color: 'white', fontSize: 14, fontWeight: '600' }}>{(movie.rated.slice(0, 3) === "P -") ? 'P' : movie.rated.slice(0, 3)}</Text>
              </View>
            </View>
            <View style={{ width: '100%', height: '55%', alignItems: 'center' }}>
              <View style={{ width: '85%', height: '50%', alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontWeight: '600', textAlign: 'center', fontSize: 17 }}>Xác nhận mua vé cho người có độ tuổi phù hợp</Text>
              </View>
              <View style={{ width: '84%', height: '60%', }}>
                <Text style={{ textAlign: 'center', fontSize: 15 }}>Tôi xác nhận mua vé phim này cho người có độ tuổi phù hợp.</Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', width: '100%', height: '22%', }}>
              <TouchableOpacity style={{ width: '50%', height: '100%', backgroundColor: '#EEEEEE', justifyContent: 'center', alignItems: 'center' }}
                onPress={() => {
                  setProgress(true);
                  cancelAlert();
                }}>
                <Text style={{ fontWeight: '500', fontSize: 16, color: 'black' }}>Từ chối</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ width: '50%', height: '100%', backgroundColor: '#999900', justifyContent: 'center', alignItems: 'center' }}
                onPress={confirmAlert}>
                <Text style={{ fontWeight: '500', fontSize: 16, color: 'white' }}>Đồng ý</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal transparent visible={alertBack} animationType="slide">
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.6)', }}>
          <View style={{ backgroundColor: 'white', borderRadius: 2, alignItems: 'center', width: '88%', height: '27%', }}>
            <View style={{ width: '100%', height: '28%', alignItems: 'center', justifyContent: 'flex-end' }}>
              <View style={{
                width: '15%', height: '70%', backgroundColor: '#999900', alignItems: 'center', justifyContent: 'center',
                borderRadius: 3,
              }}>
                <Image source={require('./Image/warning.png')} style={{ width: '100%', height: '100%', resizeMode: 'contain', }} />
              </View>
            </View>
            <View style={{ width: '100%', height: '50%', alignItems: 'center' }}>
              <View style={{ width: '85%', height: '50%', alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontWeight: '600', textAlign: 'center', fontSize: 17 }}>Thông Tin</Text>
              </View>
              <View style={{ width: '84%', height: '60%', }}>
                <Text style={{ textAlign: 'center', fontSize: 15 }}>Các khuyến mãi đã áp dụng sẽ được gỡ bỏ, bạn có muốn tiếp tục?</Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', width: '100%', height: '22%', }}>
              <TouchableOpacity style={{ width: '50%', height: '100%', backgroundColor: '#EEEEEE', justifyContent: 'center', alignItems: 'center' }}
                onPress={() => {
                  // setProgress(true);
                  setAlertBack(false);
                }}>
                <Text style={{ fontWeight: '500', fontSize: 16, color: 'black' }}>Đóng</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ width: '50%', height: '100%', backgroundColor: '#999900', justifyContent: 'center', alignItems: 'center' }}
                onPress={() => {
                  setProgress(true);
                  continueAlert();
                }}>
                <Text style={{ fontWeight: '500', fontSize: 16, color: 'white' }}>Tiếp tục</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <View style={{ width: '100%', height: '5%', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row' }}>
        <TouchableOpacity style={{ width: '16%', height: '80%', alignItems: 'center' }} onPress={() => { setAlertBack(true) }}>
          <Image source={require('./Image/icon_back.png')} style={{ width: '100%', height: '100%', tintColor: 'purple', resizeMode: 'contain' }} />
        </TouchableOpacity>
        <Text style={{ fontSize: 19, fontWeight: '600', width: '60%' }}>Giao dịch</Text>
      </View>
      <SeatTimer seatTimeoutInSeconds={600} navigation={navigation} />

      <View style={{ width: '100%', height: '22%', borderTopWidth: 0.2, alignItems: 'center', justifyContent: 'center' }}>
        <View style={{
          width: '85%', height: '80%', borderRadius: 2, flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', borderRadius: 33,
          shadowOffset: 1, shadowOpacity: 0.3
        }}>
          <Image source={require('./Image/Ticket.png')} style={{ width: '100%', height: '100%', resizeMode: 'stretch', tintColor: '#999900', position: 'absolute', }} />
          <View style={{ width: '40%', height: '95%', alignItems: 'center', justifyContent: 'center' }}>
            <Image source={{ uri: movie.posterUrl }} style={{ width: '62%', height: '90%', resizeMode: 'stretch', borderRadius: 3 }} />
          </View>
          <View style={{ width: '60%', height: '95%', justifyContent: 'space-evenly', left: '-14%' }}>
            <Text style={{ fontWeight: '600', fontSize: 16 }}>{movie.title}</Text>
            <View style={{ flexDirection: 'row', width: '50%', justifyContent: 'space-between', alignContent: 'center' }}>
              <Text>{movie.language}</Text>
              <View style={{ width: '25%', height: 20, backgroundColor: '#999900', alignItems: 'center', justifyContent: 'center', borderRadius: 3 }}>
                <Text style={{ color: 'white', fontSize: 11, fontWeight: '600' }}>{(movie.rated.slice(0, 3) === "P -") ? 'P' : movie.rated.slice(0, 3)}</Text>
              </View>
            </View>
            <Text>{cinemaName}</Text>
            <View>
              <Text style={{ fontWeight: '600' }}>{time} - {formatDay(date)}, {formatDate(date)}</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={{ width: '100%', height: '28%', alignItems: 'center', justifyContent: 'center' }}>
        <View style={{ width: '93%', height: '15%', }}>
          <Text style={{ fontWeight: '600', fontSize: 14 }}>Thông tin giao dịch</Text>
        </View>
        <View style={{ width: '100%', height: '85%', alignItems: 'center', backgroundColor: 'white', shadowOffset: 1, shadowOpacity: 0.2, }}>
          <View style={{ flexDirection: 'row', width: '93%', height: '20%', alignItems: 'center', justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ fontWeight: '600' }}>2x </Text>
              <Text>Nguoi Lon - Member - </Text>
              <Text style={{ fontWeight: '600' }}>{selectedSeatIds.join(', ')}</Text>
            </View>
            <Text style={{ fontWeight: '600', }}>{price.toLocaleString()}đ</Text>
          </View>
          <View style={{ width: '93%', height: '80%', justifyContent: 'space-evenly' }}>
            <View style={{ width: '100%', height: '30%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <Text style={{ fontWeight: '600', fontSize: 15 }}>Khuyến mãi:</Text>
              <Dropdown
                style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                data={listDiscount}
                maxHeight={300}
                labelField="title"
                valueField="title"
                placeholder={'Khuyến mãi'}
                value={titlePromotion}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                  setPromotion(item.title);
                  setDiscount(item.discount);
                  setIsFocus(false);
                  getLink(listSeatId, item.id);
                }}
              />
            </View>
            <View style={{ flexDirection: 'row', width: '75%', justifyContent: 'space-between', }}>
              <Text style={{ fontWeight: '600', color: '#999900', fontSize: 16 }}>Tổng cộng: </Text>
              <Text style={{ fontWeight: '600', color: '#999900', fontSize: 16 }}>{price.toLocaleString()}đ {discount > 0 ? `- ${discount}% = ${total.toLocaleString()}đ` : ''} </Text>
            </View>
          </View>
        </View>
      </View>
      <View style={{ width: '100%', height: '30%', alignItems: 'center', }}>
        <View style={{ width: '93%', height: '15%', justifyContent: 'center' }}>
          <Text style={{ fontWeight: '600', fontSize: 14 }}>Thông tin thanh toán</Text>
        </View>
        <View style={{ width: '100%', height: '85%', }}>
          {vnpayRadioButton('VNPAY')}
        </View>
      </View>
      <View style={{ width: '100%', flex: 1, flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ height: '100%', width: '60%', alignItems: 'center', flexDirection: 'row', marginLeft: '3%' }}>
          <Text style={{ fontWeight: '500', color: 'gray', fontSize: 17 }}>Tổng cộng: </Text>
          <Text style={{ fontWeight: '700', color: '#999900', fontSize: 17 }}>{total.toLocaleString()}đ</Text>
        </View>
        <View style={{ height: '70%', width: '40%', alignItems: 'center', justifyContent: 'center', }}>
          <TouchableOpacity style={{
            width: '70%', height: '70%', alignItems: 'center', justifyContent: 'center', backgroundColor: vnpay ? '#999900' : '#e5e5e5',
            borderRadius: 5, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1
          }} onPress={() => {
            if (vnpay) {
              // Linking.openURL(link);
              WebBrowser.openBrowserAsync(link);
              navigation.navigate('MyTabs', { screen: 'Tài khoản' });
            } else {
              Alert.alert('Thông báo!', 'Hãy chọn phương thức thanh toán.');
            }
          }}>
            <Text style={{ color: 'white', fontSize: 15, fontWeight: '600' }}>Thanh toán</Text>
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
  placeholderStyle: {
    fontSize: 15,
    color: 'gray',
  },
  selectedTextStyle: {
    fontSize: 15,
  },
  dropdown: {
    backgroundColor: 'white',
    width: '75%',
    height: '90%',
    borderColor: 'gray',
    borderWidth: 0.4,
    borderRadius: 5,
    paddingHorizontal: 8,
  },
});