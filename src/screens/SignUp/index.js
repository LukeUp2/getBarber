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
import { useNavigation } from '@react-navigation/native'
import Api from '../../Api'
import AsyncStorage from  '@react-native-async-storage/async-storage'


import SignInput from  '../../components/SignInput'

import EmailIcon from '../../assets/email.svg'
import BarberLogo from '../../assets/barber.svg'
import LockIcon from '../../assets/lock.svg'
import PersonIcon from '../../assets/person.svg'

const SignIn = () => {

  const { dispatch: userDispatch } = useContext(UserContext)
  const navigation = useNavigation()

  const [nameField, setNameField] = useState('')
  const [emailField, setEmailField] = useState('')
  const [passwordField, setPasswordField] = useState('')


  const handleMessageButtonClick = () => {
    navigation.reset({
      routes: [{name: 'SignIn'}]
    })
    return;
  }

  const handleSignInClick = async () => {
    if(nameField && emailField && passwordField){
      let json = await Api.signUp(nameField, emailField, passwordField)
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
        alert('Erro: ', res.error)
      }

    } else {
      alert('Preencha os campos')
    }
  }

  return (
    <Container>
      <BarberLogo width="100%" height="160"/>

      <InputArea>
        <SignInput 
            IconSvg={PersonIcon}
            placeholder="Digite seu nome"
            value={nameField}
            onChangeText={text => setNameField(text)}
          />
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
          <CustomButtonText>CADASTRAR</CustomButtonText>
        </CustomButtom>
      </InputArea>

      <SignMessageButton onPress={handleMessageButtonClick}>
        <SignMessageButtonText>Já possui uma conta?</SignMessageButtonText>
        <SignMessageButtonTextBold>Faça login</SignMessageButtonTextBold>
      </SignMessageButton>
    </Container>
  )
}

export default SignIn