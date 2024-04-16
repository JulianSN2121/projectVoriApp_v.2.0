import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { _styles, colors, windowHeight, windowWidth } from "../../AppStyles";
import event1 from "../../assets/events1.png";
import event2 from "../../assets/events2.png";
import event3 from "../../assets/events3.png";
import event4 from "../../assets/events4.png";
import event5 from "../../assets/events5.png";

import Header from "../components/Header";
import EventItem from "../components/EventItem";
import DatePicker from "../components/DatePicker";


import { eventData } from "../services/apiClient";


// const weekday = [
//   "Sonntag",
//   "Montag",
//   "Dienstag",
//   "Mittwoch",
//   "Donnerstag",
//   "Freitag",
//   "Samstag",
// ];
// const d: Date = new Date();

// const dates = {
//   date: d.getDay(),
//   weekday: weekday[d.getDay()],
// };

const styles = StyleSheet.create({
  datePickerContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    slider: {
      padding: 5,
      marginTop: 10,
      marginBottom: 20,
    },
    item: {
      width: windowWidth / 4.5,
      height: windowHeight / 6.5,
      borderRadius: 10,
      marginRight: 10,
      justifyContent: "center",
      alignItems: "center",
      padding: 10,
      isActive: {
        backgroundColor: colors.red,
      },
      default: {
        backgroundColor: colors.lightGrey,
      },
    },
  },
  eventsContainer: {
    flex: 1,
  },
  
});

export default function EventsScreen({ navigation }) {
  const [selectedDate, setSelectedDate] = useState();
  const handleDateChange = (date) => {
    setSelectedDate(date);
    
  };

  const filterEventsByDate = () => {
    if(!selectedDate){
      return Object.values((eventData))
    }
    
    const selectedDateString = selectedDate.toISOString().split('T')[0];
    return Object.values(eventData).filter((event) => {
      const eventDate = event.start_date.split('T')[0];
      return eventDate === selectedDateString;
    })
  }
  
  const filteredEvents = filterEventsByDate();

  return (
    <SafeAreaView style={_styles.safeAreaView}>
      <ScrollView style={{ padding: 14 }}>
        <Header title="Events"></Header>

        <DatePicker onDateChange={handleDateChange}></DatePicker>
        
        <View style={styles.eventsContainer}>
          <View>
              {Object.values(filteredEvents).map((data) => (
                <EventItem key={data.id} data={data} onPress={() => navigation.navigate('EventInfoScreen', { eventData: data })}/>
              ))}
            </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}