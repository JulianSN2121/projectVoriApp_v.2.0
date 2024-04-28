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

import { eventsData } from "../data/eventsData";
import { entitiesData } from "../data/entitiesData";


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
    width: windowWidth / 2,
    height: 170,
    marginRight: 10,
    image: {
      height: "85%",
      borderRadius: 10,
      overflow: "hidden",
    },
    text:{
      height: "15%"
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
  1: "bar",
  2: "nightclub",
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
    { name: 'name', weight: 0.5 },
    { name: 'location', weight: 0.3 },
    { name: 'description', weight: 0.2 },

    ],
  threshold: 0.4,
};


export default function DiscoverScreen({ navigation }) {
  
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = debounce((query) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    const fuse = new Fuse(entitiesData, fuseOptions);
    const results = fuse.search(query);
    setSearchResults(results.map(({ item }) => item));
  }, 300);

  useEffect(() => {
    handleSearch(searchQuery);
  }, [searchQuery]);

  const clearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
  };
  

  function dataFilter(data, criterium){
    return data.filter((item) => item.category.includes(categoriesFilter[criterium]));
  }

  const getIconForCategory = (category) => {
    switch (category[0]) {
      case "restaurant":
        return <Icons.Icon_MI name="restaurant-menu" size={15} color="#000" />;
      case "bar":
        return <Icons.Icon_MI name="local-bar" size={15} color="#000" />;
      case "nightclub":
        return <Icons.Icon_MI name="music-note" size={15} color="#000" />;
      case "hotel":
        return <Icons.Icon_MI name="hotel" size={15} color="#000" />;
      case "accommodation":
        return <Icons.Icon_MCI name="hoop-house" size={15} color="#000" />;
      case "company":
        return <Icons.Icon_MI name="business-center" size={15} color="#000" />;
      case "doctor":
        return <Icons.Icon_MCI name="doctor" size={15} color="#000" />;
      case "association":
        return <Icons.Icon_MI name="group" size={15} color="#000" />;
      case "organisation":
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
              <Pressable onPress={clearSearch}>
                <Icons.Icon name="remove" size={20} color={colors.black}/>
              </Pressable>
            </View>
          )}
          </View>
          {searchResults.length > 0 ? (
            <View style={styles.resultsContainer}>
              <ScrollView nestedScrollEnabled={true}>
                {searchResults.map((item) => (
                  <Pressable
                    key={item.id}
                    onPress={() => {
                      navigation.navigate('EntityInfoScreen', { entitiesData: item });
                    }}
                  >
                    <View style={styles.resultItem}>
                      <View style={styles.resultItemLogo}>
                        <Image
                          style={{
                            ...styles.resultItemLogo.image,
                            width: windowWidth * 0.1,
                            height: windowWidth * 0.1,
                          }}
                          source={item.banner}
                        />
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
                ))}
              </ScrollView>
            </View>
          ) : (
            searchQuery.length > 0 && (
              <View style={styles.resultsContainer}>
                <View style={{ alignItems: 'center', marginTop: 20 }}>
                  <Text>No results found.</Text>
                </View>
              </View>
            )
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
            <EventSectionSlider navigation={navigation} data={eventsData}></EventSectionSlider>
          </View>

          {/* Render all other sections for categories */}
          {Object.keys(sectionSliderCategories).map((key) => (
            <SectionSlider
              key={key}
              heading={categoriesTitles[key]}
              data={dataFilter(entitiesData, key)}
              navigation={navigation}
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
        <EventSectionSliderItem data={data} key={data.id} onPress={() => {navigation.navigate('EventInfoScreen', {eventsData: data })}}/>
      ))}
    </ScrollView>
  );
}

function EventSectionSliderItem({ data, onPress }) {
  return (
    <Pressable onPress={onPress}>
      <View style={styles.sliderItemContainer}>
        <View style={styles.sliderItemContainer.image}>
          <Image
            source={data.banner}
            style={{ width: "100%", height: "100%" }}
          />
        </View>
        <View style={styles.sliderItemContainer.text}>
          <Text numberOfLines={1} ellipsizeMode="tail" style={{...styles.sliderItemContainer.title }}>{data.name}</Text>
        </View>
      </View>
    </Pressable>
  );
}

function SectionSlider({ data, navigation, heading }) {
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
          {Object.entries(data).map(([key, data], index) => (
            <SectionSliderItem data={data} key={data.id} onPress={() => {navigation.navigate('EntityInfoScreen', {entitiesData: data })}}/>
          ))}
      </ScrollView>
    </View>
  );
}

function SectionSliderItem({ data, onPress }) {
  return (
    <Pressable onPress={onPress}>
      <View style={styles.sliderItemContainer}>
        <View style={styles.sliderItemContainer.image}>
          <Image
            source={data.banner}
            style={{ width: "100%", height: "100%" }}
          />
        </View>
        <View style={styles.sliderItemContainer.text}>
          <Text numberOfLines={1} ellipsizeMode="tail" style={{...styles.sliderItemContainer.title }}>{data.name}</Text>
        </View>
      </View>
    </Pressable>
  );
}