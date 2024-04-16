import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome";
import { colors, windowHeight } from '../../AppStyles'

const DatePicker = ({ onDateChange }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    onDateChange(currentDate);
  }, [currentDate, onDateChange]);

  const getWeekStartDate = (date) => {
    const startDate = new Date(date);
    const day = startDate.getDay();
    const difference = day === 0 ? -6 : 1 - day;
    startDate.setDate(startDate.getDate() + difference);
    return startDate;
  };

  const [weekStartDate, setWeekStartDate] = useState(getWeekStartDate(currentDate));

  const isSelectedDate = (date) => {
    return date.getDate() === currentDate.getDate() &&
      date.getMonth() === currentDate.getMonth() &&
      date.getFullYear() === currentDate.getFullYear();
  };

  const getWeekdayName = (date) => {
    const weekdays = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So']; 
    const dayIndex = date.getDay(); 
    const weekdayName = weekdays[dayIndex === 0 ? 6 : dayIndex - 1]; 
    return weekdayName;
  };
  

  const DayButton = ({ date }) => {
    const isSelected = isSelectedDate(date);
      const containerStyle = [
      styles.dayContainer,
      isSelected && styles.selectedDayContainer
    ];
  
    return (
      <View style={containerStyle}>
        <Text style={isSelected ? styles.selectedDayText : styles.weekdayText}>
          {getWeekdayName(date)}
        </Text>
        <Pressable
          style={styles.dayButton}
          onPress={() => {
            setCurrentDate(date);    
          }}
        >
          <Text style={isSelected ? styles.selectedDayText : styles.dayText}>
            {date.getDate()}
          </Text>
        </Pressable>
      </View>
    );
  };
  

  const renderWeekDays = () => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      const weekDay = new Date(weekStartDate);
      weekDay.setDate(weekDay.getDate() + i);
      days.push(
        <DayButton key={i} date={weekDay} />
      );
    }
    return days;
  };

  const changeWeek = (amount) => {
    const newWeekStartDate = new Date(weekStartDate);
    newWeekStartDate.setDate(newWeekStartDate.getDate() + amount * 7);
    setWeekStartDate(newWeekStartDate);
  };

  return (
    <View style={styles.container}>
      <View style={styles.monthYearBox}>
        <Text style={styles.monthYearText}>
          {weekStartDate.toLocaleString('de-DE', { month: 'long', year: 'numeric' })}
        </Text>
      </View>
      <View style={styles.navigation}>
        <View style={styles.arrowBox}>
          <Pressable onPress={() => changeWeek(-1)} style={styles.arrowButton}>
            <Icon style={{color: colors.white}} name="chevron-left" size={12}></Icon>
          </Pressable>
        </View>
        <View style={styles.weekDays}>
          {renderWeekDays()}
        </View>
        <View style={styles.arrowBox}>
          <Pressable onPress={() => changeWeek(1)} style={styles.arrowButton}>
            <Icon style={{color: colors.white}} name="chevron-right" size={12}></Icon>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: colors.lightGrey,
    borderWidth: 1,
    borderRadius: 10,
    height: windowHeight * 0.15,
    marginBottom: 10,
  },
  monthYearBox: {
    padding: 8,
    marginBottom: 4,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  monthYearText: {
    fontSize: 18,
  },
  navigation: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  weekDays: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flex: 1,
  },
  dayContainer: {
    alignItems: 'center',
  },
  weekdayText: {
    fontSize: 12,
  },
  dayButton: {
    padding: 10,
  },
  dayText: {
    fontSize: 16,
  },
  selectedDay: {
    backgroundColor: 'blue',
  },
  selectedDayText: {
    color: 'white',
  },
  arrowButton: {
    padding: 10,
  },
  arrowText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  selectedDayContainer: {
    backgroundColor: colors.red,
    borderRadius: 10,
    padding: 5,
  },
  arrowBox: {
    backgroundColor: colors.red,
    borderRadius: 5,
  },
});

export default DatePicker;