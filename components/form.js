import React,{ useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { gStyle } from '../constant/style';
import { StyleSheet, TextInput, Text, Button, View, Alert, Modal, Pressable} from 'react-native';

import DatePicker from "@dietime/react-native-date-picker";
import { createTodo } from '../API/API';

export default function Form({addHandler}) {


    const [modalVisible, setModalVisible] = useState(false);

    function submitHandler(){
      let now = new Date()
      if( date.toLocaleDateString() >= now.toLocaleDateString() & dropDownItem!=null & taskDesc !=''){
        createTodo(taskDesc,date.toISOString(),Number(dropDownItem), result =>{
          if (result.status){
            addHandler(result.data.items)
          }else{
            
        Alert.alert('Внимание','Что-то пошло не так. Попробуйте чуть позже :(')
          }
        })
        closeModal()
      }else{
        Alert.alert('Внимание','Данные записаны неправильно или вовсе отсуствуют :(')
      }
    }

    function closeModal(){
      setTaskDesc("")
      setDate(new Date())
      setdropDownItem(null)
      setModalVisible(!modalVisible)
    }
    
    const [taskDesc, setTaskDesc] = useState('');

    const [date, setDate] = useState( new Date());

    const [open, setOpen] = useState(false);
    const [dropDownItem, setdropDownItem] = useState(0);
    const [items, setItems] = useState([
      {label: 'Не важно', value: '1'},
      {label: 'Важно', value: '2'},
      {label: 'Очень важно', value: '3'}
    ]);

    
    const DropDownMenu = ()=>{
      DropDownPicker.setTheme("LIGHT");
      return (
        <DropDownPicker
          open={open}
          value={dropDownItem}
          items={items}
          setOpen={setOpen}
          setValue={setdropDownItem}
          setItems={setItems}
          placeholder="Выберите приоритет"
          placeholderStyle={{color:"#808080"}}
          modalContentContainerStyle={gStyle.authSection}
          style={gStyle.authSection}
          dropDownContainerStyle={gStyle.authSection}
          
        />
      );
    }
  return (
    <View>
        <Button color = 'green' onPress={() => setModalVisible(true)} title='Добавить задачу'/>

        <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
            <View style={styles.modalView}>
                <Text style={styles.modalText}>Добавление задачи</Text>

                <View style = {{display:'flex'}}>
                  <View style={gStyle.authSection}>
                      <TextInput
                          style={gStyle.input}
                          placeholder={"Введите описание задачи"}
                          placeholderTextColor="#808080"
                          onChangeText={(text) => setTaskDesc(text)}
                      />
                  </View>
                </View>

                
                <View style = {{display:'flex',zIndex:2}}>
                  <DropDownMenu />
                </View>

                <Text style={styles.modalText}>Укажите сроки задачи</Text>

                <DatePicker
                value={date}
                onChange={(value) => setDate(value)}
            />

            <View style = {{display:'flex',flexDirection:'row'}}>
            <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => submitHandler()}
                >
                    <Text style={styles.textStyle}>Добавить</Text>
                </Pressable>
                
                <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => closeModal()}
                >
                    <Text style={styles.textStyle}>Закрыть</Text>
                </Pressable>
            </View>
                
                
            </View>
        </View>
        </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
    input:{
        borderBottomWidth:1,
        borderColor:'#000',
        padding: 10,
        marginVertical:30,
        marginHorizontal: '20%',
        width:'60%'
    },
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
      buttonOpen: {
        backgroundColor: "#F194FF",
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
        marginBottom: 15,
        textAlign: "center",
        fontWeight:"bold"
      }
});