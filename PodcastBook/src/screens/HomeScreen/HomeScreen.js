import React, {useState,useEffect} from 'react';
import { useNavigation } from '@react-navigation/native';
import {View, Text, ScrollView, SafeAreaView, FlatList,StyleSheet,TouchableOpacity} from 'react-native';
import CustomHeader from '../../components/CustomHeader';
const { Client } = require('podcast-api');

const HomeScreen = () => {

    const navigation = useNavigation();
    const [searchQuery, setSearchQuery] = useState('');
    const [podcasts, setPodcasts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);
    const [error, setError] = useState('');
    // const [reviews, setReviews] = useState([]);
    // const [searchType, setSearchType] = useState('Podcast');
    // const [searchInput, setSearchInput] = useState('');

    useEffect(() => {
        // Call openDrawer function when HomeScreen is reached
        openDrawer();
    }, []);

    const openDrawer = () => {
        navigation.navigate('MenuScreen');
    };

    // initial podcast load up, gotten from web-app
    useEffect(() => {
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
       
           fetchInitialPodcasts();
         },);


    return (
        
        <View>
            
            
            <Text style={{ marginVertical:40,fontSize: 24, alignSelf: 'center'}}>HomeScreen</Text>
            
            <ScrollView>
                <View>
                    
                    <Text style={styles.placeholder}>placeholder </Text>
                    <Text style={styles.placeholder}>placeholder2 </Text>
                    <Text style={styles.placeholder}>placeholder3 </Text>
                    <Text style={styles.placeholder}>placeholder4 </Text>
                    <Text style={styles.placeholder}>placeholder5 </Text>
                    <Text style={styles.placeholder}>placeholder6 </Text>
                    <Text style={styles.placeholder}>placeholder7 </Text>
                    <Text style={styles.placeholder}>placeholder8 </Text>
                    <Text style={styles.placeholder}>placeholder9 </Text>
                    <Text style={styles.placeholder}>placeholder10 </Text>
                    <Text style={styles.placeholder}>placeholder11 </Text>
                    <Text style={styles.placeholder}>placeholder12 </Text>
                    <Text style={styles.placeholder}>placeholder13 </Text>
                    <Text style={styles.placeholder}>placeholder14 </Text>
                    <Text style={styles.placeholder}>placeholder15 </Text>


                </View>
                
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        padding: 40,

    },
    placeholder: {
        fontSize: 16,
        alignContent: 'flex-start',
        padding : 20,
    },
    filler: {
        paddingVertical:50
    },
    text: {
        color: 'black',
        
    }
});

export default HomeScreen;