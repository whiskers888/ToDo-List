import { StyleSheet } from "react-native";
import { color } from "react-native-reanimated";

export const gStyle = StyleSheet.create( {
    //                                      Login.js
    loadingScreen: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },

    logo:{
        alignSelf:'center',
        resizeMode:'contain'
        
    },
    authSection: {
        display:'flex',
        flexDirection:'row',
        alignItems: 'center',        
        borderWidth: 1,
        borderRadius: 15,
        borderColor:"#009eeb",
        margin: 10,
        paddingVertical: 0,
        paddingHorizontal: 6,
        width:"100%"
    },
    input: {
        width: "90%",
        paddingTop: 8,
        paddingBottom: 10,
        paddingHorizontal:12,
        margin:5,
    },
    inner: {
        padding: 12,
        flex: 1,
        justifyContent: "space-around"
     },
    btnSubmit:{
        margin:12,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 6,
        elevation: 3,
        backgroundColor: '#009eeb',
     },
     text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
      },
     regField: {
        display:"flex",
        flexDirection:'row',
        alignSelf:'center'
      },
     smalltext: {
        fontSize: 8,
        lineHeight: 21,
        flex:1,
        letterSpacing: 0.25,
        color: 'white',
      },
      btnRegistration: {
        flex:1,
        color:"#009eeb"
      },
    //                                      Main.js
    notification:{
      width:'99%',
      marginLeft:4,
      paddingVertical:8,
     },
    notificationName:{
        fontWeight:'bold',
        fontSize:16,
     },
    notificationItem:{
        paddingVertical:8,
        display:'flex',
        flexDirection:'row',
        width:'99%'
     },
    notificationTime:{
        fontSize:12,
        marginLeft:'auto'
     },
    borderNotification:{
        borderLeftWidth:6,
        paddingLeft:8,
        borderBottomLeftRadius:4
     },
    groupTimeNotif:{
        textAlign:'center',
        marginTop:12,
        color:"#808080"
    },
    notificationIsNew:{
        borderRadius:"50%",
        width:'5%',
        height:'90%',
        backgroundColor:'#33FF00',
        marginLeft:10,
        shadowColor:'#33FF00',
        shadowRadius:8,
        shadowOpacity:10
    },
    groupZachBook:{
        marginVertical:12,
        width:'99%',
        alignSelf:'center',
        backgroundColor:'#fafaff' // ebebeb
    },
    borderNameGroup:{
        width:'101%',
        borderColor:'#edf3fc',
        borderRadius:8,
        borderWidth:8,
        alignSelf:'center',
    },
    nameGroupZach:{
        backgroundColor:"#edf3fc",
        textAlign:'center',
        fontSize:14,
        fontWeight:'bold',
    },
    itemMark:{
        display:'flex',
        flexDirection:'row',
        padding:8
    },
    //                      PROFILE.JS
    cardFirstInfo:{
        margin:8,
        height:'20%',
        borderWidth:2,
        borderColor:'#c1d7f7', //E0E0E0
        borderRadius:15,
       
    },
    avatar:{
        alignSelf:'center',
        margin:8,
        width:'25%',
        height:'100%',
        borderWidth:2,
        borderRadius:100,
        borderColor:"#c1d7f7"
    },
    nameUser:{
        fontSize:16,
        fontWeight:"bold",
        padding:8
    },
    centeredModal:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
    },
    modalView:{
        width:"95%",
        // height:'95%',
        marginTop: '50%',
        marginStart:'2%',
        backgroundColor: "white",
        borderRadius: 20,
        padding: 15,
        alignItems: 'baseline',
    },
    btnMore:{
        borderWidth:1,
        alignSelf:'center',
        borderColor:'#34AADC',
        borderRadius:5,
        width:'30%',
        backgroundColor:'#4676D7',
        alignItems:'center',
        margin:16,
        padding: 4
        
    },
    btnMoreText:{
        fontSize:12,
        fontWeight:"bold",
        color:'#fff'
    },
    shadow:{
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    cardMsg:{
        margin:12,
        display:"flex",
        flexDirection:'row',
        width:'80%%',
        // height:'35%'
    },
    avatarMsg:{
        alignSelf:'center',
        marginEnd:8,
        width:'15%',
        height:'100%',
        borderWidth:1,
        borderRadius:100,
        resizeMode:'stretch',
        borderColor:"#edf3fc"
    }
});