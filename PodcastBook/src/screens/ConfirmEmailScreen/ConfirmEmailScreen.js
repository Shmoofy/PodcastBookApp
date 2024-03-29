import React, {useState} from "react";
import { View, Text, StyleSheet, ScrollView} from "react-native";
import CustomInput from '../../components/CustomInput';
import CustomButton from "../../components/CustomButton";
import { useNavigation } from "@react-navigation/native";
import { useForm } from 'react-hook-form';
import { verify } from "../../components/auth";
import AppNotifcation from "../AppNotification/AppNotification";
import { updateNotification } from "../../components/helper";
import { StackActions } from '@react-navigation/native';



const ConfirmEmailScreen = ({route}) => {

    const {profile} = route.params;

    const navigation = useNavigation();

    const {control, handleSubmit} = useForm();

    const [message, setMessage] = useState({
        text: '',
        type:''
    })

    const [OTP, setOTP ] = useState({1:'', 2:'', 3:'', 4:''});

    const onConfirmPressed = async(data) => {
        console.warn(data);

        const res = await verify(data, profile.id);
        if(!res.success) return updateNotification(setMessage, res.error);
        console.log(res);

        navigation.dispatch(StackActions.replace('HomeScreen', {profile: res.user}));

    }

    const onSignInPress = () => {
        console.warn('sign in');
        navigation.navigate('SignIn');
    }
    const onResendPress = () => {
        console.warn('resend code');
    }

    

    return (
        <ScrollView>
            <View style={styles.root}>

                <View style={styles.filler}></View>
                <Text style={styles.title}>Confirm your email</Text>    
                

                <CustomInput
                name="otp"
                placeholder="Enter your confirmation code" 
                control={control}
                rules = {{
                    required: "confirmation code is required"
                }}
                />
                
                <CustomButton
                text= "Confirm"
                onPress={handleSubmit(onConfirmPressed)}
                />
            
                {/*<CustomButton
                text= "Resend Confirmation Email"
                onPress={onResendPress}
                type = "SECONDARY"
                />*/}
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
        fontSize: 24,
        fontWeight: 'bold',
        color: '#051C60',
        margin: 10,
    },
});

export default ConfirmEmailScreen;
