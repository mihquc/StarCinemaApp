import { StatusBar } from 'expo-status-bar';
import React, { useState, useRef, useCallback, useEffect } from 'react';
import { View, Image, ScrollView, Text, TouchableOpacity, StyleSheet, Dimensions, Modal } from 'react-native';
import YoutubePlayer from "react-native-youtube-iframe";
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../Component/loader';
import axios from 'axios';
import URL from '../Component/API';

export default function Movies({ navigation, isLoggedIn }) {
  const URLS = `${URL}/customer/homepage/search/showtimeInfoList`;
  const [playing, setPlaying] = useState(false);
  const Movie = useSelector((state) => state.movies.selectedMovie);
  const [expanded, setExpanded] = useState(false);
  const [progress, setProgress] = useState(false);

  const toggleReadMore = () => {
    setExpanded(!expanded);
  };

  const [viewHeight, setViewHeight] = useState(0);
  const viewRef = useRef(null);
  useEffect(() => {
    if (viewRef.current) {
      setViewHeight(viewRef.current.height);
    }
    console.log(Movie);
  }, [expanded])

  const dispatch = useDispatch();
  const listShowtime = (showtimes) => {
    try {
      dispatch({ type: 'SET_SHOWTIME', showtimes: showtimes });
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    axios.get(`${URLS}/${Movie.id}`)
      .then((response) => {
        const data = response.data;
        listShowtime(data);
      }).catch((error) => { console.error(error); });
  }, [])

  const getYouTubeVideoId = (url) => {
    if (!url) {
      return null;
    }
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;

    const match = url.match(regex);

    return match ? match[1] : null;
  };
  const pressBooking = () => {
    navigation.navigate('Showtime');
    setProgress(false);
  }
  return (
    <View style={styles.container}>

      <View style={styles.notchContainer}>
        <TouchableOpacity style={{
          position: 'absolute',
          top: '17%',
          left: '5%',
          zIndex: 2,
        }} onPress={() => { navigation.goBack() }}>
          <Image style={{ width: 30, height: 30, tintColor: 'white' }} source={require('./Image/icon_back.png')} resizeMode='contain' />
        </TouchableOpacity>

        <Image source={{ uri: Movie.posterUrl || "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/694px-Unknown_person.jpg" }} style={styles.image} />

        <TouchableOpacity
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            marginLeft: -25,
            marginTop: -25,
          }}
          onPress={() => { setPlaying(true) }}
        >
          <Image
            source={require('./Image/icon_playvideo.png')}
            style={{ width: 50, height: 50, tintColor: 'white' }}
          />
        </TouchableOpacity>

        <Modal
          visible={playing}
          transparent={true}
          animationType="slide"
          onRequestClose={() => { setPlaying(false) }}
        >
          {playing && (
            <View style={styles.modalContainer}>
              <TouchableOpacity style={styles.closeButton} onPress={() => { setPlaying(false) }}>
                <Image style={{ width: '70%', height: '70%', tintColor: 'white' }} source={require('./Image/icon_xx.png')} resizeMode='center' />
              </TouchableOpacity>
              <View style={styles.videoContainer}>
                <YoutubePlayer
                  height={Dimensions.get('window').height}
                  videoId={getYouTubeVideoId(Movie.trailerUrl)}
                  play={playing}
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


      <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', width: '100%', height: '21%', top: '2%' }}>
        <View style={{ width: '27%', height: '90%', }}>
          <Image style={styles.image1} source={{ uri: Movie.posterUrl || "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/694px-Unknown_person.jpg" }} resizeMode='stretch' />
        </View>
        <View style={{ width: '62%', height: '100%', alignItems: 'flex-start', justifyContent: 'flex-start', }}>
          <View style={{ marginBottom: '3%' }}>
            <Text style={{ fontSize: 20, fontWeight: '600', }}>{Movie.title}</Text>
          </View>
          <View style={styles.viewtext}>
            <Image style={styles.imageText} source={require('./Image/icon_hisTime.png')} resizeMode='contain' />
            <Text style={{ fontSize: 15, color: 'gray' }}>{Movie.duration} phút</Text>
          </View>
          <View style={styles.viewtext}>
            <Image style={styles.imageText} source={require('./Image/icon_calendar.png')} resizeMode='contain' />
            <Text style={{ fontSize: 15, color: 'gray' }}>{Movie.endDate}</Text>
          </View>
          <View style={styles.viewtext}>
            <Text style={{ fontSize: 15, color: 'gray' }}>Thể loại: </Text>
            <Text style={{ fontSize: 15, color: 'gray', width: '75%', height: '60%' }} numberOfLines={1}>{Movie.genre}</Text>
          </View>
          <View style={styles.viewtext}>
            <Text style={{ fontSize: 15, color: 'gray' }}>Diễn viên: </Text>
            <Text style={{ fontSize: 15, color: 'gray', width: '75%', height: '60%' }} numberOfLines={1}>{Movie.actor}</Text>
          </View>
          <View style={styles.viewtext}>
            <Text style={{ fontSize: 15, color: 'gray' }}>Đạo diễn: </Text>
            <Text style={{ fontSize: 15, color: 'gray', width: '75%', height: '60%' }} numberOfLines={1}>{Movie.director}</Text>
          </View>
        </View>
      </View>

      <ScrollView style={{}}>
        <View style={{ width: '100%', height: expanded ? viewHeight : undefined, borderColor: 'gray' }} ref={viewRef}>
          <Text style={{ fontSize: 17, fontWeight: '600', marginStart: '3%', marginEnd: '3%', paddingBottom: '2%', paddingTop: '2%' }}>Nội dung</Text>
          <Text style={{ fontSize: 17, marginStart: '3%', marginEnd: '3%', }} numberOfLines={expanded ? undefined : 5}>
            {Movie.movieDescription}
          </Text>
          {Movie.movieDescription.length > (5 * 40) && (
            <TouchableOpacity onPress={toggleReadMore} style={styles.readMoreButton}>
              <Text style={styles.readMoreText}>{expanded ? 'Thu gọn' : 'Xem thêm'}</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>


      <View style={styles.bottomContainer}>
        <TouchableOpacity style={{
          backgroundColor: '#999900', width: '88%', height: '48%', alignItems: 'center', justifyContent: 'center', borderRadius: 5,
          opacity: 1, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1
        }}
          onPress={() => {
            setProgress(true);
            pressBooking();
          }}>
          <Text style={{ color: 'white', fontSize: 16, fontWeight: '600' }}>Đặt vé</Text>
        </TouchableOpacity>
      </View>
      {progress ? <Loader indeterminate={progress} /> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  notchContainer: {
    height: '30%',
    backgroundColor: 'white',
  },
  imageContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoContainer: {
    width: '100%',
    height: '40%',
    // backgroundColor: 'white',
    overflow: 'hidden',
    borderRadius: 0
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
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  image1: {
    width: '100%',
    height: '100%',
    borderRadius: 5,
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
  bottomContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    height: '10%',
  },
  readMoreButton: {
    width: '20%',
    alignItems: 'center',
    left: '40%',
    marginTop: '2%',
    padding: '1%',
  },
  readMoreText: {
    color: 'orange',
    fontWeight: '700',
  },

});
