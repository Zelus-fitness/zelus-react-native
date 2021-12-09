import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const WorkoutsContext = createContext()
const WorkoutsProvider = ({children}) => {
    const [workouts, setWorkouts] = useState([]);

    const findWorkouts = async () => {
        const result = await AsyncStorage.getItem('workouts');
        if (result !== null) setWorkouts(JSON.parse(result));
    }

    useEffect(() => {
        // AsyncStorage.clear();
        findWorkouts();
    }, []);
    
    return (
        <WorkoutsContext.Provider value={{workouts, setWorkouts, findWorkouts}}>
            {children}
        </WorkoutsContext.Provider>
    )
}
export const useWorkouts = () => useContext(WorkoutsContext)

export default WorkoutsProvider