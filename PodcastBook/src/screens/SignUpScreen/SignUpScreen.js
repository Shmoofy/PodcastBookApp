import React, {useState} from "react";
import { View, Text, StyleSheet, ScrollView} from "react-native";
import CustomInput from '../../components/CustomInput';
import CustomButton from "../../components/CustomButton";
import { useNavigation } from "@react-navigation/native";
import {useForm} from 'react-hook-form';
import client from "../../components/client";
import { signup } from "../../components/auth";
import AppNotifcation from "../AppNotification/AppNotification";
import { updateNotification } from "../../components/helper";
import { StackActions } from '@react-navigation/native';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const SignUpScreen = () => {

    const navigation = useNavigation();

    const [message, setMessage] = useState({
        text: '',
        type:''
    })

    const {control, handleSubmit, watch, formState: {errors}} = useForm();
    const pwd = watch('Password');

    const onRegisterPressed = async(data) => {
        console.warn("sign up");
        console.log(data);
        //backend validation
        const res = await signup(data);
        if(res.error) {
            updateNotification(setMessage, res.error, 'error');
        } else {
            console.log("user created successfully");
            console.log(res);
            navigation.dispatch(StackActions.replace('ConfirmEmail', {userId: res.UserID}));
        }
        
        

        //navigation.navigate('ConfirmEmail');
        

        
    }

    const onSignInPress = () => {
        console.warn('sign in');
        navigation.navigate('SignIn');
    }

    return (
        <>
        {message.text ? (<AppNotifcation type={message.type} text={message.text}/>): null}
        <ScrollView>
            <View style={styles.root}>

                <Text style={styles.title}> Create an Account</Text>    

                <CustomInput
                name="Email"
                control={control}
                placeholder="Email"
                rules= {{
                    required: "Email is required",
                    pattern: {value: EMAIL_REGEX, message: 'Email is invalid'}
                }}
                />

                <CustomInput
                name="Username"
                control={control}
                placeholder="Username"
                rules={{
                    required: "Username is required",
                    minLength: {
                        value: 3,
                        message: "Username must be at least 3 characters"
                    }
                }}
                />

                <CustomInput
                name="Password"
                control={control}
                placeholder="Password"
                rules={{
                    required: "Password is required",
                    minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters"
                    }
                }}
                secureTextEntry
                />

                <CustomInput
                name="Confirm Password"
                control={control}
                placeholder="Confirm Password" 
                secureTextEntry
                rules={{
                    validate: value => value === pwd || "Passwords do not match",
                    
                }}
                />

                <View style={styles.filler}></View>
                <CustomButton
                text= "Create Account"
                onPress={handleSubmit(onRegisterPressed)}
                />
            
                <CustomButton
                text= "Have an account? Sign in"
                onPress={onSignInPress}
                type = "TERTIARY"
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
        paddingVertical:20
    },
    text: {
        color: 'black',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#051C60',
        margin: 10,
    },
});

export default SignUpScreen;

//email, username, password