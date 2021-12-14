import React, { useState } from "react";

import { 
    StyleSheet, 
    Text, 
    View,
    Button,
    FlatList
} from "react-native";

import { Colors } from "./styles";

import SetCard from "./SetCard";

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

    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
});

const SetContainer = ({ handleAddSet, exercise, exercisesStore} ) => {

    // const handleOnChange = (text, valueFor) => {
    //     if(valueFor === 'setWeight') setSetWeight(text);
    //     if(valueFor === 'setReps') setSetReps(text);
    // }

    console.log(exercise)

    return (
        <View style = {styles.card}>
            <View style = {styles.cardContent}> 
                <View style = {styles.row} >
                    <Text>{"Set"}</Text>
                    <Text>{"Weight"}</Text>
                    <Text>{"Reps"}</Text>
                </View>
            </View>
            {/* <FlatList
                data={exercise.exerciseDetails}
                renderItem={({item}) => 
                    <SetCard
                        set={item.set} 
                        weight={item.weight}
                        reps={item.reps}
                    // handleOnChange = {handleOnChange}
                    />  
                }
                extraData={exercisesStore}
                keyExtractor={(item) => item.set}
            /> */}
            {exercise.exerciseDetails.map((item, key) => {
                return (
                    <SetCard
                        set={item.set} 
                        weight={item.weight}
                        reps={item.reps}
                    // handleOnChange = {handleOnChange}
                    />
                )
            })}
            <Button 
                title="Add Set"
                color = {Colors.brand}
                onPress={() => handleAddSet(exercise.exerciseID)}
            />
        </View>
    );
};

export default SetContainer;