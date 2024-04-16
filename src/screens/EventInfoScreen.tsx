import { SafeAreaView } from "react-native"
import { ScrollView, View, Image, Text, StyleSheet } from "react-native"
import Header from "../components/Header"
import CallWidget from "../components/CallWidget";
import OpeningStatusWidget from "../components/OpeningStatusWidget";
import RouteWidget from "../components/RouteWidget";
import WebsiteLinkWidget from "../components/WebsiteLinkWidget";
import SocialMediaTabWidget from "../components/SocialMediaTabWidget";
import Event from "../../assets/event.jpeg"
import { _styles, colors, windowHeight, windowWidth } from "../../AppStyles";
import DateInfoWidget from "../components/DateInfoWidget";
import EventPriceInfoWidget from "../components/EventPriceInfoWidget";

const styles = StyleSheet.create({
    contentContainer: {
      flex: 1,
    },
    imageContainer: {
      backgroundColor: colors.lightGrey,
      height: windowHeight * 0.2,
    },
    widgetOverlayContainer: {
      position: "absolute",
      padding: 5,
      bottom: 0,
      flex: 1,
      flexDirection: "row",
      left: {
        flex: 1,
      },
      right: {
        flex: 2,
        flexDirection: "row",
        justifyContent: "space-evenly",
      },
    },
    tabMenuContainer: {
      marginTop: windowHeight * 0.02,
    },
    tabMenuItem: {
      width: windowWidth / 3.5,
      height: windowHeight / 25,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#e0e0e0",
      borderRadius: 4,
      marginRight: 15,
    },
    tabMenuItemText: {
      fontSize: 12,
    },
    selectedTab: {
      backgroundColor: colors.red,
    },
    eventContentContainer: {},
    descriptionContainer: {
      height: windowHeight * 0.07,
      justifyContent: "center",
    },
    adressContainer: {
      height: windowHeight * 0.07,
      justifyContent: "center",
    },
    openingHoursContainer: {
      marginBottom: 20,
    },
    openingHoursHeadingContainer: {
      height: windowHeight * 0.04,
      justifyContent: "center",
    },
    openingHoursTextContainer: {},
    openingHoursItemContainer: {
      height: windowHeight * 0.02,
      flex: 1,
      flexDirection: "row",
    },
    weekday: {
      flex: 1,
    },
    time: {
      flex: 1,
    },
    socialMediaWidgetsContainer: {
      flexDirection: "row",
    },
    image: {
      width: "100%",
      height: "100%",
      borderRadius: 5,
    },
    menuImageContainer: {
      height: windowWidth * 0.5 - 20,
      padding: 5,
      display: "flex",
      flexWrap: "wrap",
      flexDirection: "row",
      alignContent: "space-between",
      justifyContent: "space-between",
    },
  });

export default function EventInfoScreen({ route }){

    const { eventData } = route.params;
    return(
    <SafeAreaView style={_styles.safeAreaView}>
      <ScrollView style={{ padding: 14 }}>
        <Header title={eventData.name}></Header>

        <View style={styles.contentContainer}>
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={Event}></Image>
            <View style={styles.widgetOverlayContainer}>
                <DateInfoWidget start_date={eventData.start_date} end_date={eventData.end_date} marginRight={10}></DateInfoWidget>
                <EventPriceInfoWidget ticket_price={eventData.ticket_price} marginRight={0}></EventPriceInfoWidget>  
            </View>
          </View>
        </View>

        <View style={styles.eventContentContainer}>
              <OverviewTabContent data={eventData}></OverviewTabContent>
        </View>
      </ScrollView>
    </SafeAreaView>
    )
}

function OverviewTabContent({ data }) {
    return (
      <View style={styles.overviewTabContainer}>
        <View style={styles.descriptionContainer}>
          <Text>
            {data.description}
          </Text>
        </View>
        <View style={styles.adressContainer}>
          <View>
            <Text>{data.street + " " + data.housenumber + ", " + data.postalcode + " " + data.location}</Text>
          </View>
        </View>
  
        <View style={styles.socialMediaWidgetsContainer}>
          <SocialMediaTabWidget title="Instagram" link={data.instagram_link}></SocialMediaTabWidget>
          <SocialMediaTabWidget title="Facebook" link={data.facebook_link}></SocialMediaTabWidget>
        </View>
      </View>
    );
  }