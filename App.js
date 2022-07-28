import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { StatusBar } from 'react-native'

import UserContextProvider from './src/contexts/UserContext'
import MainStack from './src/stacks/MainStack'

const App = () => {
  return (
    <UserContextProvider>
      <NavigationContainer>
        <StatusBar />
        <MainStack />
      </NavigationContainer>
    </UserContextProvider>
  )
}

export default App