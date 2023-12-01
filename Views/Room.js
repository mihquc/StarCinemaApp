import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { View, TextInput, Image, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

export default function Room({navigation, route}) {
    
    const [nameMovie, setNameMovie] = useState('Đất Rừng Phương Nam');

    const [time, setTime] = useState(null);
    const [isFocus, setIsFocus] = useState(false);

    return(
      <SafeAreaView style={styles.container}>
        <StatusBar style="auto"/>
        <View style={{width: '88%', height: '6%', justifyContent: 'flex-start', flexDirection: 'row',}} >
          <TouchableOpacity style={{width: '10%', height: '100%', justifyContent: 'center', alignItems:'center'}} 
        //   onPress={() => {
        //     navigation.goBack();
        //   }}
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

        <ScrollView style={{width: '100%', height: '60%', backgroundColor: 'white'}}>
          <Text>abcdefgh</Text>
        </ScrollView>

        <View style={{width: '100%', height: '10%', backgroundColor: 'gray'}}>
          
        </View>

        <View style={{width: '100%', flex: 1, backgroundColor: 'green'}}>
          
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