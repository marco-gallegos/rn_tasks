import React, {useState, useEffect} from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    Button,
    Label,
    TextInput,
} from 'react-native';

import {
    Colors,
    Header,
} from 'react-native/Libraries/NewAppScreen';

import axios from 'axios';
import storage from '../storage/local'

const Login = ({ navigation }) => {
//class Login extends React.Component {

    const [nickname, setNickname] = useState(0)
    const [password, setPassword] = useState(0)

    //sustituto de mounted
    useEffect(function(){
        console.log('hueles a culo use effect');
    },[])

    //sustituto de didupdate
    useEffect(function(){
        console.log('hueles a culo use effect updated');
    })
    
    async function login() {
        console.info("login from func");

        //axios.post('http://192.168.0.111:5050/api/login',
        axios.post('http://192.168.0.111:5050/api/login',
        {
            nickName:"admin",
            password:"adminp2p",
        }
        ).then(response => {
            //console.debug(response);
            //console.debug(response.data);
            if(response.data.access_token){

                storage.save(
                    {
                        key: 'user', // Note: Do not use underscore("_") in key!
                        id: '1001', // Note: Do not use underscore("_") in id!
                        data: response.data.access_token,
                        expires: 1000 * 6000
                    }
                ).then((something) => {
                    navigation.navigate('Tasks')
                });
                
                /*
                storage.load({
                    key:'user',
                    id:'1001'
                }).then(ret => {
                    console.info('cargado el token')
                    console.info(ret)
                }).catch(err => {
                    // any exception including data not found
                    // goes to catch()
                    console.warn(err.message);
                    switch (err.name) {
                        case 'NotFoundError':
                        // TODO;
                        break;
                        case 'ExpiredError':
                        // TODO
                        break;
                    }
                });
                */
            }else{
                alert("Acceso Invalido")
            }
        }).catch(err => {
            alert("Error Accediendo a API")
        })
        /**
        */
    };


    return (
        <SafeAreaView >
            <StatusBar barStyle={'dark-content'} />
            <ScrollView
                contentInsetAdjustmentBehavior="automatic"
                style={{ backgroundColor: Colors.darker}}>
                <Header />
                <View
                style={{
                    backgroundColor: Colors.black,
                }}>
                <View>
                    <Text style={{ color: Colors.white }} >Usuario</Text>
                    <TextInput
                        placeholder="Usuario .."
                        onChangeText={ (value) => {
                                //console.log(nickname)
                                setNickname(value)
                            }
                        }
                    ></TextInput>
                </View>
                
                <Text style={{ color: Colors.white }} >Password</Text>
                <TextInput
                    placeholder="Password .."
                ></TextInput>
    
                <View>
                    <Button
                        title="Log In"
                        onPress={login}
                    ></Button>
                </View>
                </View>
            </ScrollView>
        </SafeAreaView>
        /**
         */
    );
};

const styles = StyleSheet.create({
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
    },
    highlight: {
        fontWeight: '700',
    },
});

export default Login;
