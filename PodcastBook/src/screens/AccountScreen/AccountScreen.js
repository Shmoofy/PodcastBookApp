import React, {useEffect, useState} from 'react';
import {View, Text, SafeAreaView, FlatList,StyleSheet, useWindowDimensions} from 'react-native';
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import ReviewCard from "../../components/ReviewCard/PodcastCard/ReviewCard";
import { getUserInfo } from "../../components/apiHelper";
import { getUserReviews } from "../../components/podcastsAPI";

const AccountScreen = ({route})=>
{
    const {height} = useWindowDimensions();
    const navigation = useNavigation();
    const userId = route.params.userId;
    console.log("userid settingsUID:", userId);
    const [reviews, setReviews] = useState([]);
    const [totalReviews, setTotalReviews] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        
        
        getInfo();
        fetchReviews();
    },[userId]);

    const getInfo = async () => {
        const userInfo = await getUserInfo(userId);
        console.log('getting user info on account screen')
        console.log(userInfo);
    }

    const fetchReviews = async () => {

        try {
            const data = await getUserReviews(userId); // Call your getReviews API function
            console.log('API response:', data);

            if (data.message == "Request failed with status code 404") {
                console.log("No reviews found in if");
                setReviews([{}]);
                setTotalReviews(0);
      
            }

            if (data && data.userReviews) {
            
                console.log("INSIDE IF");
                setReviews(data.userReviews);
                setTotalReviews(data.totalUserReviews);
                console.log(reviews);
                //console.log("TESTNIG CMT",reviews.Comment);
                console.log(totalReviews);
              }

              console.log("logging array of reviews", reviews);

              setIsLoading(false);

        } catch (error) {
            console.error('Error fetching reviews:', error);
            setIsLoading(false);
        }
    };


    return(
        <ScrollView>
          <View style = {DetailStyle.container}>
            <Text style={styles.setting}>Settings</Text>
            <Text style={styles.setting}>My Reviews</Text>
            
            {reviews.map((review) => (
                
            <ReviewCard key={review._id}>
              <View style={{flexDirection:"row"}}>

                <View style={{flex:1}}>
                  <Text style={DetailStyle.boldItemsTitle}>
                    {review.Podcast ? review.Podcast : "You have not reviewed any podcasts yet."}:   
                  </Text>
                </View>

                <View style={{flex:1}}>
                  <Text style={DetailStyle.commentText}>
                    {review.Comment}  
                  </Text>
                </View>
                
                

              </View>

              <View style={{flexDirection:"row"}}>
                <View style={{flex:1}}>

                  <Text style={DetailStyle.boldItemsRating}>
                      {review.Rating ? `Rating: ${review.Rating} Stars` : null}
                  </Text>

                </View>
                
              </View>
               
            </ReviewCard>
          ))}
          

        </View>            
        </ScrollView>

    );
};


const styles = StyleSheet.create({
    setting: {
        alignItems: 'center',
        fontWeight: 'bold',
        paddingLeft: 10,
        paddingTop: 10,
        fontSize: 30, 
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