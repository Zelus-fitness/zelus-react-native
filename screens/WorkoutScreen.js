import React, { useState, useEffect, route } from "react";
import {
    View,
    Text,
    Button,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    FlatList,
} from 'react-native'

import AsyncStorage from "@react-native-async-storage/async-storage";

import { Colors } from "../components/styles";

import PreviewModal from "../components/PreviewModal";
import Template from "../components/Template";
import Workout from "../components/Workout";

import { useTemplates } from "../context/TemplatesProvider";
import { useWorkouts } from "../context/WorkoutsProvider";

const { brand } = Colors;

const WorkoutScreen = ({ navigation, route }) => {
    useEffect(() => {
        if (route.params?.template) {
            const template = route.params?.template
            handleOnSaveTemplate(
                template.templateName, 
                template.templateNotes, 
                template.exercisesStore,
            );
        }
        else if (route.params?.workout) {
            const workout = route.params?.workout
            handleOnSaveWorkout(
                workout.workoutName, 
                workout.workoutNotes, 
                workout.exercisesStore,
            );
        }
      }, [route.params?.template, route.params?.workout]);

    const [previewModalVisible, setPreviewModalVisible] = useState(false);
    const [previewModalData, setPreviewModalData] = useState({})

    const {templates, setTemplates } = useTemplates()
    const {workouts, setWorkouts } = useWorkouts()

    const handleOnSaveTemplate = async (templateName, templateNotes, exercisesStore) => {
        const template = {id: Date.now(), templateName, templateNotes, exercisesStore, templateCreationDate: Date.now()};
        const updatedTemplates = [...templates, template];
        setTemplates(updatedTemplates)
        await AsyncStorage.setItem('templates', JSON.stringify(updatedTemplates))
    };

    const handleOnSaveWorkout = async (workoutName, workoutNotes, exercisesStore) => {
        const workout = {id: Date.now(), workoutName, workoutNotes, exercisesStore, workoutCreationDate: Date.now()};
        const updatedWorkouts = [...workouts, workout];
        setWorkouts(updatedWorkouts)
        await AsyncStorage.setItem('workouts', JSON.stringify(updatedWorkouts))
    };

    const openPreviewModal = (template) => {
        setPreviewModalVisible(true)
        setPreviewModalData(template)
    }

    const openWorkoutModal = (fromTemplate) => {
        navigation.navigate("Workout Modal", {fromTemplate: fromTemplate})
    }

    const openCreateTemplateModal = () => {
        navigation.navigate("Create Template Modal")
    }

    // console.log(typeof(previewModalData))

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.innerContainer}>
                    <Text style={styles.subHeader}>Quick Start</Text>
                </View>
                <View style={styles.innerContainer}>
                    <Button
                        title="Start an Empty Workout"
                        color={brand}
                        onPress={() => openWorkoutModal(false)}
                    />
                </View>
                <View style={styles.innerContainer}>
                    <Text style={styles.subHeader}>Templates</Text>
                </View>
                <FlatList
                    data={templates}
                    numColumns={2}
                    columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: 15, paddingHorizontal: 20 }}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => <Template
                        onPress={() => openPreviewModal(item)}
                        item={item}
                    />}
                />
                <View style={styles.innerContainer}>
                    <Button
                        title="Create Template"
                        color={brand}
                        onPress={() => openCreateTemplateModal()}
                    />
                </View>
            </ScrollView>
            <PreviewModal
                visible={previewModalVisible}
                onClose={() => setPreviewModalVisible(false)}
                isTemplate={true}
                template={previewModalData}
            />
        </SafeAreaView>
    );
};

export default WorkoutScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        zIndex: 1,
        paddingHorizontal: 20,
    },
    innerContainer: {
        padding: 10,
    },
    subHeader: {
        fontSize: 18,
        fontWeight: "bold",
        padding: 10,
    }

});