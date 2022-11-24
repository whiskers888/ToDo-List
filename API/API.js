import * as SecureStore from 'expo-secure-store'; // шифрование


const host = 'http://rygest-001-site1.dtempurl.com'


async function storeToken(token) {
    try{
       await SecureStore.setItemAsync('secure_token', token);
    } catch (e) {
      console.log('cant save token' + e)
    }
}

export async function clearToken() {
    return await SecureStore.deleteItemAsync('secure_token')
}

export async function getToken(){
  return await SecureStore.getItemAsync('secure_token')   
}

export function send(url, token, type, data, callback) {

  if (type != 'GET' && data)
      data = JSON.stringify(data);

  let head = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Host:'rygest-001-site1.dtempurl.com',
    }

  if(token){
    head['Authorization']='Bearer '+token
  }
  
  fetch(url,{
      method:type,
      headers:head,
      body:data,
  }
  ).then(res => res.json()).then(res=>{
    if (res.status){
      callback(res);
    }
    else{
      console.log("Not Authorized")
    }
  })
}

export function getTodoById(id){
  let URL = host +'/todo/get?id='+id
  return getToken().then(token =>{
    return send(URL,token,"POST",null).then( ans =>{
      console.log(ans)
    }
    )
  })
}

export default function Authorization(username,password,callback) {

    let URL =  host + '/auth/signin'
    let data = {
      'Username':username,
      'Password':password
    }
    
    
    send(URL,null,"POST",data, res => {
      if (res.data.item !== null ) {
          clearToken()
          storeToken(res.data.item.token)
          callback(res)
      }
      })
}

export function Registrate(Name,Login,password,callback) {
    let URL =  host + '/auth/signup'
    let data = {
      "Name":Name,
      "Username":Login,
      "Password":password
    }    
    
    send(URL,null,"POST",data, res => {
      console.log(res)
      if (res.data.item !== null ) {
          clearToken()
          storeToken(res.data.item.token)
          callback(res)
      }
      })
  }

  export function createTodo(taskDescription,DateExpired,priority,callback) {
    let URL =  host + '/todo/create'
    let data = {
      "taskDescription":taskDescription,
      "expiredAt":DateExpired,
      "priority":priority
    }    
    return getToken().then(token =>{    
      send(URL,token,"POST",data, res => {
          callback(res)
      })
    })
  }

  export function updateTodo  (elem,callback) {
    let URL =  host + '/todo/update'
    console.log(elem.isCompleted)
    let data = {
      "id":elem.key,
      "isCompleted":elem.isCompleted,
      "priority":elem.priority,
      "taskDescription":elem.text,
      "expiredAt":elem.expiredAt
    }  
    //console.log(data)
    return getToken().then(token =>{    
    send(URL,token,"POST",data, res => {
        //console.log(res)
        callback(res)
      })
    })
  }
  export function deleteTodo  (id,callback) {
    let URL =  host + '/todo/delete?id='+id
    
    return getToken().then(token =>{    
    send(URL,token,"GET",null, res => {
        callback(res)
      })
    })
  }

  export function getTodos () {
    let URL = host + '/todo/getall'
    return getToken().then(value =>{
      return fetch(URL, {
        headers:{
            Host:'rygest-001-site1.dtempurl.com',
            'Content-Type':'application/json',
            Authorization: 'Bearer '+value // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoic3R1ZGVudCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL3N1cm5hbWUiOiLQkNCy0LXRgtC40YHRj9C9INCuLtCtLiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2hhc2giOiIiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9zaWQiOiItNSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvdXNlcmRhdGEiOiIyIiwidmVyaWZTdHJpbmciOiIiLCJuYmYiOjE2NjEwMzYwODIsImV4cCI6MTY2MTY0MDg4MiwiaXNzIjoiVmVkS2FmIiwiYXVkIjoiTU1JU0xhYiJ9.KmEYkTUK7sdgoLOAtOfE6o6eZHTmh1kh9-vWR0i6Qog
        }
    }).then(res => res.json()).then(res => {
        let listTodo = [];
        res.data.items.forEach(element => {
          
          listTodo.push({
            text: element.taskDescription, 
            key: element.id, 
            priority:element.priority,
            expiredAt: element.expiredAt,
            isCompleted:element.isCompleted,
            isDeleted:element.isDeleted,
            isExpired:element.isExpired})
        });
        
        listTodo.sort(
          function
          (a,b){
            return new Date(a.expiredAt).setHours(0, 0, 0, 0) - new Date(b.expiredAt).setHours(0, 0, 0, 0);
          });
        return listTodo
    })
    })
    
}




