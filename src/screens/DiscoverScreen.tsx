import React, { useState } from "react";
import { useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  StyleSheet,
  TextInput,
  Image,
  ImageBackground,
  Pressable,
  StatusBar,
  FlatList,
  Animated
} from "react-native";
import { debounce } from 'lodash';
import Fuse from 'fuse.js';
import { _styles, colors, windowWidth, windowHeight, Icons } from "../../AppStyles";
import AccommodationsBanner from "../../assets/categoryAccommodationsBanner.jpg";
import AssociationsBanner from "../../assets/categoryAssociationsBanner.jpg";
import BarsBanner from "../../assets/categoryBarsBanner.jpg";
import CompaniesBanner from "../../assets/categoryCompaniesBanner.jpg";
import DoctorsBanner from "../../assets/categoryDoctorsBanner.jpg";
import EventsBanner from "../../assets/categoryEventsBanner.jpg";
import HotelsBanner from "../../assets/categoryHotelsBanner.jpg";
import NightclubsBanner from "../../assets/categoryNightclubsBanner.jpg";
import OrganisationsBanner from "../../assets/categoryOrganisationsBanner.jpg";
import RestaurantsBanner from "../../assets/categoryRestaurantsBanner.jpg";
import Header from "../components/Header";

import { eventData } from "../services/apiClient";
import { entityData } from "../services/apiClient";

const styles = StyleSheet.create({
  bodyContainer: {
    flex: 1,
  },
  categoryBanner: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "500",
  },
  categoryItem: {
    width: windowWidth / 3.5,
    height: windowHeight / 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e0e0e0",
    borderRadius: 10,
    marginRight: 12,
    overflow: "hidden",
  },
  slider: {
    flexDirection: "row",
    padding: 5,
    marginTop: 10,
    marginBottom: 20,
  },
  sliderItemContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    marginRight: 10,
    box: {
      width: windowWidth / 2,
      height: 150,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 10,
      overflow: "hidden",
    },
    title: {
      fontSize: 16,
      padding: 5,
    },
  },

  categoryItemText: {
    fontSize: 15,
    color: "white",
    padding: 10,
    fontWeight: "bold",
    textAlign: "center",
  },
  resultsContainer: {
    position: "absolute",
    maxHeight: windowHeight *0.35,
    top: 40,
    left: 0,
    right: 0,
    zIndex: 1000,
    borderColor: colors.lightGrey,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderTopWidth: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderRadius: 5,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
  },
  resultItem: {
    padding: 5,
    flexDirection: "row", 
    alignItems: "center",
    borderColor: colors.lightGrey,
    borderBottomWidth: 1,
  },
  resultItemLogo: {
    flex: 2,
    image: {
    borderColor: colors.lightGrey,
    borderRadius: 4,
    borderWidth: 1,
    }
  },
  resultItemIcon: {
    flex: 1,
  },
  resultItemName:{
    flex: 6,
  },
  resultItemLocation: {
    flex: 3,
    alignItems: "flex-end"
  },
  searchBarContainer: {
    borderColor: colors.lightGrey,
    borderWidth: 1,
    borderRadius: 4,
    padding: 15,
    flexDirection: "row",
    input: {
      flex: 1,
    },
    icon: {
      flex: 1,
      alignItems: "flex-end",
    }
  }
});

interface CategoriesTitles {
  [key: string]: string;
}

const categoriesTitles: CategoriesTitles = {
  0: "Restaurants",
  1: "Bars",
  2: "Nachtclubs",
  3: "Hotels",
  4: "Unterkünfte",
  5: "Unternehmen",
  6: "Ärzte",
  7: "Vereine",
  8: "Organisationen",
  9: "Events",
};

const categoriesFilter = {
  0: "restaurant",
  1: "nightclub",
  2: "bar",
  3: "hotel",
  4: "accommodation",
  5: "company",
  6: "doctor",
  7: "association",
  8: "organisation",
};

const sectionSliderCategories = {
  0: "restaurant",
  1: "bar",
  2: "nightclub",
  3: "hotel",
  4: "accommodation",
  5: "company",
  6: "doctor",
  7: "association",
  8: "organisation",
};

