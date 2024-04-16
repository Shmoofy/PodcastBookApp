import React, {useState,useEffect, useLayoutEffect} from 'react';
import { useNavigation } from '@react-navigation/native';
import {View, Text, ScrollView,useWindowDimensions, SafeAreaView, FlatList,StyleSheet,TouchableOpacity,Image} from 'react-native';
import CustomHeader from '../../components/CustomHeader';
import PodcastCard from '../../components/PodcastCard';
import SearchBar from '../../components/SearchBar/SearchBar';
const { Client } = require('podcast-api');

const normalizeData = (data) => {
    const normalizedData = {
      title: data.title_original || data.title,
      image: data.image,
      description: data.description || data.description_highlighted,
    //   id: data.id,
    //   type: data.audio ? 'episode' : 'podcast',
    }
  
    if (data.audio) {
      normalizedData.audio = data.audio;
    } else {
      normalizedData.episodeCount = data.total_episodes;
    }
  
    return normalizedData;
  };

const HomeScreen = ({route}) => {
    console.log("in home screen");

    const API_KEY = '';
    const {height} = useWindowDimensions();
    const navigation = useNavigation();

    const [searchType, setSearchType] = useState('podcast');
    const [searchQuery, setSearchQuery] = useState('');
    const [hasSearched, setHasSearched] = useState(false);

    const [podcasts, setPodcasts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    
    const [error, setError] = useState('');

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    
    const userId  = route.params?.userId;
    console.log("homescreen UID",userId);
    
    const handleClearIconPress = () => {
        setSearchQuery(''); // Clear the search query
        fetchPodcasts(); // Fetch podcasts with an empty search query
        
      };

    const fetchPodcasts = async () => {
        setIsLoading(true);
        setHasSearched(true);
    
        if (!searchQuery.trim()){
        //   console.error('Error: Search query cannot be empty');
          fetchInitialPodcasts();
        //   setIsLoading(false); 
        //   setHasSearched(false);
          return; 
        }
    
        const client = Client({ apiKey: API_KEY });
        try {
          // Use the search method from the client
          const response = await client.search({
            q: searchQuery,
            type: searchType, 
            language: 'English',
            region: 'us'
          });
    
          console.log('Podcasts searched', response.data.results);
          const normalizedPodcasts = response.data.results.map(normalizeData);
          setPodcasts(normalizedPodcasts);
          
          //setLastSearchType(searchType);
        } catch (error) {
          console.error('Error fetching podcasts:', error);
        } finally {
          setIsLoading(false);
        }
      };
    
    const fetchInitialPodcasts = async () => {
        const client = Client({ apiKey: API_KEY });
        try {
              client.fetchBestPodcasts({
              region: 'us',
              sort: 'listen_score',
              safe_mode: 0,
            
            }).then((response) => {

              setPodcasts(response.data.podcasts);
              console.log({podcasts});

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
            
            <View style={{marginTop:height*.025, marginBottom:height*.018}}>
                <SearchBar
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    handleSearch={fetchPodcasts}
                />
            </View>
            
            <FlatList style={{marginBottom:height*.15}}data={podcasts} renderItem={({item}) => 
            {
                
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