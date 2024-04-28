import React from "react";
import { View, Text, Image } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Logo from '../../assets/welcomeScreen_Logo.png';
import { colors } from "../../AppStyles";
import { HeaderStyles } from "../styles/Header";

const styles = HeaderStyles;

export default function Header({ title }) {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.logoContainer}>
        <Image style={styles.logoContainer.logo} source={Logo}></Image>
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.titleContainer.title}>{title}</Text>
      </View>
      {/* <View style={styles.mapPinContainer}>
        <View style={styles.mapPinContainer.item}>
          <Icon style={colors.darkGrey} name="map" size={15}></Icon>
        </View>
      </View> */}
    </View>
  );
}
