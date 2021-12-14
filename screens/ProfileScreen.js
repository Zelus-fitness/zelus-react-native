import React, {useContext, useState} from 'react';

import {
  Avatar,
  WelcomeImage,
  PageTitle,
  SubTitle,
  StyledFormArea,
  StyledButton,
  InnerContainer,
  WelcomeContainer,
  ButtonText,
  Line
} from '../components/styles';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { CredentialsContext } from '../context/CredentialsContext';

import * as SecureStore from 'expo-secure-store';

const ProfileScreen = ({navigation}) => {
  // const { token } = route.params;
  // const { first_name, email_address } = storedCredentials;

  const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);
  const [storedToken, setStoredToken] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")

  const getProfile = (token) => {
    const url = 'https://zelus-fitness.herokuapp.com/profile'

    return fetch(url, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: "JWT " + token
        },
    })
        .then((response) => response.json())
        .then((responseData) => {
            const { first_name, last_name, email_address } = responseData;

            if (success != true) {
                console.log(message)
                console.log(responseData)
            } else {
                setFirstName(first_name)
                setLastName(lastName)
                setEmail(email_address)
            }
        })
        .catch((error) => {
            console.error(error);
        });
}

  async function getToken(key) {
    let result = await SecureStore.getItemAsync(key);
    if (result) {
      setStoredToken(result)
    } else {
      console.log('No values stored under that key.');
    }
  }

  const clearLogin = () => {
    AsyncStorage
      .removeItem('acredentials')
      .then(() => {
        setStoredCredentials('');
        setStoredToken('')
      })
      .catch(error => console.error(error))
  }

  getToken('secure_token')
  // getProfile(storedToken)


  return (
      <InnerContainer>
        {/* <WelcomeImage resizeMode="cover" source={require('./../assets/img/expo-bg2.png')} /> */}
        <WelcomeContainer>
          <PageTitle welcome={true}>Welcome!</PageTitle>
          <SubTitle welcome={true}>{'Vin Diesel'}</SubTitle>
          <SubTitle welcome={true}>{'vindiesel@gmail.com'}</SubTitle>

          <StyledFormArea>
            <Avatar resizeMode="cover" source={require('./../assets/img/expo-bg1.png')} />

            <Line />
            <StyledButton 
              onPress={clearLogin}>
              <ButtonText>Logout</ButtonText>
            </StyledButton>
          </StyledFormArea>
        </WelcomeContainer>
      </InnerContainer>
  );
};

export default ProfileScreen;
