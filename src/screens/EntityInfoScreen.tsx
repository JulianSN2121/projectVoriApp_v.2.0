import React from "react";
import {
  View,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  Modal,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { useState, useEffect } from "react";
import { Icon } from "react-native-elements";
import Swiper from "react-native-swiper";

import { _styles, colors, windowHeight, windowWidth } from "../../AppStyles";
import Header from "../components/Header";
import CallWidget from "../components/CallWidget";
import RouteWidget from "../components/RouteWidget";
import WebsiteLinkWidget from "../components/WebsiteLinkWidget";
import Restaurant from "../../assets/categoryRestaurantsBanner.jpg";
import SocialMediaTabWidget from "../components/SocialMediaTabWidget";
import EventItem from "../components/EventItem";
import menu from "../../assets/menu.jpg";
import event1 from "../../assets/events1.png";
import event2 from "../../assets/events2.png";
import event3 from "../../assets/events3.png";
import event4 from "../../assets/events4.png";
import event5 from "../../assets/events5.png";

const menuItems = {
  overview: "Übersicht",
  menu: "Menü",
  events: "Events",
};

const demoDataEvents = {
  1: {
    id: 1,
    name: "Event 1",
    description: "Event 1 is great",
    ticket_price: "30",
    banner: "84c65e47-644d-4687-ac7d-4567ac9c7498",
    start_date: "2024-01-04T15:06:00",
    end_date: "2024-01-31T12:00:00",
    imageUrl: event1,
  },
  2: {
    id: 2,
    name: "Event 2",
    description: "Event 2 is great",
    ticket_price: "30",
    banner: "1f0b1d4f-805a-4e90-9419-80d8603a2dfa",
    start_date: "2024-01-04T15:06:01",
    end_date: "2024-01-31T12:00:01",
    imageUrl: event2,
  },
  3: {
    id: 3,
    name: "Event 3",
    description: "Event 3 is great",
    ticket_price: "30",
    banner: "f43d37c3-1b49-4eb8-b39e-b098d3ea0a87",
    start_date: "2024-01-04T15:06:02",
    end_date: "2024-01-31T12:00:02",
    imageUrl: event3,
  },
  4: {
    id: 4,
    name: "Event 4",
    description: "Event 4 is great",
    ticket_price: "30",
    banner: "f749cbb6-ab78-46cb-8edf-60a696d1e69a",
    start_date: "2024-01-04T15:06:03",
    end_date: "2024-01-31T12:00:03",
    imageUrl: event4,
  },
  5: {
    id: 5,
    name: "Event 5",
    description: "Event 5 is great",
    ticket_price: "30",
    banner: "d970125d-045e-4ad1-aee0-b1d2c59c9a6d",
    start_date: "2024-01-04T15:06:04",
    end_date: "2024-01-31T12:00:04",
    imageUrl: event5,
  },
  6: {
    id: 6,
    name: "Event 6",
    description: "Event 6 is great",
    ticket_price: "30",
    banner: "84c65e47-644d-4687-ac7d-4567ac9c7498",
    start_date: "2024-01-04T15:06:05",
    end_date: "2024-01-31T12:00:05",
    imageUrl: event1,
  },
  7: {
    id: 7,
    name: "Event 7",
    description: "Event 7 is great",
    ticket_price: "30",
    banner: "1f0b1d4f-805a-4e90-9419-80d8603a2dfa",
    start_date: "2024-01-04T15:06:06",
    end_date: "2024-01-31T12:00:06",
    imageUrl: event2,
  },
  8: {
    id: 8,
    name: "Event 8",
    description: "Event 8 is great",
    ticket_price: "30",
    banner: "f43d37c3-1b49-4eb8-b39e-b098d3ea0a87",
    start_date: "2024-01-04T15:06:07",
    end_date: "2024-01-31T12:00:07",
    imageUrl: event3,
  },
  9: {
    id: 9,
    name: "Event 9",
    description: "Event 9 is great",
    ticket_price: "30",
    banner: "f749cbb6-ab78-46cb-8edf-60a696d1e69a",
    start_date: "2024-01-04T15:06:08",
    end_date: "2024-01-31T12:00:08",
    imageUrl: event4,
  },
  10: {
    id: 10,
    name: "Event 10",
    description: "Event 10 is great",
    ticket_price: "30",
    banner: "d970125d-045e-4ad1-aee0-b1d2c59c9a6d",
    start_date: "2024-01-04T15:06:09",
    end_date: "2024-01-31T12:00:09",
    imageUrl: event5,
  },
};

export default function EntityInfoScreen({ navigation, route }) {
  const [selectedTab, setSelectedTab] = useState("overview");
  const handleTabSelect = (tabKey) => {
    setSelectedTab(tabKey);
  }
  const { entityData } = route.params;
  const { key } = route.params;
  const selectedCategory = {key}
  
  return (
    <SafeAreaView style={_styles.safeAreaView}>
      <ScrollView style={{ padding: 14 }}>
        <Header title={entityData.name}></Header>

        <View style={styles.contentContainer}>
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={Restaurant}></Image>
            <View style={styles.widgetOverlayContainer}>
              <View style={styles.widgetOverlayContainer.left}>
              </View>
              <View style={styles.widgetOverlayContainer.right}>
                <WebsiteLinkWidget websiteLink={entityData.website_link}></WebsiteLinkWidget>
                <CallWidget phoneNumber={entityData.phone_contact}></CallWidget>
                <RouteWidget address={[entityData.street, entityData.housenumber, entityData.postalcode]}></RouteWidget>
              </View>
            </View>
          </View>

          <View style={styles.tabMenuContainer}>
            <TabMenu onSelectTab={handleTabSelect} selectedTab={selectedTab} />
          </View>

          <View style={styles.entityContentContainer}>
            {selectedTab === "overview" && (
              <OverviewTabContent data={entityData}></OverviewTabContent>
            )}
            {selectedTab === "menu" &&  <MenuTabContent></MenuTabContent>}
            {selectedTab === "events" && <EventsTabContent navigation={navigation}></EventsTabContent>}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

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
  entityContentContainer: {},
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

function TabMenu({ onSelectTab, selectedTab }) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {Object.entries(menuItems).map(([key, title]) => (
        <TabMenuItem
          key={key}
          title={title}
          onPress={() => onSelectTab(key)}
          isSelected={selectedTab === key}
        />
      ))}
    </ScrollView>
  );
}

function TabMenuItem({ title, onPress, isSelected }) {
  return (
    <View style={[styles.tabMenuItem, isSelected && styles.selectedTab]}>
      <Pressable onPress={onPress}>
        <Text style={styles.tabMenuItemText}>{title}</Text>
      </Pressable>
    </View>
  );
}

function OpeningHourItem({ weekday, time }) {
  return (
    <View style={styles.openingHoursItemContainer}>
      <View style={styles.weekday}>
        <Text>{weekday}:</Text>
      </View>
      <View style={styles.time}>
        <Text>{time}</Text>
      </View>
    </View>
  );
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
      <View style={styles.openingHoursContainer}>
        <View style={styles.openingHoursHeadingContainer}>
          <Text>Öffnungszeiten</Text>
        </View>
        <View style={styles.openingHoursTextContainer}>
          <OpeningHourItem
            weekday="Montag"
            time={data.opening_hours_monday}
          ></OpeningHourItem>
          <OpeningHourItem
            weekday="Dienstag"
            time={data.opening_hours_tuesday}
          ></OpeningHourItem>
          <OpeningHourItem
            weekday="Mittwoch"
            time={data.opening_hours_wednesday}
          ></OpeningHourItem>
          <OpeningHourItem
            weekday="Donnerstag"
            time={data.opening_hours_thursday}
          ></OpeningHourItem>
          <OpeningHourItem
            weekday="Freitag"
            time={data.opening_hours_friday}
          ></OpeningHourItem>
          <OpeningHourItem
            weekday="Samstag"
            time={data.opening_hours_saturday}
          ></OpeningHourItem>
          <OpeningHourItem
            weekday="Sontag"
            time={data.opening_hours_sunday}
          ></OpeningHourItem>
        </View>
      </View>

      <View style={styles.socialMediaWidgetsContainer}>
        <SocialMediaTabWidget title="Instagram" link={data.instagram_link}></SocialMediaTabWidget>
        <SocialMediaTabWidget title="Facebook" link={data.facebook_link}></SocialMediaTabWidget>
      </View>
    </View>
  );
}

