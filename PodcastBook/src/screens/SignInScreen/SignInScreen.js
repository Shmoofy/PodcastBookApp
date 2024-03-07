import React, {useState} from "react";
import { View, Text, Image, StyleSheet, useWindowDimensions, ScrollView} from "react-native";
import Logo from '../../../assets/images/penguinLogo.jpg';
import CustomInput from '../../components/CustomInput';
import CustomButton from "../../components/CustomButton";


const SignInScreen = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const {height} = useWindowDimensions();

    const onSignInPressed = () => {
        console.warn("sign in");
    }

    const onForgotPasswordPressed = () => {
        console.warn("forgot pass");
    }

    const onSignUpPress = () => {
        console.warn('sign up');
    }

    return (
        <ScrollView>
            <View style={styles.root}>
                <Image source={Logo} style={[styles.logo, {height: height * .3}]} resizeMode='contain' />
                <CustomInput 
                placeholder="Username" 
                value={username} 
                setValue={setUsername}
                />
                <CustomInput 
                placeholder="Password" 
                value={password} 
                setValue={setPassword}
                secureTextEntry
                />
                <CustomButton
                text= "Sign In"
                onPress={onSignInPressed}
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