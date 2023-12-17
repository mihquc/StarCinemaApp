import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { View, TextInput, Image, Text, TouchableOpacity, StyleSheet, SafeAreaView, FlatList, ScrollView } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
// import CollapsibleTime from '../Component/Collapsible';
import Collapsible from 'react-native-collapsible';
import { useSelector } from 'react-redux';

export default function Showtime({navigation, isLoggedIn}) {
    const Movie = useSelector((state) => state.movies.selectedMovie);

    const data = [
      { address: 'Toàn Quốc', value: '1' },
      { address: 'TP Hồ Chí Minh', value: '2' },
      { address: 'Hà Nội', value: '3' },
      { address: 'Đà Nẵng', value: '4' },
      { address: 'Quảng Nam', value: '5' },
      { address: 'Huế', value: '6' },
      { address: 'An Giang', value: '7' },
      { address: 'Cà Mau', value: '8' },
    ];
    const data1 = [
      { cinema: 'Star Cinema', value: 'Star Cinema'},
      // { label: 'TP Hồ Chí Minh', value: '2' },
      // { label: 'Hà Nội', value: '3' },
      // { label: 'Đà Nẵng', value: '4' },
      // { label: 'Item 5', value: '5' },
      // { label: 'Item 6', value: '6' },
      // { label: 'Item 7', value: '7' },
      // { label: 'Item 8', value: '8' },
    ];

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

    const [address, setAddress] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
    const [cinema, setCinema] = useState(null);
    const [isFocus1, setIsFocus1] = useState(false);
  

    const [date, setDate] = useState('');
    const viewItem = ({item, index}) => {
      return (
        <TouchableOpacity style={{width: 100, height: 80, backgroundColor: (selected === index) ? 'purple' : '#F5F5F5', justifyContent: 'center', alignItems: 'center', marginTop: 15, marginBottom: 45,
        marginRight: 20, marginLeft: (index === 0) ? 20 : 0, borderRadius: 5, opacity: 1, shadowOffset: { width: 0, height: 6}, shadowOpacity: 0.1}} 
        onPress={() => {
          setSelected(index);
          setSelectedItem(item.date);
        }}>
          {/* <Text>...</Text> */}
          <Text style={{color: (selected === index) ? 'white' : 'black', fontSize: 17, fontWeight: '600'}}>{item.dateFormat}</Text>
          <Text style={{color: (selected === index) ? 'white' : 'black',}}>{item.day}</Text>
        </TouchableOpacity>
      )
    }

    const itemTime = ({item, index}) => {
      return (
        <TouchableOpacity style={{width: 82, height: 38, alignItems: 'center', justifyContent: 'center', borderWidth: 0.2, borderRadius: 5,
          marginLeft: (index%4===0) ? 19 : 0, marginRight: 14, marginTop: (index < 4) ? 5 : 12,}}
          onPress={() => {isLoggedIn ? navigation.navigate('Room', {item}) : navigation.navigate('Login', {
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
        <View style={{width: '90%', height: "5%", justifyContent: "flex-end"}}>
          <TouchableOpacity style={{width: '9%', height: '100%', justifyContent: "center"}} onPress={()=>{
            navigation.goBack();
          }}>
            <Image style={{width: '90%', height: '80%'}} source={require('./Image/icon_back.png')} resizeMode='contain'/>
          </TouchableOpacity>
        </View>
        <View style={{width: '100%', height: '4%', alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{fontSize: 18, fontWeight: '600', }}>
            Suất Chiếu
          </Text>
        </View>
        <View style={{width: '100%', height: '4%', alignItems: 'center', justifyContent: 'center', borderBottomWidth: 0.2}}>
          <Text style={{fontSize: 17, fontWeight: '600', }}>
            {Movie.title}
          </Text>
        </View>

        <View style={{width: '100%', height: '30%', }}>
          <View style={{flexDirection: 'row', width: '100%', height: '37%', justifyContent: 'space-evenly', alignItems: 'center',}}>
            <View style={{ backgroundColor: 'white', width: '43%', height: '52%'}}>
            {/* {renderLabel()} */}
              <Dropdown
                style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                // inputSearchStyle={styles.inputSearchStyle}
                // iconStyle={styles.iconStyle}
                data={data}
                // search
                maxHeight={300} 
                labelField="address"
                valueField="value"
                placeholder={'Tỉnh/Thành Phố'}
                // searchPlaceholder="Search..."
                value={address}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                  setAddress(item.value);
                  setIsFocus(false);
                }}
              />
            </View>   
            <View style={{ backgroundColor: 'white', width: '43%', height: '52%'}}>
            {/* {renderLabel()} */}
              <Dropdown
                style={[styles.dropdown, isFocus1 && { borderColor: 'blue' }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                // inputSearchStyle={styles.inputSearchStyle}
                // iconStyle={styles.iconStyle}
                data={data1}
                // search
                maxHeight={300}
                labelField="cinema"
                valueField="cinema"
                placeholder={!isFocus1 ? 'Cinema' : 'Cinema'}
                // searchPlaceholder="Search..."
                value={cinema}
                onFocus={() => setIsFocus1(true)}
                onBlur={() => setIsFocus1(false)}
                onChange={item => {
                  setCinema(item.cinema);
                  setIsFocus1(false);
                }}
                // disable={true}
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

        <View style={{width: '100%', flex: 1,}}>
          {(address != null) && (cinema != null) && (
          <TouchableOpacity style={{flexDirection: 'row', width: '100%', height: '10%', alignItems: 'center', justifyContent: 'space-between', paddingLeft: 15}}
            onPress={toggleExpanded}>
            <Text style={{width: '30%',fontSize: 16, fontWeight: '500',}}>{cinema}</Text>
            <Image style={{width: '15%', height: '80%',}} source={require('./Image/icon_dropdown.png')} resizeMode='contain'/>
          </TouchableOpacity>
          )}
          {(address != null) && (cinema != null) && (
          <Collapsible collapsed={isCollapsed}>
            <View style={{borderBottomWidth: 6, height: 115, borderColor: '#EEEEEE'}}>
              <FlatList
                showsVerticalScrollIndicator={false}
                numColumns={4}
                data={dataTime}
                renderItem={itemTime}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
          </Collapsible>
          )}
        </View>

        <View></View>
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