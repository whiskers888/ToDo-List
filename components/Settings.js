import React,{useState,useEffect} from "react";
import {Button, SafeAreaView,Text,Modal,View,StyleSheet,Pressable, TextInput, Alert} from 'react-native'

import {AuthContext} from "../context/AuthContext";
import { gStyle } from "../constant/style";
import { changeName, changePass, clearToken, deletAccount, getTodoById, getUser } from "../API/API";

export default function Settings() {

const {signOut} = React.useContext(AuthContext)


const [modalPass, setModalPass] = useState(false);
const [modalName, setModalName] = useState(false);
const [name, setName] = useState("");
const [newName, setNewName] = useState("");
const [newPass, setNewPass] = useState("");
const [password, setPassword] = useState("");


useEffect(() => {
    getUser(res=>{
        console.log
        setName(res.data.user.name)
    })
  },[])
async function exitApp() {
    clearToken().then(
        signOut()
    )
}

function test(){
    getTodoById(6)
}

function editName(name){
 changeName(name, res=>{
    if(res.status){
        setName(res.data.item.name)
        Alert.alert("Готово!", "Поздравляем, вы сменили имя на "+res.data.item.name)
        setModalName(!modalName)
    }else{
        Alert.alert("Упс!", "Попробуйте повторить смену имени или сделайте это чуточку позже")
    }
 })
}

function editPass(oldPass,newPass){
    changePass(oldPass,newPass,res=>{
        if(res.status){
            console.log(res.data)
            Alert.alert("Готово!", "Поздравляем, вы сменили пароль")
        setModalName(!modalName)
        }else{
            Alert.alert("Упс!", "Попробуйте повторить смену пароля или сделайте это чуточку позже")
        }
    })
}

function deleteAcc(){
    deletAccount(res=>{
        if(res.status){
            Alert.alert("До свидания!", "Очень жаль что вы покидаете наш сервис")
            exitApp()
        }else{
            Alert.alert("Ха-ха", "Ты не можешь покинуть наш сервис")
        }
    })
   }

const alertDeleteAcc = () =>
    Alert.alert(
        "Внимание",
        "Восстановить его уже будет невозможно. Вы действительно хотите удалить Аккаунт?",
        [
        {
            text: "Cancel",
            onPress: () => Alert.alert("Спасибо", "Это круто что ты передумал :)"),
            style: "cancel"
        },
        { text: "OK", onPress: () => deleteAcc() }
        ]
    );

const alertExitAcc = () =>
    Alert.alert(
        "Внимание",
        "Вы действительно хотите выйти из аккаунта?",
        [
        {
            text: "Cancel",
            style: "cancel"
        },
        { text: "OK", onPress: () => exitApp() }
        ]
    );


const B = (props) => <Text style={{fontWeight: 'bold'}}>{props.children}</Text>

return (
    <SafeAreaView style={gStyle.container}>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalPass}
        >
          <View style={styles.centeredView}>
              <View style={styles.modalView}>
                  <Text style={styles.modalText}>Смена пароля</Text>
              <View style = {{display:'flex'}}>
                    <View style={gStyle.authSection}>
                        <TextInput
                                style={gStyle.input}
                                placeholder={"Введите старый пароль"}
                                placeholderTextColor="#808080"
                                onChangeText={(text) => setPassword(text)}
                            />
                    </View>
                    
                    <View style={gStyle.authSection}>
                        <TextInput
                                style={gStyle.input}
                                placeholder={"Введите новый пароль"}
                                placeholderTextColor="#808080"
                                onChangeText={(text) => setNewPass(text)}
                            />
                    </View>
                  </View>
              <View style = {{display:'flex',flexDirection:'row'}}>
                <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => editPass(password,newPass)}
                    >
                        <Text style={styles.textStyle}>Изменить</Text>
                    </Pressable>
                    
                    <Pressable
                        style={[styles.button, styles.buttonClose]}
                       onPress={() =>{ setModalPass(!modalPass)}}
                    >
                        <Text style={styles.textStyle}>Закрыть</Text>
                    </Pressable>
                </View>
              </View>
          </View>
          </Modal>

          <Modal
          animationType="slide"
          transparent={true}
          visible={modalName}
        >
          <View style={styles.centeredView}>
              <View style={styles.modalView}>
                  <Text style={styles.modalText}>Смена имени профиля</Text>
              <View style = {{display:'flex'}}>
                    <View style={gStyle.authSection}>
                        <TextInput
                            style={gStyle.input}
                            placeholder={"Введите новое имя"}
                            placeholderTextColor="#808080"
                            onChangeText={(text) => setNewName(text)}
                        />
                    </View>
                  </View>
              <View style = {{display:'flex',flexDirection:'row'}}>
                <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => editName(newName)}
                    >
                        <Text style={styles.textStyle}>Изменить</Text>
                    </Pressable>
                    
                    <Pressable
                        style={[styles.button, styles.buttonClose]}
                       onPress={() =>{ setModalName(!modalName)}}
                    >
                        <Text style={styles.textStyle}>Закрыть</Text>
                    </Pressable>
                </View>
              </View>
          </View>
          </Modal>

        <Text style={{textAlign:'center', margin:18, fontSize: 16}}>Привет, <B>{name}</B></Text>
        <Button
            title={'Сменить имя'}
            style={gStyle.input}
            onPress={()=> setModalName(!modalName)}
        />
        <Button
            title={'Сменить пароль'}
            style={gStyle.input}
            onPress={()=> setModalPass(!modalPass)}
        />
        <Button
            title={'Выйти из аккаунта'}
            style={gStyle.input}
            color='red'
            onPress={alertExitAcc}
        />
        <Button
            title={'Удалить аккаунт'}
            style={gStyle.input}
            color='red'
            onPress={alertDeleteAcc}
        />
         
    </SafeAreaView>
)
}

const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    button: {
        borderRadius: 20,
        padding:12,
        paddingHorizontal:36
      },
      buttonClose: {
        backgroundColor: "#edf3fc",
      },
      textStyle: {
        color: "black",
        fontWeight: "500",
        textAlign: "center"
      },
      modalText: {
        fontSize:18,
        marginBottom: 15,
        textAlign: "center",
        fontWeight:"bold"
      }
})