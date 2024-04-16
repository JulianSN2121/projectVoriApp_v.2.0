import React from "react";
import { Text, Pressable, StyleSheet, Linking, Platform } from "react-native";
import { colors, windowHeight, windowWidth } from "../../AppStyles";


export default function RouteWidget({address}) {
	const encodedAddress = encodeURIComponent(address);
	const scheme = Platform.select({
		ios: `maps:0,0?q=${encodedAddress}`,
		android: `geo:0,0?q=${encodedAddress}`
	  });
	return (
		<Pressable onPress={() => Linking.openURL(scheme)}  style={styles.container}>
			<Text style={styles.text}>Route</Text>
		</Pressable>
		)
}

const styles = StyleSheet.create({
	container: {
		width: 70,
		height: 20,
		backgroundColor: colors.lightGrey,
		borderRadius: 3,
		padding: 2,
	}, 
	text: {
		color: colors.darkGrey,
		textAlign: "center",
		fontSize: 12
	}
})
