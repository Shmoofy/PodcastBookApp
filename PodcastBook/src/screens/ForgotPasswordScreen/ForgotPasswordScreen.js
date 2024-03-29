import React, {useState} from "react";
import { View, Text, StyleSheet, ScrollView} from "react-native";
import CustomInput from '../../components/CustomInput';
import CustomButton from "../../components/CustomButton";
import { useNavigation } from "@react-navigation/native";
import { useForm } from 'react-hook-form';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const ForgotPasswordScreen = () => {

    const { control, handleSubmit} = useForm(); 

    const navigation = useNavigation();

    const onSendPressed = (data) => {
        console.warn(data);
        navigation.navigate('NewPassword');
    }

    const onSignInPress = () => {
        console.warn('sign in');
        navigation.navigate('SignIn');
    }

    return (
        <ScrollView>
            <View style={styles.root}>

                <View style={styles.filler}></View>
                <Text style={styles.title}>Reset your Password</Text>    
                

                <CustomInput 
                name="email"
                placeholder="Enter your email"
                control={control}
                rules={{
                    required: "Email is required",
                    pattern: {value: EMAIL_REGEX, message: 'Email is invalid'}
                }}
                />
                
                <CustomButton
                text= "Send"
                onPress={handleSubmit(onSendPressed)}
                />
            
                <CustomButton
                text= "Back to Sign In"
                onPress={onSignInPress}
                type = "TERTIARY"
                />
            </View>
        </ScrollView>
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
        fontSize: 22,
        fontWeight: 'bold',
        color: '#051C60',
        margin: 10,
    },
});

export default ForgotPasswordScreen;
