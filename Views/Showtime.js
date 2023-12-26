import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { View, TextInput, Image, Text, TouchableOpacity, StyleSheet, SafeAreaView, FlatList, ScrollView } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { useSelector } from 'react-redux';
import moment from 'moment';
import Loader from '../Component/loader';

export default function Showtime({navigation, isLoggedIn}) {
    const Movie = useSelector((state) => state.movies.selectedMovie);
    const Showtimes = useSelector((state) => state.movies.showtimes);
    const formatDateShowtime = (cinema) => {
      const data = [];
      for (let i = 0; i < Showtimes.length; i++) {
        if(Showtimes[i].cinema.cinemaName === cinema){
          for (let j = 0; j < Showtimes[i].showTimeList.length; j++) {
            const dateObject = moment(Showtimes[i].showTimeList[j].startTime, 'DD/MM/YYYY HH:mm:ss');
            const date = (dateObject.date() < 10) ? `0${dateObject.date()}` : dateObject.date();
            const month = ((dateObject.month() + 1) < 10) ? `0${(dateObject.month() + 1)}` : (dateObject.month() + 1);
            const hour = dateObject.hours();
            let minute = dateObject.minutes();
            minute = (minute < 10) ? `0${minute}` : minute;
            data.push({date: `${date}/${month}`, hour: `${hour}:${minute}`});
          }
        }
      }
      return data;
    }
    // const dateObject = moment(Showtimes[1].showTimeList[1].startTime, 'DD/MM/YYYY HH:mm:ss');
    // const date = (dateObject.date() < 10) ? `0${dateObject.date()}` : dateObject.date();
    // const month = ((dateObject.month() + 1) < 10) ? `0${(dateObject.month() + 1)}` : (dateObject.month() + 1);
    // console.log(formatDateShowtime('StarCinema Cần Thơ')); 

    const data = [
      { address: 'Toàn Quốc', value: '1' },
      { address: 'StarCinema Hồ Chí Minh', value: '2' },
      { address: 'StarCinema Hà Nội', value: '3' },
      { address: 'StarCinema Đà Nẵng', value: '4' },
      { address: 'StarCinema Hải Phòng', value: '5' },
      { address: 'StarCinema Cần Thơ', value: '6' },
    ];
    const data1 = [
      { address: 'TP Hồ Chí Minh', cinema: 'StarCinema Hồ Chí Minh' },
      { address: 'Hà Nội', cinema: 'StarCinema Hà Nội' },
      { address: 'Đà Nẵng', cinema: 'StarCinema Đà Nẵng' },
      { address: 'Hải Phòng', cinema: 'StarCinema Hải Phòng'},
      { address: 'Cần Thơ', cinema: 'StarCinema Cần Thơ'},
    ];

    const getCinemaByAddress = (address) => {
      const data = [];
      for (let i = 0; i < data1.length; i++){
        if(data1[i].cinema === address) {
          data.push(data1[i]);
        } else if (address === 'Toàn Quốc'){
          return data1;
        } 
      }
      return data;
    }
    const getShowtimeByDate = (cinema) => {
      const data = [];
      const dataShowtime = formatDateShowtime(cinema);
      for (let i = 0; i < dataShowtime.length; i++) {
        if (formatDate(selectedItem).toString() == dataShowtime[i].date.toString()) {
          data.push(dataShowtime[i]); 
        }
      }
      return data;
    }

    const dataTime = [
      { time: '09:45'},
      { time: '12:45'},
      { time: '14:15'},
      { time: '15:45'},
      { time: '18:00'},
      { time: '19:45'},
      { time: '21:15'},
    ];
    

    const formatDate1 = (text) => {
      let date = new Date(text);
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();

      month = (month < 10) ? `0${month}` : month;
      day = (day < 10) ? `0${day}` : day;
      return `Ngày ${day} tháng ${month} năm ${year}`;
    } 

    const formatDate = (text) => {
      let date = new Date(text);
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();

      month = (month < 10) ? `0${month}` : month;
      day = (day < 10) ? `0${day}` : day;
      return `${day}/${month}`;
    } 
    const formatDay = (text) => {
      const dayofweek = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
      let date = new Date(text);
      let dayIndex = date.getDay();
      return dayofweek[dayIndex];
    }

    const generateDateArray = (startDate, count) => {
      const dateArray = [{ dateFormat: formatDate(startDate), day: 'Hôm nay', date: startDate}];
      for (let i = 1; i < count; i++) {
        const nextDate = new Date(startDate);
        nextDate.setDate(nextDate.getDate() + i);
        dateArray.push({ dateFormat: formatDate(nextDate), day: formatDay(nextDate), date: nextDate});
      }
      return dateArray;
    }
    const startDate = new Date(); // Thay đổi ngày bắt đầu tùy ý
    const numberOfDays = 7; // Thay đổi số lượng ngày tùy ý
    const data2 = generateDateArray(startDate, numberOfDays);

    const [isCollapsed, setIsCollapsed] = useState(false);
    const toggleExpanded = () => {
      setIsCollapsed(!isCollapsed);
    }
  
    const [selected, setSelected] = useState(0);
    const [selectedItem, setSelectedItem] = useState(new Date());

    const [address, setAddress] = useState('Toàn Quốc');
    const [isFocus, setIsFocus] = useState(false);
    const [cinema, setCinema] = useState(null);
    const [progress, setProgress] = useState(false);

    // const st = getShowtimeByCinema("StarCinema Cần Thơ");
    // console.log(st);
  
    const viewItem = ({item, index}) => {
      return (
        <TouchableOpacity style={{width: 100, height: 77, backgroundColor: (selected === index) ? 'purple' : '#F5F5F5', justifyContent: 'center', alignItems: 'center', marginTop: 15, marginBottom: 45,
        marginRight: 20, marginLeft: (index === 0) ? 20 : 0, borderRadius: 5, opacity: 1, shadowOffset: { width: 0, height: 6}, shadowOpacity: 0.1}} 
        onPress={() => {
          setSelected(index);
          setSelectedItem(item.date);
        }}>
          {/* <Text>...</Text> */}
          <Text style={{color: (selected === index) ? 'white' : 'black', fontSize: 15, fontWeight: '600'}}>{item.dateFormat}</Text>
          <Text style={{color: (selected === index) ? 'white' : 'black', fontSize: 13,}}>{item.day}</Text>
        </TouchableOpacity>
      )
    }

    // const itemTime = ({item, index}) => {
    //   return (
    //     <TouchableOpacity style={{width: 82, height: 38, alignItems: 'center', justifyContent: 'center', borderWidth: 0.2, borderRadius: 5,
    //       marginLeft: (index%4===0) ? 19 : 0, marginRight: 14, marginTop: (index < 4) ? 5 : 12,}}
    //       onPress={() => {isLoggedIn ? navigation.navigate('Room', {item, address}) : navigation.navigate('Login', {
    //         onLoginSuccess: () => {
    //           // Callback khi đăng nhập thành công, chuyển đến trang kế tiếp
    //           isLoggedIn = true;
    //           navigation.navigate('Room', {item, isLoggedIn, address});
    //       },
    //     })}}
    //     >
    //       <Text style={{fontSize: 15, fontWeight: '400'}}>{item.time}</Text>
    //     </TouchableOpacity>
    //   )
    // }

    const Showtime = ({item, index}) => {
      // console.log(item.cinema);
      return (
        <>
        {(getShowtimeByDate(item.cinema).length !== 0) ? 
        <View style={{width: '100%', flex: 1, borderBottomWidth: 7, borderColor: '#EEEEEE', marginTop: index === 0 ? 0 : 5}}>
          <Text style={{width: '60%', fontSize: 16, fontWeight: '500',}}>{item.cinema}</Text>
          <View style={{width: '100%', flex: 1, marginBottom: '4%'}}>
            <FlatList
              showsHorizontalScrollIndicator={false}
              numColumns={4}
              data={getShowtimeByDate(item.cinema)}
              renderItem={ViewTime}
              keyExtractor={(item, index) => {index.toString()}}
            /> 
          </View>
        </View> : null}
        </>
      )
    }
    const pressRoom = (item) => {
      if(isLoggedIn) {
        navigation.navigate('Room', {item, address});
        setProgress(false);
      } else {
        navigation.navigate('Login', {
          onLoginSuccess: () => {
            // Callback khi đăng nhập thành công, chuyển đến trang kế tiếp
            isLoggedIn = true;
            navigation.navigate('Room', {item, isLoggedIn, address});
            setProgress(false); 
          },
        });
        setProgress(false);
      }
    }
    const ViewTime = (item, index) => {
      // console.log(item);
      return(
        <TouchableOpacity style={{width: 82, height: 38, alignItems: 'center', justifyContent: 'center', borderWidth: 0.2, borderRadius: 5,
          marginLeft: (index%4===0) ? 19 : 0, marginRight: 14, marginTop: (index < 4) ? 5 : 12,}}
          onPress={() => {
            setProgress(true);
            pressRoom(item);
          }}
        >
          <Text style={{fontSize: 15, fontWeight: '400'}}>{item.item.hour}</Text>
        </TouchableOpacity>
      )
    }

    return(
      <SafeAreaView style={styles.container}>
        <StatusBar style="auto"/>
        <View style={{width: '90%', height: "5%", justifyContent: "flex-start",  flexDirection: 'row'}}>
          <TouchableOpacity style={{width: '9%', height: '100%', justifyContent: "center",}} onPress={()=>{
            navigation.goBack();
          }}>
            <Image style={{width: '90%', height: '80%'}} source={require('./Image/icon_back.png')} resizeMode='contain'/>
          </TouchableOpacity>
          <View style={{width: '82%', height: '100%', alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{fontSize: 18, fontWeight: '600', }}>
              Suất Chiếu
            </Text>
          </View>
        </View>

        <View style={{width: '100%', height: '4%', alignItems: 'center', justifyContent: 'center', borderBottomWidth: 0.2}}>
          <Text style={{fontSize: 17, fontWeight: '600', }}>
            {Movie.title}
          </Text>
        </View>

        <View style={{width: '100%', height: '30%', }}>
          <View style={{flexDirection: 'row', width: '100%', height: '37%', justifyContent: 'space-evenly', alignItems: 'center',}}>
            <View style={{ backgroundColor: 'white', width: '90%', height: '52%'}}>
              <Dropdown
                style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                data={data}
                // search
                maxHeight={300} 
                labelField="address"
                valueField="address"
                placeholder={'Tỉnh/Thành Phố'}
                // searchPlaceholder="Search..."
                value={address}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                  setAddress(item.address);
                  setIsFocus(false);
                }}
              />
            </View>   
          </View>

          <View style={{width: '100%', height: '60%', borderTopWidth: 0.2, alignItems: 'center',}}>
            <FlatList
              showsHorizontalScrollIndicator={false}
              horizontal
              data={data2}
              renderItem={viewItem}
              keyExtractor={(item, index) => index.toString()}
              style={{}}
            />
            <Text style={{fontSize: 15, marginVertical: 8}}>{formatDate1(selectedItem)}</Text>
          </View>
          <View style={{backgroundColor: '#EEEEEE', flex: 1}}></View>
        </View>

        <View style={{width: '95%', flex: 1, marginTop: '2%',}}>
          {(getShowtimeByDate(address).length !== 0) ? 
          <FlatList 
            showsVerticalScrollIndicator={false}
            data={getCinemaByAddress(address)}
            keyExtractor={(item, index) => index.toString()}
            renderItem={Showtime}
          /> : 
          <View style={{width: '100%', height: '70%',alignItems: 'center', justifyContent: 'center'}}>
            <Image style={{ width: '28%', height: '32%', tintColor: 'gray', resizeMode: 'contain' }} source={require('./Image/film.png')}/>
            <Text style={{fontWeight: '500', color: 'gray', marginTop: '2%', fontSize: 15}}>Hiện tại phim chưa có lịch chiếu</Text>
          </View>}
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
      fontSize: 15,
      color: 'gray',
    },
    selectedTextStyle: {
      fontSize: 15,
    },
    // iconStyle: {
    //   width: 20,
    //   height: 20,
    // },
    // inputSearchStyle: {
    //   height: 40,
    //   fontSize: 16,
    // },
  });