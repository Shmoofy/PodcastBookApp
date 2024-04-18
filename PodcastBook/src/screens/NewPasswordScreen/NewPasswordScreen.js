import React, {useState} from "react";
import { View, Text, StyleSheet, ScrollView} from "react-native";
import CustomInput from '../../components/CustomInput';
import CustomButton from "../../components/CustomButton";
import { useNavigation } from "@react-navigation/native";
import { useForm } from 'react-hook-form';
import { changePassword } from "../../components/podcastsAPI";

import AppNotifcation from "../AppNotification/AppNotification";
import { updateNotification } from "../../components/helper";



const NewPasswordScreen = ({route}) => {

    const {control, handleSubmit, formState: {errors},reset} = useForm();
    const userId = route.params.userId;


    const navigation = useNavigation();

    const onSubmitPressed = async(data) => {
        console.log(data);
        console.log(userId);
        
        
        reset();
        try {  
            const res = await changePassword(userId, data.ConfirmPassword);
            if (res.message != "User password updated successfully") {
                //does not work erorr
                updateNotification(setMessage, res.message, 'error');
                console.log("recieved error");
            } else {
                updateNotification(setMessage, "Password Updated" );
            }
            
        } catch (error) {
            console.log(error);
            updateNotification(setMessage, "Error occured", 'error');
        }
        //navigation.navigate('HomeScreen');
    }

    const onBackPress = () => {
        console.warn('sign in');
        navigation.navigate('Account');
        reset();
    }

    const [message, setMessage] = useState({
        text: '',
        type:''
    })
    

    return (
        <>
        {message.text ? (<AppNotifcation type={message.type} text={message.text}/>): null}
        <ScrollView>
            <View style={styles.root}>

                <View style={styles.filler}></View>
                <Text style={styles.title}>Change password</Text>    
                

                
                
                <CustomInput
                name="ConfirmPassword"
                placeholder="Enter your new password"
                defaultValue={"password"}
                control={control}
                secureTextEntry
                rules={{
                    required: "New Password is required",
                    minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters"
                    },
                    pattern : {value: /^(?=.*[a-z])(?=.*[A-Z])/, message: "Password must contain at least one lowercase and uppercase letter"}
                }}
                />
                
                <CustomButton
                text= "Submit"
                onPress={handleSubmit(onSubmitPressed)}
                />
            
                <CustomButton
                text= "Back to Account Screen"
                onPress={onBackPress}
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
        fontSize: 22,
        fontWeight: 'bold',
        color: '#051C60',
        margin: 10,
    },
});

export default NewPasswordScreen;
