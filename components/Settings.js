import React from "react";
import {Button, SafeAreaView, } from 'react-native'

import {AuthContext} from "../context/AuthContext";
import { gStyle } from "../constant/style";
import { clearToken, getTodoById } from "../API/API";

export default function Settings() {

const {signOut} = React.useContext(AuthContext)

async function exitApp() {
    clearToken().then(
        signOut()
    )
}

function test(){
    getTodoById(6)
}

return (
    <SafeAreaView style={gStyle.container}>
        <Button
            title={'Test'}
            style={gStyle.input}
            onPress={test}
        />
        <Button
            title={'Logout'}
            style={gStyle.input}
            onPress={exitApp}
        />
         
    </SafeAreaView>
)
}
