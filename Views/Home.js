import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useRef } from 'react';
import { View, FlatList, Image, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Dimensions } from 'react-native';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../Component/loader';
import URL from '../Component/API';

const { width: screenWidth } = Dimensions.get('window');
const { height: screenHeight } = Dimensions.get('window');
// console.log(screenHeight);

export default Home = function ({ navigation }) {
  // const URL = "https://3c37-14-233-83-201.ngrok-free.app";
  const URLMovies = `${URL}/customer/homepage/search/nowplayingmovies`;
  const URLMoviesComing = `${URL}/customer/homepage/search/upcommingmovies`;
  const URLPromotions = `${URL}/customer/homepage/search/promotions`;

  const [imageList, setImageList] = useState([]);
  const [imageList1, setImageList1] = useState([]);
  const [imageList2, setImageList2] = useState([]);
  const [listDiscount, setListDiscount] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(false);

  const renderDots = (list, currentIndex) => {
    return list.map((e, index) => (
      <View
        key={index.toString()}
        style={[
          styles.dot,
          { backgroundColor: index === currentIndex ? 'purple' : 'gray' },
        ]}
      />
    ));
  };

  const [isTextClicked, setIsTextClicked] = useState(true);

  const toggleTextStyles = () => {
    setIsTextClicked(true);
  };
  const toggleTextStyles1 = () => {
    setIsTextClicked(false);
  };

  const stepScroll = useRef(null);  //ref

  // lưu trữ store
  const dispatch = useDispatch();
  const selectMovie = (movie) => {
    try {
      dispatch({ type: 'SELECT_MOVIE', selectedMovie: movie });
    } catch (error) {
      console.log(error);
    }
  }
  const listMovie = (movies) => {
    try {
      dispatch({ type: 'SET_MOVIES', movies: movies });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    //phim đang chiếu
    axios.get(`${URLMovies}`)
      .then((response) => {
        const data = response.data;
        // console.log(data);
        listMovie(data);
        setImageList1(data);
      })
      .catch((error) => { console.log(error); });

    // phim sắp chiếu
    axios.get(`${URLMoviesComing}`)
      .then((response) => {
        const data = response.data;
        // console.log(data);
        setImageList2(data);
      })
      .catch((error) => { console.log(error); });

    // khuyến mãi
    axios.get(URLPromotions)
      .then((response) => {
        const data = response.data;
        setListDiscount(data);
      })
      .catch((error) => { console.log(error); });


    const data = [
      {
        image: require('./Image/movie_du1.jpg')
      },
      {
        image: require('./Image/movie_nvcc.jpg'),
      },
      {
        image: require('./Image/movie_cd1.jpg'),
      },
      {
        image: require('./Image/movie_theMarvels.jpg')
      },
      {
        image: require('./Image/movie_drpn.jpg')
      },
    ];
    setImageList(data);
  }, [])

  useEffect(() => {
    if (imageList.length > 0) {
      let index = 0;
      setInterval(() => {
        stepScroll.current.scrollTo({ x: index * (screenWidth), y: 0, animated: true });
        index += 1;
        if (index === imageList.length) {
          index = 0;
        }
      }, 5000);
    }
  }, [imageList]);

  const handleScroll = (e) => {
    if (!e) {
      return;
    }
    const { nativeEvent } = e;
    if (nativeEvent && nativeEvent.contentOffset) {
      const currentOffset = nativeEvent.contentOffset.x;
      let imageIndex = 0;
      if (currentOffset > 0) {
        imageIndex = Math.floor((nativeEvent.contentOffset.x + screenWidth / 2) / (screenWidth));
      }
      setCurrentIndex(imageIndex);
    }
  }

  const pressMovie = (item, index) => {
    selectMovie(item);
    navigation.navigate('Movies', { item });
    setProgress(false)
  }

  const viewItem = ({ item, index }) => {
    // console.log(index);
    return (
      <TouchableOpacity style={{ width: screenWidth / 2, justifyContent: 'flex-start', alignItems: 'center', marginBottom: '2%', }}
        onPress={() => {
          setProgress(true);
          pressMovie(item, index);
        }} >
        <View style={{ width: '85%', height: 270, borderRadius: 5, }}>
          <Image style={styles.image1} source={{ uri: item.posterUrl || "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/694px-Unknown_person.jpg" }} />
        </View>
        <View style={{ width: '88%', marginTop: '1%', alignItems: 'flex-start', }}>
          <Text style={styles.textImage}>{item.title}</Text>
        </View>
      </TouchableOpacity>

    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <ScrollView style={{ flex: 1, }} showsVerticalScrollIndicator={false}>
        <View style={{ width: '100%', height: 270, }}>
          <ScrollView
            ref={stepScroll} // ref
            horizontal
            pagingEnabled
            onScroll={handleScroll}
            scrollEventThrottle={16}
            showsHorizontalScrollIndicator={false}
          >
            {imageList.map((item, index) => (
              <View key={index} style={{
                width: screenWidth, height: '98%', alignItems: 'center', justifyContent: 'center',
                marginTop: 5
              }}>
                <Image source={item.image} style={styles.image} />
              </View>
            ))}
          </ScrollView>

          <View style={{ width: screenWidth, marginTop: '2%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            {renderDots(imageList, currentIndex)}
          </View>
        </View>

        <View style={{ flexDirection: 'row', width: '100%', height: 40, marginVertical: '2%' }}>
          <TouchableOpacity style={{ borderRightWidth: 0.2, borderColor: 'gray', width: '30%', height: '88%', alignItems: 'center', justifyContent: 'center' }}
            onPress={toggleTextStyles}
          >
            <Text style={{ color: isTextClicked ? 'green' : 'gray', fontSize: isTextClicked ? 18 : 16, fontWeight: '600' }}>Đang chiếu</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleTextStyles1} style={{ width: '30%', height: '88%', alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ color: isTextClicked ? 'gray' : 'green', fontSize: isTextClicked ? 16 : 18, fontWeight: '600' }}>Sắp chiếu</Text>
          </TouchableOpacity>
        </View>

        <View style={{ alignItems: 'flex-start', width: '100%' }}>
          <FlatList
            data={isTextClicked ? imageList1 : imageList2}
            numColumns={2}
            renderItem={viewItem}
            keyExtractor={(item, index) => index.toString()}
            nestedScrollEnabled={true}
            scrollEnabled={false}
            style={{}}
          />
        </View>

        <View style={{ width: '100%', height: 260, alignItems: 'center', marginTop: '1%', borderTopWidth: 1, borderColor: '#F8AC6E' }}>
          <FlatList
            data={listDiscount}
            horizontal
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity style={{ width: 250, height: 210, marginRight: 20, marginLeft: index === 0 ? 20 : 0, }}
                  onPress={() => { navigation.navigate('Discount', { item }) }}>
                  <Image source={{ uri: item.imageUrl || "https://ocwckgy6c1obj.vcdn.cloud/media/banner/cache/1/b58515f018eb873dafa430b6f9ae0c1e/2/0/2023_happy_wed_75k_000_240x201.png" }}
                    style={{ resizeMode: 'stretch', width: '100%', height: '78%', borderRadius: 8, marginTop: '6%' }} />
                  <Text style={{ fontSize: 15, fontWeight: '600', marginTop: '2%', width: '100%', }}>{item.title}</Text>
                </TouchableOpacity>
              )
            }}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </ScrollView>
      {progress ? <Loader indeterminate={progress} /> : null}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    flex: 1,
    alignItems: 'center',
  },
  image: {
    width: '85%',
    height: '92%',
    borderRadius: 5,
    resizeMode: 'stretch',
  },
  image1: {
    width: '100%',
    height: 260,
    borderRadius: 5,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    margin: 4,
  },
  textImage: {
    fontSize: 15,
    fontWeight: '500'
  },
});
