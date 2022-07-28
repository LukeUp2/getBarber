import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

const { Navigator, Screen } = createStackNavigator();

import Preload from '../screens/Preload'
import SignIn from '../screens/SignIn'
import SignUp from '../screens/SignUp'
import MainTab from './MainTab'

const MainStack = () => {
  return (
    <Navigator
      initialRouteName="Preload"
      screenOptions={{
        headerShown: false
      }}
    >
      <Screen name="Preload" component={Preload}/>
      <Screen name="SignIn" component={SignIn}/>
      <Screen name="SignUp" component={SignUp}/>
      <Screen name="MainTab" component={MainTab}/>
    </Navigator>
  )
}

export default MainStack;