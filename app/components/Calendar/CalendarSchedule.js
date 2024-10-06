import React, { useState, useRef, useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Image,
  Dimensions,
  SafeAreaView,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import Swiper from 'react-native-swiper';
import moment from 'moment';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

// Configurer moment pour que la semaine commence le lundi
moment.updateLocale('en', {
  week: {
    dow: 1, // Définir le début de la semaine au lundi (1)
  },
});

const CalendarSchedule = () => {
  const swiper = useRef();
  // Utiliser la date actuelle comme date sélectionnée par défaut
  const [selectedDate, setSelectedDate] = useState(moment().toDate());
  const [weekOffset, setWeekOffset] = useState(0);

  const [periods] = useState([
    { title: 'All Day', image: require('../../assets/calendar/Period/Morning.png'), dayTextColor: '#111' },
    { title: 'Morning', image: require('../../assets/calendar/Period/Morning.png'), dayTextColor: '#111' },
    { title: 'Afternoon', image: require('../../assets/calendar/Period/Afternoon.png'), dayTextColor: '#111' },
    { title: 'Evening', image: require('../../assets/calendar/Period/Evening.png'), dayTextColor: '#fff' },
  ]);

  const [selectedPeriod, setSelectedPeriod] = useState(periods[1]);

  // Calculer les semaines affichées dans le Swiper
  const weeks = useMemo(() => {
    return [-1, 0, 1].map((adj) => {
      const start = moment().add(weekOffset + adj, 'weeks').startOf('week');
      return Array.from({ length: 7 }).map((_, index) => {
        const date = moment(start).add(index, 'day');
        return {
          weekday: date.format('ddd'),
          date: date.toDate(),
        };
      });
    });
  }, [weekOffset]);

  // Formater la date pour l'affichage
  const formatDate = (date) => {
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  // Logique de changement de semaine avec mise à jour de la sélection sur la date actuelle
  const handleWeekChange = (newIndex) => {
    const newWeekOffset = weekOffset + newIndex;
    setWeekOffset(newWeekOffset);
    // Maintenir la date actuelle si elle est dans la nouvelle semaine, sinon sélectionner le lundi
    const newMonday = moment().add(newWeekOffset, 'weeks').startOf('week').toDate();
    const currentWeek = weeks[1];
    const isCurrentDateInNewWeek = currentWeek.some((day) => day.date.toDateString() === selectedDate.toDateString());
    setSelectedDate(isCurrentDateInNewWeek ? selectedDate : newMonday);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* En-tête de la section */}
      <ImageBackground source={selectedPeriod.image} style={styles.calendarBackground}>
        <View style={styles.header}>
          <Image source={require('../../assets/calendar/icon.png')} />
          <Text style={[styles.dateText, {color: selectedPeriod.dayTextColor}]}>{formatDate(selectedDate)}</Text>
        </View>

        {/* Navigation Horizontale de la Semaine */}
        <View style={styles.picker}>
          <Swiper
            index={1}
            ref={swiper}
            loop={false} // Désactiver la boucle pour éviter les comportements indésirables
            showsPagination={false}
            style={styles.calendar}
            containerStyle={{ height: 74 }}
            scrollEnabled={false}
          >
            {weeks.map((dates, index) => (
              <View style={styles.itemRow} key={index}>
                {dates.map((item, dateIndex) => {
                  const isActive = selectedDate.toDateString() === item.date.toDateString();
                  return (
                    <TouchableWithoutFeedback
                      key={dateIndex}
                      onPress={() => setSelectedDate(item.date)}
                    >
                      <View
                        style={[
                          styles.item,
                          isActive && {
                            backgroundColor: '#87a730',
                            borderColor: '#87a730',
                          },
                        ]}
                      >
                        <Text style={[styles.itemWeekday, isActive ? { color: '#fff' } : {color: selectedPeriod.dayTextColor}]}>
                          {item.weekday}
                        </Text>
                        <Text style={[styles.itemDate, isActive ? { color: '#fff' } : {color: selectedPeriod.dayTextColor}]}>
                          {item.date.getDate()}
                        </Text>
                      </View>
                    </TouchableWithoutFeedback>
                  );
                })}
              </View>
            ))}
          </Swiper>
        </View>
      </ImageBackground>

      {/* Gradient en bas */}
      <LinearGradient colors={['transparent', '#9c9c9c']} style={styles.gradientBottom} start={{ x: 0.5, y: 1 }} end={{ x: 0.5, y: 0 }} />

      {/* Sélecteur de périodes avec ScrollView */}
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false} // Masquer la barre de défilement
        style={styles.scrollView}
        contentContainerStyle={styles.timePeriodContainer}
      >
        {periods.map((period) => (
          <TouchableOpacity key={period.title} onPress={() => setSelectedPeriod(period)} style={styles.periodButton}>
            <Text style={[styles.timePeriodText, selectedPeriod.title === period.title ? styles.selectedPeriod : null]}>
              {period.title}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Affichage de la date et de la période sélectionnées */}
      <View style={styles.selectionInfo}>
        <Text style={styles.infoText}>
          Selected Date: {formatDate(selectedDate)} | Selected Period: {selectedPeriod.title}
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', padding: 20, marginTop: '15%' },
  dateText: { fontSize: 24, fontWeight: '900', marginStart: 10 },
  calendarBackground: { overflow: 'hidden', paddingBottom: 80 },
  picker: {
    maxHeight: 200,
    paddingBottom: 50,
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemRow: {
    width: width,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
  },
  item: {
    flex: 1,
    height: 50,
    marginHorizontal: 4,
    paddingVertical: 6,
    paddingHorizontal: 4,
    borderRadius: 8,
    flexDirection: 'column',
    alignItems: 'center',
  },
  itemWeekday: { fontSize: 15, fontWeight: '900', marginBottom: 4 },
  itemDate: { fontSize: 15, fontWeight: '600' },
  gradientBottom: { height: 10 },
  scrollView: {
  },
  timePeriodContainer: { flexDirection: 'row', },
  periodButton: { marginHorizontal: 20, marginTop: 10, padding: 10 },
  timePeriodText: { fontSize: 25, color: 'gray', fontWeight: 'bold' },
  selectedPeriod: { color: '#fc79b7', fontWeight: 'bold' },
  selectionInfo: { alignItems: 'center', marginTop: 20 },
  infoText: { fontSize: 18, fontWeight: '500' },
  calendar: {
    height: 200,
    marginTop: 20,
  },
});

export default CalendarSchedule;
