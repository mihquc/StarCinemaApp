import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { View, TextInput, Image, Text, TouchableOpacity, StyleSheet, SafeAreaView, FlatList } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

export default function Showtime({navigation, route}) {
    const [name, setName] = useState('');
    const nameRoute =  route.params.nameMovie;
    useEffect(() => {
        setName(nameRoute);
    }, [])

    const data = [
      { label: 'Toàn Quốc', value: '1' },
      { label: 'TP Hồ Chí Minh', value: '2' },
      { label: 'Hà Nội', value: '3' },
      { label: 'Đà Nẵng', value: '4' },
      { label: 'Item 5', value: '5' },
      { label: 'Item 6', value: '6' },
      { label: 'Item 7', value: '7' },
      { label: 'Item 8', value: '8' },
    ];
    const data1 = [
      { label: 'Star Cinema', value: '1' },
      // { label: 'TP Hồ Chí Minh', value: '2' },
      // { label: 'Hà Nội', value: '3' },
      // { label: 'Đà Nẵng', value: '4' },
      // { label: 'Item 5', value: '5' },
      // { label: 'Item 6', value: '6' },
      // { label: 'Item 7', value: '7' },
      // { label: 'Item 8', value: '8' },
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
      const dateArray = [{ date: formatDate(startDate), day: 'Hôm nay'}];
      for (let i = 1; i < count; i++) {
        const nextDate = new Date(startDate);
        nextDate.setDate(nextDate.getDate() + i);
        dateArray.push({ date: formatDate(nextDate), day: formatDay(nextDate)});
      }
      return dateArray;
    }
    const startDate = new Date(); // Thay đổi ngày bắt đầu tùy ý
    const numberOfDays = 7; // Thay đổi số lượng ngày tùy ý
    const data2 = generateDateArray(startDate, numberOfDays);

    // const startDate = new Date();
    // console.log(startDate.getDay());
    // const data2= [
    //   {date: formatDate(startDate), day: 'Hôm nay'},
    //   {date: formatDate(startDate.setDate(startDate.getDate() + 1)), day: formatDay(startDate.setDate(startDate.getDate()))},
    //   {date: formatDate(startDate.setDate(startDate.getDate() + 1)), day: formatDay(startDate.setDate(startDate.getDate()))},
    //   {date: formatDate(startDate.setDate(startDate.getDate() + 1)), day: formatDay(startDate.setDate(startDate.getDate()))},
    //   {date: formatDate(startDate.setDate(startDate.getDate() + 1)), day: formatDay(startDate.setDate(startDate.getDate()))},
    //   {date: formatDate(startDate.setDate(startDate.getDate() + 1)), day: formatDay(startDate.setDate(startDate.getDate()))},
    //   {date: formatDate(startDate.setDate(startDate.getDate() + 1)), day: formatDay(startDate.setDate(startDate.getDate()))},
    //   {date: formatDate(startDate.setDate(startDate.getDate() + 1)), day: formatDay(startDate.setDate(startDate.getDate()))},
    // ]
  
    const [selected, setSelected] = useState(0);

    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
    const [value1, setValue1] = useState(null);
    const [isFocus1, setIsFocus1] = useState(false);
  

    const [date, setDate] = useState('');
    const viewItem = ({item, index}) => {
      return (
        <TouchableOpacity style={{width: 95, height: 80, backgroundColor: (selected === index) ? 'purple' : '#F5F5F5', justifyContent: 'center', alignItems: 'center', marginTop: 15, marginBottom: 45,
        marginRight: 20, marginLeft: (index === 0) ? 20 : 0, borderRadius: 5, opacity: 1, shadowOffset: { width: 0, height: 6}, shadowOpacity: 0.1}} 
        onPress={() => {
          setSelected(index);
        }}>
          {/* <Text>...</Text> */}
          <Text style={{color: (selected === index) ? 'white' : 'black', fontSize: 17, fontWeight: '600'}}>{item.date}</Text>
          <Text style={{color: (selected === index) ? 'white' : 'black',}}>{item.day}</Text>
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
          <Text style={{fontSize: 17, fontWeight: '600', }}>
            Suất Chiếu
          </Text>
        </View>
        <View style={{width: '100%', height: '4%', alignItems: 'center', justifyContent: 'center', borderBottomWidth: 0.2}}>
          <Text style={{fontSize: 17, fontWeight: '600', }}>
            {name}
          </Text>
        </View>

        <View style={{width: '100%', height: '30%', }}>
          <View style={{flexDirection: 'row', width: '100%', height: '37%', justifyContent: 'space-evenly', alignItems: 'center',}}>
            <View style={{ backgroundColor: 'white', width: '43%', height: '55%'}}>
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
                labelField="label"
                valueField="value"
                placeholder={'Tỉnh/Thành Phố'}
                // searchPlaceholder="Search..."
                value={value}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                  setValue(item.value);
                  setIsFocus(false);
                }}
              />
            </View>   
            <View style={{ backgroundColor: 'white', width: '43%', height: '55%'}}>
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
                labelField="label"
                valueField="value"
                placeholder={!isFocus1 ? 'Cinema' : '...'}
                // searchPlaceholder="Search..."
                value={value1}
                onFocus={() => setIsFocus1(true)}
                onBlur={() => setIsFocus1(false)}
                onChange={item => {
                  setValue1(item.value);
                  setIsFocus1(false);
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
            <Text style={{fontSize: 15, marginVertical: 8}}>{formatDate1(new Date())}</Text>
          </View>
          <View style={{backgroundColor: 'silver', flex: 1}}></View>
        </View>

        <View style={{width: '100%', height: '20%', backgroundColor: 'red'}}>
          
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