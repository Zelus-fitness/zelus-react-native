import React, {useState} from "react";
import { View, StyleSheet, Modal, Text, ScrollView, Button, Pressable, Dimensions } from "react-native";
import { TextInput, TouchableWithoutFeedback } from "react-native-gesture-handler";
import { Colors } from "./styles";
import { useNavigation } from '@react-navigation/native';

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTemplates } from "../context/TemplatesProvider";
import { useWorkouts} from "../context/WorkoutsProvider";

const PreviewModal = ({isTemplate, template, workout, visible, onClose}) => {     
    const [modalVisible, setModalVisible] = useState(false);
    const {setTemplates} = useTemplates()
    const {setWorkouts} = useWorkouts()
    const navigation = useNavigation();

    const {exercisesStore} = template;

    let exerciseNames = exercisesStore.map(function(item) {
      return item['exerciseName'].trim()
    });

    const closeModal = () => {
      onClose();
    }

    const startWorkout = () => {
      onClose();
      navigation.navigate('Workout Modal', {fromTemplate: true, template: template});
    }

    const editWorkout = () => {
      onClose();
      navigation.navigate('Workout Modal', {fromTemplate: false, workout: workout});
    }

    const deleteTemplate = async () => {
      const result = await AsyncStorage.getItem('templates')
      let templates = []
      if (result !== null) templates = JSON.parse(result)

      const newTemplates = templates.filter(t => t.id !== template.id)
      setTemplates(newTemplates)
      await AsyncStorage.setItem('templates', JSON.stringify(newTemplates))

      closeModal()
    }

    const deleteWorkout = async () => {
      const result = await AsyncStorage.getItem('workouts')
      let workouts = []
      if (result !== null) workouts = JSON.parse(result)

      const newWorkouts = workouts.filter(w => w.id !== workout.id)
      setWorkouts(newWorkouts)
      await AsyncStorage.setItem('workouts', JSON.stringify(newWorkouts))

      closeModal()
    }

    //edit workout or start workout

    let actionButton;
    let deleteButton;

    if (isTemplate == true) {
      // Edit section
      actionButton = 
        <Pressable
          style={[styles.button, styles.buttonDelete]}
          onPress={startWorkout}
        >
          <Text style={styles.textStyle}>Start Workout</Text>
        </Pressable>

        deleteButton = 
          <Pressable
            style={[styles.button, styles.buttonDelete]}
            onPress={deleteTemplate} 
          >
            <Text style={styles.textStyle}>Delete</Text>
          </Pressable>
    }
    else {
      actionButton = 
        <Pressable
          style={[styles.button, styles.buttonDelete]}
          onPress={editWorkout}
        >
          <Text style={styles.textStyle}>Edit Workout</Text>
        </Pressable>

      deleteButton = 
          <Pressable
            style={[styles.button, styles.buttonDelete]}
            onPress={deleteWorkout} 
          >
            <Text style={styles.textStyle}>Delete</Text>
          </Pressable>
    }
  

    return (
      <View style={styles.centeredView}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={visible} 
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>{isTemplate ? template.templateName : workout.workoutName}</Text>
              <Text style={styles.modalText}>{isTemplate ? template.templateNotes : workout.workoutNotes}</Text>
              <Text style={styles.modalText}>{isTemplate ? exerciseNames.join(', ') : workout.exerciseStore}</Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={closeModal} 
              >
                <Text style={styles.textStyle}>Cancel</Text>
              </Pressable>
              {deleteButton}
              {actionButton}
            </View>
          </View>
        </Modal> 
      </View>
    );
  };

const width = Dimensions.get('window').width - 40;


const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      width: width - 10,
      paddingVertical: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    button: {
      borderRadius: 10,
      padding: 10,
      elevation: 2
    },
    buttonOpen: {
      backgroundColor: "#F194FF",
    },
    buttonClose: {
      backgroundColor: Colors.brand,
    },
    buttonDelete: {
      backgroundColor: Colors.brand,
      marginTop: 10
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    }
  });

export default PreviewModal;