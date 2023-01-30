import React, { useEffect, useState} from "react";
import { StyleSheet, TouchableOpacity, Text,TextInput,View, Modal,Pressable, Alert} from 'react-native';

import DatePicker from "@dietime/react-native-date-picker";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import DropDownPicker from 'react-native-dropdown-picker';

import { gStyle } from '../constant/style';
import { FontAwesome } from '@expo/vector-icons';
import { updateTodo } from "../API/API";

export default function ListItem({el, deleteHandler}) {
  
  
  const [taskDesc, setTaskDesc] = useState(el.text);
  const [date, setDate] = useState( new Date(el.expiredAt));
  const [open, setOpen] = useState(false);
  const [dropDownItem, setdropDownItem] = useState(String(el.priority));
  const [items, setItems] = useState([
    {label: 'Не важно', value: '1'},
    {label: 'Важно', value: '2'},
    {label: 'Очень важно', value: '3'}
  ]);
  
  const [checkboxState, setCheckboxState] = useState(false);
  const [isExpired, setExpired] = useState("");
  const [visibleEdit, setVisibleEdit] = useState(false);
  const [enable, setEnable] = useState(false)

  useEffect(() => {
    if(el.isCompleted ){
      setCheckboxState(true)
    }
    if(el.isExpired){
      setExpired("none")
      setCheckboxState(true)
    }
  },[])

  function BottomInfo({el}){
    let priority;
    let colorPriority;
    let expiredAt = new Date(el.expiredAt).toLocaleDateString('ru')
    if(el.priority == 1){
      colorPriority = "blue"
      priority = "Не важно"
    } else if(el.priority == 2){
      colorPriority = "#FFCC33"
      priority = "Важно"
    }else{
      colorPriority = "red"
      priority = "Очень важно"
    }

    if (isExpired){
      return(
      <View style={{paddingLeft:52}}>
        <Text style={{color:"red", fontWeight:'bold'}}>
          Просрочено
        </Text>
      </View>
      )
    }else{
      return(
        <View style={{paddingLeft:52}}>
          <Text style={{color:colorPriority}}>
            {priority}
          </Text>
          <Text>
            До {expiredAt}
          </Text>
        </View>
        )
    }
    }

  function CheckBox(){
    return(
        <BouncyCheckbox
        size={25}
        fillColor="#6699FF"
        unfillColor="#FFFFFF"
        text={el.text}
        isChecked={checkboxState}
        iconStyle={{ borderColor: "red" }}
        innerIconStyle={{ borderWidth: 2 }}
        textStyle={styles.text}
        style={{margin: 4, width:"90%"}}
        onPress={(isChecked) => setCheked(el,isChecked)}
      />
    )
    
  }

  const setCheked =(elem, isChecked) => {
    elem.isCompleted = isChecked
    updateTodo(elem, res=>{
      setCheckboxState(isChecked)
    })
  }

  const submitHandler =(elem, isChecked) => {
    elem.id = el.key
    elem.priority = Number(dropDownItem)
    elem.text = taskDesc
    elem.expiredAt = date
    updateTodo(elem, res=>{
      setVisibleEdit(!visibleEdit);
      setEnable(!enable)
    })
  }

  const alertDeleteTodo = () =>
  Alert.alert(
      "Внимание",
      "Вы действительно хотите удалить задачу?",
      [
      {
          text: "Cancel",
          style: "cancel"
      },
      { text: "OK", onPress: () => deleteHandler(el.key) }
      ]
  );
  return (

    <View style={styles.main} >
      <Modal
          animationType="slide"
          transparent={true}
          visible={visibleEdit}
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
                            value={taskDesc}
                            onChangeText={(text) => setTaskDesc(text)}
                        />
                    </View>
                  </View>
  
                  
                  <View style = {{display:'flex',zIndex:2}}>
                  <DropDownPicker
                    open={open}
                    value={dropDownItem}
                    items={items}
                    setOpen={setOpen}
                    setValue={setdropDownItem}
                    setItems={setItems}
                    placeholderStyle={{color:"#808080"}}
                    modalContentContainerStyle={gStyle.authSection}
                    style={gStyle.authSection}
                    dropDownContainerStyle={gStyle.authSection}
                  />
                  </View>
  
                  <Text style={styles.modalText}>Укажите сроки задачи</Text>
  
                  <DatePicker
                  value={date}
                  onChange={(value) => setDate(value)}
              />
  
                <View style = {{display:'flex',flexDirection:'row'}}>
                <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => submitHandler(el)}
                    >
                        <Text style={styles.textStyle}>Добавить</Text>
                    </Pressable>
                    
                    <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() =>{ setVisibleEdit(!visibleEdit); setEnable(!enable)}}
                    >
                        <Text style={styles.textStyle}>Закрыть</Text>
                    </Pressable>
                </View>
              </View>
          </View>
          </Modal>
      <View pointerEvents={isExpired}>
        <CheckBox/>
        <BottomInfo el={el}/>
      </View>
      <View style = {styles.btnItem}>
      
      <TouchableOpacity onPress ={() => {setVisibleEdit(!visibleEdit); setEnable(!enable)}} disabled = {enable}>
        <FontAwesome  name="edit" color="gray" size={26}/>
      </TouchableOpacity>
      <TouchableOpacity style={{marginTop:16}} onPress ={() => alertDeleteTodo()}>
        <FontAwesome  name="trash" color="red" size={26}/>
      </TouchableOpacity>
      </View>
    </View>
      
  );
}

const styles = StyleSheet.create({
  main:{
    borderRadius: 5,
    backgroundColor: '#fafafa',
    borderWidth: 1,
    marginTop:8,
    width:'99%',
    height:'auto',
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
  },
  btnItem:{
    display:'flex',
    marginLeft:"auto",
    padding:8,
    marginRight:2,
  },
  text:{
    height:'auto',
    padding:8,
    marginRight:20,
  },
  checkbox: {
    alignSelf: "center",
  }, input:{
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