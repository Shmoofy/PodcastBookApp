import React, {useState} from "react";
import { View, Text, StyleSheet, ScrollView} from "react-native";
import CustomInput from '../../components/CustomInput';
import CustomButton from "../../components/CustomButton";
import { useNavigation } from "@react-navigation/native";



const ForgotPasswordScreen = () => {

    const [email, setEmail] = useState('');

    const navigation = useNavigation();

    const onSendPressed = () => {
        console.warn("confirm code");
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
                placeholder="Enter your email" 
                value={email} 
                setValue={setEmail}
                />
                
                <CustomButton
                text= "Send"
                onPress={onSendPressed}
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
