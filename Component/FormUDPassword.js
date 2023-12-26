import { StyleSheet, TextInput, View } from 'react-native'
import React from 'react'

export default function FormUDPassword({currentPassword, newPassword, confirmPassword, handleCurrentPChange, handleNPChange, handleCPChange}) {
  return (
    <View style={{width: '100%', alignItems: 'center', justifyContent: 'space-evenly', height: '40%'}}>
      <View style={{width: '88%', height: 45, backgroundColor: 'white', borderRadius: 4, borderWidth: 0.2, borderColor: 'gray'}}>
        <TextInput 
          style={{width: '100%', height: '100%', marginLeft: '4%', fontSize: 16,}}
          value={currentPassword}
          onChangeText={handleCurrentPChange}
          placeholder='Nhập mật khẩu hiện tại'
          secureTextEntry={true}
        />
      </View>
      <View style={{width: '88%', height: 45, backgroundColor: 'white', borderRadius: 4, borderWidth: 0.2, borderColor: 'gray'}}>
        <TextInput
          style={{width: '100%', height: '100%', marginLeft: '4%', fontSize: 16,}}
          value={newPassword}
          onChangeText={handleNPChange}
          placeholder='Nhập mật khẩu mới'
          secureTextEntry={true}
        />
      </View>
      <View style={{width: '88%', height: 45, backgroundColor: 'white', borderRadius: 4, borderWidth: 0.2, borderColor: 'gray'}}>
        <TextInput 
          style={{width: '100%', height: '100%', marginLeft: '4%', fontSize: 16,}}
          value={confirmPassword}
          onChangeText={handleCPChange}
          placeholder='Xác nhận mật khẩu mới'
          secureTextEntry={true}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({})