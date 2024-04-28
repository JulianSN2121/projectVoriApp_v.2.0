import {
    View,
    Text,
    StyleSheet,
    Image,
    Pressable
} from "react-native";
import { colors, windowHeight } from "../../AppStyles";
import EventPriceInfoWidget from "./EventPriceInfoWidget";
import DateInfoWidget from "../components/DateInfoWidget";

const styles = StyleSheet.create({
    eventItemContainer: {
        flexDirection: "row",
        width: "100%",
        height: windowHeight / 8,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: colors.lightGrey,
        marginBottom: 10,
        imageContainer: {
          width: "40%",
          padding: 6,
        },
        contentContainer: {
          width: "60%",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 6,
          titleContainer: {
            padding: 3,
          },
          descriptionContainer: {
            padding: 3,
          },
          infoWidgetsContainer: {
            flexDirection: "row",
          },
        },
      },
      banner: {
        width: "100%",
        height: "100%",
        borderRadius: 5,
      }
    
});

export default function EventItem({ onPress, data }) {
    return (
      <Pressable onPress={onPress}>
        <View style={styles.eventItemContainer}>
          <View style={styles.eventItemContainer.imageContainer}>
            <Image style={styles.banner} source={data.banner}></Image>
          </View>
          <View style={styles.eventItemContainer.contentContainer}>
            <View style={styles.eventItemContainer.contentContainer.titleContainer}>
              <Text>{data.name}</Text>
            </View>
            <View
              style={
                styles.eventItemContainer.contentContainer.descriptionContainer
              }
            >
              <Text style={{ fontSize: 10 }}>
                {data.description}
              </Text>
            </View>
            <View
              style={
                styles.eventItemContainer.contentContainer.infoWidgetsContainer
              }
            >
              <DateInfoWidget start_date={data.start_date} end_date={data.end_date} marginRight={10}></DateInfoWidget>
              <EventPriceInfoWidget ticket_price={data.ticket_price} marginRight={0}></EventPriceInfoWidget>
            </View>
          </View>
        </View>
      </Pressable>
    );
}
  