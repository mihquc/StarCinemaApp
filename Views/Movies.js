import { StatusBar } from 'expo-status-bar';
import React, { useState, useRef, useCallback, useEffect } from 'react';
import { View, Image, ScrollView, Text, TouchableOpacity, StyleSheet, SafeAreaView, Alert, Button } from 'react-native';
import YoutubeIframe from 'react-native-youtube-iframe';
import YoutubePlayer from "react-native-youtube-iframe";

export default function Movies({navigation, route}) {
  const [playing, setPlaying] = useState(false);
  const [nameMovie, setNameMovie] = useState('');
  const [idVideo, setIdVideo] = useState('');
  const [image, setImage] = useState();
  const [description, setDescription] = useState('');
 
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
        <ScrollView style={{}}>
          {/* <View style={{width: '100%', height: '4%', alignItems: 'flex-start', justifyContent: 'center',}}>
            <TouchableOpacity style={{width: '9%', height: '90%', marginStart: '2%',}} onPress={() => {navigation.goBack()}}>
              <Image style={{width: '100%', height: '100%'}} source={require('./Image/icon_back.png')} resizeMode= 'contain'/>
            </TouchableOpacity>
          </View> */}
          {/* <View style={{width: '100%', height: '41.5%'}}> */}
            <YoutubeIframe
              height={240}
              play={playing}
              videoId={idVideo}
              onChangeState={onStateChange}
            />
          {/* </View> */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', backgroundColor: 'gray'}}>
            <View style={{width: '27%', height: '100%',}}>
              <Image style={styles.image1} source={image} resizeMode='stretch'/>
            </View>
            <View style={{width: '65%', height: '100%', alignItems: 'flex-start', justifyContent: 'flex-start',}}>
              <Text style={{fontSize: 18, fontWeight: '600'}}>{nameMovie}</Text>
              <View style={styles.viewtext}>
                <Image style={styles.text} source={require('./Image/icon_hisTime.png')} resizeMode='contain'/>
                <Text style={{fontSize: 15, color: 'gray'}}>{120} phút</Text>
              </View>
              <View style={styles.viewtext}>
                <Image style={styles.text} source={require('./Image/icon_calendar.png')} resizeMode='contain'/>
                <Text style={{fontSize: 15, color: 'gray'}}>1-11-2023</Text>
              </View>
            </View>
          </View>

          <View style={{backgroundColor: 'red',}}>
            <Text style={{fontSize: 17, fontWeight: '600', marginStart: '2%', marginEnd: '2%'}}>Nội dung</Text>
            <Text style={{fontSize: 16, marginStart: '2%', marginEnd: '2%',}} numberOfLines={5}>
              Lấy cảm hứng từ tiểu thuyết Hồ Oán Hận, của nhà văn Hồng Thái, Người Vợ Cuối Cùng là một bộ phim tâm lý cổ trang, 
              lấy bối cảnh Việt Nam vào triều Nguyễn. Linh - Người vợ bất đắc dĩ của một viên quan tri huyện, xuất thân là con 
              của một gia đình nông dân nghèo khó, vì không thể hoàn thành nghĩa vụ sinh con nối dõi nên đã chịu sự chèn ép của 
              những người vợ lớn trong gia đình. Sự gặp gỡ tình cờ của cô và người yêu thời thanh mai trúc mã của mình - Nhân 
              đã dẫn đến nhiều câu chuyện bất ngờ xảy ra khiến cuộc sống cô hoàn toàn thay đổi.
            </Text>
          </View>
        </ScrollView>
        <View style>
          <View>

          </View>
          <View>
            
          </View>
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
    image1: {
      width: '95%', 
      height: '62%',
      borderRadius: 5,
      backgroundColor: 'red',
    },
    text: {
      tintColor: 'green', 
      width: '7%', 
      height: '63%', 
      marginRight: '2%',
    },
    viewtext: {
      flexDirection: 'row', 
      width: '100%', 
      height: '20%', 
      alignItems: 'center',
    },
  });