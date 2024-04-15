import React, {useState,useEffect, useLayoutEffect} from 'react';
import { useNavigation } from '@react-navigation/native';
import {View, Text, ScrollView,useWindowDimensions, SafeAreaView, FlatList,StyleSheet,TouchableOpacity,Image} from 'react-native';
import CustomHeader from '../../components/CustomHeader';
import PodcastCard from '../../components/PodcastCard'
const { Client } = require('podcast-api');

const HomeScreen = ({route}) => {
    console.log("in home screen");

    const {height} = useWindowDimensions();
    const navigation = useNavigation();
    const [searchQuery, setSearchQuery] = useState('');
    const [podcasts, setPodcasts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);
    const [error, setError] = useState('');

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    // const [reviews, setReviews] = useState([]);
    // const [searchType, setSearchType] = useState('Podcast');
    // const [searchInput, setSearchInput] = useState('');

    const userId  = route.params?.userId;
    console.log("homescreen UID",userId);
    //const openDrawer = () => {
    //    navigation.navigate('MenuScreen',{userId: userId});
   // };
   // useLayoutEffect(() => {
        //Call openDrawer function when HomeScreen is reached
     //   openDrawer();
    //}, []);
    
    const fetchInitialPodcasts = async () => {
        const client = Client({ apiKey: '' });
        try {
              client.fetchBestPodcasts({
              region: 'us',
              sort: 'listen_score',
              safe_mode: 0,
            
            }).then((response) => {

              setPodcasts(response.data.podcasts);
              console.log(podcasts);

            }).catch((error) => {

              console.log(error)

            });

        } catch (error) { //Probably redundant, but didn't want to mess anything up
            console.error('Error fetching reviews:', error);
            setError('Error fetching reviews');
        }
    };

    // initial podcast load up, gotten from web-app
    useEffect(() => {
            console.log("fetching");
           fetchInitialPodcasts();
         },[]);


    return (
        
        <View style={styles.root}>
            <Text style={{ marginVertical:height*.05,fontSize: 24, alignSelf: 'center'}}>Explore Page</Text>
            <FlatList style={{marginBottom:height*.2}}data={podcasts} renderItem={({item}) => 
            {
                //console.log("Image URL:",item.image);
                return(
                    
                    <TouchableOpacity onPress={() =>{navigation.navigate('PodcastDetails', {...item,userId:userId})}} >
                        <PodcastCard image=
                            {<Image 
                                source={{ uri: item.image }} 
                                style={[styles.podcastLogo,{height: height * .08,borderRadius:20,}]} 
                                resizeMode="contain" 
                            />} >
                            
                            <Text style ={styles.title}>
                                {item.title}
                            </Text>
                        </PodcastCard>
                    </TouchableOpacity>
                )
            }}/>
        </View>
    );
};



const styles = StyleSheet.create({
    root: {
        
        backgroundColor: '#41a0ff',

    },
    podcastLogo:{
        maxWidth:100,
        marginBottom: 2,
        
    },
    title: {
        fontSize: 16,
        textAlign: 'left',
        padding : 10,
    },
    filler: {
        paddingVertical:50
    },
    text: {
        color: 'black',
        
    }
});

export default HomeScreen;