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
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [week, setWeek] = useState(0);

  const [periods] = useState([
    { title: 'All Day', image: require('../../assets/calendar/Period/Morning.png') },
    { title: 'Morning', image: require('../../assets/calendar/Period/Morning.png') },
    { title: 'Afternoon', image: require('../../assets/calendar/Period/Afternoon.png') },
    { title: 'Evening', image: require('../../assets/calendar/Period/Evening.png') },
  ]);

  const [selectedPeriod, setSelectedPeriod] = useState(periods[1]);

  // Calculer les semaines affichées dans le Swiper
  const weeks = useMemo(() => {
    const start = moment().add(week, 'weeks').startOf('week'); // Utiliser la configuration de la locale (lundi comme début)
    return [-1, 0, 1].map((adj) => {
      return Array.from({ length: 7 }).map((_, index) => {
        const date = moment(start).add(adj, 'week').add(index, 'day');
        return {
          weekday: date.format('ddd'),
          date: date.toDate(),
        };
      });
    });
  }, [week]);

  // Formater la date pour l'affichage
  const formatDate = (date) => {
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  // Logique de changement de semaine
  const handleWeekChange = (newIndex) => {
    const currentDayOfWeek = moment(selectedDate).day(); // Récupérer le jour de la semaine actuel
    const newSelectedDate = moment(selectedDate)
      .add(newIndex, 'week') // Ajouter (ou soustraire) la semaine
      .day(currentDayOfWeek) // Rester sur le même jour de la semaine
      .toDate();
    setSelectedDate(newSelectedDate);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* En-tête de la section */}
      <ImageBackground source={selectedPeriod.image} style={styles.calendarBackground}>
        <View style={styles.header}>
          <Image source={require('../../assets/calendar/icon.png')} />
          <Text style={styles.dateText}>{formatDate(selectedDate)}</Text>
        </View>

        {/* Navigation Horizontale de la Semaine */}
        <View style={styles.picker}>
          <Swiper
            index={1}
            ref={swiper}
            loop={false}
            showsPagination={false}
            style={styles.calendar}
            containerStyle={{ height: 74 }}
            onIndexChanged={(ind) => {
              if (ind === 1) return;
              setTimeout(() => {
                const newIndex = ind - 1;
                const newWeek = week + newIndex;
                setWeek(newWeek);
                handleWeekChange(newIndex); // Mise à jour de la date sélectionnée en gardant le même jour de la semaine
                swiper.current.scrollTo(1, false);
              }, 100);
            }}
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
                        <Text style={[styles.itemWeekday, isActive && { color: '#fff' }]}>
                          {item.weekday}
                        </Text>
                        <Text style={[styles.itemDate, isActive && { color: '#fff' }]}>
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

      {/* Sélecteur de périodes */}
      <View style={styles.timePeriodContainer}>
        {periods.map((period) => (
          <TouchableOpacity key={period.title} onPress={() => setSelectedPeriod(period)} style={styles.periodButton}>
            <Text style={[styles.timePeriodText, selectedPeriod.title === period.title ? styles.selectedPeriod : null]}>
              {period.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

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
  container: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', padding: 20, marginTop: '10%' },
  dateText: { fontSize: 24, fontWeight: '900', marginStart: 10 },
  calendarBackground: { overflow: 'hidden', paddingBottom: 100 },
  picker: {
    flex: 1,
    maxHeight: 74,
    paddingVertical: 12,
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
  itemWeekday: { fontSize: 13, fontWeight: '500', color: '#737373', marginBottom: 4 },
  itemDate: { fontSize: 15, fontWeight: '600', color: '#111' },
  gradientBottom: { height: 15 },
  timePeriodContainer: { flexDirection: 'row', justifyContent: 'center', padding: 10, backgroundColor: '#f5f5f5' },
  periodButton: { marginHorizontal: 20, marginTop: 10, padding: 10 },
  timePeriodText: { fontSize: 25, color: 'gray', fontWeight: 'bold' },
  selectedPeriod: { color: '#87a730', fontWeight: 'bold' },
  selectionInfo: { alignItems: 'center', marginTop: 20 },
  infoText: { fontSize: 18, fontWeight: '500' },
  calendar: {
    height: 200,
      marginTop: 20
  }
});

export default CalendarSchedule;
