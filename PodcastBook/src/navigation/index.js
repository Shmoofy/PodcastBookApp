import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator }   from '@react-navigation/native-stack';

import MenuDrawer from '../components/MenuDrawer';

import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import ConfirmEmailScreen from '../screens/ConfirmEmailScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import NewPasswordScreen from '../screens/NewPasswordScreen';
import HomeScreen from '../screens/HomeScreen';
import AboutScreen from '../screens/FollowingScreen';
import SettingsScreen from '../screens/AccountScreen';
import PodcastDetails from '../screens/PodcastDetailsScreen/PodcastDetailsScreen';
const Stack = createNativeStackNavigator();
/*<Stack.Screen name="About" component={AboutScreen}/>
<Stack.Screen name="Settings" component={SettingsScreen}/>
<Stack.Screen name= "HomeScreen" component={HomeScreen} />
<Stack.Screen name= "PodcastDetails" component={PodcastDetails}/>*/
const Navigation = () => {
    return (
        <NavigationContainer >
            <Stack.Navigator screenOptions={{headerShown: false}} >
                <Stack.Screen name="SignIn" component={SignInScreen}/>
                <Stack.Screen name="SignUp" component={SignUpScreen} />
                <Stack.Screen name="ConfirmEmail" component={ConfirmEmailScreen} />
                <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
                <Stack.Screen name="NewPassword" component={NewPasswordScreen} />
                
                <Stack.Screen name = "MenuScreen" component={MenuDrawer}/>
                

            </Stack.Navigator>
        </NavigationContainer>
    )
}

const styles = StyleSheet.create({
    root: {
      flex: 1,
      backgroundColor: 'lightblue'
    },
  });

export default Navigation;