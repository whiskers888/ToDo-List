
import React,{useState,useEffect} from 'react';
import { StyleSheet, View, FlatList,Text, Alert, Modal} from 'react-native';
import ListItem from './listItem';
import Form from './form';
import {deleteTodo, getTodos} from '../API/API'

export default function Main() {
const [listOfItems,setListOfItems] = useState([])
const [isLoading, setIsLoading] = useState(false)

function getNewTodos(){
  getTodos().then((listTodo)=>{
    setListOfItems(listTodo)           
  })
}

useEffect(() => {
  setIsLoading(true)
  getNewTodos()
  setIsLoading(false)
},[])

const addHandler = (elem) => {
  if(elem){
    getNewTodos()
  }
}

const deleteHandler =(id) => {
  setListOfItems((list) => {
    console.log("Delete item №"+id)
    deleteTodo(id, res=>{
      console.log(res)
    })
    
    return list.filter(item => item.key != id)
  });
}

  return (
      <View >
          <Form addHandler = {addHandler}/>
            {listOfItems[0] ? (<FlatList style={{height:"90%"}} data={ listOfItems} renderItem ={({ item })=> (
                <ListItem el ={item} deleteHandler = {deleteHandler} />
            )} 
            
            onRefresh={getNewTodos}
            refreshing ={isLoading}/>)
            :(
              <Text style={{textAlign:'center',marginTop:"60%" ,fontSize: 24}}>У вас нету задач</Text>
            )}
      </View>
  );
}
