import { Alert, Platform } from 'react-native';

const server = Platform.OS === 'ios'
    ? 'http://localhost:3000' 
    :  'http://10.0.2.2:3000';

function showError(error) {
    if(error.response && error.response.data){
        Alert.alert('Ops! Ocorreu um Problema!', `Mensagem: ${error.response.data}`);
    } else {
        Alert.alert('Ops! Ocorreu um Problema!', `Mensagem: ${error}`);
    }
}

function showSuccess(msg) {
    Alert.alert('Sucesso!', msg);
}

export { server, showError, showSuccess };