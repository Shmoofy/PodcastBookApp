
import React from 'react';
import {View,StyleSheet} from 'react-native';


const PodcastCard = (props) => {
    return (
       <View style = { styles.card}>
            <View style={styles.cardContent}>
                <View style={styles.imageContainer}>
                    {props.image}
                </View>
                <View style={styles.textContainer}>
                    {props.children}
                </View>
            </View>
       </View>
    )
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 6,
        elevation : 3,
        backgroundColor : '#fff',
        shadowOffset : {width:1, height:1},
        shadowColor: '#333',
        shadowOpacity:0.3,
        shadowRadius:2,
        marginHorizontal:4,
        marginVertical:4

    },

    cardContent:{
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal:10,
        marginVertical:12,
    },
    imageContainer: {
        flex: 1,
        marginRight: 3,
        
    },
    textContainer: {
        flex: 3,
        justifyContent:'center',
    },
});

export default PodcastCard;