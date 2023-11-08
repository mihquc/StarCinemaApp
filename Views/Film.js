import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { View, TextInput, Image, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';

export default function Film() {

    return(
      <SafeAreaView style={styles.container}>
        <StatusBar style="auto"/>
        <Text>
            Film Screen
        </Text>
      </SafeAreaView>
    )
  }
  const styles = StyleSheet.create({
    container: {
      backgroundColor: '#F5F5F5',
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });