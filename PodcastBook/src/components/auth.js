import client from "./client";
import { useNavigation } from "@react-navigation/native";

const catchError = error => {
    if (error?.response?.data) {
        return error.response.data;
    }
    return {success: false, error: error};
}

export const signup = async values => {
    //const navigation = useNavigation();
    try {
        const {data} = await client.post('/register', {...values});
        return data;
    } catch (error) {
        return catchError(error);
    }
}

export const signin = async values => {
    //const navigation = useNavigation();
    try {
        const {data} = await client.post('/login', {...values});
        return data;
    } catch (error) {
        return catchError(error);
    }
}

export const verify = async (otp, userId) => {
    //const navigation = useNavigation();
    try {
        const {data} = await client.post('/verifyEmail', {otp, userId});
        return data;
    } catch (error) {
        return catchError(error);
    }
}

