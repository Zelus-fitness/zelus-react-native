import React, {useContext} from 'react';

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

const ProfileScreen = ({navigation}) => {
  // const { token } = route.params;
  // const { first_name, email_address } = storedCredentials;

  const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);

  const clearLogin = () => {
    AsyncStorage
      .removeItem('acredentials')
      .then(() => {
        setStoredCredentials('');
      })
      .catch(error => console.error(error))
  }

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
