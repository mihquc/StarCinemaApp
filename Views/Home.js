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

  // const stepScroll = useRef(null);  

  useEffect(() => {
    // 1. load data tu server
    const data = [
      {
        image: <Image source={require('./Image/movie_nvcc.jpg')} style={[styles.image, {}]} resizeMode='cover'/>
      },
      {
        image: <Image source={require('./Image/movie_theMarvels.jpg')} style={styles.image} resizeMode='cover'/>
      },
      {
        image: <Image source={require('./Image/movie_drpn.jpg')} style={styles.image} resizeMode='cover'/>
      
      },
      {
        image: <Image source={require('./Image/movie_taylorswift.jpg')} style={[styles.image, {}]} resizeMode='cover'/>
        
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
        image: <Image style={styles.image1} source={require('./Image/movie_theMarvels1.jpg')} />,
        name: <Text style={styles.textImage}>Biệt Đội Marvels</Text>
      },
      {
        image: <Image style={styles.image1} source={require('./Image/movie_nvcc1.jpg')} />,
        name: <Text style={styles.textImage}>Người Vợ Cuối Cùng</Text>
      },
      {
        image: <Image style={styles.image1} source={require('./Image/movie_drpn1.jpg')} />,
        name: <Text style={styles.textImage}>Đất Rừng Phương Nam</Text>
      },
      {
        image: <Image style={styles.image1} source={require('./Image/movie_ylvn.jpg')} />,
        name: <Text style={styles.textImage}>Yêu Lại Vợ Ngầu</Text>
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
        image: <Image style={styles.image1} source={require('./Image/movie_dc.jpg')} />,
        name: <Text style={styles.textImage}>Đường Cùng</Text>
      },
      {
        image: <Image style={styles.image1} source={require('./Image/movie_cd.jpg')} />,
        name: <Text style={styles.textImage}>Chiếm Đoạt</Text>
      },
      {
        image: <Image style={styles.image1} source={require('./Image/movie_yakari.jpg')} />,
        name: <Text style={styles.textImage}>Cậu Bé Dũng Sĩ Yakari</Text>
      },
      {
        image: <Image style={styles.image1} source={require('./Image/movie_dtst.jpg')} />,
        name: <Text style={styles.textImage}>Đấu Trường Sinh Tử</Text>
      },
      
    ]

    setImageList2(data2);
  }, [])

  const viewItem = ({item, index}) => {
    return(
      <TouchableOpacity style={{width: '100%', height: '100%', flex: 1, justifyContent: 'flex-start', alignItems:'stretch', 
            marginLeft: index % 2 == 0 ? '5%' : '0%', marginRight: '5%', marginTop: (index ===0 || index===1)? '0%':'3%',}}>
        {item.image}
        
        <View style={{marginTop: '2%'}}>
          {item.name}
        </View>
      </TouchableOpacity>
      
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto"/>
      <ScrollView style={{flex: 1,}} showsVerticalScrollIndicator={false}>
        <View style={{}}>
          <View style={{width: '100%', height: 270, }}>
            <ScrollView
              horizontal
              pagingEnabled
              onScroll={handleScroll}
              scrollEventThrottle={16}
              showsHorizontalScrollIndicator={false}
            >
              {imageList.map((item, index) => (
                <View key={index} style={{ width: screenWidth, height: '100%', alignItems: 'center', justifyContent: 'center'}}>
                  {item.image}
                </View>
              ))}  
            </ScrollView>

            <View style={{ width: screenWidth, marginTop: '2%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
              {renderDots()}
            </View>
          </View>

          <View style={{flexDirection: 'row', width: '100%', height: 40, marginVertical: '2%'}}>
            <TouchableOpacity style={{borderRightWidth: 0.2, borderColor: 'gray', width: '30%', height: '88%', alignItems: 'center', justifyContent: 'center'}}
              onPress={toggleTextStyles}
              >
              <Text style={{color: isTextClicked ? 'green' : 'gray', fontSize: isTextClicked ? 18 : 16, fontWeight: '600'}}>Đang chiếu</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleTextStyles1} style={{width: '30%', height: '88%', alignItems: 'center', justifyContent: 'center'}}>
              <Text style={{color: isTextClicked ? 'gray' : 'green', fontSize: isTextClicked ? 16 : 18, fontWeight: '600'}}>Sắp chiếu</Text>
            </TouchableOpacity>
          </View>

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
    width: '88%',
    height: '98%',
    borderRadius: 8,
  },
  image1: {
    width: '100%', 
    height: 270,
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
