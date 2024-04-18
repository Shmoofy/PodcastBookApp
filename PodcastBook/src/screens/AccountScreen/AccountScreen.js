import React, {useEffect, useState} from 'react';
import {View, Text, SafeAreaView, FlatList,StyleSheet, useWindowDimensions, TouchableOpacity, Image, Modal} from 'react-native';
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import ReviewCard from "../../components/ReviewCard/PodcastCard/ReviewCard";
import { getUserReviews } from "../../components/podcastsAPI";

import deleteIcon from "../../../assets/images/delete-icon.png";
import editIcon from "../../../assets/images/edit-icon.png";
import signOutIcon from "../../../assets/images/signOut.png";
import settingsIcon from "../../../assets/images/settingsIcon.png";

import { useForm, Controller} from 'react-hook-form';
import { getUserInfo, editReview,deleteReview } from "../../components/apiHelper";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import { TextInput } from 'react-native-paper';
import AppNotifcation from "../AppNotification/AppNotification";
import { updateNotification } from "../../components/helper";
import { useIsFocused } from '@react-navigation/native';


const AccountScreen = ({route})=>
{
    const {height} = useWindowDimensions();
    const navigation = useNavigation();
    const userId = route.params.userId;
    console.log("userid settings in account screen:", userId);
    const [reviews, setReviews] = useState([]);
    const [totalReviews, setTotalReviews] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    const [message, setMessage] = useState({
      text: '',
      type:''
     })

    useFocusEffect(

      React.useCallback(() => {
      
        getInfo();
        fetchReviews();
      },[userId])  
    );

    const getInfo = async () => {
        const userInfo = await getUserInfo(userId);
        console.log('getting user info on account screen')
        //console.log(userInfo);
    }

    const fetchReviews = async () => {

        try {
            const data = await getUserReviews(userId); // Call your getReviews API function
            //console.log('API response:', data);

            if (data.message == "Request failed with status code 404") {
                console.log("No reviews found in if");
                setReviews([{}]);
                setTotalReviews(0);
      
            }

            if (data && data.userReviews) {
            
                console.log("INSIDE IF");
                setReviews(data.userReviews);
                setTotalReviews(data.totalUserReviews);
                //console.log(reviews);
                //console.log("TESTNIG CMT",reviews.Comment);
                //console.log(totalReviews);
              }

              //console.log("logging array of reviews", reviews);

              setIsLoading(false);

        } catch (error) {
            console.error('Error fetching reviews:', error);
            setIsLoading(false);
        }
    };

    //stuff for delete/edit review modals
    //const [isDeleteModalVis, setisDeleteModalVis] = useState(false);
    const [isDeleteModalVis, setisDeleteModalVis] = useState({});

    useEffect(() => {
      // Initialize the isDeleteModalVis state object
      const initialModalState = {};
      reviews.forEach((review) => {
          initialModalState[review._id] = false;
      });
      setisDeleteModalVis(initialModalState);
  }, [reviews]);

  const toggleDeleteModal = (reviewId) => {
      setisDeleteModalVis(prevState => ({
          ...prevState,
          [reviewId]: !prevState[reviewId]
      }));
    };

    const {control, handleSubmit, formState: {errors}} = useForm();
    

    const NUM_REGEX = /[1-5]$/;

    const [isSignOutModalVisible,setIsSignOutModalVisible] = useState(false);
    const handleDeleteReview = (review) => {
      // Logic to handle delete review action
      
      toggleDeleteModal(review._id) ;// Open the modal
    };

    const ActuallyDeleteReview = async(reviewID) =>{
        const data = await deleteReview(reviewID);
        console.log("message:",data.message);
        toggleDeleteModal(reviewID);
        fetchReviews();
    };
    


    return(
        <>

        {message.text ? (<AppNotifcation type={message.type} text={message.text}/>): null}

            <View style={{ flexDirection: "row-reverse", marginBottom: 8, paddingHorizontal:10, paddingTop: 10}}>
                <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
                      <Image source={signOutIcon} style={{ width: 30, height: 30}} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
                      <Image source={settingsIcon} style={{ width: 29, height: 29, marginRight: 10}} />
                </TouchableOpacity>
            </View>

          <View style={{marginTop:4, marginBottom:4}}>  
            <Text style={styles.setting}>My Reviews</Text>
          </View>

        <ScrollView>
          <View style = {DetailStyle.container}>
            
        
            {reviews && reviews.length > 0 && reviews.map((review, index) => (
              
              <React.Fragment key = { index }>
              <ReviewCard key={review._id}>
                <View style={{ position: "relative" }}>
                  <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                    <Text style={DetailStyle.boldItemsTitle}>
                      Podcast: {review.Podcast || "You have not reviewed any podcasts yet."}
                    </Text>
                  </View>
                </View>

                <View style={{ flexDirection: "row", marginBottom: 8 }}>
                  <Text style={DetailStyle.boldItemsRating}>
                    {review.Comment ? `Comment: ${review.Comment}` : `No comment provided.`}
                  </Text>
                </View>

                <View style={{ flexDirection: "row" }}>
                  <Text style={DetailStyle.boldItemsRating}>
                    {review.Rating ? `Rating: ${review.Rating}` : null}
                  </Text>
                </View>

                {review._id && (
                <View style={{ flexDirection: "row", paddingLeft:275 }}>

                  <TouchableOpacity onPress={() => navigation.navigate("EditReview",{ReviewID : review._id, Rating: review.Rating, Comment: review.Comment})}>
                        <Image source={editIcon} style={{ width: 20, height: 20, marginRight: 8 }} />
                    </TouchableOpacity>

                  <TouchableOpacity onPress={() => handleDeleteReview(review)}>
                        <Image source={deleteIcon} style={{ width: 20, height: 20, justifyContent: 'flex-end'}} />
                  </TouchableOpacity>

                </View>
                )}
                
              </ReviewCard>


              
              <Modal animationType='slide' transparent={true} visible={isDeleteModalVis[review._id]} onRequestClose={()=> toggleDeleteModal(review._id)}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, .7)' }}>
                    <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>

                    <Text style={{fontSize:15, textAlign: 'center', fontWeight: 'bold', paddingBottom: 30}}>Are you sure you want to delete review</Text>

                      <CustomButton 
                        type="DELETE"
                        text = "Delete Review"
                        onPress={()=>ActuallyDeleteReview(review._id)}
                      />
                      <CustomButton
                              text= "Go Back"
                              onPress={() => toggleDeleteModal(review._id)}
                              type = "TERTIARY"
                          />
                    </View>
                  </View>
              </Modal>
              </React.Fragment>
            
            

            ))}


            
          

        </View>            
        </ScrollView>
        </>
    );
};


