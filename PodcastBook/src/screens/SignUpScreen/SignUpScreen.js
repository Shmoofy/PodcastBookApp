import React, {useState} from "react";
import { View, Text, StyleSheet, ScrollView} from "react-native";
import CustomInput from '../../components/CustomInput';
import CustomButton from "../../components/CustomButton";
import { useNavigation } from "@react-navigation/native";


const SignUpScreen = () => {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    const navigation = useNavigation();

    

    const onRegisterPressed = () => {
        console.warn("sign up");
        //backend validation
        //confirm email
        navigation.navigate('ConfirmEmail');
    }

    const onSignInPress = () => {
        console.warn('sign in');
        navigation.navigate('SignIn');
    }

    return (
        <ScrollView>
            <View style={styles.root}>

                <Text style={styles.title}> Create an Account</Text>    

                <CustomInput 
                placeholder="Email" 
                value={email} 
                setValue={setEmail}
                />
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
                <CustomInput 
                placeholder="Confirm Password" 
                value={passwordConfirm} 
                setValue={setPasswordConfirm}
                secureTextEntry
                />
                <View style={styles.filler}></View>
                <CustomButton
                text= "Create Account"
                onPress={onRegisterPressed}
                />
            
                <CustomButton
                text= "Have an account? Sign in"
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

export default SignUpScreen;

//email, username, password