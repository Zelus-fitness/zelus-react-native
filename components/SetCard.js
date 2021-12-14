import React, { useState } from "react";

import { 
    StyleSheet, 
    Text, 
    View,
    Button
} from "react-native";
import { TextInput } from "react-native-gesture-handler";

import { Colors } from "./styles";

const styles = StyleSheet.create ({
    card: {
        borderRadius: 3,
        backgroundColor: '#fff',
        flexDirection: "column",
        paddingTop: 5,
    },
    cardContent: {

    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
});

const SetCard = ({item, handleChangeWeightValue, exerciseID, handleChangeRepsValue}) => {
    const {set, weight, reps} = item;

    return (
        <View style = {styles.card}>
            <View style = {styles.cardContent}> 
                <View style = {styles.row} >
                    <Text>{set}</Text>
                    <TextInput 
                        keyboardType="number-pad"
                        value={weight.toString()} 
                        onChangeText={(text) => handleChangeWeightValue(set, exerciseID, text)}
                        // backgroundColor='grey'
                    />
                    <TextInput 
                        keyboardType="number-pad"
                        value={reps.toString()} 
                        onChangeText={(text) => handleChangeRepsValue(set, exerciseID, text)}
                        // backgroundColor='grey'
                    />
                </View>
            </View>
        </View>
    );
};

export default SetCard;