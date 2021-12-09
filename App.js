import React, {useState} from 'react';
import RootStack from './navigators/RootStack';
import AppLoading from 'expo-app-loading';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CredentialsContext } from './context/CredentialsContext';
// import Workout from './screens/Workout';

export default function App() {
  const [isSigned, setIsSigned] = useState(false);
  const [storedCredentials, setStoredCredentials] = useState("");

  const checkLoginCredentials = () => {
    AsyncStorage
      .getItem('acredentials')
      .then((result) => {
        if(result != null) {
          setStoredCredentials(result);
        } else {
          setStoredCredentials(null);
        }
      }) 
      .catch(error => console.log(error))
  }


  if (!isSigned) {
    return (
    <AppLoading 
      startAsync={checkLoginCredentials}
      onFinish={() => setIsSigned(true)}
      onError={console.warn}
    />)
  }

  return (
    <CredentialsContext.Provider value = {{storedCredentials, setStoredCredentials}}>
      <RootStack />
    </CredentialsContext.Provider>
    // <Workout />
  );
}

