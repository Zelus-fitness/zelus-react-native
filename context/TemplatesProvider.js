import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const TemplatesContext = createContext()
const TemplatesProvider = ({children}) => {
    const [templates, setTemplates] = useState([]);

    const findTemplates = async () => {
        const result = await AsyncStorage.getItem('templates');
        if (result !== null) setTemplates(JSON.parse(result));
    }

    useEffect(() => {
        // AsyncStorage.clear();
        findTemplates();
    }, []);
    
    return (
        <TemplatesContext.Provider value={{templates, setTemplates, findTemplates}}>
            {children}
        </TemplatesContext.Provider>
    )
}
export const useTemplates = () => useContext(TemplatesContext)

export default TemplatesProvider