const categoriesBannerImages = {
  0: RestaurantsBanner,
  1: BarsBanner,
  2: NightclubsBanner,
  3: HotelsBanner,
  4: AccommodationsBanner,
  5: CompaniesBanner,
  6: DoctorsBanner,
  7: AssociationsBanner,
  8: OrganisationsBanner,
  9: EventsBanner,
}
const fuseOptions = {
  includeScore: true,
  keys: [
    { name: 'name', weight: 0.6 },
    { name: 'location', weight: 0.4 },
    ],
  threshold: 0.4,
};

let fuse = new Fuse(entityData, fuseOptions);

export default function DiscoverScreen({ navigation }) {
  
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchResultsVisible, setSearchResultsVisible] = useState(false);

  useEffect(() => {
    const debouncedSetSearchQuery = debounce((query) => {
      setDebouncedSearchQuery(query);
    }, 10);

    debouncedSetSearchQuery(searchQuery);

    return () => debouncedSetSearchQuery.cancel();
  }, [searchQuery]);

  useEffect(() => {
    if (!debouncedSearchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    const results = fuse.search(debouncedSearchQuery).map(({item}) => item);

    setSearchResults(results);
  }, [debouncedSearchQuery]);

  const resultsHeight = new Animated.Value(0);
  const fadeAnim = React.useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (searchResults.length > 0) {
      setSearchResultsVisible(true);
      Animated.timing(resultsHeight, {
        toValue: 100,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      setSearchResultsVisible(false);
    }
  }, [searchResults]);

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setSearchResultsVisible(false);
    });
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
    setSearchResultsVisible(false);
  };
  
  function dataFilter(data, criterium){
    return data.filter((item) => item.category.includes(categoriesFilter[criterium]));
  }

  const getIconForCategory = (category) => {
    switch (category[0]) {
      case 0:
        return <Icons.Icon_MI name="restaurant-menu" size={15} color="#000" />;
      case 1:
        return <Icons.Icon_MI name="local-bar" size={15} color="#000" />;
      case 2:
        return <Icons.Icon_MI name="music-note" size={15} color="#000" />;
      case 3:
        return <Icons.Icon_MI name="hotel" size={15} color="#000" />;
      case 4:
        return <Icons.Icon_MCI name="hoop-house" size={15} color="#000" />;
      case 5:
        return <Icons.Icon_MI name="business-center" size={15} color="#000" />;
      case 6:
        return <Icons.Icon_MCI name="doctor" size={15} color="#000" />;
      case 7:
        return <Icons.Icon_MI name="group" size={15} color="#000" />;
      case 8:
        return <Icons.Icon_MI name="account-balance" size={15} color="#000" />;
      default:
        return null;
    }
  };
  
  return (
    <SafeAreaView style={_styles.safeAreaView}>
      <StatusBar></StatusBar>
      <ScrollView nestedScrollEnabled={true} style={{ padding: 14 }}>
        {/*Header*/}
        <Header title="Entdecke Vorarlberg"></Header>

        <View style={styles.bodyContainer}>
          {/* Searchbar */}
          <View style={styles.searchBarContainer}>
            <TextInput
            style={styles.searchBarContainer.input}
            placeholder="Suchen..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <View style={styles.searchBarContainer.icon}>
              <Pressable onPress={() => {clearSearch(); fadeOut();}}>
                <Icons.Icon name="remove" size={20} color={colors.black}/>
              </Pressable>
            </View>
          )}
          </View>
          {searchResultsVisible && (
            <Animated.View style={{...styles.resultsContainer, opacity: fadeAnim }}>
              <FlatList
                data={searchResults}
                nestedScrollEnabled={true}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <Pressable onPress={() => {navigation.navigate('EntityInfoScreen', { entityData: item})}}>
                    <View style={styles.resultItem}>
                      <View style={styles.resultItemLogo}>
                        <Image style={{...styles.resultItemLogo.image, width: windowWidth * .1, height: windowWidth * 0.1}} source={categoriesBannerImages[0]}></Image>
                      </View>
                      <View style={styles.resultItemIcon}>
                        {getIconForCategory(item.category)}
                      </View>
                      <View style={styles.resultItemName}>
                        <Text>{item.name}</Text>
                      </View>
                      <View style={styles.resultItemLocation}>
                        <Text>{item.location}</Text>
                      </View>
                    </View>
                  </Pressable>
                )}
                ListEmptyComponent={() => (
                  searchQuery.length > 0 && (
                    <View style={{ alignItems: 'center', marginTop: 20 }}>
                      <Text>No results found.</Text>
                    </View>
                  )
                )}
              />
            </Animated.View>
          )}

          {/* CategoriesSlider */}
          <View>
            <CategoriesSlider navigation={navigation}></CategoriesSlider>
          </View>

          {/* Render Events Section */}
          <Text style={{ ...styles.sectionTitle, marginTop: 10 }}>
            Events in deiner Nähe
          </Text>
          <View>
            <EventSectionSlider navigation={navigation} data={eventData}></EventSectionSlider>
          </View>

          {/* Render all other sections for categories */}
          {Object.keys(sectionSliderCategories).map((key) => (
            <SectionSliderWithHeading
              key={key}
              heading={categoriesTitles[key]}
              data={dataFilter(entityData, key)}
              navigation={navigation}
              categoryKey={key}
            />
          ))}

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export function CategoriesSlider({ navigation  }) {
  const entries = Object.entries(categoriesTitles);
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.slider}
    >
      {Object.entries(categoriesTitles).map(([key, title], index) => (
        <CategoryItem
          onPress={() => {
            if (index === entries.length - 1) {
            navigation.navigate('EventsScreen', {categoryType: title });
          } else {
            navigation.navigate('CategoryEntitiesScreen', { categoryType: title, index: index });
          }}}
          key={key}
          title={title}
          imageSource={categoriesBannerImages[key]}
        />
      ))}
    </ScrollView>
  );
}

