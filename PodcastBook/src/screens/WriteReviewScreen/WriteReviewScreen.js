import React, {useState} from "react";
import { View, Text, Image, StyleSheet, useWindowDimensions, ScrollView, TextInput, TouchableOpacity} from "react-native";
import backButton from '../../../assets/images/back-button.png';
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";

import { useNavigation } from "@react-navigation/native";

import { useForm, Controller} from 'react-hook-form';

import AppNotifcation from "../AppNotification/AppNotification";
import { updateNotification } from "../../components/helper";

import { getUserInfo, submitReview } from "../../components/apiHelper";

const NUM_REGEX = /[1-5]$/;



const WriteReviewScreen = ({route}) => {

    const {height} = useWindowDimensions();
    const navigation = useNavigation();
    const userId = route.params.userId;
    const title = route.params.title;
    
    console.log("In write review screen");
    console.log("title=",title);
    console.log("write review userid:",userId);



    





    const [message, setMessage] = useState({
        text: '',
        type:''
    })

    const {control, handleSubmit, formState: {errors},reset} = useForm();

    const onSubmitReview = async(data) => {
        console.warn("submit review");
        console.log(data);
        
        const userInfo = await getUserInfo(userId);
        const username = userInfo.user.Username;
        console.log(username);

        const res = await submitReview(data, userId, title, username);
        reset({
            Comment:'',
            Rating:''

        });
        if(res.error) {
            updateNotification(setMessage, res.error);
        } else {
            console.log("review submitted successfully");
            console.log(res);

            
            navigation.goBack();
        }
        
    }


    return (
        <>
        {message.text ? (<AppNotifcation type={message.type} text={message.text}/>): null}

        <ScrollView>
            
                

            <View style={styles.filler}></View>
            <Text style={styles.subTitle}>Review</Text>
            <View style={styles.root}>
            <CustomInput
                name="Comment"
                placeholder="Write your Review"
                defaultValue={""}
                control={control}
                rules={{required: 'Review is required'}}
                multiline={true}
                type = "BIG"
            />
            </View>

            <Text style={styles.subTitle}>Rating</Text>
            <View style={styles.root}>
            <CustomInput
                name="Rating"
                placeholder={"Rating (1-5)"}
                defaultValue={""}
                control={control}
                rules={{required: 'Rating is required',
                        pattern: {value: NUM_REGEX, message: 'Rating must be between 1 and 5'}
                        }}
            />
            </View>
            
            <View style={styles.root}>
            <CustomButton
            text="Submit Review"
            onPress={handleSubmit(onSubmitReview)}
            />
            </View>

            
            
            <View style={styles.root}>
            <CustomButton
            text="Go Back"
            onPress={() => navigation.goBack()}
            type="SECONDARY"
            />
            </View>
            
            <View style={styles.root}>
                    <Text >Came to give a piece of your mind? </Text>
                    <Text >"Don't be a loser" ~ RL </Text>
                </View>
        </ScrollView>
        
        </>
        
    );
};

const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        padding: 40,
        paddingVertical:10,

    },
    logo: {
        maxWidth:300,
        marginBottom: 10,
    },
    filler: {
        paddingVertical:30
    },
    subTitle:{
        
        textAlign:"left",
        marginHorizontal:45,
        fontSize:20

    },
    text: {
        color: 'black',
        
    }
});


export default WriteReviewScreen;



/*
<View style={{position: 'absolute', top: 0, left: 0}}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image source={backButton} style= {{width:50, height:50}}/> 
                    </TouchableOpacity>
                </View>
*/