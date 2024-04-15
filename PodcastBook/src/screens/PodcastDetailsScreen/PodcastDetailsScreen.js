import React from "react";
import { StyleSheet,View,Text,Image, useWindowDimensions} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import CustomButton from "../../components/CustomButton";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";




const PodcastDetails = ({route}) =>
{
    const {height} = useWindowDimensions();
    const navigation = useNavigation();
    const {title,description,image} = route.params;
    const userId = route.params?.userId;
    console.log("In podcast detail screen");
    console.log("title=",title);
    console.log(image);
    console.log("details userid:",userId);

    const writeReview = () => {
        navigation.navigate('WriteReview', {userId: userId, title: title});
    }

    return (
        <ScrollView style = {DetailStyle.container}>
            <Image source={{uri: image}} style={[DetailStyle.logo, {height:height*.3}]} resizeMode="contain"/>
            <Text style ={DetailStyle.titleText}>{title}</Text>
            <Text style ={DetailStyle.paragraph}>{description}</Text>
            <CustomButton 
              text = "Add Review"
              onPress={writeReview}/>
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
  });
export default PodcastDetails;