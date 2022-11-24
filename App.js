
import { StatusBar } from 'expo-status-bar';
import {ActivityIndicator, SafeAreaView} from 'react-native';
import React, {useEffect, useState, useMemo} from 'react';

// Импорт навигационного меню
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

// Импорт view
import Main from './components/Main';
import Login from './components/Login';
import Registration from './components/Registration';
import Settings from './components/Settings';

// импорт контекста аутентификации
import {AuthContext} from "./context/AuthContext";

import { gStyle } from './constant/style'; 
import { getToken} from './API/API';

import Ionicons from 'react-native-vector-icons/Ionicons';


const Tab = createBottomTabNavigator();;

export default function App() {
  const [token, setToken] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const authContent = useMemo(() => ({
    signIn: () => {
        setIsLoading(false)
        setToken('')
    },
    signOut: () => {
        setIsLoading(false)
        setToken(null)
    }
  }), [])

  useEffect(() => {
    getToken().then((value)=>{
      if (value){
        setToken(value)
      }
    })
  })

  useEffect(() => {
    setTimeout(() => {
        setIsLoading(false)
    }, 800)
  }, [])

  if (isLoading) {
    return (
        <SafeAreaView style={gStyle.container}>
            <ActivityIndicator size='large' />
        </SafeAreaView>
    )
}

return (
  <AuthContext.Provider value={authContent}>
    <NavigationContainer  >
      <Tab.Navigator screenOptions={({ route }) => ({
        headerStyle:{backgroundColor:'#edf3fc'},
        tabBarIcon: ({color, size }) => {
          let iconName;

          if (route.name === 'Главная') {
            iconName = 'home-outline';
          } else if (route.name === 'Настройки') {
            iconName =  'cog-outline';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      >
      {token !== null ? (
        <>
          <Tab.Screen name="Главная" component={Main}/>
          <Tab.Screen name="Настройки" component={Settings}/>
        </>
          ) : (
              <>
              <Tab.Screen name="Login" 
              component={Login}  
              options={{
                tabBarStyle: {
                  display: "none",
                },
                tabBarButton: () => null,
                headerShown: false,
                swipeEnabled: false
              }}  />
              <Tab.Screen name="Registration" 
              component={Registration}  
              options={{
                tabBarStyle: {
                  display: "none",
                },
                tabBarButton: () => null,
                headerShown: false,
                swipeEnabled: false
              }}  />
              </>
          )}
      </Tab.Navigator>
      <StatusBar style='auto' />
    </NavigationContainer>
  </AuthContext.Provider>
);
};

