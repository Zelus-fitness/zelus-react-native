//Import React
import React from 'react';

//Import React get name from route
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

//Import Style
import { StyleSheet, Text, View, Image, TouchableOpacity, Button } from 'react-native';

//Import Colors
import { Colors } from '../components/styles';
const {primary, tertiary, brand} = Colors;

//Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//Bottom tab navigation
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";


//Context
import { CredentialsContext } from '../context/CredentialsContext';

//Import Auth Screens
import Login from '../authentication_screens/Login';
import Signup from '../authentication_screens/Signup';

//import Main Screens
import ProfileScreen from '../screens/ProfileScreen';
import FindScreen from '../screens/FindScreen';
import WorkoutScreen from '../screens/WorkoutScreen';
import ExercisesScreen from '../screens/ExercisesScreen';
import HistoryScreen from '../screens/HistoryScreen';

//import modals
import WorkoutModal from '../screens/WorkoutModal';
import CreateTemplateModal from '../screens/CreateTemplateModal';

//Import Providers
import TemplatesProvider from '../context/TemplatesProvider';
import WorkoutsProvider from '../context/WorkoutsProvider';

//Tab bar stack
const Tab = createBottomTabNavigator();

//Main stack
const Stack = createNativeStackNavigator();

//Sub stacks
const WorkoutStack = createNativeStackNavigator();
const HistoryStack = createNativeStackNavigator();

const RootStack = () => {
    return (
        <CredentialsContext.Consumer>
            {({storedCredentials}) => (
                <NavigationContainer>
                    <TemplatesProvider>
                    <WorkoutsProvider>
                    <Stack.Navigator
                        screenOptions={{
                            headerStyle: { backgroundColor: 'transparent',},
                            headerTintColor: tertiary,
                            headerTransparent: true,
                            headerTitle: '',
                            headerContainerStyle: {
                                paddingLeft: 20
                            }
                        }}
                        

                    >
                        {storedCredentials ? 
                        (
                            <Stack.Screen
                                name="Main"
                                component={Tabs}
                                options={({ route }) => ({
                                    headerTitle: getHeaderTitle(route),
                                    headerStyle: {
                                        backgroundColor: '#fff',
                                    },
                                    headerTintColor: '#000',
                                    headerTitleStyle: {
                                        fontWeight: 'bold',
                                    },
                                    headerLargeTitle: true,
                                  })}
                            />
                        ) : (
                            <>
                                <Stack.Screen name="Login" component={Login} options={{headerShadowVisible: false}}/>
                                <Stack.Screen name="Signup" component={Signup} options={{headerShadowVisible: false}}/>
                            </>
                        )} 
                    </Stack.Navigator>
                    </WorkoutsProvider>
                    </TemplatesProvider>
                </NavigationContainer>
            )}
        </CredentialsContext.Consumer>
    )
}

const WorkoutStackScreen = () => {
    return (
        <WorkoutStack.Navigator>
            <WorkoutStack.Screen 
                    name ="Workout Screen" 
                    component={WorkoutScreen}
                    options={{
                        headerShown: false,
                    }}
            />
            <WorkoutStack.Screen 
                name="Create Template Modal" 
                component={CreateTemplateModal}
                // screenOptions={{ presentation: 'modal' }}
                options={{
                    presentation: 'modal',
                    headerShown: false,
                    headerTitle: "Create Template",
                    headerStyle: {
                        backgroundColor: '#fff',
                    },
                    headerTransparent: true,
                    headerTintColor: '#000',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                    headerRight: () => (
                         <Button
                            onPress={() => alert('This will save')}
                            title="Save"
                            color={brand}
                        />
                    ),
                    headerLeft: () => (
                        <Button
                           onPress={() => alert('This will dismiss')}
                           title="Dismiss"
                           color={brand}
                       />
                   ),
                }}
            />
            <WorkoutStack.Screen 
                name="Workout Modal" 
                component={WorkoutModal}
                options={{
                    presentation: 'modal',
                    headerShown: false,
                    headerTitle: "Create Template",
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                    headerBackVisible: true,
                    headerBackTitleVisible: true,
                    headerBackTitle: "Dismiss",
                    headerBackTitleStyle: {
                        fontWeight: 'bold',
                        color: {brand}
                    },
                    headerTransparent: true,
                    headerTintColor: '#000',
                    headerRight: () => (
                        <Button
                            onPress={() => alert('This will save')}
                            title="Save"
                            color={brand}
                        />
                    ),
                }}
            />
        </WorkoutStack.Navigator>
    )
}

