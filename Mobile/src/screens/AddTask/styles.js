import { StyleSheet} from 'react-native';

import commonStyles from '../../commonStyles';

export default StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },

    container: {
        backgroundColor: '#fff',
    },

    header: {
        fontFamily: commonStyles.fontFamily,
        backgroundColor: commonStyles.colors.today,
        color: commonStyles.colors.secondary,
        textAlign: 'center',
        padding: 15,
        fontSize: 16,
    },

    input: {
        fontFamily: commonStyles.fontFamily,
        height: 40,
        margin: 15,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#e3e3e3',
        borderRadius: 6,
    },

    buttons: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },

    button: {
        margin: 20,
        marginRight: 30,
        color: commonStyles.colors.today,
    },

    date: {
        fontFamily: commonStyles.fontFamily,
        fontSize: 20,
        marginLeft: 15,
    }
});