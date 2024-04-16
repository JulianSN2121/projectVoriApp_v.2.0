import { View, Text, StyleSheet } from "react-native";
import { colors, windowHeight, windowWidth } from "../../AppStyles";
import Icon from "react-native-vector-icons/FontAwesome";

export default function EventPriceInfoWidget({ marginRight, ticket_price }) {
    return (
      <View style={{...styles.PriceInfoWidget, marginRight: marginRight}}>
        <View style={styles.PriceInfoWidget.icon}>
          <Icon style={colors.darkGrey} name="tag" size={10}></Icon>
        </View>
        <View style={styles.PriceInfoWidget.text}>
          <Text style={{ fontSize: 10 }}>{ticket_price} €</Text>
        </View>
      </View>
    );
  }

const styles = StyleSheet.create({
    PriceInfoWidget: {
        flexDirection: "row",
        backgroundColor: colors.lightGrey,
        borderRadius: 3,
        width: windowWidth * 0.12,
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