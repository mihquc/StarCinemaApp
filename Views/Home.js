import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useRef } from 'react';
import { View, FlatList, Image, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Dimensions } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

export default Home = function() {
  const [imageList, setImageList] = useState([]);
  const [imageList1, setImageList1] = useState([]);
  const [imageList2, setImageList2] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const renderDots = () => {
    return imageList.map((e, index) => (
      <View
        key={index.toString()}
        style={[
          styles.dot,
          { backgroundColor: index === currentIndex ? 'blue' : 'gray' },
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

  // const stepScroll = useRef(null);  

  useEffect(() => {
    // 1. load data tu server
    const data = [
      {
        image: <View >
          <Image source={require('./Image/movie_nvcc.jpg')} style={[styles.image, {}]} resizeMode='cover'/>
        </View>
      },
      {
        image: <View >
          <Image source={require('./Image/movie_theMarvels.jpg')} style={styles.image} resizeMode='cover'/>
        </View> 
      },
      {
        image: <View >
          <Image source={require('./Image/movie_drpn.jpg')} style={styles.image} resizeMode='cover'/>
        </View>
      },
      {
        image: <View >
          <Image source={require('./Image/movie_taylorswift.jpg')} style={[styles.image, {}]} resizeMode='cover'/>
        </View>
      }
    ];

    // 2. cap nhat len state cua screen
    setImageList(data);
  }, [])

  // useEffect(() => {
  //   if(imageList.length > 0) {
  //     let index = 0;
  //     setInterval(() => {
  //       stepScroll.current.scrollTo({x: index*screenWidth, y: 0, animated: true});
  //       index +=1;
  //       if(index === imageList.length){
  //         index = 0;
  //       }
  //     }, 5000);
  //   }
  // }, [imageList]);

  const handleScroll = (e) => {
    if(!e){
      return;
    }
    const {nativeEvent} = e;
    if(nativeEvent && nativeEvent.contentOffset){
      const currentOffset = nativeEvent.contentOffset.x;
      let imageIndex = 0;
      if(nativeEvent.contentOffset.x > 0){
        imageIndex = Math.floor((nativeEvent.contentOffset.x + screenWidth/2) / screenWidth);
      }
      setCurrentIndex(imageIndex);
    }
  }

  useEffect(() => {
    const data1 = [
      {
        image: <Image style={styles.image1} source={require('./Image/movie_nvcc1.jpg')} />,
        name: <Text style={styles.textImage}>Người Vợ Cuối Cùng</Text>
      },
      {
        image: <Image style={styles.image1} source={require('./Image/movie_drpn1.jpg')} />,
        name: <Text style={styles.textImage}>Đất Rừng Phương Nam</Text>
      },
      {
        image: <Image style={styles.image1} source={require('./Image/movie_qmq.jpg')} />,
        name: <Text style={styles.textImage}>Quỷ Môn Quan: Gọi Hồn</Text>
      },
      {
        image: <Image style={styles.image1} source={require('./Image/movie_taylorswift1.jpg')} />,
        name: <Text style={styles.textImage}>Những Kỷ Nguyên Của Taylor Swift</Text>
      }
    ]

    setImageList1(data1);
  }, [])

  useEffect(() => {
    const data2 = [
      {
        image: <Image style={styles.image1} source={require('./Image/movie_drpn1.jpg')} />,
        name: <Text style={styles.textImage}>Đất Rừng Phương Nam</Text>
      },
      {
        image: <Image style={styles.image1} source={require('./Image/movie_nvcc1.jpg')} />,
        name: <Text style={styles.textImage}>Người Vợ Cuối Cùng</Text>
      },
      {
        image: <Image style={styles.image1} source={require('./Image/movie_qmq.jpg')} />,
        name: <Text style={styles.textImage}>Quỷ Môn Quan: Gọi Hồn</Text>
      },
      {
        image: <Image style={styles.image1} source={require('./Image/movie_taylorswift1.jpg')} />,
        name: <Text style={styles.textImage}>Những Kỷ Nguyên Của Taylor Swift</Text>
      }
    ]

    setImageList2(data2);
  }, [])

  const viewItem = ({item}) => {
    return(
      <View style={{width: 190, height: 320, alignItems: 'flex-start', marginLeft: 10}}>
        {item.image}
        <View style={{marginTop: 7}}>
          {item.name}
        </View>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto"/>
      <ScrollView>
        <View style={{flex: 1, alignItems: 'center', marginTop: 10}}>
          <View style={{width: screenWidth, height: 265}}>
          <FlatList
            horizontal
            pagingEnabled
            data={imageList}
            renderItem={({ item }) => (
              <View style={{width: screenWidth, height: 276, alignItems: 'center',}}>{item.image}</View>
            )}
            keyExtractor={(item, index) => index.toString()}
            onScroll={handleScroll}
            scrollEventThrottle={16}
          />

            <View style={{ width: screenWidth, height: 20, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
              {renderDots()}
            </View>
          </View>

          <View style={{flexDirection: 'row', marginTop: 15}}>
            <TouchableOpacity style={{borderRightWidth: 0.2, width: 120, height: 30, alignItems: 'center', justifyContent: 'center'}}
              onPress={toggleTextStyles}
              >
              <Text style={{color: isTextClicked ? 'green' : 'black', fontSize: isTextClicked ? 20 : 16, fontWeight: '500'}}>Đang chiếu</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleTextStyles1} style={{width: 120, height: 30, alignItems: 'center', justifyContent: 'center', marginRight: 150}}>
              <Text style={{color: isTextClicked ? 'black' : 'green', fontSize: isTextClicked ? 16 : 20, fontWeight: '500'}}>Sắp chiếu</Text>
            </TouchableOpacity>
          </View>

          <View>
            <FlatList
              data={isTextClicked ? imageList1 : imageList2}
              numColumns={2}
              renderItem={viewItem}
              keyExtractor={(item, index) => index.toString()}
              style={{marginTop: 14,}}
              nestedScrollEnabled={true}
              scrollEnabled={false}
            />
          </View>
        </View>
      </ScrollView>
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
    width: 360,
    height: 240,
    borderRadius: 8,
  },
  image1: {
    width: 180, 
    height: 270,
    borderRadius: 5,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    margin: 2,
  },
  textImage: {
    fontSize: 15,
    fontWeight: '500'
  },
});
