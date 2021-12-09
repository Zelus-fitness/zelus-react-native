import React, { useState } from "react";

import { 
    StyleSheet, 
    Text, 
    View,
    Button
} from "react-native";

import { Colors } from "./styles";

const styles = StyleSheet.create ({
    card: {
        borderRadius: 3,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2},
        shadowOpacity: 0.3,
        shadowRadius: 3,
        flexDirection: "column"
    },
    cardContent: {

    }
});

const SetCard = ({set}) => {
    // const [exerciseSets, setExerciseSets] = useState([])
    const {exerciseName} = exercise;

    return (
        <View style = {styles.card}>
            <View style = {styles.cardContent}> 
                <Text>{exerciseName}</Text>
            </View>
            {/* <View style = {styles.cardContent}>
                <Text>{exercise.exerciseType}</Text>
            </View> */}
            {/* <FlatList
                data={exerciseSets}
                renderItem={({item}) => <SetCard
                    exercise={item}   
                />}
            /> */}
        </View>
    );
};

export default SetCard;