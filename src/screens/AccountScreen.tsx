import { useState, useRef, useEffect } from 'react';
import { View, Text, Pressable, Image, StyleSheet, SafeAreaView, ScrollView, TextInput, Animated } from 'react-native';
import { _styles, colors, windowWidth, windowHeight } from "../../AppStyles";
import Icon from "react-native-vector-icons/FontAwesome";
import Logo from '../../../assets/welcomeScreen_Logo.png';


const styles = StyleSheet.create({ 
  popupContainer: {
      position: 'absolute',
      left: 0,
      right: 0,
      backgroundColor: colors.red,
      color: colors.white,
      borderRadius: 4,
      padding: 10,
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1,
  },
  contentContainer:{
    flex: 1,
    height: windowHeight * .7,
    flexDirection: "column",
  },
  headingContainer:{
    fontWeight: "bold",
    fontSize: 18,
  },
  boxContainer: {
    flexGrow: 1,
  },
  logoutContainer: {
    alignItems: "center",
  },
  boxElement: {
    flexDirection: "column",
    heading: {
      width: "100%",
      height: windowHeight *0.04,
      justifyContent: "center",
      fontSize: 15,
    },
    body: {
      borderColor: colors.lightGrey,
      borderWidth: 1,
      borderRadius: 4,
      padding: 15,
    }
  },  
  button: {
    backgroundColor: colors.red,
    borderRadius: 5,
    padding: 10,
    width: windowWidth * 0.6,
    font: {
      color: colors.white,
      textAlign: "center",
    },
  },
  input: {
    flex: 1,
    marginRight: 10,
  }
})

const headerStyles = {
  headerContainer: {
  flexDirection: "row",
  flex: 1,
  alignContent: "center",
  justifyContent: "center",
  height: windowHeight *0.07,
  marginBottom: 12,
},
logoContainer: {
  flex: 2,
  justifyContent: "center",
  alignItems: "center",
  logo: {
    width: 37,
    height: 50,
  },
},
titleContainer: {
  flex: 12,
  justifyContent: "center",
  title: {
    fontSize: 20,
    fontWeight: 500,
    paddingLeft: 10,
  },
},
jobs: {

},
events: {

}
}

export default function AccountView() {
  const mockMail = "mail@testmail.com"
  const mockPw = "12345678"
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const popupY = useRef(new Animated.Value(-100)).current;


  const handleShowPopup = (message) => {
    setPopupMessage(message);
    setShowPopup(true);

    Animated.timing(popupY, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      Animated.timing(popupY, {
        toValue: -100, 
        duration: 500,
        useNativeDriver: true,
      }).start(() => setShowPopup(false));
    }, 5000);
  }

  return (
    <SafeAreaView style={_styles.safeAreaView}>
      <ScrollView style={{ padding: 14 }}>
        {showPopup && (
          <Animated.View style={[styles.popupContainer, {transform: [{translateY: popupY}]}]}>
            <Text style={{color: colors.white}}>{popupMessage}</Text>
          </Animated.View>
        )}
        <Header></Header> 

        <View style={styles.contentContainer}>
          <View style={styles.headingContainer}>
            <Text style={styles.headingContainer}>Hallo Julian</Text>
          </View>

          <View style={styles.boxContainer}>
            <View style={styles.boxElement}>
              <View style={styles.boxElement.heading}>
                <Text>E-Mail Adresse:</Text>
              </View>
              <View style={styles.boxElement.body}>
                <EditableBox onShowPopup={handleShowPopup} type={"email"} text={mockMail}/>
              </View>
            </View>
            <View style={styles.boxElement}>
              <View style={styles.boxElement.heading}>
                <Text>Passwort:</Text>
              </View>
              <View style={styles.boxElement.body}>
                <EditableBox onShowPopup={handleShowPopup} type={""} text={mockPw}/>
              </View>
            </View>
          </View>
          
          <View style={styles.logoutContainer}>
            <Pressable style={styles.button}>
                <Text style={styles.button.font}>Abmelden</Text>
            </Pressable>
          </View>
        </View>

        
      </ScrollView>
    </SafeAreaView>
  );
}

  
function Header(){
  return(
      <View style={headerStyles.headerContainer}>
          <View style={headerStyles.logoContainer}>
              <Image style={headerStyles.logoContainer.logo} source={Logo}></Image>
          </View>
          <View style={headerStyles.titleContainer}>
              <Text style={headerStyles.titleContainer.title}>Konto</Text>
          </View>
      </View>
  )
}

function EditableBox({ onShowPopup, type, text }) {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(text)

  const handleConfirmEdit = () => {
    const message = type === "email" ? "E-Mail Adresse wurde geändert" : "Passwort wurde geändert";
    onShowPopup(message);
    setIsEditing(false);
  };

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', padding: 5 }}>
      {isEditing ? (
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={setValue}
          autoFocus={true}
        />
      ) : (
        <Text style={{ flex: 1 }}>{value}</Text>
      )}
      {isEditing ? (
        <Pressable onPress={handleConfirmEdit}>
          <Icon name="check" size={20} color="black" />
        </Pressable>
      ) : (
        <Pressable onPress={() => setIsEditing(true)}>
          <Icon name="edit" size={20} color="black" />
        </Pressable>
      )}
    </View>
  );
};
