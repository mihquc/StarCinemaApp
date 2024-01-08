import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet, SafeAreaView, FlatList, ScrollView } from 'react-native';
import Header from '../Component/header';
import axios from 'axios';
import moment from 'moment';
import URL from '../Component/API';
import { useDispatch, useSelector } from 'react-redux';

export default function ShowtimeAddress({ navigation, route, isLoggedIn }) {
  // const id = route.params.item.id;
  const cinemaName = route.params.item.name;
  const [showTimeInfoList, setShowTimeInfoList] = useState([]);
  const [selected, setSelected] = useState(0);
  const [selectedItem, setSelectedItem] = useState(new Date());
  // const Showtimes = useSelector((state) => state.movies.showtimes)
  const ilogin = useSelector((state) => state.loginInfo.isLoggedIn)
  const URLShowtime = `${URL}/customer/homepage/search/showtimeInfoList`;
  const dispatch = useDispatch();
  const setCinemaName = (cinemaName) => {
    try {
      dispatch({ type: 'SET_CINEMA_NAME', cinemaName: cinemaName });
    } catch (error) {
      console.log(error);
    }
  }
  const setTime = (time) => {
    try {
      dispatch({ type: 'SET_TIME', time: time });
    } catch (error) {
      console.log(error);
    }
  }
  const setIdShowtime = (id) => {
    try {
      dispatch({ type: 'SET_IDSHOWTIME', id: id });
    } catch (error) {
      console.log(error);
    }
  }
  const selectMovie = (movie) => {
    try {
      dispatch({ type: 'SELECT_MOVIE', selectedMovie: movie });
    } catch (error) {
      console.log(error);
    }
  }

  const movies = useSelector((state) => state.movies.movies);

  const [address, setAddress] = useState('');
  useEffect(() => {
    setAddress(cinemaName);
    getAPI();
    // console.log(movies);
  }, [])
  // console.log(showTimeInfoList);

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
    const dateArray = [{ dateFormat: formatDate(startDate), day: 'Hôm nay', date: startDate }];
    for (let i = 1; i < count; i++) {
      const nextDate = new Date(startDate);
      nextDate.setDate(nextDate.getDate() + i);
      dateArray.push({ dateFormat: formatDate(nextDate), day: formatDay(nextDate), date: nextDate });
    }
    return dateArray;
  }
  const startDate = new Date(); // Thay đổi ngày bắt đầu tùy ý
  const numberOfDays = 4; // Thay đổi số lượng ngày tùy ý
  const data2 = generateDateArray(startDate, numberOfDays);

  const getAPI = async () => {
    try {
      // const res = await axios.get(`https://7b43-2001-ee0-4b4e-3a10-d9bc-9de-3bba-e8b4.ngrok-free.app/dev-api/customer/homepage/search/showtimeInfoList/${id}`);
      const res = await axios.get(`${URLShowtime}`);
      setShowTimeInfoList(res.data);
      // console.log(showTimeInfoList);
    } catch (error) {
      console.log(error);
    }
  }
  const getShowtimeByMovie = (id) => {
    const data = [];
    for (let i = 0; i < showTimeInfoList.length; i++) {
      if (showTimeInfoList[i].cinemaName === cinemaName && showTimeInfoList[i].movieId === id) {
        // for (let j = 0; j < Showtimes[i].showtimeList.length; j++) {
        //   const dateObject = moment(Showtimes[i].showtimeList[j].startTime, 'DD/MM/YYYY HH:mm:ss');

        const dateObject = moment(showTimeInfoList[i].startTime, 'DD/MM/YYYY HH:mm:ss');
        const date = (dateObject.date() < 10) ? `0${dateObject.date()}` : dateObject.date();
        const month = ((dateObject.month() + 1) < 10) ? `0${(dateObject.month() + 1)}` : (dateObject.month() + 1);
        const hour = dateObject.hours();
        let minute = dateObject.minutes();
        minute = (minute < 10) ? `0${minute}` : minute;
        data.push({ date: `${date}/${month}`, hour: `${hour}:${minute}`, cinemaName: showTimeInfoList[i].cinemaName, id: showTimeInfoList[i].id, movieId: showTimeInfoList[i].movieId });

      }
    }
    return data;
  }
  const getShowtimeByDate = (id) => {
    const data = [];
    const dataShowtime = getShowtimeByMovie(id);
    // console.log(getMovieById(id));
    // selectMovie(getMovieById(id));
    for (let i = 0; i < dataShowtime.length; i++) {
      if (formatDate(selectedItem).toString() === dataShowtime[i].date.toString()) {
        data.push(dataShowtime[i]);
      }
    }
    return data;
  }
  const getMovieById = (id) => {
    let movie = {};
    for (let i = 0; i < movies.length; i++) {
      if (movies[i].id === id) {
        movie = movies[i];
      }
    }
    return movie;
  }

  const viewItem = ({ item, index }) => {
    return (
      <TouchableOpacity style={{
        width: 90, height: 70, backgroundColor: (selected === index) ? 'purple' : '#F5F5F5', justifyContent: 'center', alignItems: 'center', marginTop: 15, marginBottom: 45,
        marginRight: 12, marginLeft: (index === 0) ? 20 : 0, borderRadius: 5, opacity: 1, shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.1
      }}
        onPress={() => {
          setSelected(index);
          setSelectedItem(item.date);
        }}>
        {/* <Text>...</Text> */}
        <Text style={{ color: (selected === index) ? 'white' : 'black', fontSize: 15, fontWeight: '600' }}>{item.dateFormat}</Text>
        <Text style={{ color: (selected === index) ? 'white' : 'black', fontSize: 13, }}>{item.day}</Text>
      </TouchableOpacity>
    )
  }
  const dataTime = [
    {
      idMovie: 1,
      times: [
        { time: '09:45', },
        { time: '12:45', },
        { time: '14:15', },
        { time: '15:45', },
        { time: '18:00', },
        { time: '19:45', },
        { time: '21:15', },
        { time: '21:15', },
        { time: '21:15', },
        { time: '21:15', },
      ]
    },
    {
      idMovie: 2,
      times: [
        { time: '09:45', },
        { time: '12:45', },
        { time: '14:15', },
        { time: '15:45', },
        { time: '18:00', },
        { time: '19:45', },
      ]
    },
    {
      idMovie: 3,
      times: [
        { time: '13:45', },
        { time: '16:00', },
        { time: '20:45', },
      ]
    },
    {
      idMovie: 4,
      times: [
        { time: '14:45', },
        { time: '19:00', },
      ]
    },
    {
      idMovie: 5,
      times: [
        { time: '21:00', },
      ]
    },
    {
      idMovie: 6,
      times: [
        { time: '14:45', },
        { time: '18:00', },
      ]
    },
  ];
  const getTimesById = (data, id) => {
    for (let i = 0; i < data.length; i++) {
      if (data[i].idMovie.toString() === id) {
        return data[i].times;
      }
    }
  }
  const ViewMovie = ({ item, index }) => {
    // console.log(item.id);
    // console.log(movie);
    return (
      <>
        {(getShowtimeByDate(item.id).length !== 0) ?

          <View style={{ width: '100%', flex: 1, marginTop: '3%', borderBottomWidth: 7, borderColor: '#E5E5E5' }}>
            <View style={{ flexDirection: 'row', }}>
              <View style={{ width: '22%', height: 110, alignItems: 'center' }}>
                <Image source={{ uri: item.posterUrl || "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/694px-Unknown_person.jpg" }}
                  style={{ width: '72%', height: '90%', resizeMode: 'stretch', borderRadius: 5 }}
                />
              </View>
              <View style={{ width: '78%', height: '100%', marginTop: '2%' }}>
                <Text style={{ fontSize: 14, fontWeight: '600' }}>{item.title}</Text>

                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', width: '100%', height: '17%', marginTop: '3%', marginBottom: '3%', }}>
                  <View style={{ width: '10%', backgroundColor: '#999900', height: '100%', alignItems: 'center', justifyContent: 'center', borderRadius: 2 }}>
                    <Text style={{ color: 'white', fontWeight: '700', fontSize: 12 }}>{(item.rated.slice(0, 3) === "P -") ? 'P' : item.rated.slice(0, 3)}</Text>
                  </View>
                  <View style={{ flexDirection: 'row', width: '40%', justifyContent: 'center', alignItems: 'center' }}>
                    <Image style={{ tintColor: 'green', width: '13%', height: '98%', marginRight: '2%', resizeMode: 'stretch', }} source={require('./Image/icon_hisTime.png')} />
                    <Text>{item.duration} phút</Text>
                  </View>
                  <View style={{ flexDirection: 'row', width: '30%', alignItems: 'center', justifyContent: 'center', }}>
                    <Image style={{ tintColor: 'green', width: '20%', height: '95%', marginRight: '2%', resizeMode: 'stretch', }} source={require('./Image/icon_calendar.png')} />
                    <Text>{item.endDate}</Text>
                  </View>
                </View>

                {/* <Text>{item.rating}</Text> */}
              </View>
            </View>
            <View style={{ marginBottom: '3%' }}>
              <FlatList
                numColumns={4}
                data={getShowtimeByDate(item.id)}
                renderItem={viewTime}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
          </View>

          : null}
      </>
    )
  }
  const viewTime = ({ item, index }) => {
    // console.log(item.movieId);
    return (
      <TouchableOpacity style={{
        width: 82, height: 38, alignItems: 'center', justifyContent: 'center', borderWidth: 0.2, borderRadius: 5,
        marginLeft: (index % 4 === 0) ? 19 : 0, marginRight: 14, marginTop: (index < 4) ? 5 : 12,
      }}
        onPress={() => {
          // selectMovie(getMovieById(item.idMovie));
          if (isLoggedIn) {
            setCinemaName(item.cinemaName);
            setTime(item.hour);
            selectMovie(getMovieById(item.movieId));
            setIdShowtime(item.id);
            navigation.navigate('Room', { item, selectedItem });
          } else {
            navigation.navigate('Login', {
              onLoginSuccess: () => {
                // Callback khi đăng nhập thành công, chuyển đến trang kế tiếp
                isLoggedIn = true;
                setCinemaName(item.cinemaName);
                setTime(item.hour);
                selectMovie(getMovieById(item.movieId));
                setIdShowtime(item.id);
                navigation.navigate('Room', { item, isLoggedIn, selectedItem });
              },
            })
          }

        }}
      >
        <Text style={{ fontSize: 15, fontWeight: '400' }}>{item.hour}</Text>
      </TouchableOpacity>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <Header iconSource={require('./Image/icon_xx.png')} onPress={() => { navigation.goBack() }} />
      <View style={{ width: '100%', height: (896 * 3 / 100), justifyContent: 'flex-start', alignItems: 'center', borderBottomWidth: 0.2, borderColor: 'gray' }}>
        <Text style={{ fontSize: 18, fontWeight: '600' }}>{address}</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1, }}>
        <View style={{ width: '100%', height: (13 * 896 / 100), alignItems: 'center', borderBottomWidth: 7, borderColor: '#E5E5E5' }}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal
            data={data2}
            renderItem={viewItem}
            keyExtractor={(item, index) => index.toString()}
            style={{}}
          />
        </View>
        <View style={{ width: '100%', flex: 1, }}>
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