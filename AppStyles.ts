import { StyleSheet, Dimensions } from 'react-native';

export const windowWidth = Dimensions.get("window").width;
export const windowHeight = Dimensions.get("window").height;

import Icon from "react-native-vector-icons/FontAwesome";
import Icon_MI from "react-native-vector-icons/MaterialIcons"
import Icon_MCI from "react-native-vector-icons/MaterialCommunityIcons"

export const Icons = {
  Icon: Icon,
  Icon_MI: Icon_MI,
  Icon_MCI: Icon_MCI
};

export const colors = {
  lightGrey: '#CECECE',
  darkGrey: '#333333',
  red: '#DA121A',
  white: '#FFFFFF',
  black: '#000'
}

export const _styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  mapIcon: {
    padding: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 10,
  },
  slider: {
    flexDirection: 'row',
    padding: 10,
  },
  sliderItem: {
    width: 250,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    marginRight: 10,
  },
  sliderItemText: {
    fontSize: 18,
  },
  pageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  sliderContainer: {
    marginTop: 20,
  },
  slider: {
    paddingLeft: 20,
  },
  sliderTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingLeft: 20,
  },
});