const styles = StyleSheet.create({
    setting: {
        textAlign: 'center',
        fontWeight: 'bold',
        paddingLeft: 10,
        paddingTop: 10,
        fontSize: 30, 
        fontFamily: 'RobotoMono-Bold',
    },

    
    root: {
        alignItems: 'center',
        padding: 40,

    },
    filler: {
        paddingVertical:50
    },
    text: {
        color: 'black',
        
    }
});

const DetailStyle = StyleSheet.create({
    titleText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#333',
    },
    logo:{
        maxWidth:600,
        marginBottom: 5,
        

    },
    paragraph: {
      marginVertical: 8,
      lineHeight: 20,
    },
    container: {
      flex: 1,
      padding: 20,
    },
    commentText:{
      
      textAlign:"center",
      justifyContent:'flex-end'
    },
    boldItemsTitle:{
       fontWeight: 'bold' ,
       textAlign:'left',
       justifyContent:"flex-start"
    },
    boldItemsRating:{
      fontWeight: 'bold' ,
      textAlign:'left',
      justifyContent:"flex-end"
   },
    wrapper:{
      padding:10
    },
  });


export default AccountScreen; 

//onPress={() => handleEditReview(review)}    onPress={() => handleDeleteReview(review)}
//onPress={() => submitEdit(review)}