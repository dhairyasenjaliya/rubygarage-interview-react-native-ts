import React from 'react';
import {View, Text, TouchableOpacity, Platform, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const CustomHeader = ({
  title,
  description,
  itemsCount,
}: {
  title: string;
  description: string;
  itemsCount: number;
}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
      <View style={styles.titleDescriptionContainer}>
        <View style={styles.descriptionBlock}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.itemsCount}>{`(${itemsCount})`}</Text>
        </View>
        <Text style={styles.description}>{description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#ffffff',
    paddingTop: 24,
    flexDirection: 'column',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingHorizontal: 15,
  },
  backButton: {
    alignSelf: 'flex-start',
  },
  backButtonText: {
    color: '#007AFF',
    fontSize: 16,
  },
  titleDescriptionContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginTop: 8,
  },
  itemsCount: {
    color: '#acacb0',
    paddingLeft: 5,
  },
  descriptionBlock: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  description: {
    fontSize: 14,
    color: '#666',
    paddingBottom: 10,
  },
});

export default CustomHeader;
