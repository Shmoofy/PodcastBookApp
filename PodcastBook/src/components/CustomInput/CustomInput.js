import React from "react";
import { View , Text, TextInput, StyleSheet} from "react-native";
import { Controller } from "react-hook-form";

const CustomInput = ({control, name, rules = {} ,placeholder, secureTextEntry, multiline, type, defaultValue}) => {
    return (
            <Controller 
                control={control}
                name={name}
                rules={rules}
                defaultValue={defaultValue}
                render={({field: {value, onChange, onBlur}, fieldState: {error}}) => (
                <>
                    <View style={[styles.container, styles[`container_${type}`], {borderColor: error ? 'red' : '#e8e8e8' }]}>
                        <TextInput 
                            value={value} 
                            defaultValue={defaultValue}
                            onChangeText={onChange} 
                            onBlur={onBlur} 
                            placeholder={placeholder}
                            style={styles.input}
                            multiline={multiline}
                            secureTextEntry={secureTextEntry}
                            
                        />
                    </View>
                    {error && (<Text style={{color: 'red', alignSelf: 'stretch'}}>{error.message || 'Error'}</Text>)}
                </>      
                )}
            />
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        width: '100%',

        borderColor: '#e8e8e8',
        borderWidth: 1,
        borderRadius: 5,

        paddingVertical:10,
        paddingHorizontal: 10,
        marginVertical: 5,
        

    },
    input: {},
    container_BIG: {
        borderColor: '#3B71F3',
        borderWidth: 2,
        height: 200,

    },

})

export default CustomInput;