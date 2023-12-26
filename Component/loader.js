import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import * as Progress from 'react-native-progress';

const Loader = ({indeterminate}) => {
  return (
    <View style={[StyleSheet.absoluteFillObject, {alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0, 0, 0, 0.2)', zIndex: 1}]}>
      <Progress.Circle color='#999900' borderWidth={4} size={50} indeterminate={indeterminate} />
    </View>
  )
}

const styles = StyleSheet.create({})

export default Loader;