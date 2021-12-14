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
        paddingTop: 5,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
});

const ExerciseCard = ({exercise, handleAddSet, handleChangeRepsValue, handleChangeWeightValue, isPreview}) => {
    // const [exerciseSets, setExerciseSets] = useState([])

    let actionButton;

    if (!isPreview) {
        actionButton = 
        <Button 
            title="Add Set"
            color = {Colors.brand}
            onPress={() => handleAddSet(exercise.exerciseID)}
        />
    }

    return (
        <View style = {styles.card}>
            <View style = {styles.cardContent}> 
                <Text>{exercise.exerciseName}</Text>
            </View>
            <View style = {styles.cardContent}> 
                <View style = {styles.row} >
                    <Text>{"Set"}</Text>
                    <Text>{"Weight"}</Text>
                    <Text>{"Reps"}</Text>
                </View>
            </View>

            <FlatList
                data={exercise.exerciseDetails}
                renderItem={({item}) => 
                    <SetCard
                        item={item}
                        exerciseID = {exercise.exerciseID}
                        handleChangeRepsValue = {handleChangeRepsValue}
                        handleChangeWeightValue = {handleChangeWeightValue}
                    // handleOnChange = {handleOnChange}
                    />  
                }
                keyExtractor={(item, index) => index.toString()}
                // keyExtractor={(item) => item.set}
            />

            {/* {exercise.exerciseDetails.map((item, key) => {
                return (
                    <SetCard
                        set={item.set} 
                        weight={item.weight}
                        reps={item.reps}
                    // handleOnChange = {handleOnChange}
                    />
                )
            })} */}

            {actionButton}
        </View>
    );
};

export default ExerciseCard;