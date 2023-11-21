import React from 'react';

import {View, StyleSheet} from 'react-native';
import {Card, Chip, Text} from 'react-native-paper';

const DetailMovieModal = () => (
  <View style={styles.container}>
    <Card style={styles.card}>
      <View style={styles.titleContainer}>
        <Card.Title style={styles.title} title="Movie name1" />
        <Text style={styles.popularityText} variant="labelSmall">
          23
        </Text>
      </View>
      <Card.Content>
        <View style={styles.middleContentContainer}>
          <Text variant="titleSmall">12.02.22</Text>
          <View style={styles.middleContentBlock}>
            <Text style={styles.rate} variant="titleSmall">
              6.8
            </Text>
            <Text style={styles.vote} variant="titleSmall">
              (43 456)
            </Text>
          </View>
        </View>
        <Text style={styles.description} variant="bodySmall">
          Description
        </Text>
      </Card.Content>
      <View style={styles.chipContainer}>
        <Chip style={styles.chip}>Genres 1</Chip>
        <Chip style={styles.chip}>Genres 2</Chip>
        <Chip style={styles.chip}>Genres 3</Chip>
      </View>
    </Card>
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  chip: {
    width: 100,
    backgroundColor: '#ebebeb',
    color: '#232323',
    borderRadius: 25,
    paddingRight: 5,
    marginBottom: 5,
  },
  title: {
    width: '70%',
  },
  description: {
    paddingTop: 10,
    paddingBottom: 10,
    width: '100%',
  },
  vote: {
    color: '#acacb0',
    paddingLeft: 5,
  },
  rate: {
    fontWeight: 'bold',
  },
  middleContentContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  middleContentBlock: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: 20,
  },
  popularityText: {
    width: '30%',
    textAlign: 'right',
    paddingTop: 15,
    paddingRight: 15,
  },
  chipContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    padding: 10,
  },
  card: {
    backgroundColor: '#ffffff',
  },
  titleContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default DetailMovieModal;
