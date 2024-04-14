import React from "react";
import { StyleSheet,View,Text,Image, useWindowDimensions} from "react-native";



const PodcastDetails = ({route}) =>
{
    const {height} = useWindowDimensions();
    const {title,description,image} = route.params;
    const userId = route.params?.userId;
    console.log("In podcast detail screen");
    console.log("title=",title);
    console.log(image);
    console.log("details userid:",userId);
    return (
        <View style = {DetailStyle.container}>
            <Image source={{uri: image}} style={[DetailStyle.logo, {height:height*.3}]} resizeMode="contain"/>
            <Text style ={DetailStyle.titleText}>{title}</Text>
            <Text style ={DetailStyle.paragraph}>{description}</Text>
            
        </View>
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