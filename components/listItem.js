import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, Text,View} from 'react-native';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { FontAwesome } from '@expo/vector-icons';
import { updateTodo } from "../API/API";
import { color } from "react-native-reanimated";
import { gStyle } from "../constant/style";
export default function ListItem({el, deleteHandler}) {

  
  const [checkboxState, setCheckboxState] = useState(false);
  
  useEffect(() => {
    if(el.isCompleted){
      setCheckboxState(true)
    }
  },[])

  function Priority(){
    let priority;
    let colorPriority;
    console.log(el.Priority)
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
    console
    return(
      <View style={{marginLeft:'auto'}}>
        <Text style={gStyle.text}>
          {priority}
        </Text>
      </View>
    )}

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
        style={{margin: 4}}
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

  return (
    <View style={styles.main}>
      <View>
        <CheckBox/>
        <Priority/>
      </View>
      <View style = {styles.btnItem}>
      
      <TouchableOpacity  onPress ={() => deleteHandler(el.key)}>
        <FontAwesome  name="edit" color="gray" size={26}/>
      </TouchableOpacity>
      <TouchableOpacity style={{marginTop:16}} onPress ={() => deleteHandler(el.key)}>
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
  },
});