import React, {useState} from 'react';
import {View, Text, ScrollView, SafeAreaView, FlatList,StyleSheet} from 'react-native';

const SettingsScreen = ({route})=>
{
    const userId = route.params.userId;
    console.log("userid settingsUID:", userId);
    return(
        <View>
            <View>
                <Text style={{ marginVertical:40,fontSize: 24, alignSelf: 'center'}}>SettingsScreen</Text>
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
export default SettingsScreen; 