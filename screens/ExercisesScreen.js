import React from "react";
import { View, Text, Button, StyleSheet } from 'react-native'

const ExercisesScreen = ({navigation}) => {
    return (
        <View style={styles.container}>
            <Text>Exercises Screen</Text>
            <Button
                title="Click Here"
                onPress={() => alert('Button Clicked!')}
            />
        </View>
    );
};

export default ExercisesScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
});