const HistoryStackScreen = () => {
    return (
        <HistoryStack.Navigator>
            <HistoryStack.Screen 
                    name ="History Screen" 
                    component={HistoryScreen}
                    options={{
                        headerShown: false,
                    }}
            />
            {/* <HistoryStack.Screen 
                name="Create Template Modal" 
                component={CreateTemplateModal}
                // screenOptions={{ presentation: 'modal' }}
                options={{
                    headerShown: false,
                    presentation: 'modal',
                    headerTitle: "Create Template",
                    headerStyle: {
                        backgroundColor: '#fff',
                    },
                    headerTransparent: true,
                    headerTintColor: '#000',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                    headerRight: () => (
                         <Button
                            onPress={() => alert('This will save')}
                            title="Save"
                            color={brand}
                        />
                    ),
                    headerLeft: () => (
                        <Button
                           onPress={() => alert('This will dismiss')}
                           title="Dismiss"
                           color={brand}
                       />
                   ),
                }}
            /> */}
            <HistoryStack.Screen 
                name="Workout Modal" 
                component={WorkoutModal}
                options={{
                    presentation: 'modal',
                    headerShown: false,
                    headerTitle: "Create Template",
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                    headerBackVisible: true,
                    headerBackTitleVisible: true,
                    headerBackTitle: "Dismiss",
                    headerBackTitleStyle: {
                        fontWeight: 'bold',
                        color: {brand}
                    },
                    headerTransparent: true,
                    headerTintColor: '#000',
                    headerRight: () => (
                        <Button
                            onPress={() => alert('This will save')}
                            title="Save"
                            color={brand}
                        />
                    ),
                }}
            />
        </HistoryStack.Navigator>
    )
}

const Tabs = () => {
    return (
            <Tab.Navigator
                screenOptions={{
                    tabBarShowLabel: false,
                    tabBarStyle: {
                        backgroundColor: brand,
                        ...styles.shadow
                    },
                }}
            >
                <Tab.Screen 
                    name ="Profile" 
                    component={ProfileScreen} 
                    options={{
                        title: 'Profile',
                        tabBarIcon: ({focused}) => (
                            <View style={{alignItems: 'center', justifyContent: 'center', top: 5}}>
                                <Image 
                                    source = {require('../assets/tabBarIcons/profile.png')}
                                    resizeMode='contain'
                                    style={{
                                        width: 25,
                                        height: 25,
                                        tintColor: focused ? primary : '#7d7f7c'
                                    }}
                                />
                                <Text style={{color: focused ? primary : '#7d7f7c', fontSize: 12}}>Profile</Text>
                            </View>
                        ),
                }} />
                <Tab.Screen 
                    name ="Find" 
                    component={FindScreen}
                    options={{
                        title: 'Find',
                        tabBarIcon: ({focused}) => (
                            <View style={{alignItems: 'center', justifyContent: 'center', top: 5}}>
                                <Image 
                                    source = {require('../assets/tabBarIcons/search.png')}
                                    resizeMode='contain'
                                    style={{
                                        width: 25,
                                        height: 25,
                                        tintColor: focused ? primary : '#7d7f7c'
                                    }}
                                />
                                <Text style={{color: focused ? primary : '#7d7f7c', fontSize: 12}}>Find</Text>
                            </View>
                        )
                }}
                />
                <Tab.Screen 
                    name ="Workout" 
                    component={WorkoutStackScreen}
                    options={{
                        title: 'Workout',
                        tabBarIcon: ({focused}) => (
                            <View style={{alignItems: 'center', justifyContent: 'center', top: 5}}>
                                <Image 
                                    source = {require('../assets/tabBarIcons/workout.png')}
                                    resizeMode='contain'
                                    style={{
                                        width: 25,
                                        height: 25,
                                        tintColor: focused ? primary : '#7d7f7c'
                                    }}
                                />
                                <Text style={{color: focused ? primary : '#7d7f7c', fontSize: 12}}>Workout</Text>
                            </View>
                        ),
                }}
                />
                <Tab.Screen 
                    name ="History" 
                    component={HistoryStackScreen}
                    options={{
                        title: 'History',
                        tabBarIcon: ({focused}) => (
                            <View style={{alignItems: 'center', justifyContent: 'center', top: 5}}>
                                <Image 
                                    source = {require('../assets/tabBarIcons/history.png')}
                                    resizeMode='contain'
                                    style={{
                                        width: 25,
                                        height: 25,
                                        tintColor: focused ? primary : '#7d7f7c'
                                    }}
                                />
                                <Text style={{color: focused ? primary : '#7d7f7c', fontSize: 12}}>History</Text>
                            </View>
                        ),
                }}
                />
                <Tab.Screen 
                    name ="Exercises" 
                    component={ExercisesScreen}
                    options={{
                        title: 'Exercises',
                        tabBarIcon: ({focused}) => (
                            <View style={{alignItems: 'center', justifyContent: 'center', top: 5}}>
                                <Image 
                                    source = {require('../assets/tabBarIcons/barbell.png')}
                                    resizeMode='contain'
                                    style={{
                                        width: 25,
                                        height: 25,
                                        tintColor: focused ? primary : '#7d7f7c'
                                    }}
                                />
                                <Text style={{color: focused ? primary : '#7d7f7c', fontSize: 12}}>Exercises</Text>
                            </View>
                        )
                }}
                />
            </Tab.Navigator>
    )
}


function getHeaderTitle(route) {
    // If the focused route is not found, we need to assume it's the initial screen
    // This can happen during if there hasn't been any navigation inside the screen
    // In our case, it's "Feed" as that's the first screen inside the navigator
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'Profile';
  
    switch (routeName) {
        case 'Profile':
            return 'Profile';
        case 'Find':
            return 'Find';
        case 'Workout':
            return 'Workout';
        case 'History':
            return 'History';
        case 'Exercises':
            return 'Exercises';
    }
  }

const styles = StyleSheet.create ({
    shadow: {
        shadowColor: tertiary,
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5
    }
});

export default RootStack;