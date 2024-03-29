import React, {useState} from "react";
import { View, Text, StyleSheet, ScrollView} from "react-native";
import CustomInput from '../../components/CustomInput';
import CustomButton from "../../components/CustomButton";
import { useNavigation } from "@react-navigation/native";
import { useForm } from 'react-hook-form';



const NewPasswordScreen = () => {

    const {control, handleSubmit} = useForm();

    const navigation = useNavigation();

    const onSubmitPressed = (data) => {
        console.warn(data);
        navigation.navigate('HomeScreen');
    }

    const onSignInPress = () => {
        console.warn('sign in');
        navigation.navigate('SignIn');
    }
    

    return (
        <ScrollView>
            <View style={styles.root}>

                <View style={styles.filler}></View>
                <Text style={styles.title}>Set a new password</Text>    
                

                <CustomInput
                name="code"
                placeholder="Enter verification code"
                control= {control}
                rules={{
                    required: "Code is required"
                }}
                
                />
                <CustomInput
                name="password"
                placeholder="Enter your new Password" 
                control={control}
                secureTextEntry
                rules={{
                    required: "New Password is required",
                    minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters"
                    }
                }}
                />
                
                <CustomButton
                text= "Submit"
                onPress={handleSubmit(onSubmitPressed)}
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

export default NewPasswordScreen;
