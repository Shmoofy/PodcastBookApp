import React,{useState,useEffect} from "react";
import { StyleSheet,View,Text,Image, useWindowDimensions} from "react-native";
import { getReviews } from "../../components/podcastsAPI";
import ReviewCard from "../../components/ReviewCard/PodcastCard/ReviewCard";
import { ScrollView } from "react-native-gesture-handler";


const PodcastDetails = ({route}) =>
{
    const {height} = useWindowDimensions();
    const {title,description,image} = route.params;
    const userId = route.params?.userId;
    //const [reviews, setReviews] = useState([]);
    console.log("In podcast detail screen");
    console.log("title=",title);
    //console.log(image);
    console.log("details userid:",userId);

    const [reviews, setReviews] = useState([]);
    const [totalReviews, setTotalReviews] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    const [comments, setComments] = useState([]);

    useEffect(() => {
      const fetchReviews = async () => {
        try {
          const data = await getReviews(title); // Call your getReviews API function
          console.log('API response:', data);
  
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
  
      fetchReviews();
    }, [title]); // Dependency array to re-run effect when userId changes


    return (
      <ScrollView>
        <View style = {DetailStyle.container}>
            <Image source={{uri: image}} style={[DetailStyle.logo, {height:height*.3}]} resizeMode="contain"/>
            <Text style ={DetailStyle.titleText}>{title}</Text>
            <Text style ={DetailStyle.paragraph}>{description}</Text>
            {reviews.map((review) => (
            <ReviewCard key={review._id}>
              <View style={{flexDirection:"row"}}>

                <View style={{flex:1}}>
                  <Text style={DetailStyle.boldItemsUsername}>
                    {review.Username}:   
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
                      Rating:{review.Rating} Stars
                  </Text>

                </View>
                
              </View>
               
            </ReviewCard>
          ))}
        </View>
      </ScrollView>
    )
}

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