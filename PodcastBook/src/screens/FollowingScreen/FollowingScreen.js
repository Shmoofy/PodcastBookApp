import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView, SafeAreaView, FlatList,StyleSheet} from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { getUserInfo } from "../../components/apiHelper";
import {getFeed } from "../../components/podcastsAPI";
import ReviewCard from '../../components/ReviewCard/PodcastCard/ReviewCard';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

const FollowingScreen = ({route})=>
{
    const userId = route.params.userId;
    console.log("userid aboutscreen:", userId);
    const [reviews, setReviews] = useState([]);
    const [totalReviews, setTotalReviews] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getInfo();
        fetchFeed();
    }, [userId]);

    const getInfo = async () => {
        const userInfo = await getUserInfo(userId);
        console.log('getting user info on following screen')
        console.log(userInfo);
    }

    const fetchFeed = async () => {
        try {
            const data = await getFeed(userId);
            console.log('API response:', data);

            if (data.message == "Request failed with status code 404") {
                console.log("No reviews found in if");
                setReviews([{}]);
                setTotalReviews(0);
            }

            if (data) {
                console.log("INSIDE IF");
                setReviews(data);
                setTotalReviews(data.length);
                console.log(reviews);
                console.log(totalReviews);
            }

            console.log("logging array of reviews", reviews);

            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching reviews:', error);
            setIsLoading(false);
        }
    }

    return(
        <ScrollView>
          <View style = {DetailStyle.container}>
        
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

              <View style={{flexDirection:"row"}}>
                <View style={{flex:1}}>

                  <Text style={DetailStyle.boldItemsTitle}>
                      {review.Username}
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
export default FollowingScreen; 