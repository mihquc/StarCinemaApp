import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { View, TextInput, Image, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, FlatList } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import Seat from '../Component/seat';

export default function Room({navigation, route}) {
    
    const [nameMovie, setNameMovie] = useState('Đất Rừng Phương Nam');

    const createSeatArray = (sum) => {
      const seatArray = [];
      for (let i = 0; i < sum; i++) {
        seatArray.push({seatId: (i+1)});
      }
      return seatArray;
    }

    const [time, setTime] = useState(route.params.item.time);
    const [isFocus, setIsFocus] = useState(false);

    const viewItem = ({item, index}) => {
      return (
        <Seat item={item} style={{width: 20, height: 20, borderWidth: 0.2, marginRight: 3, marginLeft: (index%14 == 0) ? 40 : 0, 
          borderRadius: 3, marginBottom: 3}}/>
      )
    };

    return(
      <SafeAreaView style={styles.container}>
        <StatusBar style="auto"/>
        <View style={{width: '88%', height: '6%', justifyContent: 'flex-start', flexDirection: 'row',}} >
          <TouchableOpacity style={{width: '10%', height: '100%', justifyContent: 'center', alignItems:'center'}} 
          onPress={() => {
            navigation.goBack();
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
            <Text style={{fontSize: 15, fontWeight: '600', top: '10%'}}>{nameMovie}</Text>
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

        <ScrollView style={{width: '100%', height: '60%', backgroundColor: 'white'}} maximumZoomScale={2.0}>
          <View style={{marginTop: 40}}>
            <FlatList
              numColumns={14}
              data={createSeatArray(154)}
              renderItem={viewItem}
              nestedScrollEnabled={true}
              scrollEnabled={false}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
          <View  style={{width: '100%', height: '5%', alignItems: 'center', marginTop: 50,}}>
            <Text style={{fontSize: 10, color: 'gray'}}>MÀN HÌNH</Text>
            <View style={{width: '100%', height: '12%', backgroundColor: 'green', shadowOffset: { width: 6, height: 6}, shadowOpacity: 0.1}}></View>
          </View>    
        </ScrollView>

        <View style={{width: '100%', height: '10%',}}>
          <View style={{width: '100%', height: '50%', alignItems: 'center', justifyContent: 'space-evenly', flexDirection: 'row'}}>
            <View style={{flexDirection: 'row', alignItems: 'center', width: '19%', justifyContent: 'space-between'}}>
              <Seat style={{width: 17, height: 17, borderWidth: 0.2, borderRadius: 3, backgroundColor: 'white'}}/>
              <Text>Ghế đơn</Text>
            </View>
          </View>
          <View style={{width: '100%', height: '50%', alignItems: 'center', justifyContent: 'space-evenly', flexDirection: 'row'}}>
            <View style={{flexDirection: 'row', alignItems: 'center', width: '17%', justifyContent: 'space-between'}}>
              <Seat style={{width: 17, height: 17, borderWidth: 0.2, borderRadius: 3, backgroundColor: 'gray'}}/>
              <Text>Đã bán</Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center', width: '22.5%', justifyContent: 'space-between'}}>
              <Seat style={{width: 17, height: 17, borderWidth: 0.2, borderRadius: 3, backgroundColor: '#999900'}}/>
              <Text>Đang chọn</Text>
            </View>
          </View>
        </View>

        <View style={{width: '100%', flex: 1, flexDirection: 'row', borderTopWidth: 0.2, borderBottomWidth: 0.2}}>
          <View style={{height: '100%', width: '70%', borderRightWidth: 0.2}}>
            
          </View>
          <View style={{height: '100%', flex: 1, alignItems: 'flex-start', justifyContent: 'center'}}>
            <TouchableOpacity style={{width: '88%', height: '75%', alignItems: 'center', justifyContent: 'center', backgroundColor: '#999900', borderRadius: 5}}>
              <Text style={{color: 'white', fontSize: 15, fontWeight: '600'}}>Tiếp tục</Text>
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