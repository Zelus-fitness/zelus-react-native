import React, {useState, useContext} from "react";
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CredentialsContext } from "../context/CredentialsContext";
import * as SecureStore from 'expo-secure-store';

//formik
import { Form, Formik } from "formik";

//icons
import {Octicons, Ionicons, Fontisto} from '@expo/vector-icons';

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

import { View, ActivityIndicator } from "react-native";

//colors
const {brand, darkLight, primary} = Colors;

// keyboard avoiding wrapper
import KeyboardAvoidingWrapper from "../components/KeyboardAvoidingWrapper";

// API client
// import fetch from "node-fetch";

const Login = ({navigation}) => {
    const [hidePassword, setHidePassword] = useState(true);
    const[message, setMessage] = useState();
    const [messageType, setMessageType] = useState();

    const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);

    const handleLogin = (credentials, setSubmitting) => {
        handleMessage(null);
        const url = 'https://zelus-fitness.herokuapp.com/signin'

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
                const { success, message, token } = responseData;

                if (success != true) {
                    handleMessage(message)
                    console.log(responseData)
                } else {
                    persistLogin(credentials, message);
                    saveToken('secure_token', token);
                }
                setSubmitting(false);
            })
            .catch((error) => {
                console.error(error);
                setSubmitting(false);
                handleMessage("An error has occurred. Please try again");
            });
    }


    const handleMessage = (message, type = 'FAILED') => {
        setMessage(message);
        setMessageType(type);
    }

    async function saveToken(key, token) {
        await SecureStore.setItemAsync(key, token);
    } 

    const persistLogin = (credentials, message) => {
        AsyncStorage.setItem('acredentials', JSON.stringify({credentials}))
        .then (() => {
            handleMessage(message);
            setStoredCredentials({credentials})
        })
        .catch((error) => {
            console.error(error);
            handleMessage('Persisting Login Failed')
        })
    }

    return (
        <KeyboardAvoidingWrapper>
            <StyledContainer>
            <StatusBar style="dark" />
            <InnerContainer>
                <PageLogo resizeMode="cover" source={require('./../assets/img/expo-bg1.png')} />
                <PageTitle>Zelus</PageTitle>
                <SubTitle>Account Login</SubTitle>

                <Formik
                    initialValues={{email_address: '', password: ''}}
                    onSubmit={(values, {setSubmitting}) => {
                        if (values.email == '' || values.password == '') {
                            handleMessage('Please fill in all fields');
                            setSubmitting(false);
                        } else {
                            handleLogin(values, setSubmitting);
                        }
                    }}
                >
                    {({handleChange, handleBlur, handleSubmit, values, isSubmitting}) => (<StyledFormArea>
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
                        <MsgBox type={messageType}>{message}</MsgBox>
                        {!isSubmitting && <StyledButton onPress={handleSubmit}>
                            <ButtonText>
                                Sign In
                            </ButtonText>
                        </StyledButton>}

                        {isSubmitting && <StyledButton disabled={true}>
                            <ActivityIndicator size="large" color={primary} />
                        </StyledButton>}
                        <Line/>
                        <StyledButton google={true}  onPress={handleSubmit}>
                            <Fontisto name="google" color={primary} size={25} />
                            <ButtonText google={true}>
                                Sign in with Google
                            </ButtonText>
                        </StyledButton>
                        <ExtraView>
                            <ExtraText>Don't have an account already? </ExtraText>
                            <TextLink onPress={() => navigation.navigate("Signup")}>
                                <TextLinkConent>Signup!</TextLinkConent>
                            </TextLink>
                        </ExtraView>
                    </StyledFormArea>)}
                </Formik>
            </InnerContainer>
            </StyledContainer>
        </KeyboardAvoidingWrapper>
    );
};

const MyTextInput = ({label, icon, isPassword, hidePassword, setHidePassword, ...props}) => {
    return (
        <View>
            <LeftIcon>
                <Octicons name={icon} size={30} color={brand} />
            </LeftIcon>
            <StyledInputLabel>{label}</StyledInputLabel>
            <StyledTextInput {...props} />
            {isPassword && (
                <RightIcon onPress={() => setHidePassword(!hidePassword)}>
                    <Ionicons name={hidePassword ? 'md-eye-off' : 'md-eye'} size={30} color={darkLight} />
                </RightIcon>
            )}
        </View>
    );
};

export default Login;