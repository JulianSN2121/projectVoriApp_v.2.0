import React, { useEffect, useState } from "react";
import { View, Image, Text, Pressable } from "react-native";
import { StyleSheet } from "react-native";
import { _styles, colors, windowWidth, windowHeight } from "../../AppStyles";
// import Logo from "../../../assets/welcomeScreen_Logo.png";
import Banner from "../../assets/welcomeScreen_Banner.jpg";
import Logo from "../../assets/vorarlberg_logo.png";
import { SafeAreaView } from "react-native-safe-area-context";



export default function WelcomeScreen({ navigation }) {

  const [logoSize, setLogoSize] = useState({ width: 0, height: 0});
  const [bannerSize, setBannerSize] = useState({ width: 0, height: 0});
  
  const getImageSize = (uri, setSize ) => {
    const ImageProps = Image.resolveAssetSource(uri);
    setSize({ width: ImageProps.width, height: ImageProps.height});
  }

  useEffect(() => {
   getImageSize(Logo, setLogoSize);
   getImageSize(Banner, setBannerSize);
  }, []);

  return (
    <SafeAreaView style={_styles.safeAreaView}>
      <View style={styles.container}>
        <View style={styles.logoContainer}> 
          <Image source={Logo} style={{...styles.logo, width: logoSize.width*0.2, height: logoSize.height*0.2}} />
        </View>
        <View style={styles.imageContainer}>
          <Image source={Banner} style={{...styles.banner, width: bannerSize.width*0.3, height: bannerSize.height*0.2}} />
            
        </View>
        <View style={styles.buttonContainer}>
          <Pressable style={styles.button}>
            <Text style={styles.button.font} onPress={() => navigation.navigate("App")}>Jetzt Entdecken</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center', 
    alignItems: 'center',
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    // backgroundColor: "yellow"
  },
  headingContainer: {
    flex: 1,
    justifyContent: 'center',
    text: {
      fontSize: 24,
    },
    //  backgroundColor: "blue"
  },
  imageContainer: {
    flex: 3,
    justifyContent: 'center',
    // backgroundColor: "green"
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "center",
    // backgroundColor: "red"
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  button: {
    backgroundColor: colors.red,
    borderRadius: 5,
    padding: 10,
    width: windowWidth * 0.6,
    font: {
      color: colors.white,
      textAlign: "center",
    }
  }
})