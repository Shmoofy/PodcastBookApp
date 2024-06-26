import React, {useEffect, useState} from "react";
import { View, Text, Image, StyleSheet, useWindowDimensions, ScrollView, TextInput, TouchableOpacity} from "react-native";
import backButton from '../../../assets/images/back-button.png';
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";

import { useFocusEffect, useNavigation } from "@react-navigation/native";

import { useForm, Controller} from 'react-hook-form';

import AppNotifcation from "../AppNotification/AppNotification";
import { updateNotification } from "../../components/helper";

import { getUserInfo, submitReview, editReview } from "../../components/apiHelper";

const NUM_REGEX = /[1-5]$/;



const EditReviewScreen = ({route}) => {

    const {height} = useWindowDimensions();
    const navigation = useNavigation();
    const reviewComment = route.params.Comment;
    const reviewRating = route.params.Rating;
    const reviewId = route.params.ReviewID;

    
    
    console.log("In edit review screen");
    console.log(reviewComment, reviewRating, reviewId);

    const [message, setMessage] = useState({
        text: '',
        type:''
    })

    const {control, handleSubmit, formState: {errors},reset} = useForm();
        
    useFocusEffect(
        React.useCallback(()=>{
            console.log("in callback edit form:",reviewComment,reviewRating);
            reset({
                Comment:reviewComment,
                Rating:reviewRating.toString()
            });
        },[reviewComment, reviewRating])
    );
    
    
    const submitEdit = async(data) => {
        // Logic to submit the edited review
        //console.log("in func");
        //console.log(data);
        //console.log(data);
        const packageData = {
            "ReviewID": reviewId,
            "Rating": data.Rating,
            "Comment": data.Comment,
        }
        const res = await editReview(packageData);
        
        if(res.error) {
          updateNotification(setMessage, res.error, 'error');
        } else {
          console.log("review submitted successfully");
          console.log(res);
          data = null;
          
          navigation.navigate('Account');
        }
         // Close the modal
      }
  


    return (
        <>
        {message.text ? (<AppNotifcation type={message.type} text={message.text}/>): null}

        <ScrollView style={{backgroundColor:"lightblue"}}>
           
                

                <View style={styles.filler}></View>
                <Text style={styles.subTitle}>Review</Text>
                <View style={styles.root}>
                <CustomInput
                    name="Comment"
                    placeholder="Write your Review"
                    defaultValue={reviewComment}
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
                    defaultValue={reviewRating.toString()}
                    control={control}
                    rules={{required: 'Rating is required',
                            pattern: {value: NUM_REGEX, message: 'Rating must be between 1 and 5'}
                            }}
                />

                <CustomButton
                text="Edit Review"
                onPress={handleSubmit(submitEdit)}
                />
                </View>

                <View style={styles.root}>
                    <Text >Liked the podcast enough to add more? </Text>
                    <Text >maybe not ...  </Text>
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
    text: {
        color: 'black',
        
    },
    subTitle:{
        
        textAlign:"left",
        marginHorizontal:45,
        fontSize:20

    }
});


export default EditReviewScreen;
