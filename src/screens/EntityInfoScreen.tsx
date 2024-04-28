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
import SocialMediaTabWidget from "../components/SocialMediaTabWidget";
import EventItem from "../components/EventItem";


const menuItems = {
  overview: "Übersicht",
  menu: "Menü",
  images: "Bilder",
  events: "Events",
};

export default function EntityInfoScreen({ navigation, route }) {
  const [selectedTab, setSelectedTab] = useState("overview");
  const handleTabSelect = (tabKey) => {
    setSelectedTab(tabKey);
  }
  const { entitiesData } = route.params;
  const { key } = route.params;
  
  return (
    <SafeAreaView style={_styles.safeAreaView}>
      <ScrollView style={{ padding: 14 }}>
        <Header title={entitiesData.name}></Header>

        <View style={styles.contentContainer}>
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={entitiesData.banner}></Image>
            <View style={styles.widgetOverlayContainer}>
              <View style={styles.widgetOverlayContainer.left}>
              </View>
              <View style={styles.widgetOverlayContainer.right}>
                <WebsiteLinkWidget websiteLink={entitiesData.website_link}></WebsiteLinkWidget>
                <CallWidget phoneNumber={entitiesData.phone_contact}></CallWidget>
                <RouteWidget address={[entitiesData.street, entitiesData.housenumber, entitiesData.postalcode]}></RouteWidget>
              </View>
            </View>
          </View>

          <View style={styles.tabMenuContainer}>
            <TabMenu onSelectTab={handleTabSelect} selectedTab={selectedTab} />
          </View>

          <View style={styles.entityContentContainer}>
            {selectedTab === "overview" && <OverviewTabContent data={entitiesData}></OverviewTabContent>}
            {selectedTab === "menu" &&  <MenuTabContent data={entitiesData.menu}></MenuTabContent>}        
            {selectedTab === "images" && <ImagesTabContent data={entitiesData.images}></ImagesTabContent>}
            {selectedTab === "events" && <EventsTabContent navigation={navigation} data={entitiesData}></EventsTabContent>}
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
    marginTop: 10,
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    alignContent: "space-between",
    justifyContent: "space-between",
  },
  noEventsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  noEventsText: {
    fontSize: 14,
    color: colors.darkGrey,
  },
  noMenuContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  noMenuText: {
    fontSize: 14,
    color: colors.darkGrey,
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


function ImagesTabContent({ data }) {
  return(
    <ImageRender data={data}></ImageRender>
  )
}

function MenuTabContent({ data }) {
  return(
    <ImageRender data={data}></ImageRender>
  )
}

function EventsTabContent({ navigation, data }) {

  const events = [data.events];

  return (
    <ScrollView>
      <View style={{ marginTop: 10 }}>
        {events[0] && events[0].length > 0 ? (
          events[0].map((data) => (
            <EventItem
              key={data.id}
              data={data}
              onPress={() =>
                navigation.navigate('EventInfoScreen', { eventsData: data })
              }
            />
          ))
        ) : (
          <View style={styles.noEventsContainer}>
            <Text style={styles.noEventsText}>No events found</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

function ImageRender({ data }) {
  const [isSliderVisible, setIsSliderVisible] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const [isImagesLoading, setIsImagesLoading] = useState(true);
  const [loadedImagesCount, setLoadedImagesCount] = useState(0);

  const images = data || [];

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
    <ScrollView>
      <View style={{marginTop: 10}}>
      {images && images.length > 0 ? (
        <View style={styles.menuImageContainer}>
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
      ) : (
        <View style={styles.noMenuContainer}>
          <Text style={styles.noMenuText}>No menu found</Text>
        </View>
      )}
      </View>
    </ScrollView>
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