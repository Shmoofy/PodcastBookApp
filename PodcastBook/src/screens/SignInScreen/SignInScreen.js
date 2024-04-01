import React, {useState} from "react";
import { View, Text, Image, StyleSheet, useWindowDimensions, ScrollView, TextInput} from "react-native";
import Logo from '../../../assets/images/penguinPodcastLogo.png';
import CustomInput from '../../components/CustomInput';
import CustomButton from "../../components/CustomButton";

import { useNavigation } from "@react-navigation/native";

import { useForm, Controller} from 'react-hook-form';
import client from "../../components/client";
import { signin } from "../../components/auth";
import AppNotifcation from "../AppNotification/AppNotification";
import { updateNotification } from "../../components/helper";


const SignInScreen = () => {

    const {height} = useWindowDimensions();
    const navigation = useNavigation();

    const [message, setMessage] = useState({
        text: '',
        type:''
    })

    const {control, handleSubmit, formState: {errors}} = useForm();

    const onSignInPressed = async(data) => {
        console.warn("sign in");
        console.log(data);
        
        //  ----------------------------------TESTING PURPOSES --------------------------------------------
        //navigation.navigate('HomeScreen');

        //validate user
        const res = await signin(data);
        
        if(!res.success) {
            return updateNotification(setMessage, res.error);
        } 
        
        console.log(res);
        
        //navigation.dispatch
           
        
        
        
        
    }

    const onForgotPasswordPressed = () => {
        console.warn("forgot pass");
        navigation.navigate('ForgotPassword');
    }

    const onSignUpPress = () => {
        console.warn('sign up');
        navigation.navigate('SignUp');
    }

    return (
        <>
        {message.text ? (<AppNotifcation type={message.type} text={message.text}/>): null}
        
        <ScrollView>
            <View style={styles.root}>
                <Image source={Logo} style={[styles.logo, {height: height * .3}]} resizeMode='contain' />

                
                <CustomInput
                name="Username"
                placeholder="Username" 
                control={control}
                rules= {
                    {required: 'Username is required'}
                }
                />
                <CustomInput 
                name="Password"
                placeholder="Password"
                control={control}
                secureTextEntry
                rules= {{
                    required: 'Password is required',
                    minLength: {value: 8, message: 'Password must be minimum 8 characters'}
                }}
                />
                
                <CustomButton
                text= "Sign In"
                onPress={handleSubmit(onSignInPressed)}
                />
                <CustomButton
                text= "Forgot Password?"
                onPress={onForgotPasswordPressed}
                type = "TERTIARY"
                />

                <View style={styles.filler}></View>

                <Text style= {styles.text}>
                    Don't have an account?
                </Text>
                <CustomButton
                text= "Create Account"
                onPress={onSignUpPress}
                type = "SECONDARY"
                />
            </View>
        </ScrollView>
        </>
    );
};

const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        padding: 40,

    },
    logo: {
        maxWidth:300,
        marginBottom: 10,
    },
    filler: {
        paddingVertical:50
    },
    text: {
        color: 'black',
        
    }
});

export default SignInScreen;