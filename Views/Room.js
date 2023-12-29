import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, FlatList, } from 'react-native';
import axios from 'axios';
import Seat from '../Component/seat';
import { useSelector } from 'react-redux';
import Loader from '../Component/loader';

export default function Room({navigation, route}) {
  const Movie = useSelector((state) => state.movies.selectedMovie);
  // const [seatList, setSeatList] = useState([]);
  const [seatListOder, setSeatListOrder] = useState([]);
  const address = route.params.address;
  const time = route.params.item.item.hour;
  useEffect(()=>{
    axios.get("https://658be023859b3491d3f4f2c6.mockapi.io/pbl6/api/seatOrderList")
    .then((response) => {
      const seatListInfo = [];
      const data = response.data;
      // console.log(data[4].seatList[2].columnCode);
      for( let i = 0; i < data.length; i++ ) {
        for (let j = 0; j < data[i].seatList.length; j++){
          seatListInfo.push(data[i].seatList[j]);
        }
      }
      setSeatListOrder(seatListInfo);
    }).catch((error) => console.error(error));
  }, [])
  // const seat = [
  //   {columnCode: 1, hallId: "1739901125851635714", id: "1739921775244894209", price: 50000, remark: null, rowCode: "A", seatTypeId: 1, seatTypeName: "Normal", showtimeId: "1739921775110676481", status: "N"}, 
  //   {columnCode: 2, hallId: "1739901125851635714", id: "1739921775312003074", price: 50000, remark: null, rowCode: "A", seatTypeId: 1, seatTypeName: "Normal", showtimeId: "1739921775110676481", status: "N"}, 
  //   {columnCode: 3, hallId: "1739901125851635714", id: "1739921775312003075", price: 50000, remark: null, rowCode: "A", seatTypeId: 1, seatTypeName: "Normal", showtimeId: "1739921775110676481", status: "N"}, 
  //   {columnCode: 4, hallId: "1739901125851635714", id: "1739921775312003076", price: 50000, remark: null, rowCode: "A", seatTypeId: 1, seatTypeName: "Normal", showtimeId: "1739921775110676481", status: "N"}, 
  //   {columnCode: 5, hallId: "1739901125851635714", id: "1739921775379111938", price: 50000, remark: null, rowCode: "A", seatTypeId: 1, seatTypeName: "Normal", showtimeId: "1739921775110676481", status: "N"}, 
  //   {columnCode: 6, hallId: "1739901125851635714", id: "1739921775379111939", price: 50000, remark: null, rowCode: "A", seatTypeId: 1, seatTypeName: "Normal", showtimeId: "1739921775110676481", status: "N"}, 
  //   {columnCode: 1, hallId: "1739901125851635714", id: "1739921775379111940", price: 50000, remark: null, rowCode: "B", seatTypeId: 1, seatTypeName: "Normal", showtimeId: "1739921775110676481", status: "N"}, 
  //   {columnCode: 2, hallId: "1739901125851635714", id: "1739921775379111941", price: 50000, remark: null, rowCode: "B", seatTypeId: 1, seatTypeName: "Normal", showtimeId: "1739921775110676481", status: "N"}, 
  //   {columnCode: 3, hallId: "1739901125851635714", id: "1739921775442026498", price: 50000, remark: null, rowCode: "B", seatTypeId: 1, seatTypeName: "Normal", showtimeId: "1739921775110676481", status: "N"},
  //   {columnCode: 4, hallId: "1739901125851635714", id: "1739921775442026499", price: 50000, remark: null, rowCode: "B", seatTypeId: 1, seatTypeName: "Normal", showtimeId: "1739921775110676481", status: "N"}, 
  //   {columnCode: 5, hallId: "1739901125851635714", id: "1739921775442026500", price: 50000, remark: null, rowCode: "B", seatTypeId: 1, seatTypeName: "Normal", showtimeId: "1739921775110676481", status: "N"}, 
  //   {columnCode: 6, hallId: "1739901125851635714", id: "1739921775442026501", price: 50000, remark: null, rowCode: "B", seatTypeId: 1, seatTypeName: "Normal", showtimeId: "1739921775110676481", status: "N"}, 
  //   {columnCode: 1, hallId: "1739901125851635714", id: "1739921775442026502", price: 50000, remark: null, rowCode: "C", seatTypeId: 1, seatTypeName: "Normal", showtimeId: "1739921775110676481", status: "N"}, 
  //   {columnCode: 2, hallId: "1739901125851635714", id: "1739921775442026503", price: 50000, remark: null, rowCode: "C", seatTypeId: 1, seatTypeName: "Normal", showtimeId: "1739921775110676481", status: "N"}, 
  //   {columnCode: 3, hallId: "1739901125851635714", id: "1739921775442026504", price: 50000, remark: null, rowCode: "C", seatTypeId: 1, seatTypeName: "Normal", showtimeId: "1739921775110676481", status: "N"}, 
  //   {columnCode: 4, hallId: "1739901125851635714", id: "1739921775442026505", price: 50000, remark: null, rowCode: "C", seatTypeId: 1, seatTypeName: "Normal", showtimeId: "1739921775110676481", status: "N"}, 
  //   {columnCode: 5, hallId: "1739901125851635714", id: "1739921775442026506", price: 50000, remark: null, rowCode: "C", seatTypeId: 1, seatTypeName: "Normal", showtimeId: "1739921775110676481", status: "N"}, 
  //   {columnCode: 6, hallId: "1739901125851635714", id: "1739921775442026507", price: 50000, remark: null, rowCode: "C", seatTypeId: 1, seatTypeName: "Normal", showtimeId: "1739921775110676481", status: "N"}, 
  //   {columnCode: 1, hallId: "1739901125851635714", id: "1739921775509135362", price: 50000, remark: null, rowCode: "D", seatTypeId: 1, seatTypeName: "Normal", showtimeId: "1739921775110676481", status: "N"}, 
  //   {columnCode: 2, hallId: "1739901125851635714", id: "1739921775509135363", price: 50000, remark: null, rowCode: "D", seatTypeId: 1, seatTypeName: "Normal", showtimeId: "1739921775110676481", status: "N"}, 
  //   {columnCode: 3, hallId: "1739901125851635714", id: "1739921775509135364", price: 50000, remark: null, rowCode: "D", seatTypeId: 1, seatTypeName: "Normal", showtimeId: "1739921775110676481", status: "N"}, 
  //   {columnCode: 4, hallId: "1739901125851635714", id: "1739921775509135365", price: 50000, remark: null, rowCode: "D", seatTypeId: 1, seatTypeName: "Normal", showtimeId: "1739921775110676481", status: "N"}, 
  //   {columnCode: 5, hallId: "1739901125851635714", id: "1739921775509135366", price: 50000, remark: null, rowCode: "D", seatTypeId: 1, seatTypeName: "Normal", showtimeId: "1739921775110676481", status: "N"}, 
  //   {columnCode: 6, hallId: "1739901125851635714", id: "1739921775509135367", price: 50000, remark: null, rowCode: "D", seatTypeId: 1, seatTypeName: "Normal", showtimeId: "1739921775110676481", status: "N"}, 
  //   {columnCode: 1, hallId: "1739901125851635714", id: "1739921775509135368", price: 50000, remark: null, rowCode: "E", seatTypeId: 1, seatTypeName: "Normal", showtimeId: "1739921775110676481", status: "N"}, 
  //   {columnCode: 2, hallId: "1739901125851635714", id: "1739921775509135369", price: 50000, remark: null, rowCode: "E", seatTypeId: 1, seatTypeName: "Normal", showtimeId: "1739921775110676481", status: "N"}, 
  //   {columnCode: 3, hallId: "1739901125851635714", id: "1739921775509135370", price: 50000, remark: null, rowCode: "E", seatTypeId: 1, seatTypeName: "Normal", showtimeId: "1739921775110676481", status: "N"}, 
  //   {columnCode: 4, hallId: "1739901125851635714", id: "1739921775509135371", price: 50000, remark: null, rowCode: "E", seatTypeId: 1, seatTypeName: "Normal", showtimeId: "1739921775110676481", status: "N"}, 
  //   {columnCode: 5, hallId: "1739901125851635714", id: "1739921775509135372", price: 50000, remark: null, rowCode: "E", seatTypeId: 1, seatTypeName: "Normal", showtimeId: "1739921775110676481", status: "N"}, 
  //   {columnCode: 6, hallId: "1739901125851635714", id: "1739921775576244226", price: 50000, remark: null, rowCode: "E", seatTypeId: 1, seatTypeName: "Normal", showtimeId: "1739921775110676481", status: "N"}, 
  //   {columnCode: 1, hallId: "1739901125851635714", id: "1739921775580438529", price: 50000, remark: null, rowCode: "F", seatTypeId: 1, seatTypeName: "Normal", showtimeId: "1739921775110676481", status: "N"}, 
  //   {columnCode: 2, hallId: "1739901125851635714", id: "1739921775588827137", price: 50000, remark: null, rowCode: "F", seatTypeId: 1, seatTypeName: "Normal", showtimeId: "1739921775110676481", status: "N"}, 
  //   {columnCode: 3, hallId: "1739901125851635714", id: "1739921775588827138", price: 50000, remark: null, rowCode: "F", seatTypeId: 1, seatTypeName: "Normal", showtimeId: "1739921775110676481", status: "N"},
  //   {columnCode: 4, hallId: "1739901125851635714", id: "1739921775588827139", price: 50000, remark: null, rowCode: "F", seatTypeId: 1, seatTypeName: "Normal", showtimeId: "1739921775110676481", status: "N"}, 
  //   {columnCode: 5, hallId: "1739901125851635714", id: "1739921775588827140", price: 50000, remark: null, rowCode: "F", seatTypeId: 1, seatTypeName: "Normal", showtimeId: "1739921775110676481", status: "N"}, 
  //   {columnCode: 6, hallId: "1739901125851635714", id: "1739921775588827141", price: 50000, remark: null, rowCode: "F", seatTypeId: 1, seatTypeName: "Normal", showtimeId: "1739921775110676481", status: "N"}
  // ]
  // console.log(getSeatOrderList());

  const data = ['L', 'K', 'J', 'I', 'H', 'G', 'F', 'E', 'D', 'C', 'B', 'A', ]
  // const createSeatArray = (sum) => {
  //   const seatArray = [];
  //   let k=1, j = 1, y = 1, h = 1, g=1, f=1, e=1, d=1, c=1, b=1, a = 1;
  //   for (let i = 0; i < sum; i++) {
  //     if(i < 12){
  //       seatArray.push({seatId: `L${i+1}`, state: 'n'});
  //     }
  //     if(i > 11 && i < 24){
  //       seatArray.push({seatId: `K${k}`, state: 'n'});
  //       k += 1;
  //     }
  //     if(i > 23 && i < 36){
  //       seatArray.push({seatId: `J${j}`, state: 'n'});
  //       j += 1;
  //     }
  //     if(i > 35 && i < 48){
  //       seatArray.push({seatId: `I${y}`, state: 'n'});
  //       y += 1;
  //     }
  //     if(i > 47 && i < 60){
  //       seatArray.push({seatId: `H${h}`, state: 'n'});
  //       h += 1;
  //     }
  //     if(i > 59 && i < 72){
  //       seatArray.push({seatId: `G${g}`, state: 'n'});
  //       g += 1;
  //     }
  //     if(i > 71 && i < 84){
  //       seatArray.push({seatId: `F${f}`, state: 'n'});
  //       f += 1;
  //     }
  //     if(i > 83 && i < 96){
  //       seatArray.push({seatId: `E${e}`, state: 'n'});
  //       e += 1;
  //     }
  //     if(i > 95 && i < 108){
  //       seatArray.push({seatId: `D${d}`, state: 'n'});
  //       d += 1;
  //     }
  //     if(i > 107 && i < 120){
  //       seatArray.push({seatId: `C${c}`, state: 'n'});
  //       c += 1;
  //     }
  //     if(i > 119 && i < 132){
  //       seatArray.push({seatId: `B${b}`, state: 'n'});
  //       b += 1;
  //     }
  //     if(i > 131 && i < 144){
  //       seatArray.push({seatId: `A${a}`, state: 'n'});
  //       a += 1;
  //     }
  //   }
  //   return seatArray;
  // }

  const [selectedSeatIds, setSelectedSeatIds] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedSeatsCount, setSelectedSeatsCount] = useState(0);
  const [progress, setProgress] = useState(false);
  const [price, setPrice] = useState(0);

  const handleSeatPress = (isPressed, item) => {
    if (isPressed) {
      setSelectedSeats([...selectedSeats, item]);
      setPrice(price + calculateSeatPrice(item));
      setSelectedSeatsCount(selectedSeatsCount + 1);
      setSelectedSeatIds([...selectedSeatIds, `${item.rowCode}${item.columnCode}`]); // Thêm seatId vào danh sách
    } else  {
      const updatedSeats = selectedSeats.filter((selectedSeat) => selectedSeat !== item);
      setSelectedSeats(updatedSeats);
      setPrice(price - calculateSeatPrice(item));
      setSelectedSeatsCount(selectedSeatsCount - 1);
      setSelectedSeatIds(selectedSeatIds.filter((seatId) => seatId !== `${item.rowCode}${item.columnCode}`)); // Loại bỏ seatId khỏi danh sách
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
      <Seat style={{width: 20, height: 20, borderWidth: 0.2, borderColor: 'gray', marginRight: 5, marginLeft: (index%6 == 0) ? 0 : 0, 
        borderRadius: 3, marginBottom: 3,}}
        item={item}
        index={index}
        // exceededLimit={exceededLimit}
        onPress={handleSeatPress}
      />
    )
  };
  const pressContinue = () => {
    if (price > 0) {
      navigation.navigate('Payment', {address, time, selectedSeatIds, price});
    }
    setProgress(false);
  }

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
        <View style={{width: '100%', height: '100%',}}>
          <View style={{width: '100%', height: '50%', alignItems: 'center'}}>
            <Text style={{fontSize: 15, fontWeight: '600', top: '20%'}}>{Movie.title}</Text>
          </View>
          <View style={{flexDirection: 'row', width: '100%', height: '50%', alignItems: 'center', justifyContent: 'center'}}>
            <View style={{width: '40%', height: '60%', justifyContent: 'center',}}>
              <Text style={{fontSize: 15, color: 'gray'}}>{Movie.language}</Text>
            </View>
            <View style={{ width: '10%', height: '60%', backgroundColor: '#999900', borderRadius: 3, alignItems: 'center', justifyContent: 'center'}}>
              <Text style={{fontSize: 15, fontWeight: '600', color: 'white'}}>{Movie.rated}</Text>
            </View>         
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
            numColumns={6}
            data={seatListOder}
            renderItem={viewItem}
            nestedScrollEnabled={true}
            scrollEnabled={false}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
        <View  style={{width: '100%', height: '5%', alignItems: 'center', marginTop: 50,}}>
          <Text style={{fontSize: 10, color: 'gray'}}>MÀN HÌNH</Text>
          <View style={{width: '75%', height: '12%', backgroundColor: '#999900', shadowOffset: { width: 3, height: 2}, shadowOpacity: 0.4, marginLeft: '3%'}}></View>
        </View>    
      </ScrollView>

      <View style={{width: '100%', height: '10%',}}>
        <View style={{width: '100%', height: '50%', alignItems: 'center', justifyContent: 'space-evenly', flexDirection: 'row'}}>
          <View style={{flexDirection: 'row', alignItems: 'center', width: '19%', justifyContent: 'space-between'}}>
            <TouchableOpacity style={{width: 17, height: 17, borderWidth: 0.2, borderRadius: 3, backgroundColor: 'white'}}/>
            <Text>Chưa đặt</Text>
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
        <View style={{height: '100%', width: '70%', justifyContent: 'center', marginTop: '1%'}}>
          <View style={{flexDirection: 'row', marginLeft: '3%', height: '50%', alignItems: 'center'}}>
            <Text style={{fontWeight: '600', color: 'gray', }}>{selectedSeatsCount}x</Text>
            <Text style={{fontWeight: '500'}}> ghế: </Text>
            <Text style={{fontWeight: '700', color:'#999900', color: 'gray', width: '75%', height: '70%'}} numColumns={1}
            ellipsizeMode="middle">{selectedSeatIds.join(', ')}</Text>
          </View>
          <View style={{flexDirection: 'row', marginLeft: '3%', alignItems: 'center', height: '50%'}}>
            <Text style={{fontWeight: '500', color: 'gray'}}>Tổng cộng: </Text>
            <Text style={{fontWeight: '700', color:'#999900', fontSize: 15}}>{price.toLocaleString()}đ</Text>
          </View>
        </View>
        <View style={{height: '100%', flex: 1, alignItems: 'flex-start', justifyContent: 'center'}}>
          <TouchableOpacity style={{width: '88%', height: '75%', alignItems: 'center', justifyContent: 'center', backgroundColor: (price>0) ? '#999900' : '#CCCCCC', 
          borderRadius: 5}} onPress={()=>{
            setProgress(true);
            pressContinue();
          }}> 
            <Text style={{color: 'white', fontSize: 16, fontWeight: '700'}}>Tiếp tục</Text>
          </TouchableOpacity>
        </View>
      </View>
      {progress ? <Loader indeterminate={progress}/> : null}
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