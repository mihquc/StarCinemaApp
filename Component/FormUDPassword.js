import { StyleSheet, TextInput, View, Text } from 'react-native'
import React from 'react'

export default function FormUDPassword({
  currentPassword, newPassword, confirmPassword, handleCurrentPChange, handleNPChange, handleCPChange, checktext, checktext1, checktext2
}) {
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
        <Text style={{color: 'red', fontWeight: '500', fontSize: 12}}>{(checktext === 0) ? '' : (checktext === 1 ? 'Vui lòng nhập mật khẩu.' : 'Mật khẩu hiện tại không chính xác.')}</Text>
      </View>
      <View style={{width: '88%', height: 45, backgroundColor: 'white', borderRadius: 4, borderWidth: 0.2, borderColor: 'gray'}}>
        <TextInput
          style={{width: '100%', height: '100%', marginLeft: '4%', fontSize: 16,}}
          value={newPassword}
          onChangeText={handleNPChange}
          placeholder='Nhập mật khẩu mới'
          secureTextEntry={true}
        />
        <Text style={{color: 'red', fontWeight: '500', fontSize: 12}}>{(checktext1 === 0) ? '' : 'Vui lòng nhập mật khẩu.'}</Text>
      </View>
      <View style={{width: '88%', height: 45, backgroundColor: 'white', borderRadius: 4, borderWidth: 0.2, borderColor: 'gray'}}>
        <TextInput 
          style={{width: '100%', height: '100%', marginLeft: '4%', fontSize: 16,}}
          value={confirmPassword}
          onChangeText={handleCPChange}
          placeholder='Xác nhận mật khẩu mới'
          secureTextEntry={true}
        />
        <Text style={{color: 'red', fontWeight: '500', fontSize: 12}}>{(checktext2 === 0) ? '' : (checktext2 === 1 ? 'Vui lòng xác nhận mật khẩu mới.' : 'Mật khẩu bạn điền chưa khớp.')}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({})