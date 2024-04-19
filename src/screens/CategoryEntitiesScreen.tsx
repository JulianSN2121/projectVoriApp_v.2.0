import {
  View,
  SafeAreaView,
  ScrollView,
  StyleSheet
} from "react-native";
import { useEffect, useState } from "react";
import { _styles } from "../../AppStyles";
import Header from "../components/Header";
import EntityItem from "../components/EntityItem";
import { entityData } from "../services/apiClient";

const styles = StyleSheet.create({
  entitiesContainer: {
    flex: 1,
  },
});
function dataFilter(data, category){
  return data.filter((item) => item.category.includes(category));
}

export default function CategoryEntitiesScreen({ navigation, route }) {
  const { categoryType } = route.params;
  const { index } = route.params;
  const [filteredData, setFilteredData] = useState([]);
  const entityTags = [
    "restaurant",
    "bar",
    "nightclub",
    "hotel",
    "accommodation",
    "company",
    "doctor",
    "association",
    "organisation",
  ];
  useEffect(() => {
    const entityTag = entityTags[index] || "";
    const dataFilter = (data, category) => data.filter((item) => item.category.includes(category));
    const filtered = dataFilter(entityData, entityTag);
    setFilteredData(filtered);
  }, [index, categoryType]);
  
  return (
    <SafeAreaView style={_styles.safeAreaView}>
      <ScrollView style={{ padding: 14 }}>

        <Header title={categoryType}></Header> 

        <View style={styles.entitiesContainer}>
          <View>
            {filteredData.map((data) => (
              <EntityItem key={data.id} data={data} onPress={() => navigation.navigate('EntityInfoScreen', { entityData: data, key: index })}/>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}