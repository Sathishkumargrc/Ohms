import { StyleSheet, Text, View, SafeAreaView, } from 'react-native'
import React, {useEffect} from 'react'
import { useNavigation } from '@react-navigation/native'

const Initial_screen = () => {
  const navigation = useNavigation(); 

  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Messages_Screen');
    }, 2000);
  }, [])
  
  return (
    <SafeAreaView style = {{backgroundColor: '#000', flex: 1, justifyContent: 'center'}}>
      <View style = {{alignItems: 'center', alignSelf: 'center', justifyContent: 'center'}}>
          <Text style = {{color: '#fff', fontSize: 16}}>
            Welcome to the app!
          </Text>
      </View>
    </SafeAreaView>
  )
}

export default Initial_screen

const styles = StyleSheet.create({})