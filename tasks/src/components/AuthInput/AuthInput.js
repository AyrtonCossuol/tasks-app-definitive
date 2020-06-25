import React from 'react';
import { View, TextInput } from 'react-native';

import styles from './styles';

import Icon from 'react-native-vector-icons/FontAwesome';

export default props => {
    return(
        <View style={[styles.container, props.style]}>
            <Icon name={props.icon} size={20} style={styles.icon} />
            <TextInput {...props} style={styles.input} />
        </View>
    );
};