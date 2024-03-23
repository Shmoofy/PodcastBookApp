import React, {useState} from "react";
import { View, Text, StyleSheet, ScrollView} from "react-native";
import CustomInput from '../../components/CustomInput';
import CustomButton from "../../components/CustomButton";
import { useNavigation } from "@react-navigation/native";



const NewPasswordScreen = () => {

    const [code, setCode] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const navigation = useNavigation();

    const onSubmitPressed = () => {
        console.warn("confirm code");
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
                placeholder="Enter verification code" 
                value={code} 
                setValue={setCode}
                />
                <CustomInput 
                placeholder="Enter your new Password" 
                value={newPassword} 
                setValue={setNewPassword}
                secureTextEntry
                />
                
                <CustomButton
                text= "Submit"
                onPress={onSubmitPressed}
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
