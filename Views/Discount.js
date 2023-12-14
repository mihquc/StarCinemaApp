import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { View, TextInput, Image, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';

export default function Discount() {

    return(
      <SafeAreaView style={styles.container}>
        <StatusBar style="auto"/>
        <View style={{width: '100%', height: '5%', alignItems: 'center', justifyContent: 'center',}}>
          <Text style={{fontSize: 18, fontWeight: '600'}}>Discount screen</Text>
        </View>
      </SafeAreaView>
    )
  }
  const styles = StyleSheet.create({
    container: {
      backgroundColor: '#F5F5F5',
      flex: 1,
      alignItems: 'center',
    },
  });