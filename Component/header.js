import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';

const Header = ({ iconSource, onPress}) => {
  return (
    <View style={{width: '88%', height: '6%', justifyContent: 'center',}} >
        <TouchableOpacity style={{width: '10%', height: '80%', justifyContent: 'center', alignItems: 'center'}} onPress={onPress}>
          <Image source={iconSource}  style={{width: '40%', height: '40%',}} resizeMode='cover'/>
        </TouchableOpacity>
      </View>
  );
};

export default Header;
