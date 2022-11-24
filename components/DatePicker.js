import React,{ useState } from 'react';
import { Text,View, Alert, Modal, StyleSheet,Pressable} from 'react-native';

import DatePicker from "@dietime/react-native-date-picker";

export default function PickerDate() {
    const [date, setDate] = useState( new Date());
    
    const [modalVisible, setModalVisible] = useState(true);

    return (
        <View>
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
                <Text>{date ? date.toDateString() : "Select date..."}</Text>
            <DatePicker
                value={date}
                onChange={(value) => setDate(value)}
            />
            </View>
        </View>
        <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => setModalVisible(!modalVisible)}
                >
                    <Text style={styles.textStyle}>Hide Modal</Text>
                </Pressable>
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
        padding: 10,
        elevation: 2
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