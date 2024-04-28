import React from "react";
import {
  View,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Image,
  Text,
  Pressable,
} from "react-native";

import { _styles, colors, windowHeight, windowWidth } from "../../AppStyles";
import EventImage from "../../assets/event.jpeg";
import Logo from "../../assets/welcomeScreen_Logo.png";
import { charUppercase } from "../utils/stringHelpers";
import Header from "../components/Header";

import { entitiesData } from "../data/entitiesData";

const data = {};

const styles = StyleSheet.create({
  newsItemContainer: {
    flexDirection: "row",
    width: "100%",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    borderColor: colors.lightGrey,
    height: windowHeight / 8,
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainer: {
    flex: 5,
    marginLeft: 10,
  },
  profileIcon: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  heading: {
    flexDirection: "row",
    alignItems: "center",
    text: {
        flex: 1,
    },
    time: {
        flex: 1,
        alignItems: "flex-end",
    },
    style: {
      fontSize: 13,
      color: colors.red,
      textDecorationLine: "underline",
    },
  },
  entityName: {
    text: {
        fontSize: 16,
        color: colors.darkGrey,
    }
  },
  postedContainer: {
    borderRadius: 10,
    width: windowWidth * 0.25,
    padding: 4,
    text: {
        fontSize: 14,
        textDecorationLine: "underline",
    }
  },
  description: {
    width: "70%"
  },
});

const headerStyles = {
  headerContainer: {
    flexDirection: "row",
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
    height: windowHeight * 0.07,
    marginBottom: 12,
  },
  logoContainer: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    logo: {
      width: 37,
      height: 50,
    },
  },
  titleContainer: {
    flex: 12,
    justifyContent: "center",
    title: {
      fontSize: 20,
      fontWeight: 500,
      paddingLeft: 10,
    },
  },
};

function dataFilter(data, categories) {
  const filteredData = data.filter((item) =>
    categories.some((category) => item.category.includes(category))
  );
    const sortedData = filteredData.sort((a, b) => {
    const dateA = new Date(a.entity_creation_timestamp);
    const dateB = new Date(b.entity_creation_timestamp);
    return dateB - dateA;
  });

  return sortedData;
}

export default function NewsScreen({ navigation }) {
  return (
    <SafeAreaView style={_styles.safeAreaView}>
      <ScrollView style={{ padding: 14 }}>
        <Header title="News"></Header>
        {Object.entries(
          dataFilter(entitiesData, ["restaurant", "bar", "nightclub"])
        ).map(([key, data], index) => (
          <FeedItem
            navigation={navigation}
            data={data}
            key={data.id}
          ></FeedItem>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}


function FeedItem({ data, navigation }) {
    const today = new Date();
    const entityCreationDate = new Date(data.entity_creation_timestamp);
    const differenceInMilliseconds = today - entityCreationDate;
    const differenceInDays = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));
    
  return (
    <Pressable
      onPress={() => {
        navigation.navigate("EntityInfoScreen", { entitiesData: data });
      }}
    >
        <View style={styles.newsItemContainer}>
            <View style={styles.imageContainer}>
                <Image style={styles.profileIcon} source={EventImage}></Image>
            </View>
            <View style={styles.contentContainer}>
                <View style={styles.heading}>
                    <View style={styles.heading}>
                        <Text style={styles.heading.style}>New {charUppercase(data.category, 0)}</Text>
                    </View>
                    <View style={styles.heading.time}>
                        <PostedInfoWidget time={differenceInDays}></PostedInfoWidget>
                    </View>
                </View>
                <View style={styles.entityName}>
                    <Text>{data.name}</Text>
                </View>
                <View style={styles.description}>
                    <Text numberOfLines={2} style={{ fontSize: 12 }}>{data.description}</Text>
                </View>
            </View>
        </View>
    </Pressable>
  );
}

function PostedInfoWidget({ time }) {
    return (
        <View style={styles.postedContainer}>
            <Text style={styles.postedContainer.text}>{time} days ago</Text>
        </View>
    );
}
