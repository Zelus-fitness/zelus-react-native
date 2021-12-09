import React from 'react'; 
import { View, StyleSheet, Text, Dimensions, TouchableOpacity } from 'react-native';
import { Colors } from './styles';

const Workout = ({item, onPress}) => {
    const {workoutName, workoutNotes} = item;
    
    return (
        <TouchableOpacity 
            onPress={onPress} 
            style={styles.container}
        >
            <Text style={styles.workoutName}numberOfLines={2}> {workoutName}</Text>
            <Text numberOfLines={3}> {workoutNotes}</Text>
        </TouchableOpacity>
    );
};

const width = Dimensions.get('window').width - 40;

const styles = StyleSheet.create({
    container: {
        width: width / 2 - 10,
        padding: 8,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: Colors.darkLight,
    },
    workoutName: {
        fontWeight: 'bold',
        fontSize: 16,
        color: Colors.tertiary, 
    }
})

export default Workout;