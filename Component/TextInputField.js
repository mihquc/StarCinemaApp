import React from 'react';
import { View, Image, TextInput } from 'react-native';

const TextInputField = ({ iconSource, placeholder, onChangeText, value, keyboardType, secureTextEntry, onPressIn, editable, onKeyPress}) => {
  return (
    <View style={{ flexDirection: 'row', width: '88%', height: 45, backgroundColor: 'white', borderWidth: 0.2, borderRadius: 4, marginTop: '5%' }}>
      <Image source={iconSource} style={{ width: 15, height: 15, marginTop: 14, marginLeft: 10 }} />
      <TextInput
        style={{ marginLeft: 10, width: '100%', height: '100%' }}
        placeholder={placeholder}
        onChangeText={onChangeText}
        value={value}
        autoCapitalize="none"
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        onPressIn={onPressIn}
        editable={editable}
        onKeyPress={onKeyPress}
      />
    </View>
  );
};

export default TextInputField;
