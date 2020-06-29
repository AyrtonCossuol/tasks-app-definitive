import React, { Component } from 'react';
import { View, ActivityIndicator } from 'react-native';

import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

import styles from './styles';

export default class AuthOrApp extends Component {
    componentDidMount = async () => {
        const userDateJson = await AsyncStorage.getItem('userData');
        let userData = null;

        try {
            userData = JSON.parse(userDateJson);
        } catch(e) {
            //userData esta invalido
        }

        if(userData && userData.token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${userData.token}`
            this.props.navigation.navigate('Home', userData);
        } else {
            this.props.navigation.navigate('Auth');
        }
    };

    render(){
        return(
            <View style={styles.container}>
                <ActivityIndicator size='large' />
            </View>
        );
    };
};