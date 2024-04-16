import { StyleSheet } from "react-native";
import { colors } from "../../AppStyles";	

export const styles = StyleSheet.create({
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