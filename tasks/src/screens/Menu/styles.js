import { StyleSheet } from 'react-native';

import commonStyles from '../../commonStyles';

export default StyleSheet.create({
    header: {
        borderBottomWidth: 1,
        borderColor: '#ddd',
    },

    title:{
        color: '#000',
        fontFamily: commonStyles.fontFamily,
        fontSize: 30,
        paddingTop: 16,
        padding: 10,
    },  

    avatar: {
        width: 60,
        height: 60,
        borderWidth: 3,
        borderRadius: 30,
        margin: 10,
    },

    userInfo: {
        marginLeft: 10,
    },

    name: {
        fontFamily: commonStyles.fontFamily,
        fontSize: 20,
        marginBottom: 5,
        color: commonStyles.colors.mainText,
    },

    email: {
        fontFamily: commonStyles.fontFamily,
        fontSize: 15,
        color: commonStyles.colors.subText,
        marginBottom: 8,
    },

    logoutIcon: {
        marginLeft: 10,
        marginBottom: 8,
    }
});