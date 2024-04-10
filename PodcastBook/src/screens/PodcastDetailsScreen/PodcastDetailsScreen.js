import React from "react";
import { StyleSheet,View,Text } from "react-native";


const PodcastDetails = ({route}) =>
{
    
    const {title,description} = route.params;
    console.log("In podcast detail screen");
    console.log("title=",title)
    return (
        <View style = {DetailStyle.container}>
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