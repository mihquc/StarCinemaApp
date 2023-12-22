import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { View, TextInput, Image, Text, TouchableOpacity, StyleSheet, SafeAreaView, Modal } from 'react-native';
import { useSelector } from 'react-redux'
import { Dropdown } from 'react-native-element-dropdown';

export default function Payment({navigation, route}) {
    const movie = useSelector((state) => state.movies.selectedMovie);
    const address = route.params.address;
    const time = route.params.time;
    const selectedSeatIds = route.params.selectedSeatIds; 
    const price = route.params.price;
    const [isFocus, setIsFocus] = useState(false);
    const [titlePromotion, setPromotion] = useState('');
    const [discount, setDiscount] = useState(0);
    const [alertVisible, setAlertVisible] = useState(true);

    const hideAlert = () => {
      setAlertVisible(false);
    };

    useEffect(() => {
      setAlertVisible(true);
    }, []);

    const data = [
      {
        imageUrl: "https://ocwckgy6c1obj.vcdn.cloud/media/banner/cache/1/b58515f018eb873dafa430b6f9ae0c1e/2/0/2023_happy_wed_75k_000_240x201.png",
        title: 'Thứ 4 vui vẻ',
        discount: 10,
      },
      {
        image: "https://ocwckgy6c1obj.vcdn.cloud/media/banner/cache/1/b58515f018eb873dafa430b6f9ae0c1e/2/0/2023_happy_wed_75k_000_240x201.png",
        title: 'Marry christmas',
        discount: 5,
      },
      {
        image: "https://ocwckgy6c1obj.vcdn.cloud/media/banner/cache/1/b58515f018eb873dafa430b6f9ae0c1e/2/0/2023_happy_wed_75k_000_240x201.png",
        title: 'Khách hàng quen thuộc',
        discount: 7,
      },
      {
        image: "https://ocwckgy6c1obj.vcdn.cloud/media/banner/cache/1/b58515f018eb873dafa430b6f9ae0c1e/2/0/2023_happy_wed_75k_000_240x201.png",
        title: 'Cuối tuần săn vé',
        discount: 8,
      },
      {
        image: "https://ocwckgy6c1obj.vcdn.cloud/media/banner/cache/1/b58515f018eb873dafa430b6f9ae0c1e/2/0/2023_happy_wed_75k_000_240x201.png",
        title: 'Nhận quà cuối năm',
        discount: 12,
      },
    ];

    const total = price - (price*discount/100);

    return(
      <SafeAreaView style={styles.container}>
        <StatusBar style="auto"/>

        <Modal transparent visible={alertVisible} animationType="slide">
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.6)',}}>
            <View style={{backgroundColor: 'white', borderRadius: 5, alignItems: 'center', width: '80%', height: '30%',}}>
              <View style={{width: '100%', height: '20%', backgroundColor: 'gray', alignItems: 'center', justifyContent: 'center'}}>
                <View style={{width: '10%', height: '45%', backgroundColor: '#999900', alignItems: 'center', justifyContent: 'center', borderRadius: 3}}>
                  <Text style={{color: 'white', fontSize: 14, fontWeight: '600'}}>{movie.rated}</Text>
                </View>
              </View>
              <View style={{width: '100%', height: '60%', backgroundColor: 'red'}}>

              </View>
              <View style={{flexDirection: 'row', width: '100%', height: '20%', }}>
                <TouchableOpacity style={{width: '50%', height: '100%', backgroundColor: 'darkgray', justifyContent: 'center', alignItems: 'center'}} 
                  onPress={hideAlert}>
                  <Text style={{fontWeight: '600', fontSize: 16, color: 'black'}}>Từ chối</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{width: '50%', height: '100%', backgroundColor: '#999900', justifyContent: 'center', alignItems: 'center'}} 
                  onPress={hideAlert}>
                  <Text style={{fontWeight: '600', fontSize: 16, color: 'white'}}>Xác nhận</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        <View style={{width: '100%', height: '5%', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row'}}>
          <TouchableOpacity style={{width: '16%', height: '80%', alignItems: 'center'}} onPress={() => {navigation.goBack()}}>
            <Image source={require('./Image/icon_back.png')} style={{width: '100%', height: '100%', tintColor: 'purple', resizeMode: 'contain'}}/>
          </TouchableOpacity>
          <Text style={{fontSize: 19, fontWeight: '600', width: '60%'}}>Giao dịch</Text>
        </View>
        <View style={{width: '100%', height: '22%', borderTopWidth: 0.2, alignItems: 'center', justifyContent: 'center'}}>
          <View style={{width: '85%', height: '80%', borderRadius: 2, flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', borderRadius: 33,
          shadowOffset: 1, shadowOpacity: 0.3}}>
            <Image source={require('./Image/Ticket.png')} style={{width: '100%', height: '100%', resizeMode: 'stretch', tintColor: '#999900', position: 'absolute',}}/>
            <View style={{width: '40%', height: '95%', alignItems: 'center', justifyContent: 'center'}}>
              <Image source={{uri: movie.posterUrl}} style={{width: '62%', height: '90%', resizeMode: 'stretch', borderRadius: 3}}/>
            </View>
            <View style={{width: '60%', height: '95%', justifyContent: 'space-evenly', left: '-10%'}}>
              <Text style={{fontWeight: '600', fontSize: 16}}>{movie.title}</Text>
              <View style={{flexDirection: 'row', width: '50%', justifyContent: 'space-between', alignContent: 'center'}}>
                <Text>{movie.language}</Text>
                <View style={{width: '25%', height: 20, backgroundColor: '#999900', alignItems: 'center', justifyContent: 'center', borderRadius: 3}}>
                  <Text style={{color: 'white', fontSize: 11, fontWeight: '600'}}>{movie.rated}</Text>
                </View>
              </View>
              <Text>{address} {}</Text> 
              <View>
                <Text style={{fontWeight: '600'}}>{time} - Thứ 3, 18/12/2023</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={{width: '100%', height: '20%', alignItems: 'center',}}>
          <View style={{width: '93%', height: '15%',}}>
            <Text style={{fontWeight: '600', fontSize: 14}}>Thông tin giao dịch</Text>
          </View>
          <View style={{width: '100%', height: '85%', alignItems: 'center', backgroundColor: 'white', shadowOffset: 1, shadowOpacity: 0.2}}>
            <View style={{flexDirection: 'row', width: '93%', height: '20%', alignItems: 'center', justifyContent: 'space-between'}}>
              <View style={{flexDirection: 'row'}}>
                <Text style={{fontWeight: '600'}}>2x </Text>
                <Text>Nguoi Lon - Member - {selectedSeatIds.join(', ')}</Text>
              </View>
              <Text style={{fontWeight: '600',}}>{price.toLocaleString()}đ</Text>
            </View>
            <View style={{width: '93%', height: '80%', justifyContent: 'space-evenly'}}>
              <View style={{ width: '100%', height: '42%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                <Text style={{fontWeight: '600', fontSize: 15}}>Khuyến mãi:</Text>
                <Dropdown
                  style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  data={data}
                  // search
                  maxHeight={300} 
                  labelField="title"
                  valueField="title"
                  placeholder={'Khuyến mãi'}
                  // searchPlaceholder="Search..."
                  value={titlePromotion}
                  onFocus={() => setIsFocus(true)}
                  onBlur={() => setIsFocus(false)}
                  onChange={item => {
                    setPromotion(item.title);
                    setDiscount(item.discount);
                    setIsFocus(false);
                  }}
                />
              </View>
              <View style={{flexDirection: 'row', width: '75%', justifyContent: 'space-between',}}>
                <Text style={{fontWeight: '600', color: '#999900', fontSize: 15}}>Tổng cộng: </Text> 
                <Text style={{fontWeight: '600', color: '#999900', fontSize: 15}}>{price.toLocaleString()}đ {discount > 0 ? `- ${discount}% = ${total.toLocaleString()}đ` : ''} </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={{width: '100%', height: '44%', alignItems: 'center',}}>
          <View style={{width: '93%', height: '10%', justifyContent: 'center'}}>
            <Text style={{fontWeight: '600', fontSize: 14}}>Thông tin thanh toán</Text>
          </View>
          <View style={{width: '100%', height: '90%', backgroundColor: 'gray'}}>
          
          </View>
        </View>
        <View style={{width: '100%', flex: 1, flexDirection: 'row',}}>
            <View style={{height: '100%', width: '70%', alignItems: 'center', flexDirection: 'row', marginLeft: '3%'}}>
            <Text style={{fontWeight: '500', color: 'gray', fontSize: 17}}>Tổng cộng: </Text>
            <Text style={{fontWeight: '700', color:'#999900', fontSize: 17}}>{total.toLocaleString()}đ</Text>
            </View>
            <View style={{height: '100%', flex: 1, alignItems: 'flex-start', justifyContent: 'center'}}>
              <TouchableOpacity style={{width: '88%', height: '70%', alignItems: 'center', justifyContent: 'center', backgroundColor: '#999900', 
              borderRadius: 5}}> 
                  <Text style={{color: 'white', fontSize: 16, fontWeight: '700'}}>Tiếp tục</Text>
              </TouchableOpacity>
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