import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { View, TextInput, Image, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, FlatList, Alert } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import Seat from '../Component/seat';

export default function Room({navigation, route}) {
    
    const [nameMovie, setNameMovie] = useState(route.params.name);
    const [price, setPrice] = useState(0);
    
    const [time, setTime] = useState(route.params.item.time);
    const [isFocus, setIsFocus] = useState(false);

    const data = ['K', 'J', 'I', 'H', 'G', 'F', 'E', 'D', 'C', 'B', 'A', ]
    const createSeatArray = (sum) => {
      const seatArray = [];
      let j = 1, y = 1, h = 1, g=1, f=1, e=1, d=1, c=1, b=1, a = 1;
      for (let i = 0; i < sum; i++) {
        if(i < 12){
          seatArray.push({seatId: `K${i+1}`});
        }
        if(i > 11 && i < 24){
          seatArray.push({seatId: `J${j}`});
          j += 1;
        }
        if(i > 23 && i < 36){
          seatArray.push({seatId: `I${y}`});
          y += 1;
        }
        if(i > 35 && i < 48){
          seatArray.push({seatId: `H${h}`});
          h += 1;
        }
        if(i > 47 && i < 60){
          seatArray.push({seatId: `G${g}`});
          g += 1;
        }
        if(i > 59 && i < 72){
          seatArray.push({seatId: `F${f}`});
          f += 1;
        }
        if(i > 71 && i < 84){
          seatArray.push({seatId: `E${e}`});
          e += 1;
        }
        if(i > 83 && i < 96){
          seatArray.push({seatId: `D${d}`});
          d += 1;
        }
        if(i > 95 && i < 108){
          seatArray.push({seatId: `C${c}`});
          c += 1;
        }
        if(i > 107 && i < 120){
          seatArray.push({seatId: `B${b}`});
          b += 1;
        }
        if(i > 119 && i < 132){
          seatArray.push({seatId: `A${a}`});
          a += 1;
        }
      }
      return seatArray;
    }

    const [selectedSeatIds, setSelectedSeatIds] = useState([]);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [selectedSeatsCount, setSelectedSeatsCount] = useState(0);
    // const [exceededLimit, setExceededLimit] = useState(false);

    const handleSeatPress = (isPressed, item) => {
      if (isPressed) {
        if(selectedSeatsCount < 8){
          setSelectedSeats([...selectedSeats, item]);
          setPrice(price + calculateSeatPrice(item));
          setSelectedSeatsCount(selectedSeatsCount + 1);
          setSelectedSeatIds([...selectedSeatIds, item.seatId]); // Thêm seatId vào danh sách
        } else {
          // Hiển thị cảnh báo khi chọn quá số lượng cho phép
          Alert.alert('Warning', 'Bạn chỉ có thể chọn tối đa 8 ghế.');
        }
      } else  {
        const updatedSeats = selectedSeats.filter((selectedSeat) => selectedSeat !== item);
        setSelectedSeats(updatedSeats);
        setPrice(price - calculateSeatPrice(item));
        setSelectedSeatsCount(selectedSeatsCount - 1);
        setSelectedSeatIds(selectedSeatIds.filter((seatId) => seatId !== item.seatId)); // Loại bỏ seatId khỏi danh sách
      } 
    };
    const calculateSeatPrice = (seat) => {
      // Giả sử giá của mỗi ghế là 50,000 đồng
      const pricePerTicket = 50000;
      return pricePerTicket;
    };

    const sttItem = ({item, index}) => {
      return (
        <Text style={{marginTop: index === 0 ? 0 : 10, marginLeft: 10, fontSize: 11}}>{item}</Text>
      )
    };
    const viewItem = ({item, index}) => {
      return (
        <Seat style={{width: 20, height: 20, borderWidth: 0.2, borderColor: 'gray', marginRight: 3, marginLeft: (index%12 == 0) ? 0 : 0, 
          borderRadius: 3, marginBottom: 3,}}
          item={item}
          index={index}
          // exceededLimit={exceededLimit}
          onPress={handleSeatPress}/>
      )
    };

    return(
      <SafeAreaView style={styles.container}>
        <StatusBar style="auto"/>
        <View style={{width: '88%', height: '6%', justifyContent: 'flex-start', flexDirection: 'row',}} >
          <TouchableOpacity style={{width: '10%', height: '100%', justifyContent: 'center', alignItems:'center'}} 
          onPress={() => {
            route.params.isLoggedIn ? navigation.pop(2) : navigation.pop(1);
          }}
          >
            <Image source={require('./Image/icon_back.png')}  style={{width: 30, height: 30}}/>
          </TouchableOpacity>

          <View style={{width: '80%', height: '100%', alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{fontSize: 17, fontWeight: '600'}}>Star Cinema</Text>
          </View>
        </View>

        <View style={{width: '100%', height: '10%', borderTopWidth: 0.2, flexDirection: 'row', justifyContent: 'space-evenly',}}>
          <View style={{width: '60%', height: '100%',}}>
            <Text style={{fontSize: 15, fontWeight: '600', top: '20%'}}>{nameMovie}</Text>
          </View>
          <View style={{width: '28%', height: '100%', justifyContent: 'center',}}>
            <View style={{ backgroundColor: 'white', width: '100%', height: '52%'}}>
            {/* {renderLabel()} */}
              <Dropdown
                style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                // inputSearchStyle={styles.inputSearchStyle}
                // iconStyle={styles.iconStyle}
                data={route.params.dataTime}
                // search
                maxHeight={300} 
                labelField="time"
                valueField="time"
                placeholder={'Time'} 
                // searchPlaceholder="Search..."
                value={time}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                  setTime(item.time);
                  setIsFocus(false);
                }}
              />
            </View>
          </View>
        </View>

        <ScrollView style={{width: '100%', height: '60%', backgroundColor: 'white'}} maximumZoomScale={2.0}
          showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}
        >
          <View style={{marginTop: 50, flexDirection: 'row'}}>
            <FlatList
              data={data}
              renderItem={sttItem}
              nestedScrollEnabled={true}
              scrollEnabled={false}
              keyExtractor={(item, index) => index.toString()}
            />
            <FlatList
              numColumns={12}
              data={createSeatArray(12*11)}
              renderItem={viewItem}
              nestedScrollEnabled={true}
              scrollEnabled={false}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
          <View  style={{width: '100%', height: '5%', alignItems: 'center', marginTop: 50,}}>
            <Text style={{fontSize: 10, color: 'gray'}}>MÀN HÌNH</Text>
            <View style={{width: '75%', height: '12%', backgroundColor: '#999900', shadowOffset: { width: 3, height: 2}, shadowOpacity: 0.4, marginLeft: '2%'}}></View>
          </View>    
        </ScrollView>

        <View style={{width: '100%', height: '10%',}}>
          <View style={{width: '100%', height: '50%', alignItems: 'center', justifyContent: 'space-evenly', flexDirection: 'row'}}>
            <View style={{flexDirection: 'row', alignItems: 'center', width: '19%', justifyContent: 'space-between'}}>
              <TouchableOpacity style={{width: 17, height: 17, borderWidth: 0.2, borderRadius: 3, backgroundColor: 'white'}}/>
              <Text>Ghế đơn</Text>
            </View>
          </View>
          <View style={{width: '100%', height: '50%', alignItems: 'center', justifyContent: 'space-evenly', flexDirection: 'row'}}>
            <View style={{flexDirection: 'row', alignItems: 'center', width: '17%', justifyContent: 'space-between'}}>
              <TouchableOpacity style={{width: 17, height: 17, borderWidth: 0.2, borderRadius: 3, backgroundColor: 'gray'}}/>
              <Text>Đã bán</Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center', width: '22.5%', justifyContent: 'space-between'}}>
              <TouchableOpacity style={{width: 17, height: 17, borderWidth: 0.2, borderRadius: 3, backgroundColor: '#999900'}}/>
              <Text>Đang chọn</Text>
            </View>
          </View>
        </View>

        <View style={{width: '100%', flex: 1, flexDirection: 'row', borderTopWidth: 0.2,}}>
          <View style={{height: '100%', width: '70%', justifyContent: 'space-evenly', marginTop: '1%'}}>
            <View style={{flexDirection: 'row', marginLeft: '3%'}}>
              <Text style={{fontWeight: '600', color: 'gray', }}>{selectedSeatsCount}x</Text>
              <Text style={{fontWeight: '500'}}> ghế: </Text>
              <Text style={{fontWeight: '700', color:'#999900', color: 'gray',}}>{selectedSeatIds.join(', ')}</Text>
            </View>
            <View style={{flexDirection: 'row', marginLeft: '3%', alignItems: 'center'}}>
              <Text style={{fontWeight: '500', color: 'gray'}}>Tổng cộng: </Text>
              <Text style={{fontWeight: '700', color:'#999900', fontSize: 15}}>{price.toLocaleString()}đ</Text>
            </View>
          </View>
          <View style={{height: '100%', flex: 1, alignItems: 'flex-start', justifyContent: 'center'}}>
            <TouchableOpacity style={{width: '88%', height: '75%', alignItems: 'center', justifyContent: 'center', backgroundColor: '#999900', borderRadius: 5}}>
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