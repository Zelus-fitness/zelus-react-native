import React from 'react'; 
import { View, StyleSheet, Text, Dimensions, TouchableOpacity } from 'react-native';
import { Colors } from './styles';

const Template = ({item, onPress}) => {
    const {templateName, templateNotes, exercisesStore} = item;

    var exerciseNames = exercisesStore.map(function(item) {
        return item.exerciseName.trim()
      });
    
    return (
        <TouchableOpacity 
            onPress={onPress} 
            style={styles.container}
        >
            <Text style={styles.templateName}numberOfLines={2}> {templateName}</Text>
            <Text numberOfLines={3}> {templateNotes}</Text>
            <Text numberOfLines={3}> {exerciseNames.join(', ')} </Text>
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
    templateName: {
        fontWeight: 'bold',
        fontSize: 16,
        color: Colors.tertiary, 
    }
})

export default Template;