import { StatusBar } from 'expo-status-bar';
import React, { useState, useRef, useCallback, useEffect } from 'react';
import { View, Image, ScrollView, Text, TouchableOpacity, StyleSheet, SafeAreaView, Alert, ImageBackground, Dimensions, Modal } from 'react-native';
import YoutubeIframe from 'react-native-youtube-iframe';
import YoutubePlayer from "react-native-youtube-iframe"; 

export default function Movies({navigation, route}) {
  const [playing, setPlaying] = useState(false);
  const [nameMovie, setNameMovie] = useState('');
  const [idVideo, setIdVideo] = useState('');
  const [image, setImage] = useState();
  const [description, setDescription] = useState('');
  const [videoHeight, setVideoHeight] = useState(200); // Chiều cao mặc định

  const [expanded, setExpanded] = useState(false);

  const toggleReadMore = () => {
    setExpanded(!expanded);
  };
 
  const nameMovieHome = route.params.item.name;
  const idVideoHome = route.params.item.idVideo;
  const imageMovie = route.params.item.image;
  // const descriptionMovie = route.params.item.description;
  // console.log(route.params.item.description);

  useEffect(() => {
    setNameMovie(nameMovieHome);
    setIdVideo(idVideoHome);
    setImage(imageMovie);
    // setDescription(descriptionMovie);
  }, []);

  // const onStateChange = useCallback((state) => {
  //   if (state === "ended") {
  //     setPlaying(false);
  //     Alert.alert("video has finished playing!");
  //   }
  // }, []);
 
    return(
      <ImageBackground style={{width: '100%', height: '57%'}} source={image} resizeMode='cover'>
      <StatusBar style='inverted'/>
      <SafeAreaView style={[styles.container]}>
        
        <View style={{width: '100%', height: '6%', alignItems: 'flex-start', justifyContent: 'center'}}>
          <TouchableOpacity style={{width: '9%', height: '100%', marginStart: '3%',}} onPress={() => {navigation.goBack()}}>
            <Image style={{width: '100%', height: '100%'}} source={require('./Image/icon_back.png')} resizeMode= 'contain'/>
          </TouchableOpacity>
        </View>

        <View style={{width: '100%', height: '41%',}}>
        {/* Nút Play ở giữa */}
          <TouchableOpacity
            style={{
              position: 'absolute',
              top: '35%',
              left: '50%',
              marginLeft: -25, // Chỉnh giữa theo chiều ngang
              marginTop: -25, // Chỉnh giữa theo chiều dọc
            }}
            onPress={() => {setPlaying(true)}}
          > 
            <Image
              source={require('./Image/icon_playvideo.png')}
              style={{ width: 50, height: 50, tintColor: 'white'}}
            />
          </TouchableOpacity>

          {/* Video YouTube */}
          <Modal
            visible={playing}
            transparent={true}
            animationType="slide"
            onRequestClose={() => {setPlaying(false)}}
          >
            {playing && (
              <View style={styles.modalContainer}>
                <TouchableOpacity style={styles.closeButton} onPress={() => {setPlaying(false)}}>
                  <Image style={{ width: '70%', height: '70%', tintColor: 'white'}} source={require('./Image/icon_xx.png')} resizeMode='center'/>
                </TouchableOpacity>
                <View style={styles.videoContainer}>
                  <YoutubePlayer
                    // ref={playerRef}
                    height={Dimensions.get('window').height}
                    videoId={idVideo} 
                    play={playing}
                    // onReady={() => {
                    //   // Video đã sẵn sàng
                    // }}
                    onChangeState={(e) => {
                      if (e.state === 'ended') {
                        setPlaying(false);
                      }
                    }}
                    style={{ alignSelf: 'stretch', height: '100%' }}
                  />
                </View>
              </View>
            )}
          </Modal>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', width: '100%', height: '40%', backgroundColor: 'rgba(0, 0, 0, 0.7)'}}>
          <View style={{width: '27%', height: '86%',}}>
            <Image style={styles.image1} source={image} resizeMode='stretch'/>
          </View>
          <View style={{width: '65%', height: '100%', alignItems: 'flex-start', justifyContent: 'flex-start',}}>
            <View style={{marginBottom: '5%'}}>
              <Text style={{fontSize: 18, fontWeight: '600', color: 'white'}}>{nameMovie}</Text>
            </View>
            <View style={styles.viewtext}>
              <Image style={styles.imageText} source={require('./Image/icon_hisTime.png')} resizeMode='contain'/>
              <Text style={{fontSize: 15, color: 'gray'}}>{120} phút</Text>
            </View>
            <View style={styles.viewtext}>
              <Image style={styles.imageText} source={require('./Image/icon_calendar.png')} resizeMode='contain'/>
              <Text style={{fontSize: 15, color: 'gray'}}>1-11-2023</Text>
            </View>
          </View>
        </View>
        
        <View style={{backgroundColor: 'red', width: '100%', height: '30%'}}>
          <Text style={{fontSize: 17, fontWeight: '600', marginStart: '2%', marginEnd: '2%'}}>Nội dung</Text>
          <Text style={{fontSize: 16, marginStart: '2%', marginEnd: '2%',}} numberOfLines={expanded ? undefined : 5}> 
            {description}
          </Text>
          {/* {description.length > (5 * 40) && (
          <TouchableOpacity onPress={toggleReadMore} style={styles.readMoreButton}>
            <Text style={styles.readMoreText}>{expanded ? 'Thu gọn' : 'Xem thêm'}</Text>
          </TouchableOpacity>
      )} */}
        </View>
        <View>
          <View>

          </View>
          <View>
            
          </View>
        </View>
      </SafeAreaView>
      </ImageBackground>
    )
  }
  const styles = StyleSheet.create({
    container: {
      // backgroundColor: '#f5f5f5',
      flex: 1,
      // alignItems: 'center',
    },
    image1: {
      width: '100%', 
      height: '100%',
      borderRadius: 5,
      backgroundColor: 'red',
    },
    imageText: {
      tintColor: 'green', 
      width: '6%', 
      height: '60%', 
      marginRight: '2%',
    },
    viewtext: {
      flexDirection: 'row', 
      width: '100%', 
      height: '15%', 
      alignItems: 'center',
    },
    modalContainer: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    videoContainer: {
      width: '100%',
      height: '30%',
      // backgroundColor: 'white',
      borderRadius: 10,
      overflow: 'hidden',
      borderRadius: 5

    },
    closeButton: {
      position: 'absolute',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1,
      top: '6%',
      left: '6%',
      padding: '3%',
    },
    readMoreButton: {
      marginTop: 5,
      padding: 5,
    },
    readMoreText: {
      color: 'blue',
      textDecorationLine: 'underline',
    },
  });