import React, { useState, useEffect } from 'react';
import { View, Text, Modal, Image, TouchableOpacity} from 'react-native';
import moment from 'moment';

const SeatTimer = ({ seatTimeoutInSeconds, navigation }) => {
  const [timeLeft, setTimeLeft] = useState(seatTimeoutInSeconds);
  const [alertTimer, setAlertTimer] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTimeLeft) => {
        if (prevTimeLeft === 0) {
          clearInterval(timer);
          setAlertTimer(true);
          return 0;
        }
        return prevTimeLeft - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formattedTime = moment.utc(timeLeft * 1000).format('mm:ss');

  return (
    <>
      <View style={{width: '100%', height: '3%', backgroundColor: '#999900', alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
        <Text style={{color: 'white', fontSize: 12}}>Thời gian giữ ghế: </Text>
        <Text style={{color: 'white', fontWeight: '600', fontSize: 12}}>{formattedTime}</Text>
      </View>
      <Modal transparent visible={alertTimer} animationType="slide">
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.6)', }}>
          <View style={{ backgroundColor: 'white', borderRadius: 2, alignItems: 'center', width: '80%', height: '22%', justifyContent: 'space-between' }}>
            <View style={{ width: '100%', height: '78%', alignItems: 'center', justifyContent: 'space-between',}}>
              <View style={{ width: '85%', height: '40%', alignItems: 'center', justifyContent: 'flex-end',}}>
                <Image style={{width: '10%', height: '70%', resizeMode: 'contain',}} 
                source={require('../Views/Image/icon_timer.png')}/>
              </View>
              <View style={{ width: '85%', height: '20%', alignItems: 'center', justifyContent: 'flex-start' }}>
                <Text style={{ fontWeight: '600', textAlign: 'center', fontSize: 17 }}>Thông tin</Text>
              </View>
              <View style={{ width: '88%', height: '40%', }}>
                <Text style={{ textAlign: 'center', fontSize: 15 }}>Đơn hàng của bạn hết hạn thực hiện giao dịch. Vui lòng thực hiện giao dịch mới!</Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', width: '100%', height: '22%', }}>
              <TouchableOpacity style={{ width: '100%', height: '100%', backgroundColor: '#EEEEEE', justifyContent: 'center', alignItems: 'center' }}
                onPress={() => {
                  navigation.popToTop();
                }}>
                <Text style={{ fontWeight: '500', fontSize: 16, color: 'black' }}>Đóng</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default SeatTimer;