import {
    View,
    Image,
    StyleSheet,
    Text,
    Pressable
  } from "react-native";
import { useNavigation } from '@react-navigation/native';
import EntityPriceInfoWidget from "./EntityPriceInfoWidget";
import LocationInfoWidget from "../components/LocationInfoWidget";
import { colors, windowHeight } from "../../AppStyles";

import Restaurant from "../../assets/categoryRestaurantsBanner.jpg";

const styles = StyleSheet.create({
    entitiesContainer: {
      flex: 1,
    },
    entityItemContainer: {
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
        padding: 8,
        titleContainer: {
          // backgroundColor: colors.lightGrey,
        },
        descriptionContainer: {
          // backgroundColor: colors.red,
        },
        infoWidgetsContainer: {
          flexDirection: "row",
          // backgroundColor: colors.lightGrey,
        },
      },
    },
    banner: {
      width: "100%",
      height: "100%",
      borderRadius: 5,
    },
  });

  export default function EntityItem({ data, onPress }) {
    
    // const description = data.description;
    // const length = 100;
    // const trimmedDescription = description.substring(0, length);

    return (
      <Pressable onPress={onPress}>
        <View style={styles.entityItemContainer}>
          <View style={styles.entityItemContainer.imageContainer}>
            <Image style={styles.banner} source={Restaurant}></Image>
          </View>
          <View style={styles.entityItemContainer.contentContainer}>
            <View style={styles.entityItemContainer.contentContainer.titleContainer}>
              <Text style={{fontSize: 13}}>{data.name}</Text>
            </View>
            <View
              style={
                styles.entityItemContainer.contentContainer.descriptionContainer
              }
            >
              <Text numberOfLines={4} style={{ fontSize: 10 }}>
                {data.description}
              </Text>
            </View>
            <View
              style={
                styles.entityItemContainer.contentContainer.infoWidgetsContainer
              }
            >
              <EntityPriceInfoWidget marginRight={10} price_range={data.price_range}></EntityPriceInfoWidget>
              <LocationInfoWidget data={data.location} marginRight={0}></LocationInfoWidget>
            </View>
          </View>
        </View>
      </Pressable>
    );
  }
  