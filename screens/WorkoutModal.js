import React, {useState} from "react";
import { View, StyleSheet, Modal, Text, ScrollView, Button } from "react-native";
import { FlatList, TextInput, TouchableWithoutFeedback } from "react-native-gesture-handler";
import { Colors } from "../components/styles";
import ExerciseCard from "../components/ExerciseCard";
import ModalSelector from "react-native-modal-selector-searchable";

import { useWorkouts } from "../context/WorkoutsProvider";
import { useTemplates } from "../context/TemplatesProvider";

import AsyncStorage from "@react-native-async-storage/async-storage";

// keyboard avoiding wrapper
import KeyboardAvoidingWrapper from "../components/KeyboardAvoidingWrapper";

const {brand, darkLight, primary} = Colors;

const WorkoutModal = ({route, navigation}) => {  
    const { workout, template, isTemplate, fromTemplate, isEdit } = route.params;
    
    const [workoutName, setWorkoutName] = useState('') 
    const [workoutNotes, setWorkoutNotes] = useState('')
    const [exercisesStore, updateExercisesStore] = useState([]);

    const {workouts, setWorkouts } = useWorkouts()
    const {templates, setTemplates } = useTemplates()

    //Exercise list hard coded
    let index = 0;
    const exerciseSelectorData = [
        {key: index++, section: true, label: 'Arms'},
        {key: index++, label: 'Bench Dip'},
        {key: index++, label: 'Bicep Curl (Barbell) '},
        {key: index++, label: 'Bicep Curl (Cable) '},
        {key: index++, label: 'Bicep Curl (Dumbbell)'},
        {key: index++, label: 'Bicep Curl (Machine)'},
        {key: index++, label: 'Cable Kickback'},
        {key: index++, label: 'Concentration Curl (Dumbbell)'},
        {key: index++, section: true, label: 'Back'},
        {key: index++, label: 'Back Extension'},
        {key: index++, label: 'Back Extension (Machine)'},
        {key: index++, label: 'Bent Over One Arm Row (Dumbbell'},
        {key: index++, label: 'Bent Over Row (Band) '},
        {key: index++, label: 'Bent Over Row (Barbell)'},
        {key: index++, label: 'Bent Over Row (Barbell)'},
        {key: index++, label: 'Bent Over Row - Underhand (Barbell)'},
        {key: index++, label: 'Chin Up'},
        {key: index++, label: 'Chin Up (Assisted)'},
        {key: index++, label: 'Deadlift (Barbell)'},
        {key: index++, section: true, label: 'Cable'},
        {key: index++, label: 'Cable Crunch'},
        {key: index++, section: true, label: 'Cardio'},
        {key: index++, label: 'Battle Ropes'},
        {key: index++, label: 'Climbing '},
        {key: index++, section: true, label: 'Chest'},
        {key: index++, label: 'Around the World'},
        {key: index++, label: 'Bench Press (Barbell)'},
        {key: index++, label: 'Bench Press (Cable)'},
        {key: index++, label: 'Bench Press (Dumbbell)'},
        {key: index++, label: 'Bench Press (Smith Machine)'},
        {key: index++, label: 'Bench Press - Close Grip (Barbell)'},
        {key: index++, label: 'Bench Press - Wide Grip (Barbell)'},
        {key: index++, label: 'Cable Crossover'},
        {key: index++, label: 'Chest Dip '},
        {key: index++, label: 'Chest Dip (Assisted) '},
        {key: index++, label: 'Chest Fly'},
        {key: index++, label: 'Chest Fly (Band)'},
        {key: index++, label: 'ChestFly (Dumbbell)'},
        {key: index++, label: 'Chest Press (Band)'},
        {key: index++, label: 'Chest Press (Machine)'},
        {key: index++, label: 'Decline Bench Press (Barbell)'},
        {key: index++, label: 'Decline Bench Press (Dumbbell) '},
        {key: index++, label: 'Decline Bench Press (Smith Machine) '},
        {key: index++, label: 'Floor Press (Barbell)'},
        {key: index++, section: true, label: 'Core'},
        {key: index++, label: 'Ab Wheel'},
        {key: index++, label: 'Bicycle Crunch'},
        {key: index++, label: 'Cable Twist'},
        {key: index++, label: 'Cross Body Crunch'},
        {key: index++, label: 'Crunch'},
        {key: index++, label: 'Crunch (Machine)'},
        {key: index++, label: 'Crunch (Stablility Ball)'},
        {key: index++, label: 'Decline Crunch'},
        {key: index++, label: 'Flat Knee Raise'},
        {key: index++, label: 'Flat Leg Raise'},
        {key: index++, section: true, label: 'Full Body'},
        {key: index++, label: 'Ball Slams'},
        {key: index++, label: 'Burpee'},
        {key: index++, section: true, label: 'Legs'},
        {key: index++, label: 'Box Jump '},
        {key: index++, label: 'Box Squat (Barbell) '},
        {key: index++, label: 'Bulgarian Split Squat'},
        {key: index++, label: 'Cable Pull Through'},
        {key: index++, label: 'Calf Press on Leg Press'},
        {key: index++, label: 'Calf Press on Seated Leg Press'},
        {key: index++, label: 'Deadlift (Band)'},
        {key: index++, label: 'Deadlift (Dumbbell) '},
        {key: index++, label: 'Deadlift (Smith Machine)'},
        {key: index++, label: 'Deficit Deadlift (Barbell) '},
        {key: index++, section: true, label: 'Olympic'},
        {key: index++, label: 'Clean (Barbell)'},
        {key: index++, label: 'Clean and Jerk (Barbell)'},
        {key: index++, label: 'Deadlift High Pull (Barbell)'},
        {key: index++,section: true, label: 'Shoulders'},
        {key: index++, label: 'Arnold Press (Dumbbell)'},
        {key: index++, label: 'Face Pull (Cable)'},
        {key: index++, label: 'Face Pull (Cable)'},
    ]

    const handleOnChangeText = (text, valueFor) => {
        if(valueFor === 'workoutName') setWorkoutName(text);
        if(valueFor === 'workoutNotes') setWorkoutNotes(text);
    }

    const onSubmit = () => {
        if(fromTemplate == true) {
            handleOnSaveWorkout(template.templateName, template.templateNotes, template.exercisesStore)
            navigation.goBack();
        }
        else if (!workoutName.trim() && !workoutNotes.trim()) {
            console.log("Please fill in all fields");
        } 
        else {
            isTemplate ? handleOnSaveTemplate(workoutName, workoutNotes, exercisesStore) : handleOnSaveWorkout(workoutName, workoutNotes, exercisesStore)
            setWorkoutName('');
            setWorkoutNotes('');
            navigation.goBack();
        }
    }

    const closeModal = () => {
        setWorkoutName('');
        setWorkoutNotes('');
        navigation.goBack();
    }

    const handleUpdateExercisesStore = (exerciseName) => {
        const exercise = {exerciseName}
        const updatedExercises = [...exercisesStore, exercise]
        updateExercisesStore(updatedExercises)
    }

    const handleOnSaveWorkout = async (workoutName, workoutNotes, exercisesStore) => {
        const workout = {id: Date.now(), workoutName, workoutNotes, exercisesStore, workoutCreationDate: Date.now()};
        const updatedWorkouts = [...workouts, workout];
        setWorkouts(updatedWorkouts)
        await AsyncStorage.setItem('workouts', JSON.stringify(updatedWorkouts))
    };

    const handleOnSaveTemplate = async (templateName, templateNotes, exercisesStore) => {
        const template = {id: Date.now(), templateName, templateNotes, exercisesStore, templateCreationDate: Date.now()};
        const updatedTemplates = [...templates, template];
        setTemplates(updatedTemplates)
        await AsyncStorage.setItem('templates', JSON.stringify(updatedTemplates))
    };

    return (
        <KeyboardAvoidingWrapper>
                <View style={styles.innerContainer}>
                    <TextInput 
                        placeholder={isTemplate ? "Template Name" : "Workout Name"}
                        style={[styles.textInput, styles.workoutName]}
                        value={fromTemplate ? template.templateName : workoutName} 
                        onChangeText={(text) => handleOnChangeText(text, 'workoutName')}
                    />
                    <TextInput 
                        placeholder={isTemplate ? "Template Notes" : "Workout Notes"} 
                        style={[styles.textInput, styles.workoutNotes]} 
                        multiline
                        // defaultValue = {template.templateNotes}
                        value={fromTemplate ? template.templateNotes : workoutNotes} 
                        onChangeText={(text) => handleOnChangeText(text, 'workoutNotes')}
                    />
                    <FlatList
                        data={exercisesStore}
                        renderItem={({item}) => <ExerciseCard
                            exercise={item}   
                        />}
                    />
                    <ModalSelector
                        data={exerciseSelectorData}
                        initValue='Add exercise'
                        labelExtractor= {item => item.label}
                        onChange={(item)=> {
                            handleUpdateExercisesStore(exerciseName = item.label)
                        }}
                        closeOnChange= {true} 
                    />
                    <Button onPress={onSubmit} title="Save" color = {brand}/>
                    <Button onPress={closeModal} title="Dismiss" color = {brand}/>
                </View>
        </KeyboardAvoidingWrapper>
    );
};

const styles = StyleSheet.create({
    innerContainer: {
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    textInput: {
        
    },
    workoutNotes: {
        height: 40,
        marginBottom: 15,
        fontSize: 20,
    },
    workoutName: {
        height: 100,
        fontSize: 25,
        fontWeight: "bold",
    },
})

export default WorkoutModal;