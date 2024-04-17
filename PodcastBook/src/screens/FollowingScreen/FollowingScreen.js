import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView, SafeAreaView, FlatList,StyleSheet, useWindowDimensions} from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { getUserInfo, searchUser, followUserCall } from "../../components/apiHelper";
import {getFeed } from "../../components/podcastsAPI";
import ReviewCard from '../../components/ReviewCard/PodcastCard/ReviewCard';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

import SearchFriendBar from '../../components/SearchFriendBar';
import AppNotifcation from "../AppNotification/AppNotification";
import { updateNotification } from "../../components/helper";




const FollowingScreen = ({route})=>
{
    const userId = route.params.userId;
    console.log("userid aboutscreen:", userId);
    const [reviews, setReviews] = useState([]);
    const [totalReviews, setTotalReviews] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const {height} = useWindowDimensions();

    const [searchType, setSearchType] = useState('podcast');
    const [searchQuery, setSearchQuery] = useState('');
    const [hasSearched, setHasSearched] = useState(false);
    const [userInfo, setUserInfo] = useState({});

    const [message, setMessage] = useState({
      text: '',
      type:''
     })
    


    useEffect(() => {
        getInfo();
        fetchFeed();
    }, [userId]);

    const getInfo = async () => {
        setUserInfo(await getUserInfo(userId));
        //console.log('getting user info on following screen')
        //console.log(userInfo);
    }

    const fetchFeed = async () => {
        try {
            const data = await getFeed(userId);
            //console.log('API response:', data);

            if (data.message == "Request failed with status code 404") {
                console.log("No reviews found in if");
                setReviews([{}]);
                setTotalReviews(0);
            }

            if (data) {
                console.log("INSIDE IF");
                setReviews(data);
                setTotalReviews(data.length);
                //console.log(reviews);
                //console.log(totalReviews);
            }

            //console.log("logging array of reviews", reviews);

            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching reviews:', error);
            setIsLoading(false);
        }
    }

    const followUser = async () => {
        setIsLoading(true);
        setHasSearched(true);
        console.log(userInfo);
        console.log(searchQuery);
        console.log(userInfo.user.Username);

        const data = await searchUser(userInfo.user.Username, searchQuery);
        try {
          if (data[0].Username === searchQuery) {
          //no user found
          console.log("User found", data[0].Username);
          const followData = await followUserCall(userId, data[0]._id);
          console.log(followData);
          updateNotification(setMessage, "User followed");
        } 

        } catch (error) {

          console.log("User not found");
          updateNotification(setMessage, "User not found", 'error');
        }
        
          
        
        //call follow user api
        
        

    }

    return(
        <>
        
        {message.text ? (<AppNotifcation type={message.type} text={message.text}/>): null}

        <View style={{marginTop:height*.025, marginBottom:height*.018}}>
            <SearchFriendBar
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    handleSearch={followUser}
            />
            <Text style={{textAlign:'center', fontSize: 20, fontWeight: 'bold', marginBottom: 10}}>Followed Users</Text>
            <View style = {{marginBottom: 20, marginTop:20}}></View>
            <Text style={{textAlign:'center', fontSize: 20, marginBottom: 5, fontWeight: 'bold'}}>Followed Reviews</Text>

        </View>

        <ScrollView>
          <View style = {DetailStyle.container}>
        
            {reviews.map((review) => (
                
            <ReviewCard key={review._id}>

              <View style={{ flexDirection: "row", marginBottom: 8 }}>
                  <Text style={DetailStyle.boldItemsRating}>
                    {review.Username ? `Username: ${review.Username}` : null}
                  </Text>
                </View>

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

                <View style={{ flexDirection: "row", marginBottom: 8 }}>
                  <Text style={DetailStyle.boldItemsRating}>
                    {review.Rating ? `Rating: ${review.Rating}` : null}
                  </Text>
                </View>

                
               
            </ReviewCard>
          ))}
          

        </View>            
        </ScrollView>
        </>
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