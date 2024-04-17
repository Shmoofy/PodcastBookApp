import React, {useState} from "react";
import { View, Text, StyleSheet, ScrollView, useWindowDimensions, Modal, TouchableOpacity} from "react-native";
import CustomInput from '../../components/CustomInput';
import CustomButton from "../../components/CustomButton";
import { useNavigation } from "@react-navigation/native";
import { useForm } from 'react-hook-form';
import { sendEmail } from "../../components/apiHelper";

import AppNotifcation from "../AppNotification/AppNotification";
import { updateNotification } from "../../components/helper";

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const ForgotPasswordScreen = () => {

    const {height} = useWindowDimensions();
    const { control, handleSubmit, formState: {errors}} = useForm(); 

    const navigation = useNavigation();

    const [message, setMessage] = useState({
        text: '',
        type:''
    })

    const onSendPressed = async(data) => {
        console.log(data.Email);

        
        try {

            const res = await sendEmail(data.Email);
            
            if (res == "error") {
                updateNotification(setMessage, "Email not found", 'error');
                console.log("error in sending email");
            } else {
                console.log("email sent successfully");
                //console.log("email sent successfully");
                //console.log(res);
               // updateNotification(setMessage, "Email Sent");
                setIsModalVisible(true);
                //navigation.navigate('SignIn');
            } 
        } catch (error) {
            console.log("error in sending email catch");
            console.log(error);
        }
        
       // navigation.navigate('NewPassword');

    }

    const onSignInPress = () => {
        //console.warn('sign in');
        navigation.navigate('SignIn');
    }

    const [isModalVisible, setIsModalVisible] = useState(false);


    return (
        <>
        {message.text ? (<AppNotifcation type={message.type} text={message.text}/>): null}

        <ScrollView>
            <View style={styles.root}>

                <View style={styles.filler}></View>
                <Text style={styles.title}>Reset your Password</Text>    
                

                <CustomInput 
                name="Email"
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


            <Modal animationType='slide' transparent={true} visible={isModalVisible} onRequestClose={()=> setIsModalVisible(false)}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, .7)' }}>
                  <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
                    <Text style={{fontSize:20, textAlign: 'center', fontWeight: 'bold', paddingBottom: 30, color: '#28d42e'}}>Email Sent</Text>

                    <Text style={{fontSize:15, textAlign: 'center', fontWeight: 'bold', paddingBottom: 30}}>Finish resetting your password with the link provided in email</Text>
                    {/* Add your modal content here */}
                    <TouchableOpacity onPress={() => {
                        setIsModalVisible(false);
                        navigation.navigate("SignIn");}}>
                      <CustomButton
                            text= "Sign In"
                            onPress={onSignInPress}
                            type = "TERTIARY"
                        />
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>

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

export default ForgotPasswordScreen;
