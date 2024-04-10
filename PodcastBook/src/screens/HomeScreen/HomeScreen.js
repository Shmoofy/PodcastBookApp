import React, {useState,useEffect} from 'react';
import { useNavigation } from '@react-navigation/native';
import {View, Text, ScrollView, SafeAreaView, FlatList,StyleSheet,TouchableOpacity} from 'react-native';
import CustomHeader from '../../components/CustomHeader';
const HomeScreen = () => {

    const navigation = useNavigation();

    useEffect(() => {
        // Call openDrawer function when HomeScreen is reached
        openDrawer();
    }, []);

    const openDrawer = () => {
        navigation.navigate('MenuScreen');
    };

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