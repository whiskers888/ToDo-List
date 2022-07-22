
import { StyleSheet, View, Text} from 'react-native';

export default function Header() {

  return (
      <View style = {styles.main}>
        <Text style={styles.text}> Список дел</Text>
      </View>
  );
}

const styles = StyleSheet.create({
    main:{
        paddingTop: 35,
        height:70,
        backgroundColor:'rgba(255,140,0,0.73)'
    },
    text:{
        fontSize:18,
        color:'black',
        textAlign: 'center'
    }
});
