import { View, Text, StyleSheet } from "react-native";
import { colors, windowHeight, windowWidth } from "../../AppStyles";
import { dateShortener } from "../utils/dateHelpers";
import Icon from "react-native-vector-icons/FontAwesome";

export default function DateInfoWidget({ start_date, end_date, marginRight }) {
  return (
      <View style={{...styles.DateInfoWidget, marginRight: marginRight }}>
        <View style={styles.DateInfoWidget.icon}>
          <Icon style={colors.darkGrey} name="calendar" size={10}></Icon>
        </View>
        <View style={styles.DateInfoWidget.text}>
          <Text style={{ fontSize: 10 }}>{dateShortener(start_date)}</Text>
        </View>
      </View>
    );
  }

const styles = StyleSheet.create({
    DateInfoWidget: {
    flexDirection: "row",
    backgroundColor: colors.lightGrey,
    borderRadius: 3,
    width: windowWidth * 0.3,
    padding: 2,
    icon: {
      alignItems: "center",
      flex: 2,
    },
    text: {
      justifyContent: "center",
      alignItems: "center",
      flex: 10,
    },
  },
})