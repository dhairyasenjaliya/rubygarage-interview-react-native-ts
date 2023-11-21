import React from 'react';
import {Button, View} from 'react-native';
import type {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../components/types';

type StubsProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Stubs'>;
};

const Stubs = ({navigation}: StubsProps) => (
  <View>
    <Button title="Lists" onPress={() => navigation.push('Lists')} />
  </View>
);

export default Stubs;
