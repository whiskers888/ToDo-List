import React, {useState} from 'react';
import { View, KeyboardAvoidingView, TextInput, Image, Platform, TouchableWithoutFeedback, Button,Pressable,Text, Keyboard, Alert, TouchableOpacity  } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { gStyle } from '../constant/style';
import { FontAwesome } from '@expo/vector-icons';

// импорт контекста аутентификации
import {AuthContext} from "../context/AuthContext";
import Authorization from '../API/API';


export default function Login ({navigation}) {

  const [username, setUsername] = useState('')
  const [pass, setPass] = useState('')

  const { signIn } = React.useContext(AuthContext)
  
  function submitHandler(){
    if (username !== '' && pass !== ''){
      Authorization(username,pass, res => {
        console.log(res)
        if (res.data.item.token !== null & res.status == true){
          signIn();
        }
      }
      )
    } else{
      Alert.alert('Внимание','Введите данные в поля для входа в приложение')
    }
};


  return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{flex:1}}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={gStyle.inner}>
          <View>
                  <Image source = {require('../assets/logo.png')} style = {gStyle.logo} />
                  <StatusBar style="auto" />
              </View>
                <View style = {{display:'flex'}}>
                  <View style={gStyle.authSection}>
                      <FontAwesome 
                          style={gStyle.searchIcon} 
                          name="user-circle" 
                          size={30} 
                          color="#009eeb"/>
                      <TextInput
                          style={gStyle.input}
                          placeholder={"Введите логин"}
                          onChangeText={(username) => setUsername(username)}
                      />
                </View>
                  
                  <View style={gStyle.authSection}>
                      <FontAwesome 
                      style={gStyle.searchIcon} 
                      name="lock" 
                      size={38} 
                      color="#009eeb"/>
                      <TextInput
                      style={gStyle.input}
                      placeholder={"Введите пароль"}
                      secureTextEntry={true}
                      onChangeText={(pass) => setPass(pass)}
                      />
                  </View>
                  <TouchableOpacity style={gStyle.btnSubmit} onPress ={submitHandler} activeOpacity={0.6}>
                    <Text style={gStyle.text}>Войти</Text>
                </TouchableOpacity>
                <View style={gStyle.regField}>
                    <Text style={gStyle.smallText}> Нет аккаунта? </Text>
                    <TouchableOpacity style={gStyle.smallBtn} onPress ={() => {
                      navigation.navigate('Registration');
                    }} activeOpacity={0.6}>
                        <Text style={gStyle.btnRegistration}>Зарегистрироваться</Text>
                    </TouchableOpacity>
                </View>
              </View>
              
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
  );
};