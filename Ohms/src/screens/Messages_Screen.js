import {
  Alert,
  DeviceEventEmitter,
  FlatList,
  PermissionsAndroid,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../component/Header';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const Messages_Screen = () => {
  const [receiveSmsPermission, setReceiveSmsPermission] = useState('');
  const [smsMessages, setSmsMessages] = useState([]);
  const [sendNum, setSendNum] = useState([]);

  const storeSmsMessage = async message => {
    try {
      const newMessages = [message, ...smsMessages];
      await AsyncStorage.setItem('smsMessages', JSON.stringify(newMessages));
      console.log('first newMessages', newMessages);
      setSmsMessages(newMessages);
    } catch (error) {
      console.error('Error storing SMS message in AsyncStorage:', error);
    }
  };

 const retrieveSmsMessagesFromAsyncStorage = async () => {
    try {
      const storedMessages = await AsyncStorage.getItem('smsMessages');
      if (storedMessages) {
        return JSON.parse(storedMessages);
      }
      return [];
    } catch (error) {
      console.error('Error retrieving SMS messages from AsyncStorage:', error);
      return [];
    }
  };

  const requestSmsPermission = async () => {
    try {
      const permission = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECEIVE_SMS,
      );
      setReceiveSmsPermission(permission);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    requestSmsPermission();
    _apiCall(); // Call API on component mount

    const refreshInterval = setInterval(() => {
      _apiCall(); // Call API every 5 seconds
    }, 5000);

    // Cleanup interval when the component unmounts
    return () => {
      clearInterval(refreshInterval);
    };
  }, []);

   useEffect(() => {
    // getStoredSmsMessages();

    if (receiveSmsPermission === PermissionsAndroid.RESULTS.GRANTED) {
      let subscriber = DeviceEventEmitter.addListener(
        'onSMSReceived',
        (message) => {
          const { messageBody, senderPhoneNumber } = JSON.parse(message);
          console.log('Received SMS:', messageBody, senderPhoneNumber);

          const newMessage = { messageBody, senderPhoneNumber };
          storeSmsMessage(newMessage);
          setSendNum(senderPhoneNumber);

          // Retrieve the stored messages from AsyncStorage
          retrieveSmsMessagesFromAsyncStorage().then((messages) => {
            // Add the new message to the list
            const updatedMessages = [newMessage, ...messages];
            setSmsMessages(updatedMessages);

            // Store the updated list back in AsyncStorage
            storeSmsMessagesInAsyncStorage(updatedMessages);
          });
        },
      );

      return () => {
        subscriber.remove();
      };
    }
  }, [receiveSmsPermission]);
  console.log('send', sendNum)

  const _apiCall = () => {
    const url = "https://global-api.ohmsmobile.com/api/Message/otp-message"
    const Payload = {
      Id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      Sender: sendNum.toString() ,
      Body: "string",
      Message: "string",
      ReceiveTimeStamp: 0,
      ReceiveTime: "2023-10-23T03:54:41.072Z",
      Provider: "string",
      MessageType: "string",
      IsActive:true
    }
    console.log('first', Payload)
    axios.post(url, Payload).then((res) => {
      console.log('response', res?.data)
    }).catch((err) => {
      console.log('first', err?.response?.data)
    })
  }

  const _renderItem = ({item}) => {
    return(
      <>
    <View style={{flexDirection: 'row', width: '95%', padding: 5}}>
        <MaterialIcons name="account-circle" color="#8d9496" size={30} />
        <View style={{padding: 5}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                fontSize: 15,
                color: '#000',
                fontWeight: '600',
                width: '60%'
              }}>
              {item?.senderPhoneNumber}
            </Text>
            <Text style={{fontSize: 14, color: '#8d9496', fontWeight: '300'}}>
              18/8/2023 22:20Pm
            </Text>
          </View>
          {/* ================ */}
          <View style={{marginTop: 5, alignSelf: 'flex-start', justifyContent: 'flex-start', alignItems: 'center'}}>
            <Text
              style={{
                fontSize: 12,
                color: '#8d9496',
                fontWeight: '500',
                alignItems: 'center',
                alignSelf: 'center',
                justifyContent: 'center',
                textAlign: 'justify',
              }}>
              {item?.messageBody}
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{
          borderBottomWidth: 0.2,
          borderColor: '#000',
          width: '95%',
          alignItems: 'center',
          alignSelf: 'center',
        }}></View>
        </>
    )
  }

  return (
    <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
      <StatusBar animated barStyle="dark-content" backgroundColor="#0ab5f7" />
      <View>
        <Header title="Ohms Services" />
      </View>
      {/* ======================= */}
      <FlatList 
      data ={smsMessages}
      renderItem={(item) => _renderItem(item)}
      keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};

export default Messages_Screen;

const styles = StyleSheet.create({});
