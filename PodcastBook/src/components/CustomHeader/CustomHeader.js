import React from "react";
import { StyleSheet, Text, View } from "react-native";


// can possibly use createDrawerNavigator for bar to move to the right
// currently not sure how to implement header functionality

const CustomHeader = ({text}) => {
    return (
        <View style = {StyleSheet.header}>
           
            {/*icon for menu*/}
            <View>
                <Text style={styles.headerText}>{text}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    header:{
        width: '100%',
        height: 60,
        flexDirection: 'row',
        alignItems:'center',
        justifyContent: 'center',
        backgroundColor: 'grey', height: 60
    },
    headerText:{
        fontWeight: 'bold',
        alignSelf:'center',
        fontSize: 20,
        color: '#333',
        letterSpacing: 1
    },
    
});

export default CustomHeader;