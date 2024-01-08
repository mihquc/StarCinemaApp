import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, Modal } from 'react-native'
import React, { useState } from 'react'

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

export default function FormUpdate ({name, phone, email, gender, avatar, handleEmailChange }) {
  const [isVisible, setVisible] = useState(false);
  return (
    <View style={{width: '100%', alignItems: 'center', justifyContent: 'space-evenly', height: '70%'}}>
      <View style={{width: '30%', height: '27%', borderWidth: 0.2, alignItems: 'center', justifyContent: 'center', 
        borderRadius: 100, borderColor: 'gray', backgroundColor: 'gray'}}>
        <Image style={{width: '99%', height: '99%', resizeMode: 'stretch', borderRadius: 100, position: 'absolute'}} source={{uri: avatar || "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/800px-Unknown_person.jpg"}}/>
        <TouchableOpacity style={{width: '20%', height: '20%', left: '50%', backgroundColor: '#999900', borderRadius: 100, 
          alignItems: 'center', justifyContent: 'center',}} onPress={() => setVisible(true)}>
          <Image style={{width: '60%', height: '60%', tintColor: 'white'}} source={require('../Views/Image/icon_camera.png')}/>
        </TouchableOpacity>
        <Modal
          transparent={true}
          animationType="slide"
          visible={isVisible}
          onRequestClose={() => {
            setVisible(false);
          }}
        >
          <View style={{flex: 1, justifyContent: 'flex-end',}}>
            
            <View style={{ backgroundColor: 'white', borderTopWidth: 0.1, borderRadius: 30, height: '43%', margin: 20,
                shadowOffset: { width: 0, height: 5}, shadowOpacity: 0.7}}>
              <TouchableOpacity onPress={confirm} style={{ height: '15%', alignItems: 'center', justifyContent: 'center', borderTopWidth: 0.2, borderBottomWidth: 0.2}}>
                <Text style={{fontSize: 20, color: 'purple'}}>Camera</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={confirm} style={{ height: '15%', alignItems: 'center', justifyContent: 'center', borderTopWidth: 0.2, borderBottomWidth: 0.2}}>
                <Text style={{fontSize: 20, color: 'purple'}}>Thư viện</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={closePicker} style={{height: '15%', alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{fontSize: 20, color: 'purple'}}>Đóng</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
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
