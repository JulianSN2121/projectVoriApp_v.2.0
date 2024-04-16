import { Dimensions } from "react-native";
import { colors } from "../../AppStyles";	

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export const HeaderStyles = {
  headerContainer: {
    flexDirection: "row",
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
    height: windowHeight *0.07,
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
    flex: 10,
    justifyContent: "center",
    title: {
      fontSize: 20,
      fontWeight: 500,
      paddingLeft: 10,
    },
  },
  mapPinContainer: {
    flex: 2,
    justifyContent: "center",
    alignItems: "flex-end",
    item: {
      borderWidth: 1,
      borderRadius: 4,
      borderColor: colors.lightGrey,
      padding: 15,
    },
  },
}