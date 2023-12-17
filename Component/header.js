import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';

const Header = ({ iconSource, onPress}) => {
  return (
    <View style={{width: '88%', height: '4%', justifyContent: 'center',}} >
        <TouchableOpacity style={{width: '9%', height: '100%', justifyContent: 'center', alignItems: 'center',}} onPress={onPress}>
          <Image source={iconSource}  style={{width: '50%', height: '50%',}} resizeMode='stretch'/>
        </TouchableOpacity>
      </View>
  );
};

export default Header;
