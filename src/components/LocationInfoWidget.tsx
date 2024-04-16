import { View, Text, StyleSheet } from "react-native";
import { colors, windowHeight, windowWidth } from "../../AppStyles";
import Icon from "react-native-vector-icons/FontAwesome";

export default function LocationInfoWidget({ data, marginRight }) {
    return (
      <View style={{...styles.LocationInfoWidget, marginRight: marginRight}}>
        <View style={styles.LocationInfoWidget.icon}>
          <Icon style={colors.darkGrey} name="map-pin" size={10}></Icon>
        </View>
        <View style={styles.LocationInfoWidget.text}>
          <Text style={{ fontSize: 10 }}>{data}</Text>
        </View>
      </View>
    );
  }

const styles = StyleSheet.create({
    LocationInfoWidget: {
        flexDirection: "row",
        backgroundColor: colors.lightGrey,
        borderRadius: 3,
        width: windowWidth * 0.21,
        padding: 2,
        icon: {
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
        },
        text: {
          justifyContent: "center",
          alignItems: "center",
          flex: 2,
        },
      },
})