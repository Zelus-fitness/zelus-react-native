import React from "react";

// Colors
import { Colors } from '../components/styles';
const {primary} = Colors;

// keyboard avoiding view
import { KeyboardAvoidingView, ScrollView, TouchableWithoutFeedback, Keyboard } from "react-native";

const KeyboardAvoidingWrapper = ({children}) => {
    return (
        <KeyboardAvoidingView behavior={Platform.OS == 'ios' ? 'padding' : 'height'} style={{ backgroundColor: primary, flex: 1 }}>
            <ScrollView>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    {children}
                </TouchableWithoutFeedback>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

export default KeyboardAvoidingWrapper;