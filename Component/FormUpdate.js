import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput } from 'react-native'
import React from 'react'

const renderRadioButton = (value, label, gender) => (
    <View
        style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 50,
        }}
        >
        <View
        style={{
            marginRight: 8,
            width: 16, 
            height: 16,
            borderRadius: 10,
            borderWidth: 0.2,
            borderColor: gender === value ? '#E5E5E5' : 'gray',
            backgroundColor: gender === value ? 'darkgray' : 'transparent',
            justifyContent: 'center',
            alignItems: 'center',}}>
            
        {gender === value && (
            <View
            style={{
                width: 7,
                height: 7,
                borderRadius: 5,
                backgroundColor: 'white',
            }}
            />
        )}
        </View>
        <Text>{label}</Text>
    </View>
  );

export default function FormUpdate ({name, phone, email, gender, handleEmailChange }) {
  return (
    <View style={{width: '100%', alignItems: 'center', justifyContent: 'space-evenly', height: '70%'}}>
      <View style={{width: '30%', height: '27%', borderWidth: 0.2, alignItems: 'center', justifyContent: 'center', borderRadius: 100, borderColor: 'gray'}}>
        <Image style={{width: '95%', height: '95%', resizeMode: 'stretch', borderRadius: 100}} source={{uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/800px-Unknown_person.jpg"}}/>
      </View>
      <View style={{width: '88%', height: 45, backgroundColor: '#E5E5E5', borderRadius: 4, borderWidth: 0.2, borderColor: 'gray'}}>
        <TextInput 
          style={{width: '100%', height: '100%', marginLeft: '4%', fontSize: 16, color: 'gray'}}
          value={name}
          editable={false}
        />
      </View>
      <View style={{width: '88%', height: 45, backgroundColor: '#E5E5E5', borderRadius: 4, borderWidth: 0.2, borderColor: 'gray'}}>
        <TextInput
          style={{width: '100%', height: '100%', marginLeft: '4%', fontSize: 16, color: 'gray'}}
          value={phone}
          editable={false}
        />
      </View>
      <View style={{width: '88%', height: 45, backgroundColor: 'white', borderRadius: 4, borderWidth: 0.2, borderColor: 'gray'}}>
        <TextInput 
          style={{width: '100%', height: '100%', marginLeft: '4%', fontSize: 16,}}
          value={email}
          onChangeText={handleEmailChange}
        />
      </View>
      <View style={{width: '88%', height: '10%', justifyContent: 'center'}}>
        <View style={{width: '100%', flexDirection: 'row', justifyContent: 'space-between'}}>
            {renderRadioButton('male', 'Nam', gender)}
            {renderRadioButton('female', 'Nữ', gender)}
            {renderRadioButton('undefined', 'Chưa xác định', gender)}
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({})
