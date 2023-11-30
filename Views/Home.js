import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useRef } from 'react';
import { View, FlatList, Image, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Dimensions } from 'react-native';

import Movies from './Movies';

const { width: screenWidth } = Dimensions.get('window');

export default Home = function({navigation}) {
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
        idVideo: 'fDPhEkZWTa8',
        image:require('./Image/movie_theMarvels1.jpg'),
        name: 'Biệt Đội Marvels',
        description: "Carol Danvers bị vướng vào sức mạnh của Kamala Khan và Monica Rambeau, buộc họ phải hợp tác với nhau để cứu vũ trụ.  The Marvels (tựa Việt: Biệt đội Marvel) là dự án cuối cùng của Vũ trụ Điện ảnh Marvel (MCU) trong năm 2023, đóng vai trò quan trọng khi kết nối 3 mini-series ăn khách đã ra mắt là WandaVision, Ms. Marvel và Secret Invasion. Không những đánh dấu màn tái xuất của nhân vật được khán giả yêu thích Captain Marvel Carol Denvers (Brie Larson) trên màn ảnh rộng, bộ phim còn giới thiệu đến khán giả liên minh 3 'chị đại' có vai trò quan trọng đối với tương lai của MCU. Câu chuyện lần này xảy ra sau các sự kiện trong Captain Marvel (2019), Dar-Benn (The Accuser) đã mất đi quê nhà và giờ đây, ả đang tìm cách trả thù mọi hành tinh từng được Carol cứu giúp. Bằng cách nào đó, Dar-Benn sở hữu được chiếc vòng có sự liên kết với Ms. Marvel/Kamala Khan (Iman Vellani) và 'Spectrum' Monica Rambeau (Teyonah Parris). Từ đây, nữ ác nhân có thể thao túng liên kết ánh sáng giữa các siêu anh hùng khiến họ hoán đổi vị trí cho nhau mỗi khi dùng sức mạnh, gây ra những xáo động khôn lường.",
      },
      {
        idVideo: 'xrUqv530rOI',
        image: require('./Image/movie_nvcc1.jpg'),
        name: 'Người Vợ Cuối Cùng',
        description: "Lấy cảm hứng từ tiểu thuyết Hồ Oán Hận, của nhà văn Hồng Thái, Người Vợ Cuối Cùng là một bộ phim tâm lý cổ trang, "+
        "lấy bối cảnh Việt Nam vào triều Nguyễn. Linh - Người vợ bất đắc dĩ của một viên quan tri huyện, xuất thân là con " + 
        "của một gia đình nông dân nghèo khó, vì không thể hoàn thành nghĩa vụ sinh con nối dõi nên đã chịu sự chèn ép của " +
        "những người vợ lớn trong gia đình. Sự gặp gỡ tình cờ của cô và người yêu thời thanh mai trúc mã của mình - Nhân " +
        "đã dẫn đến nhiều câu chuyện bất ngờ xảy ra khiến cuộc sống cô hoàn toàn thay đổi."
      },
      {
        idVideo: 'yrMDJduy4wI',
        image: require('./Image/movie_drpn1.jpg'),
        name: 'Đất Rừng Phương Nam',
        description: "Đất Rừng Phương Nam phiên bản điện ảnh được kế thừa và phát triển từ tiểu thuyết cùng tên của nhà văn Đoàn Giỏi. Bộ phim kể về hành trình phiêu lưu của An - một cậu bé chẳng may mất mẹ trên đường đi tìm cha. Cùng với An, khán giả sẽ trải nghiệm sự trù phú của thiên nhiên và nét đẹp văn hoá đặc sắc của vùng đất Nam Kì Lục Tỉnh, sự hào hiệp của những người nông dân bám đất bám rừng và tinh thần yêu nước kháng Pháp đầu thế kỉ 20. Bên cạnh đó, tình cảm gia đình, tình bạn, tình người, tình thầy trò, tình yêu nước là những cung bậc cảm xúc sâu sắc sẽ đọng lại qua mỗi bước chân của An và đồng bạn.",
      },
      {
        idVideo: 'wWSzkkoeolE',
        image: require('./Image/movie_ylvn.jpg'),
        name: 'Yêu Lại Vợ Ngầu',
        description: "Cặp vợ chồng trẻ No Jung Yeol (Kang Ha-neul) và Hong Na Ra (Jung So-min) từ cuộc sống hôn nhân màu hồng dần “hiện nguyên hình” trở thành cái gai trong mắt đối phương với vô vàn thói hư, tật xấu. Không thể đi đến tiếng nói chung, Jung Yeol và Na Ra quyết định ra toà ly dị. Tuy nhiên, họ phải chờ 30 ngày cho đến khi mọi thủ tục chính thức được hoàn tất. Trong khoảng thời gian này, một vụ tai nạn xảy ra khiến cả hai mất đi ký ức và không nhớ người kia là ai. 30 ngày chờ đợi để được “đường ai nấy đi” nhưng nhiều tình huống trớ trêu khiến cả hai bắt đầu nảy sinh tình cảm trở lại. Liệu khi nhớ ra mọi thứ, họ vẫn sẽ ký tên vào tờ giấy ly hôn?"
      },
      {
        image: require('./Image/movie_qmq.jpg'),
        name: 'Quỷ Môn Quan: Gọi Hồn',
        description: "",
      },
      {
        image: require('./Image/movie_taylorswift1.jpg'),
        name: 'Những Kỷ Nguyên Của Taylor Swift',
        description: ""
      }
    ]

    setImageList1(data1);
  }, [])

  useEffect(() => {
    const data2 = [
      {
        image: require('./Image/movie_dc.jpg'),
        name: 'Đường Cùng',
        description: ""
      },
      {
        image: require('./Image/movie_cd.jpg'),
        name: 'Chiếm Đoạt',
        description: ""
      },
      {
        image: require('./Image/movie_yakari.jpg'),
        name: 'Cậu Bé Dũng Sĩ Yakari',
        description: ""
      },
      {
        image: require('./Image/movie_dtst.jpg'),
        name: 'Đấu Trường Sinh Tử',
        description: ""
      },
      
    ]

    setImageList2(data2);
  }, [])

  const viewItem = ({item, index}) => {
    return(
      <TouchableOpacity onPress={() => {navigation.navigate('Movies', {item})}} style={{width: '100%', height: '100%', flex: 1, justifyContent: 'flex-start', alignItems:'stretch', 
            marginLeft: index % 2 == 0 ? '5%' : '0%', marginRight: '5%', marginTop: (index ===0 || index===1)? '0%':'3%',}}>
         <Image style={styles.image1} source={item.image}/>
        
        <View style={{marginTop: '2%'}}>
          <Text style={styles.textImage}>{item.name}</Text>
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
              // ref={stepScroll}
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
