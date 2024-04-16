import React from "react";
import { Text, Pressable, StyleSheet, Linking } from "react-native";
import { colors, windowHeight, windowWidth } from "../../AppStyles";
import { styles } from "../styles/CallWidget"


export default function CallWidget({phoneNumber}) {
	return (
		<Pressable onPress={() => Linking.openURL(`tel:${phoneNumber}`)} style={styles.container}>
			<Text style={styles.text}>Anrufen</Text>
		</Pressable>
		)
}