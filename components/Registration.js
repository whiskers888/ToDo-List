import React, {useState} from 'react';
import { View, KeyboardAvoidingView, TextInput, Image, Platform, TouchableWithoutFeedback, Button,Pressable,Text, Keyboard, Alert, TouchableOpacity  } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { gStyle } from '../constant/style';
import { FontAwesome } from '@expo/vector-icons';

// импорт контекста аутентификации
import {AuthContext} from "../context/AuthContext";
import {Registrate} from '../API/API';


export default function Registration ({navigation}) {

  const [Name, setFIO] = useState('')
  const [Login, setLogin] = useState('')
  const [Pass, setPass] = useState('')
  const [ConfirmPass, setConfPass] = useState('')

  const { signIn } = React.useContext(AuthContext)
  
  function submitHandler(){
    if (Name !== '' && Login !== '' && Pass !=='' && ConfirmPass !=''){
      if(ConfirmPass == Pass){
        Registrate(Name,Login,Pass, result=>{
          if (result.item !== null & result.status == true){
            signIn();
          }
        }
        )
      }else{
        Alert.alert('Внимание','Пароли не совпадают')
      }
      
    } else{
      Alert.alert('Внимание','Введите данные в поля для регистрации в приложение')
    }
};


  return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{flex:1}}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={gStyle.inner}>
              <View style = {{display:'flex'}}>

                <View style={{alignItems:'center', margin:12}}>
                  <Text style={{fontSize:32, fontWeight:"bold"}}>Регистрация</Text>
                  <Text style={gStyle.smallText}>Заполните все поля, чтобы создать аккаунт</Text>
                </View>

                <View style={gStyle.authSection}>
                    <FontAwesome 
                        style={gStyle.searchIcon} 
                        name="user-circle" 
                        size={30} 
                        color="#009eeb"/>
                    <TextInput
                        style={gStyle.input}
                        placeholder={"Введите имя"}
                        onChangeText={(username) => setFIO(username)}
                    />
                </View>

                <View style={gStyle.authSection}>
                    <FontAwesome 
                        style={gStyle.searchIcon} 
                        name="user-circle" 
                        size={30} 
                        color="#009eeb"/>
                    <TextInput
                        style={gStyle.input}
                        placeholder={"Логин"}
                        onChangeText={(username) => setLogin(username)}
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
                    placeholder={"Пароль"}
                    secureTextEntry={true}
                    onChangeText={(pass) => setPass(pass)}
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
                    placeholder={"Подтвердите пароль"}
                    secureTextEntry={true}
                    onChangeText={(pass) => setConfPass(pass)}
                    />
                </View>

                <TouchableOpacity style={gStyle.btnSubmit} onPress ={submitHandler} activeOpacity={0.6}>
                    <Text style={gStyle.text}>Зарегистрироваться</Text>
                </TouchableOpacity>

                <View style={gStyle.regField}>
                    <Text style={gStyle.smallText}> Уже есть аккаунт? </Text>
                    <TouchableOpacity style={gStyle.smallBtn} onPress ={() => {
                      navigation.navigate('Login');
                    }} activeOpacity={0.6}>
                        <Text style={gStyle.btnRegistration}>Войдите</Text>
                    </TouchableOpacity>
                </View>

              </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
  );
};