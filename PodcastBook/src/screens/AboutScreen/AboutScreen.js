import React, {useState} from 'react';
import {View, Text, ScrollView, SafeAreaView, FlatList,StyleSheet} from 'react-native';

const AboutScreen = ()=>
{
    return(
        <View>
            <View>
                <Text style={{ marginVertical:40,fontSize: 24, alignSelf: 'center'}}>AboutScreen</Text>
            </View>
        </View>

    );
};
const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        padding: 40,

    },
    filler: {
        paddingVertical:50
    },
    text: {
        color: 'black',
        
    }
});
export default AboutScreen; 