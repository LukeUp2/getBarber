import React, { useState, useContext } from 'react'
import { UserContext } from '../../contexts/UserContext'
import {
  Container,
  InputArea,
  CustomButtom,
  CustomButtonText,
  SignMessageButton,
  SignMessageButtonText,
  SignMessageButtonTextBold
} from './styles'
import AsyncStorage from  '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import Api from '../../Api'

import SignInput from  '../../components/SignInput'

import EmailIcon from '../../assets/email.svg'
import BarberLogo from '../../assets/barber.svg'
import LockIcon from '../../assets/lock.svg'

const SignIn = () => {

  const { dispatch: userDispatch } = useContext(UserContext)
  const navigation = useNavigation()
  

  const [emailField, setEmailField] = useState('')
  const [passwordField, setPasswordField] = useState('')


  const handleMessageButtonClick = () => {
    navigation.reset({
      routes: [{name: 'SignUp'}]
    })
    return;
  }

  const handleSignInClick = async () => {
    if(emailField && passwordField){
      let json = await Api.signIn(emailField, passwordField);
      if(json.token){
        await AsyncStorage.setItem('token', json.token)

        userDispatch({
          type: 'setAvatar',
          payload: { 
            avatar: json.data.avatar
          }
        })

        navigation.reset({
          routes: [{ name: 'MainTab' }]
        })
      } else {
        alert('E-mail ou senha errados!')
      }

    } else {
      alert('Preencha os campos')
    }
    return; 
  }

  return (
    <Container>
      <BarberLogo width="100%" height="160"/>

      <InputArea>
        <SignInput 
          IconSvg={EmailIcon}
          placeholder="Digite seu email"
          value={emailField}
          onChangeText={text => setEmailField(text)}
        />
        <SignInput 
          IconSvg={LockIcon}
          placeholder="Digite sua senha"
          value={passwordField}
          onChangeText={text => setPasswordField(text)}
          password={true}
        />

        <CustomButtom onPress={handleSignInClick}>
          <CustomButtonText>LOGIN</CustomButtonText>
        </CustomButtom>
      </InputArea>

      <SignMessageButton onPress={handleMessageButtonClick}>
        <SignMessageButtonText>Ainda não possui uma conta?</SignMessageButtonText>
        <SignMessageButtonTextBold>Cadastre-se</SignMessageButtonTextBold>
      </SignMessageButton>
    </Container>
  )
}

export default SignIn