function CategoryItem({ title, imageSource, onPress }) {
  return (
    <Pressable onPress={onPress}>
      <View style={styles.categoryItem}>
          <ImageBackground style={styles.categoryBanner} source={imageSource}>
            <Text style={styles.categoryItemText}>{title}</Text>
          </ImageBackground>
      </View>
    </Pressable>
  );
}


function EventSectionSlider({ data, navigation }) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.slider}
    >
      {Object.entries(data).map(([key, data], index) => (
        <EventSectionSliderItem data={data} key={data.id} onPress={() => {navigation.navigate('EventInfoScreen', {eventData: data })}}/>
      ))}
    </ScrollView>
  );
}

function EventSectionSliderItem({ data, onPress }) {
  const imageUrl = "https://via.placeholder.com/150";
  return (
    <Pressable onPress={onPress}>
      <View style={styles.sliderItemContainer}>
        <View style={styles.sliderItemContainer.box}>
          <Image
            source={{
              uri: imageUrl,
            }}
            style={{ width: "100%", height: "100%" }}
          />
        </View>
        <Text style={styles.sliderItemContainer.title}>{data.name}</Text>
      </View>
    </Pressable>
  );
}

function SectionSliderWithHeading({ heading, data, navigation, categoryKey }) {
  return (
    <View>
      <Text style={{ ...styles.sectionTitle, marginTop: 10 }}>
        {heading} in deiner Nähe
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.slider}
      >
        {data.map((item, index) => (
          <Pressable onPress={() => navigation.navigate(categoryKey === 'events' ? 'EventInfoScreen' : 'EntityInfoScreen', { [categoryKey === 'events' ? 'eventData' : 'entityData']: item })} key={index}>
            <View style={styles.sliderItemContainer}>
              <View style={styles.sliderItemContainer.box}>
                <Image
                  source={{
                    uri: item.imageUrl || 'https://via.placeholder.com/150', // Placeholder image URL
                  }}
                  style={{ width: "100%", height: "100%" }}
                />
              </View>
              <Text numberOfLines={1} style={styles.sliderItemContainer.title}>{item.name}</Text>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

