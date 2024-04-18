import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView, SafeAreaView, FlatList,StyleSheet, useWindowDimensions} from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { getUserInfo, searchUser, followUserCall } from "../../components/apiHelper";
import {getFeed, getUserReviews } from "../../components/podcastsAPI";
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

    const [searchTitle, setSearchTitle] = useState('');


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
        setSearchTitle('Friends Reviews');

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
          console.log(followData.message);
          updateNotification(setMessage, followData.message );
          fetchFeed();
        } 

        } catch (error) {

          console.log("User not found");
          updateNotification(setMessage, "User not found", 'error');
        }
        
    }

    const getFriendsReview = async () => {
      setIsLoading(true);
      setHasSearched(true);
  
      if (!searchQuery.trim()){
      //   console.error('Error: Search query cannot be empty');
          fetchFeed();
      //   setIsLoading(false); 
      //   setHasSearched(false);
        return; 
      }

      

      try {
        console.log("inside first try catch");
        const res = await searchUser(userInfo.user.Username, searchQuery);
        

          if (res[0].Username === searchQuery) {
            //no user found
            //check if there is review in that user name
            //get user info
            console.log("User found", res[0].Username);
            
            const data = await getUserReviews(res[0]._id);

            if (data.totalUserReviews > 0) {
                  if (data.message == "Request failed with status code 404") {
                    console.log("No reviews found in if");
                    setSearchTitle('Friends Reviews');
                    setReviews([{}]);
                    setTotalReviews(0);
                }
                if (data) {
                    console.log("setting reviews if user found");
                    setSearchTitle(`${searchQuery}'s Reviews`);
                    setReviews(data.userReviews);
                    setTotalReviews(data.userReviews.length);
              //console.log(reviews);
              //console.log(totalReviews);
                }
            } else {
              updateNotification(setMessage, "No reviews found for this user", 'error');
              fetchFeed();
              return;
            }

            

            //updateNotification(setMessage, followData.message );
          } else {
            updateNotification(setMessage, "User not found", 'error');

          }
          

          setIsLoading(false);

      } catch (error) {
        //console.error('Error fetching search reviews:', error);
        updateNotification(setMessage, "User not found", 'error');
        setIsLoading(false);
      }
      
    };

    

    return(
        <>
        
        {message.text ? (<AppNotifcation type={message.type} text={message.text}/>): null}

        <View style={{marginTop:height*.025, marginBottom:height*.018}}>
            <SearchFriendBar
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    handleSearch={getFriendsReview}
                    onIconPress={followUser}
            />
            <View style = {{marginBottom: 20, marginTop:20}}></View>
            <Text style={{textAlign:'center', fontSize: 20, marginBottom: 5, fontWeight: 'bold'}}>{searchTitle}</Text>

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