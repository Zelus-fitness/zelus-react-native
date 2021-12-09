import React, {useState, useContext} from "react";
import { StatusBar } from 'expo-status-bar';

//formik
import { Form, Formik } from "formik";

//icons
import {Octicons, Ionicons, Fontisto} from '@expo/vector-icons';

import AsyncStorage from "@react-native-async-storage/async-storage";
import { CredentialsContext } from "../context/CredentialsContext";
 
import { 
    StyledContainer,
    InnerContainer,
    PageLogo,
    PageTitle,
    SubTitle,
    StyledFormArea,
    LeftIcon,
    StyledInputLabel,
    StyledTextInput, 
    RightIcon,
    Colors,
    StyledButton,
    Line,
    ButtonText,
    MsgBox,
    ExtraView,
    ExtraText,
    TextLink,
    TextLinkConent
} from '../components/styles'

import { View, TouchableOpacity, ActivityIndicator } from "react-native";

//colors
const {brand, darkLight, primary} = Colors;

// keyboard avoiding wrapper
import KeyboardAvoidingWrapper from "../components/KeyboardAvoidingWrapper";

//Datetimepicker
import DateTimePickerModal from "react-native-modal-datetime-picker";

const Signup = ({navigation}) => {
    const [hidePassword, setHidePassword] = useState(true);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [date, setDate] = useState(new Date(2000, 0, 1));

    const[message, setMessage] = useState();
    const [messageType, setMessageType] = useState();

    const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);

    // Actual date of birth to be set
    const [dob, setDob] = useState();

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
      };
    
    const handleConfirm = (selectedDate) => {
        console.warn("A date has been picked: ", date);
        const currentDate = selectedDate || date;
        hideDatePicker();
        setDate(currentDate);
        setDob(currentDate);
      };

    const showDatePicker = () => {
        setDatePickerVisibility(true);
      };
  
      const handleSignup = (credentials, setSubmitting) => {
          handleMessage(null);
          const url = 'https://zelus-fitness.herokuapp.com/signup'
  
          return fetch(url, {
              method: 'POST',
              headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(credentials)
          })
              .then((response) => response.json())
              .then((responseData) => {
                  const { id, message, success } = responseData;
  
                  if (success != true) {
                    handleMessage(message)
                } else {
                    persistLogin(credentials, message);
                    console.log(responseData);
                }
                  setSubmitting(false);
              })
              .catch((error) => {
                  console.error(error);
                  setSubmitting(false);
                  handleMessage("An error has occurred. Please try again");
              });
      }

      const persistLogin = (credentials, message) => {
        AsyncStorage.setItem('acredentials', JSON.stringify(credentials))
        .then (() => {
            handleMessage(message);
            setStoredCredentials(credentials)
        })
        .catch((error) => {
            console.error(error);
            handleMessage('Persisting Login Failed')
        })
    }
  
  
      const handleMessage = (message, type = 'FAILED') => {
          setMessage(message);
          setMessageType(type);
      }

      


    return (
        <KeyboardAvoidingWrapper>
        <StyledContainer>
            <StatusBar style="dark" />
            <InnerContainer>
                <PageTitle>Zelus</PageTitle>
                <SubTitle>Account Signup</SubTitle>

                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date" 
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                    headerTextIOS="Pick a date"
                />

                <Formik
                    // initialValues={{fullname: '', email: '', dateOfBirth: '', password: '', confirmPassword: ''}}
                    initialValues={{first_name: '', last_name: '', email_address: '', password: ''}}
                    onSubmit={(values, { setSubmitting }) => {
                        if (values.first_name == '' || values.last_name == '' || values.email_address == '' || values.password == '') {
                            handleMessage('Please fill in all fields');
                            setSubmitting(false);
                        } else {
                            handleSignup(values, setSubmitting);
                        }
                    }}
                >
                    {({handleChange, handleBlur, handleSubmit, values, isSubmitting}) => (<StyledFormArea>
                        <MyTextInput 
                            label="First Name"
                            icon = "person"
                            placeholder="Vin"
                            placeholderTextColor={darkLight}
                            onChangeText={handleChange('first_name')}
                            onBlur={handleBlur('first_name')}
                            value={values.first_name}
                            keyboardType="default"
                        />
                        <MyTextInput 
                            label="Last Name"
                            icon = "person"
                            placeholder="Diesel"
                            placeholderTextColor={darkLight}
                            onChangeText={handleChange('last_name')}
                            onBlur={handleBlur('last_name')}
                            value={values.last_name}
                            keyboardType="default"
                        />
                        <MyTextInput 
                            label="Email Address"
                            icon = "mail"
                            placeholder="vindiesel@gmail.com"
                            placeholderTextColor={darkLight}
                            onChangeText={handleChange('email_address')}
                            onBlur={handleBlur('email_address')}
                            value={values.email_address}
                            keyboardType="email-address"
                        />
                        {/* <MyTextInput 
                            label="Date of Birth"
                            icon = "calendar"
                            placeholder="MM/DD/YYYY"
                            placeholderTextColor={darkLight}
                            onChangeText={handleChange('dateOfBirth')}
                            onBlur={handleBlur('dateOfBirth')}
                            // value={dob ? dob.toDateString() : ''} 
                            isDate={true}
                            editable={false}
                            showDatePicker={showDatePicker}
                        /> */}
                        <MyTextInput 
                            label="Password"
                            icon = "lock"
                            placeholder="* * * * * * * *"
                            placeholderTextColor={darkLight}
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            value={values.password}
                            secureTextEntry={hidePassword}
                            isPassword={true}
                            hidePassword={hidePassword}
                            setHidePassword={setHidePassword}
                        />
                        {/* <MyTextInput 
                            label="Confirm Password"
                            icon = "lock"
                            placeholder="* * * * * * * *"
                            placeholderTextColor={darkLight}
                            onChangeText={handleChange('confirmPassword')}
                            onBlur={handleBlur('confirmPassword')}
                            value={values.confirmPassword}
                            secureTextEntry={hidePassword}
                            isPassword={true}
                            hidePassword={hidePassword}
                            setHidePassword={setHidePassword}
                        /> */}
                        <MsgBox type={messageType}>{message}</MsgBox>
                        {!isSubmitting && <StyledButton onPress={handleSubmit}>
                            <ButtonText>
                                Sign Up
                            </ButtonText>
                        </StyledButton>}

                        {isSubmitting && <StyledButton disabled={true}>
                            <ActivityIndicator size="large" color={primary} />
                        </StyledButton>}
                        <Line/>
                        <ExtraView>
                            <ExtraText>Already have an account? </ExtraText>
                            <TextLink onPress={() => navigation.navigate('Login')}>
                                <TextLinkConent>Login!</TextLinkConent>
                            </TextLink>
                        </ExtraView>
                    </StyledFormArea>)}

                </Formik>
            </InnerContainer>
        </StyledContainer>
        </KeyboardAvoidingWrapper>
    );
};

const MyTextInput = ({label, icon, isPassword, hidePassword, setHidePassword, isDate, showDatePicker, hideDatePicker, handleConfirm, ...props}) => {
    return (
        <View>
            <LeftIcon>
                <Octicons name={icon} size={30} color={brand} />
            </LeftIcon>
            <StyledInputLabel>{label}</StyledInputLabel>

            {!isDate && <StyledTextInput {...props} />}
            {isDate && (
                <TouchableOpacity onPress={showDatePicker}>
                    <StyledTextInput {...props} />
                </TouchableOpacity>
            )}
            
            {isPassword && (
                <RightIcon onPress={() => setHidePassword(!hidePassword)}>
                    <Ionicons name={hidePassword ? 'md-eye-off' : 'md-eye'} size={30} color={darkLight} />
                </RightIcon>
            )}
        </View>
    );
};

export default Signup;