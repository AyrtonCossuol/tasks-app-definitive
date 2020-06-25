import React, { Component } from 'react';
import { 
    ImageBackground, 
    Text, 
    View, 
    TextInput, 
    TouchableOpacity, 
    Alert,
} from 'react-native';
import axios from 'axios';

import styles from './styles';

import backgroundImage from '../../../assets/imgs/login.jpg';
import AuthInput from '../../components/AuthInput/AuthInput';

import { server, showError, showSuccess } from '../../common';

const initialState = { 
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    stageNew: false,
};

export default class Auth extends Component {
    state = {
        ...initialState
    };

    signinOrSignup = () => {
        if(this.state.stageNew) {
            this.signup()
        } else {
            Alert.alert('Sucesso', 'Logar');
        }
    };

    signup = async () => {
        try{
            await axios.post(`${server}/signup`, {
                name: this.state.name,
                email: this.state.email,
                password: this.state.password,
                confirmPassword: this.state.confirmPassword,
            });

            showSuccess('Usuario cadastrado!');
            this.setState({ ...initialState });
        } catch(e){
            showError(e)
        }
    };

    render() {
        return(
            <ImageBackground style={styles.background} source={backgroundImage}>
                <Text style={styles.title}>Tasks</Text>

                <View style={styles.formContainer}>
                    <Text style={styles.subTitle}>
                        {this.state.stageNew ? 'Crie a sua conta' : 'Informe seus dados'}
                    </Text>
                    {this.state.stageNew && 
                        <AuthInput 
                            icon='user' 
                            style={styles.input} 
                            placeholder='Nome' 
                            value={this.state.name} 
                            onChangeText={name => this.setState({ name })}
                        />
                    }
                    <AuthInput 
                        icon='at'
                        style={styles.input} 
                        placeholder='E-mail' 
                        value={this.state.email} 
                        onChangeText={email => this.setState({ email })}
                    />
                    
                    <AuthInput 
                        icon='lock'
                        style={styles.input} 
                        placeholder='Senha' 
                        value={this.state.password} 
                        onChangeText={password => this.setState({ password })}
                        secureTextEntry={true}
                    />
                    {this.state.stageNew && 
                        <AuthInput 
                            icon='asterisk'
                            style={styles.input} 
                            placeholder='Confirmação da Senha' 
                            value={this.state.confirmPassword} 
                            onChangeText={confirmPassword => this.setState({ confirmPassword })}
                            secureTextEntry={true}
                        />
                    }

                    <TouchableOpacity onPress={this.signinOrSignup}>
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>
                                {this.state.stageNew ? 'Registrar' : 'Entrar'}
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={{ padding: 10 }} onPress={() => this.setState({ stageNew: !this.state.stageNew })}>
                    <Text style={styles.buttonText}>
                        {this.state.stageNew ? 'Já possiu conta?' : 'Ainda não possui conta?'}
                    </Text>
                </TouchableOpacity>
            </ImageBackground>
        )
    };
};