function MenuTabContent() {

  const [isSliderVisible, setIsSliderVisible] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const [isImagesLoading, setIsImagesLoading] = useState(true);
  const [loadedImagesCount, setLoadedImagesCount] = useState(0);

  const images = [
    menu,
    menu,
    menu,
    menu,
    menu,
    menu,
  ];

  const openSlider = (index) => {
    setSelectedImageIndex(index);
    setIsSliderVisible(true);
  };

  const closeSlider = () => {
    setIsSliderVisible(false);
  };

  const onImageLoad = () => {
    setLoadedImagesCount((prevCount) => prevCount + 1);
  };

  useEffect(() => {
    if (loadedImagesCount === images.length) {
      setIsImagesLoading(false);
    }
  }, [loadedImagesCount]);

  return (
    <View style={styles.menuImageContainer} /*onLayout={onParentLayout}*/>
      {isImagesLoading && (
        <ActivityIndicator
          size="large"
          color="#0000ff"
          style={styles.spinnerStyle}
        />
      )}
      {images.map((image, index) => (
        <TouchableOpacity key={index} onPress={() => openSlider(index)}>
          <View
            style={{
              width: windowWidth * 0.42,
              height: windowHeight * 0.15,
              marginBottom: windowHeight * 0.02,
            }}
          >
            <Image source={image} style={styles.image} onLoad={onImageLoad} />
          </View>
        </TouchableOpacity>
      ))}

      <Modal visible={isSliderVisible} transparent={true}>
        <View style={styles1.modalContent}>
          <TouchableOpacity style={styles1.closeButton} onPress={closeSlider}>
            <Icon name="close"></Icon>
          </TouchableOpacity>
          <Swiper index={selectedImageIndex} loop={false} showsButtons={true}>
            {images.map((image, index) => (
              <View key={index} style={styles1.slide}>
                <Image source={image} style={styles1.image}></Image>
              </View>
            ))}
          </Swiper>
        </View>
      </Modal>
    </View>
  );
}

const styles1 = StyleSheet.create({
  modalContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  closeButton: {
    position: "absolute",
    top: 80,
    right: 15,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    zIndex: 10,
  },
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  image: {
    width: "80%",
    height: "80%",
    resizeMode: "contain",
  },
  zoomableContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

function EventsTabContent({ navigation }) {
  return(
    <ScrollView>
      <View style={{marginTop: 10}}>
        {Object.values(demoDataEvents).map((data) => (
            <EventItem key={data.id} data={data} onPress={() => navigation.navigate('EventInfoScreen', { eventData: data })}/>
        ))}
      </View>
      </ScrollView>
  )
}