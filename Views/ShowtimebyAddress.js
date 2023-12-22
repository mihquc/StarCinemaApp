import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet, SafeAreaView, FlatList, ScrollView } from 'react-native';
import Header from '../Component/header';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

export default function ShowtimeAddress({navigation, route, isLoggedIn}) {
  const id = route.params.item.id;
  const showtimes = useSelector((state) => state.movies.showtimes)
  const getShowtimeById = (id) => {

  }
  const URL = "";
  const [listTime, setListTime] = useState([]);
  const dispatch = useDispatch();
  const selectMovie = (movie) => {
    try {
      dispatch({ type: 'SELECT_MOVIE', selectedMovie: movie });
    } catch (error) {
      console.log(error);
    }
  }
  
  const movies = useSelector((state) => state.movies.movies);

  const GetShowtimeByMovie = (id) => {
    axios.get("https://6577fbb8197926adf62f331d.mockapi.io/api/showtime/showTimeInfoList")
    .then((response) => {
      const data = response.data;
      return data;
    }).catch((error) => {console.error(error);});
  }
  const GetRoomByTime = (id) => {
    axios.get(`${URL}/${id}`)
    .then((response) => {
      const data = response.data;
      
    })
  }

  const [address, setAddress] = useState('');
  useEffect(() => {
    setAddress(route.params.item.address);
    // console.log(showtimes);
    // axios.get("https://6577fbb8197926adf62f331d.mockapi.io/api/showtime/showTimeInfoList")
    // .then((response) => {
    //   const data = response.data;
    //   // console.log(response.request._response);
    //   setShowTimeInfoList(response.request._response);
    // }).catch((error) => {console.error(error);});
  }, [])

  const [selected, setSelected] = useState(0);
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

  const viewItem = ({item, index}) => {
    return (
      <TouchableOpacity style={{width: 90, height: 70, backgroundColor: (selected === index) ? 'purple' : '#F5F5F5', justifyContent: 'center', alignItems: 'center', marginTop: 15, marginBottom: 45,
      marginRight: 12, marginLeft: (index === 0) ? 20 : 0, borderRadius: 5, opacity: 1, shadowOffset: { width: 0, height: 6}, shadowOpacity: 0.1}} 
      onPress={() => {
        setSelected(index);
      }}>
        {/* <Text>...</Text> */}
        <Text style={{color: (selected === index) ? 'white' : 'black', fontSize: 17, fontWeight: '600'}}>{item.dateFormat}</Text>
        <Text style={{color: (selected === index) ? 'white' : 'black',}}>{item.day}</Text>
      </TouchableOpacity>
    )
  }
  const dataTime = [
    { 
      idMovie: 1,
      times: [
        { time: '09:45',},
        { time: '12:45',},
        { time: '14:15',},
        { time: '15:45',},
        { time: '18:00',},
        { time: '19:45',},
        { time: '21:15',},
        { time: '21:15',},
        { time: '21:15',},
        { time: '21:15',},
      ]
    },
    { 
      idMovie: 2, 
      times: [
        { time: '09:45',},
        { time: '12:45',},
        { time: '14:15',},
        { time: '15:45',},
        { time: '18:00',},
        { time: '19:45',},
      ]
    },
    { 
      idMovie: 3, 
      times: [
        { time: '13:45',},
        { time: '16:00',},
        { time: '20:45',},
      ]
    },
    { 
      idMovie: 4, 
      times: [
        { time: '14:45',},
        { time: '19:00',},
      ]
    },
    { 
      idMovie: 5, 
      times: [
        { time: '21:00',},
      ]
    },
    { 
      idMovie: 6, 
      times: [
        { time: '14:45',},
        { time: '18:00',},
      ] 
    },
  ];
  const getTimesById = (data, id) => {
    for (let i = 0; i < data.length; i++) {
      if( data[i].idMovie.toString() === id) {
        return data[i].times;
      }
    } 
  }
  const ViewMovie = ({item, index}) => {
    // console.log(item.posterUrl);
    // console.log(movie);
    return (
      <View style={{width: '100%', flex: 1, marginTop: '3%', borderBottomWidth: 0.2}}>
        <View style={{flexDirection: 'row',}}>
          <View style={{width: '22%', height: 110, alignItems: 'center'}}>
            <Image source={{uri: item.posterUrl || "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/694px-Unknown_person.jpg"}}
              style={{width: '72%', height: '90%', resizeMode: 'stretch', borderRadius: 5}}
            />
          </View>
          <View style={{width: '78%', height: '100%', marginTop: '2%'}}>
            <Text style={{fontSize: 14, fontWeight: '600'}}>{item.title}</Text>

            <View style={{flexDirection: 'row', justifyContent: 'flex-start', width: '100%', marginTop: '3%', marginBottom: '3%'}}>
              <Text>{item.rated}</Text>
              <View style={{flexDirection: 'row', width: '40%', justifyContent: 'center'}}>
                <Image style={{tintColor: 'green', width: '13%', height: '98%', marginRight: '2%', resizeMode: 'stretch',}} source={require('./Image/icon_hisTime.png')}/>
                <Text>{item.duration} phút</Text>
              </View>
              <View style={{flexDirection: 'row', width: '40%'}}>
                <Image style={{tintColor: 'green', width: '13%', height: '98%', marginRight: '2%', resizeMode: 'stretch',}} source={require('./Image/icon_calendar.png')}/>
                <Text>{item.endDate}</Text>
              </View>
            </View>

            <Text>{item.rating}</Text>
          </View>
        </View>
        <View style={{marginBottom: '3%'}}>
          <FlatList
            numColumns={4}
            data={getTimesById(dataTime, item.id)}
            renderItem={viewTime}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </View>
    )
  } 
  const viewTime = ({item, index}) => {
    return (
      <TouchableOpacity style={{width: 82, height: 38, alignItems: 'center', justifyContent: 'center', borderWidth: 0.2, borderRadius: 5,
        marginLeft: (index%4===0) ? 19 : 0, marginRight: 14, marginTop: (index < 4) ? 5 : 12,}}
        onPress={() => {
          // selectMovie(getMovieById(item.idMovie));
          isLoggedIn ? navigation.navigate('Room', {item}) : navigation.navigate('Login', {
          onLoginSuccess: () => {
            // Callback khi đăng nhập thành công, chuyển đến trang kế tiếp
            isLoggedIn = true;
            navigation.navigate('Room', {item, isLoggedIn, address});
        }, 
      })}}
      >
        <Text style={{fontSize: 15, fontWeight: '400'}}>{item.time}</Text>
      </TouchableOpacity>
    )
  }

  return(
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto"/>
      <Header iconSource={require('./Image/icon_xx.png')} onPress={() => {navigation.goBack()}}/>
      <View style={{width: '100%', height: '3%', justifyContent: 'flex-start', alignItems: 'center', borderBottomWidth: 0.2, borderColor: 'gray'}}>
        <Text style={{fontSize: 18, fontWeight: '600'}}>Star Cinema {address}</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1}}>
      <View style={{width: '100%', height: '9%', alignItems: 'center', borderBottomWidth: 7, borderColor: '#E5E5E5'}}>
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal
          data={data2}
          renderItem={viewItem}
          keyExtractor={(item, index) => index.toString()}
          style={{}}
        />
      </View>
      <View style={{width: '100%', flex: 1,}}>
        <FlatList
          data={movies}
          renderItem={ViewMovie}
          nestedScrollEnabled={true}
          scrollEnabled={false}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
      </ScrollView>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5F5F5',
    flex: 1,
    alignItems: 'center',
  },
});