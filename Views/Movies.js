import { StatusBar } from 'expo-status-bar';
import React, { useState, useRef, useCallback, useEffect } from 'react';
import { View, Image, ScrollView, Text, TouchableOpacity, StyleSheet, SafeAreaView, Alert } from 'react-native';
import YoutubePlayer from "react-native-youtube-iframe";

export default function Movies({route}) {
  const [playing, setPlaying] = useState(false);
  const [nameMovie, setNameMovie] = useState('');
  const [idVideo, setIdVideo] = useState('');
  const [image, setImage] = useState();

  const nameMovieHome = route.params.name1;
  const idVideoHome = route.params.idVideo1;
  const imageMovie = route.params.poster;

  useEffect(() => {
    setNameMovie(nameMovieHome);
    setIdVideo(idVideoHome);
    setImage(imageMovie);
  }, []);

  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
      Alert.alert("video has finished playing!");
    }
  }, []);

    return(
      <SafeAreaView style={styles.container}>
        <StatusBar style="auto"/>
        <ScrollView style={{width: '100%', height: '100%'}}>
          <View style={{width: '100%', height: '3%', alignItems: 'flex-start', justifyContent: 'center',}}>
            <TouchableOpacity style={{width: '10%', height: '90%', marginStart: '2%'}}>
              <Image style={{width: '100%', height: '100%'}} source={require('./Image/icon_back.png')} resizeMode= 'contain'/>
            </TouchableOpacity>
          </View>
          <View style={{width: '100%', height: '30%',}}>
            <YoutubePlayer
              height={500}
              play={playing}
              videoId={idVideo}
              onChangeState={onStateChange}
            />
          </View>
          <View style={{ flexDirection: 'row', width: '100%', height: '30%'}}>
            <Image style={styles.image1} source={image} resizeMode='contain'/>
            <Text style={{fontSize: 17, fontWeight: '600'}}>{nameMovie}</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    )
  }
  const styles = StyleSheet.create({
    container: {
      backgroundColor: '#F5F5F5',
      flex: 1,
      alignItems: 'center',
    },
    image1: {
      width: '45%', 
      height: '100%',
      borderRadius: 5,
    },
  });