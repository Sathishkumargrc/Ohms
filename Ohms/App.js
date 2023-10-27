import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import Messages_Screen from './src/screens/Messages_Screen'
import Initial_screen from './src/screens/Initial_screen'

const App = () => {
  const stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <stack.Navigator screenOptions={{
        header: () => null
      }} initialRouteName='Initial_Screen'>
        <stack.Screen name='Initial_Screen' component={Initial_screen} />
        <stack.Screen name='Messages_Screen' component={Messages_Screen} />
      </stack.Navigator>
    </NavigationContainer>
  )
}

export default App;