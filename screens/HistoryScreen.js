import React, { useState, useEffect, route } from "react";
import { 
    View, 
    Text, 
    Button, 
    StyleSheet,
    SafeAreaView,
    ScrollView,
    FlatList,
    AppState
} from 'react-native'

import AsyncStorage from "@react-native-async-storage/async-storage";

import { Colors } from "../components/styles";

import Workout from "../components/Workout";
import { useWorkouts } from "../context/WorkoutsProvider";
import PreviewModal from "../components/PreviewModal"
 
const {brand, darkLight, primary} = Colors;

const HistoryScreen = () => {

    const [previewModalVisible, setPreviewModalVisible] = useState(false);
    const [previewModalData, setPreviewModalData] = useState('')
    
    const {workouts, setWorkouts } = useWorkouts()

    const openPreviewModal = (workout) => {
        setPreviewModalVisible(true)
        setPreviewModalData(workout)
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.innerContainer}>
                    <Text style={styles.subHeader}>Workout History</Text>
                </View>
                <FlatList 
                    data = {workouts}
                    numColumns = {2}
                    columnWrapperStyle={{justifyContent: 'space-between', marginBottom: 15, paddingHorizontal: 20}}
                    keyExtractor = {item => item.id.toString()} 
                    renderItem={({item}) => <Workout 
                        onPress={() => openPreviewModal(item)} 
                        item = {item} 
                    />} 
                />
            </ScrollView>
            <PreviewModal
                visible={previewModalVisible} 
                onClose={() => setPreviewModalVisible(false)}
                workout={previewModalData}
            />
        </SafeAreaView>
    );
};

export default HistoryScreen;

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