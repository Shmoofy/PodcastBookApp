import React, {useState} from "react";
import { View, Text, StyleSheet, ScrollView} from "react-native";
import CustomInput from '../../components/CustomInput';
import CustomButton from "../../components/CustomButton";
import { useNavigation } from "@react-navigation/native";



const ConfirmEmailScreen = () => {

    const [code, setCode] = useState('');

    const navigation = useNavigation();

    const onConfirmPressed = () => {
        console.warn("confirm code");
        navigation.navigate('HomeScreen');
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
                placeholder="Enter your confirmation code" 
                value={code} 
                setValue={setCode}
                />
                
                <CustomButton
                text= "Confirm"
                onPress={onConfirmPressed}
                />
            
                <CustomButton
                text= "Resend Confirmation Email"
                onPress={onResendPress}
                type = "SECONDARY"
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
        fontSize: 24,
        fontWeight: 'bold',
        color: '#051C60',
        margin: 10,
    },
});

export default ConfirmEmailScreen;
