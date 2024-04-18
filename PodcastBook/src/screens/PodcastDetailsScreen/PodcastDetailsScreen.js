import React,{useState,useEffect} from "react";
import { StyleSheet,View,Text,Image, useWindowDimensions} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import CustomButton from "../../components/CustomButton";
import { Button } from "react-native-paper";
import { useNavigation, useFocusEffect  } from "@react-navigation/native";
import { useIsFocused } from '@react-navigation/native';
import { getReviews } from "../../components/podcastsAPI";
import ReviewCard from "../../components/ReviewCard/PodcastCard/ReviewCard";



const PodcastDetails = ({route}) =>
{
    const {height} = useWindowDimensions();
    const navigation = useNavigation();

    const {title,description,image} = route.params;
  
    const userId = route.params?.userId;
    //const [reviews, setReviews] = useState([]);
    console.log("In podcast detail screen");
    console.log("title=",title);
    console.log("details userid:",userId);

    const isFocused = useIsFocused();
    const [reviews, setReviews] = useState([]);
    const [totalReviews, setTotalReviews] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    const [comments, setComments] = useState([]);

    const [refresh, setRefresh] = useState(false);



    useFocusEffect(
      React.useCallback(() => {
        const fetchReviews = async () => {

          try {
            const data = await getReviews(title); // Call your getReviews API function
            //console.log('API response:', data);
  
            if (data.message == "Request failed with status code 404") {
              console.log("No reviews found in if");
              setReviews([{}]);
              setTotalReviews(0);
    
            }
    
            if (data && data.reviews) {
              
              setReviews(data.reviews);
              setTotalReviews(data.totalReviews);
              console.log(reviews);
              //console.log("TESTNIG CMT",reviews.Comment);
              console.log(totalReviews);
  
              // Extract comments from reviews
              //const commentList = data.reviews.map((review) => review.Comment);
              //setComments(commentList);
            }
    
            setIsLoading(false);
          } catch (error) {
            console.error('Error fetching reviews:', error);
            setIsLoading(false);
          }
        };
        // Fetch reviews when screen comes into focus
        fetchReviews();
      }, [title])
    );

    const writeReview = () => {
        navigation.navigate('Write Review', {userId: userId, title: title, refresh:refresh});
        
    }

    return (
      <ScrollView style = {DetailStyle.root}>
        <View style = {DetailStyle.container}>
            <Image source={{uri: image}} style={[DetailStyle.logo, {height:height*.3}]} resizeMode="contain"/>
            <Text style ={DetailStyle.titleText}>{title}</Text>
            <Text style ={DetailStyle.paragraph}>{description}</Text>
            <CustomButton 
              text = "Add Review"
              onPress={writeReview}/>

            {reviews.map((review,index) => (
              <React.Fragment key={index}>
              <ReviewCard key={review._id}>
                <View style={{flexDirection:"row"}}>

                  <View style={{flex:1}}>
                    <Text style={DetailStyle.boldItemsUsername}>
                      {review.Username ? review.Username : "No reviews for this podcast"}:   
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
                        {review.Rating ? `Rating: ${review.Rating}` : null}
                    </Text>

                  </View>
                  
                </View>
                
              </ReviewCard>
            </React.Fragment>
          ))}
        </View>
      </ScrollView>
    )
}

const DetailStyle = StyleSheet.create({
    root: {
          
      backgroundColor: 'lightblue',

  },
    titleText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#333',
      textAlign:"center"
    },
    logo:{
        maxWidth:600,
        marginBottom: 5,
        

    },
    paragraph: {
      marginVertical: 8,
      lineHeight: 20,
      textAlign:"auto"

    },
    container: {
      flex: 1,
      padding: 20,
    },
    commentText:{
      
      textAlign:"center",
      justifyContent:'flex-end'
    },
    boldItemsUsername:{
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
export default PodcastDetails;