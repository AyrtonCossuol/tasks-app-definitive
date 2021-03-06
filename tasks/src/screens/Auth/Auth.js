import React, { Component } from 'react';
import { 
    ImageBackground, 
    Text, 
    View, 
    TouchableOpacity, 
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

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
            this.signup();
        } else {
            this.signin();
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
            showError(e);
        }
    };

    signin = async () => {
        try {
            const res = await axios.post(`${server}/signin`, {
                email: this.state.email,
                password: this.state.password
            })

            AsyncStorage.setItem('userData', JSON.stringify(res.data));
            axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`
            this.props.navigation.navigate('Home', res.data);
        } catch(e) {
            showError(e)
        }
    };

    render() {
        const validations = [];

        validations.push(this.state.email && this.state.email.includes('@'));
        validations.push(this.state.password && this.state.password.length >= 6);

        if(this.state.stageNew) {
            validations.push(this.state.name && this.state.name.trim().length >= 3)
            validations.push(this.state.confirmPassword);
            validations.push(this.state.password === this.state.confirmPassword);
        }

        const validForm = validations.reduce((t, a) => t && a);

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

                    <TouchableOpacity onPress={this.signinOrSignup} disabled={!validForm}>
                        <View style={[styles.button, validForm ? {} : { backgroundColor: '#aaa' }]}>
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
