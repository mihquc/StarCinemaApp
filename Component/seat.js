import React, { useState } from 'react'; 
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Seat = ({item, style, onPress, index}) => {
  const [isPressed, setIsPressed] = useState(false);

  const handlePress = () => {
    setIsPressed(!isPressed);
    onPress && onPress(!isPressed, item); // Truyền trạng thái mới của ô khi được nhấn
  };
  // console.log(item);
  return(
    <TouchableOpacity style={[style, { backgroundColor: isPressed ? '#999900' : 'white', alignItems: 'center', justifyContent: 'center'}]} onPress={handlePress}>
      <Text style={{color: 'white', fontSize: 8, fontWeight: '500'}}>{`${item.rowCode}${item.columnCode}`}</Text>
    </TouchableOpacity>
  )
}

export default Seat; 