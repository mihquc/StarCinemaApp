import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useRef } from 'react';
import { View, FlatList, Image, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Dimensions } from 'react-native';
import axios from 'axios';
import Movies from './Movies';

const { width: screenWidth } = Dimensions.get('window');
console.log(screenWidth);

export default Home = function({navigation}) {
  const URLMovies = "https://65742768f941bda3f2af6a27.mockapi.io/api/mq/movie";
  const URLMovies1 = "https://65742768f941bda3f2af6a27.mockapi.io/api/mq/customer";

  const [imageList, setImageList] = useState([]);
  const [imageList1, setImageList1] = useState([]);
  const [imageList2, setImageList2] = useState([]);
  const [listDiscount, setListDiscount] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

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

  // const stepScroll = useRef(null);  //ref

  useEffect(() => {
    axios.get(URLMovies)
    .then((response) => {
      const data = response.data;
      // console.log(data);
      setImageList1(data); 
    })
    .catch((error) => {console.log(error);});

    axios.get(URLMovies1)
    .then((response) => {
      const data = response.data;
      // console.log(data);
      setImageList2(data); 
    })
    .catch((error) => {console.log(error);});

    // 1. load data tu server
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

    const data1 = [
      {
        image: require('./Image/movie_du1.jpg')
      },
      {
        image: require('./Image/movie_nvcc.jpg')
      },
      {
        image: require('./Image/movie_cd1.jpg')
      },
      {
        image: require('./Image/movie_theMarvels.jpg')
      },
      {
        image: require('./Image/movie_drpn.jpg')
      },
    ];
    setListDiscount(data1);
    // 2. cap nhat len state cua screen
    setImageList(data);
  }, [])

  // useEffect(() => {
  //   if(imageList.length > 0) {
  //     let index = 0;
  //     setInterval(() => {
  //       stepScroll.current.scrollTo({x: index*(screenWidth), y: 0, animated: true});
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
      if(currentOffset > 0){
        imageIndex = Math.floor((nativeEvent.contentOffset.x + screenWidth/2) / (screenWidth - (22*screenWidth/100)));
      }
      setCurrentIndex(imageIndex);
    }
  }

  // useEffect(() => {
  //   const data1 = [
  //     {
  //       idVideo: 'EFRTuiWm3zA',
  //       image: require('./Image/movie_du.jpg'),
  //       name: 'Điều Ước',
  //       description: "Lấy bối cảnh ở vương quốc ma thuật Rosas, câu chuyện giới thiệu Asha (Ariana DeBose lồng tiếng), một người lạc quan với trí thông minh sắc sảo, người quan tâm sâu sắc đến cộng đồng của mình. Khi Asha hướng lên bầu trời trong một khoảnh khắc cần thiết và thực hiện một điều ước, lời cầu xin của cô đã được đáp lại bởi một lực lượng vũ trụ - một quả cầu nhỏ chứa năng lượng vô biên có tên là Ngôi sao . Cùng nhau, họ đối mặt với những kẻ thù ghê gớm nhất để cứu cộng đồng của mình và chứng minh rằng khi ý chí của một con người dũng cảm kết nối với phép thuật của các vì sao, những điều kỳ diệu có thể xảy ra.",
  //     },
  //     {
  //       idVideo: 'qz0_9ITGwws',
  //       image: require('./Image/movie_ch.jpg'),
  //       name: 'Cầu Hồn',
  //       description: "Cầu Hồn bắt đầu trong bối cảnh kỳ lạ của những câu chuyện siêu nhiên được lưu hành trong trường. Các địa điểm chính của trường bao gồm thư viện, phòng tập nhảy và thang máy đều toát lên sự kinh dị về những điềm báo đen tối sẽ diễn ra. Điểm đặc biệt của phim là cách lồng ghép khéo léo 3 nghi thức tâm linh vào 1 trò chơi thực tế ảo: Trò chơi 4 góc; Trò chơi trốn tìm 1 người; và Trò chơi thang máy. Bộ phim là sự trỗi dậy của truyền thuyết kinh hoàng cây cầu ma nữ tại Đài Loan.",
  //     },
  //     {
  //       idVideo: 'fDPhEkZWTa8',
  //       image:require('./Image/movie_theMarvels1.jpg'),
  //       name: 'Biệt Đội Marvels',
  //       description: "Carol Danvers bị vướng vào sức mạnh của Kamala Khan và Monica Rambeau, buộc họ phải hợp tác với nhau để cứu vũ trụ.  The Marvels (tựa Việt: Biệt đội Marvel) là dự án cuối cùng của Vũ trụ Điện ảnh Marvel (MCU) trong năm 2023, đóng vai trò quan trọng khi kết nối 3 mini-series ăn khách đã ra mắt là WandaVision, Ms. Marvel và Secret Invasion. Không những đánh dấu màn tái xuất của nhân vật được khán giả yêu thích Captain Marvel Carol Denvers (Brie Larson) trên màn ảnh rộng, bộ phim còn giới thiệu đến khán giả liên minh 3 'chị đại' có vai trò quan trọng đối với tương lai của MCU. Câu chuyện lần này xảy ra sau các sự kiện trong Captain Marvel (2019), Dar-Benn (The Accuser) đã mất đi quê nhà và giờ đây, ả đang tìm cách trả thù mọi hành tinh từng được Carol cứu giúp. Bằng cách nào đó, Dar-Benn sở hữu được chiếc vòng có sự liên kết với Ms. Marvel/Kamala Khan (Iman Vellani) và 'Spectrum' Monica Rambeau (Teyonah Parris). Từ đây, nữ ác nhân có thể thao túng liên kết ánh sáng giữa các siêu anh hùng khiến họ hoán đổi vị trí cho nhau mỗi khi dùng sức mạnh, gây ra những xáo động khôn lường.",
  //     },
  //     {
  //       idVideo: 'xrUqv530rOI',
  //       image: require('./Image/movie_nvcc1.jpg'),
  //       name: 'Người Vợ Cuối Cùng',
  //       description: "Lấy cảm hứng từ tiểu thuyết Hồ Oán Hận, của nhà văn Hồng Thái, Người Vợ Cuối Cùng là một bộ phim tâm lý cổ trang, "+
  //       "lấy bối cảnh Việt Nam vào triều Nguyễn. Linh - Người vợ bất đắc dĩ của một viên quan tri huyện, xuất thân là con " + 
  //       "của một gia đình nông dân nghèo khó, vì không thể hoàn thành nghĩa vụ sinh con nối dõi nên đã chịu sự chèn ép của " +
  //       "những người vợ lớn trong gia đình. Sự gặp gỡ tình cờ của cô và người yêu thời thanh mai trúc mã của mình - Nhân " +
  //       "đã dẫn đến nhiều câu chuyện bất ngờ xảy ra khiến cuộc sống cô hoàn toàn thay đổi."
  //     },
  //     {
  //       idVideo: 'v6BuKSaEHxE',
  //       image: require('./Image/movie_cd.jpg'),
  //       name: 'Chiếm Đoạt',
  //       description: "Kể về người vợ của một gia đình thượng lưu thuê cô bảo mẫu “trong mơ” để chăm sóc con trai mình. Nhưng cô không ngờ rằng, phía sau sự trong sáng, tinh khiết kia, cô bảo mẫu luôn che giấu âm mưu nhằm phá hoại hạnh phúc gia đình và khiến cuộc sống của cô thay đổi mãi mãi.",
  //     },
  //     {
  //       idVideo: 'wWSzkkoeolE',
  //       image: require('./Image/movie_ylvn.jpg'),
  //       name: 'Yêu Lại Vợ Ngầu',
  //       description: "Cặp vợ chồng trẻ No Jung Yeol (Kang Ha-neul) và Hong Na Ra (Jung So-min) từ cuộc sống hôn nhân màu hồng dần “hiện nguyên hình” trở thành cái gai trong mắt đối phương với vô vàn thói hư, tật xấu. Không thể đi đến tiếng nói chung, Jung Yeol và Na Ra quyết định ra toà ly dị. Tuy nhiên, họ phải chờ 30 ngày cho đến khi mọi thủ tục chính thức được hoàn tất. Trong khoảng thời gian này, một vụ tai nạn xảy ra khiến cả hai mất đi ký ức và không nhớ người kia là ai. 30 ngày chờ đợi để được “đường ai nấy đi” nhưng nhiều tình huống trớ trêu khiến cả hai bắt đầu nảy sinh tình cảm trở lại. Liệu khi nhớ ra mọi thứ, họ vẫn sẽ ký tên vào tờ giấy ly hôn?"
  //     },
  //     {
  //       idVideo: 'yrMDJduy4wI',
  //       image: require('./Image/movie_drpn1.jpg'),
  //       name: 'Đất Rừng Phương Nam',
  //       description: "Đất Rừng Phương Nam phiên bản điện ảnh được kế thừa và phát triển từ tiểu thuyết cùng tên của nhà văn Đoàn Giỏi. Bộ phim kể về hành trình phiêu lưu của An - một cậu bé chẳng may mất mẹ trên đường đi tìm cha. Cùng với An, khán giả sẽ trải nghiệm sự trù phú của thiên nhiên và nét đẹp văn hoá đặc sắc của vùng đất Nam Kì Lục Tỉnh, sự hào hiệp của những người nông dân bám đất bám rừng và tinh thần yêu nước kháng Pháp đầu thế kỉ 20. Bên cạnh đó, tình cảm gia đình, tình bạn, tình người, tình thầy trò, tình yêu nước là những cung bậc cảm xúc sâu sắc sẽ đọng lại qua mỗi bước chân của An và đồng bạn.",
  //     },
  //     {
  //       idVideo: 'UbJQYJjNgw0',
  //       image: require('./Image/movie_ahsa.jpg'),
  //       name: 'Âm Hồn Siam',
  //       description: "Bộ phim kể về mối tình tay ba của hai người bạn thân cùng phải lòng một chàng trai, nhưng cuối cùng chuyện tình này lại động chạm đến ma thuật hắc ám. Điều này đã dẫn đến một thảm kịch khi cuộc trả thù kinh hoàng kéo dài và liên lụy đến đời sau.",
  //     },
  //   ]

  //   // setImageList1(data1); 
  // }, [])

  // useEffect(() => {
  //   const data2 = [
  //     {
  //       idVideo: 'tS5xKcjZ9yo',
  //       image: require('./Image/movie_nccxldnh.jpg'),
  //       title: 'Người Cha Của Xe Lửa Dải Ngân Hà',
  //       description: "Cuộc đời của tác gia huyền thoại Miyazawa Kenji - tác giả viết truyện thiếu nhi được yêu thích hàng đầu Nhật Bản. Là con trai cả của Masajiro - một chủ tiệm cầm đồ giàu có, Kenji được nuôi dưỡng với kỳ vọng một ngày nào đó anh sẽ kế thừa công việc kinh doanh của gia đình. Tuy nhiên, Kenji có tinh thần tự do quyết tâm đi theo con đường riêng và tự mình theo đuổi nghiên cứu nông nghiệp, đá quý tổng hợp và các công việc kinh doanh lập dị khác, bất chấp sự hoang mang của cha anh. Dựa trên cuốn tiểu thuyết bán chạy cùng tên, câu chuyện đáng kinh ngạc này mô tả sức mạnh của gia đình và tình yêu vô điều kiện dù trong mọi giai đoạn khó khăn.",
  //     },
  //     {
  //       idVideo: '',
  //       image: require('./Image/movie_sttdm.jpg'),
  //       title: 'Sự Thật Từ Đôi Môi',
  //       description: "Carla Bhem đã làm thư ký cho một công ty phát triển bất động sản trong một thời gian dài. Về cơ bản, công việc của cô ấy là tất cả mọi thứ: từ xử lý hồ sơ và trả lời điện thoại đến soạn thảo dự toán và giao dịch với các nhà cung cấp. Đầu tiên đến vào buổi sáng, cuối cùng ra ngoài vào ban đêm. Vì thế, cô ấy được trả lương như một nông nô, bị đối xử như bùn đất và bị sai khiến như một con chó. Carla chịu đủ rồi. Cô ấy nghĩ rằng cô ấy xứng đáng tốt hơn. Vấn đề chỉ là, trong một xã hội do nam giới thống trị, hy vọng nào dành cho một phụ nữ 35 tuổi với vóc dáng tầm thường và đeo máy trợ thính ở cả hai tai? Tên của giải pháp là Paul Angeli, thực tập sinh mới mà cô quản lý đã thuê. Paul 25 tuổi và hoàn toàn không có kỹ năng phát triển bất động sản - trên thực tế, anh ấy không biết gì. Nhưng anh ta có những phẩm chất khác: anh ta là một tên trộm, mới ra tù, và hơn nữa anh ta còn đẹp trai. Như người ta vẫn nói, 'Phải mất hai người để nhảy tango'. Cô ấy dạy anh ấy cách cư xử tốt và anh ấy dạy cô ấy những điều xấu. Những kết quả đầu tiên ngay lập tức đáng khích lệ."
  //     },
  //     {
  //       idVideo: 'NtcN57vQdgc',
  //       image: require('./Image/movie_mai.jpg'),
  //       title: 'Mai',
  //       description: "Mai xoay quanh câu chuyện về cuộc đời của một người phụ nữ cùng tên với bộ phim. Trên First-look Poster, Phương Anh Đào tạo ấn tượng mạnh với cái nhìn tĩnh lặng, xuyên thấu, đặc biệt, trên bờ môi nữ diễn viên là hình ảnh cô đang nằm nghiêng trên mặt nước. Được phủ một màn sương mờ ảo, poster đậm chất nghệ thuật của Mai gây tò mò với lời tựa: “Quá khứ chưa ngủ yên, ngày mai liệu sẽ đến?”."
  //     },
  //     { 
  //       idVideo: 'kDuiynKxjQU',
  //       image: require('./Image/movie_curdt.jpg'),
  //       title: 'Cú Úp Rổ Đầu Tiên',
  //       description: "The First Slam Dunk - phiên bản điện ảnh đầu tiên của loạt phim/truyện đình đám này sẽ do đích thân tác giả Inoue Takehiko chỉ đạo. Tuy nhiên lần này, câu chuyện sẽ được kể từ góc nhìn của chàng hậu vệ nhỏ con Miyagi Ryota, thay vì anh chàng tóc đỏ xốc nổi Hanamichi. Lấy bối cảnh trận đấu quan trọng giữa Shohoku và Sannoh - đội bóng top 10 toàn quốc, phim đan xen câu chuyện quá khứ của từng thành viên, đặc biệt là Ryota, cùng những diễn biến của trận đấu. Từ đó, tác giả Inoue Takehiko thành công khắc họa việc bóng rổ có ảnh hưởng to lớn như thế nào đến sự trưởng thành của mỗi thành viên Shohoku.",
  //     },
  //     {
  //       idVideo: 'LtE4ACvFiv4',
  //       image: require('./Image/movie_aquaman.jpg'),
  //       title: 'Aquaman Và Vương Quốc Thất Lạc',
  //       description: "Aquaman Và Vương Quốc Thất Lạc là phần hậu truyện của Aquaman năm 2018 khi Arthur lên ngôi vua của Atlantis.  Giờ đây, Arthur Curry ngày nào đã trở thành ông bố bỉm sữa ngày ngày chăm con kiêm cai quản cả vùng Atlantis rộng lớn. Thế nhưng, kẻ thù cũ đời nào để cho nhà vua biển cả yên ổn. Nhờ sự trợ giúp của công nghệ, Black Manta lần nữa trỗi dậy với sức mạnh kinh khủng hơn xưa. Không thể chiến đấu một mình, Arthur đành phải nhờ sự trợ giúp của một kẻ thù khác - đứa em cùng mẹ khác cha Orm. Cùng chống lại kẻ thù chung, liệu cặp anh em chẳng đội chung trời này có thể hàn gắn tình cảm?",
  //     },
  //     {
  //       idVideo: '5yreWvGqbyg',
  //       image: require('./Image/movie_nmt.jpg'),
  //       title: 'Người Mặt Trời',
  //       description: "400 năm qua, loài Ma Cà Rồng đã bí mật sống giữa loài người trong hòa bình, nhưng hiểm họa bỗng ập đến khi một cô gái loài người phát hiện được thân phận của hai anh em Ma Cà Rồng. Người anh khát máu quyết săn lùng cô để bảo vệ bí mật giống loài, trong khi người còn lại chạy đua với thời gian để bảo vệ cô bằng mọi giá.",
  //     },
      
  //   ]

  //   setImageList2(data2);
  // }, [])

  const viewItem = ({item, index}) => {
    // console.log(index);
    return(
      <View style={{width: screenWidth/2, justifyContent: 'flex-start', alignItems:'center', 
        marginBottom: '2%'}}>
        <TouchableOpacity onPress={() => {navigation.navigate('Movies', {item})}} style={{width: '88%', height: 270, borderRadius: 5,}}>
          <Image style={styles.image1} source={{uri: item.posterUrl || "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/694px-Unknown_person.jpg"}}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {navigation.navigate('Movies', {item})}} style={{width: '88%', marginTop: '2%', alignItems: 'flex-start',}}> 
          <Text style={styles.textImage}>{item.title}</Text>
        </TouchableOpacity>
      </View>
      
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto"/>
      <ScrollView style={{flex: 1,}} showsVerticalScrollIndicator={false}>
        <View style={{width: '100%', height: 270,}}>
          <ScrollView
            // ref={stepScroll} // ref
            horizontal
            pagingEnabled
            onScroll={handleScroll}
            scrollEventThrottle={16}
            showsHorizontalScrollIndicator={false}
          >
            {imageList.map((item, index) => (
              <View key={index} style={{ width: screenWidth, height: '98%', alignItems: 'center', justifyContent: 'center',
                marginTop: 5}}>
                <Image source={item.image} style={styles.image}/>
              </View>
            ))}  
          </ScrollView>

          <View style={{ width: screenWidth, marginTop: '2%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            {renderDots(imageList, currentIndex)}
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
        
        <View style={{marginBottom: '0%'}}>
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

        <View style={{width: '100%', height: 260, alignItems: 'center', marginTop: '1%', borderTopWidth: 1, borderColor: '#F8AC6E'}}>
          <FlatList
            // ref={stepScroll} // ref
            data={listDiscount}
            horizontal
            // pagingEnabled={true}
            // onScroll={handleScroll1}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => {
              return(
                <TouchableOpacity style={{width: 250, height: 200, marginRight: 20, 
                  marginLeft: index===0 ? 20 : 0,}}>
                  <Image source={item.image} style={{resizeMode: 'stretch', width: '100%', height: '90%', borderRadius: 8, marginTop: '6%'}}/>
                  <Text style={{fontSize: 15, fontWeight: '600', marginTop: '2%', width: '100%', height: '10%',}}>Thứ 3 vui vẻ</Text>
                </TouchableOpacity>
            )}}
            // scrollEventThrottle={16}
            showsHorizontalScrollIndicator={false}
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
    width: '85%',
    height: '92%',
    borderRadius: 5,
    resizeMode: 'stretch',
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
