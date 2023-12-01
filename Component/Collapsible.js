import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { View, TextInput, Image, Text, TouchableOpacity, StyleSheet, SafeAreaView, FlatList } from 'react-native';
import Collapsible from 'react-native-collapsible';

const CollapsibleTime = ({isCollapsed, data, styleCollapsed, itemTime, keyExtractor}) => {
    return (
      <Collapsible collapsed={isCollapsed}>
        <View style={styleCollapsed}>
          <FlatList
            numColumns={4}
            data={data}
            renderItem={itemTime}
            keyExtractor={keyExtractor}
          />
        </View>
      </Collapsible>
    )
}

export default CollapsibleTime;