import React from 'react';

import 'react-native-gesture-handler';
import {Button, View} from 'react-native';
import {Provider as PaperProvider} from 'react-native-paper';
import {Provider} from 'react-redux';
import {NavigationContainer, NavigationProp} from '@react-navigation/native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';

import Stubs from '../stubs/Stubs';
import Lists from '../stubs/Lists';
import CreateListModal from '../stubs/CreateListModal';

import store from '../store/configureStore';
import {RootStackParamList} from './types';
import DetailMovieModal from '../stubs/DetailMovieModal';
import CustomHeader from '../stubs/DetailMovieModal/CustomHeader';

const Stack = createStackNavigator<RootStackParamList>();
export type StackNavigation = NavigationProp<RootStackParamList>;

//TODO: interviewee fix warning
const RootStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Home"
      options={({navigation}) => ({
        headerRight: () => (
          <Button onPress={() => navigation.push('Stubs')} title="Stubs" />
        ),
      })}>
      {() => <View />}
    </Stack.Screen>
    <Stack.Screen name="Stubs" component={Stubs} />
    <Stack.Screen
      name="Lists"
      component={Lists}
      options={({navigation}) => ({
        title: 'My Lists',
        headerRight: () => (
          <Button
            onPress={() => navigation.push('CreateListModal')}
            title="Add"
          />
        ),
      })}
    />
  </Stack.Navigator>
);

const App = () => {
  return (
    <PaperProvider>
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={() => ({
              headerShown: false,
              gestureEnabled: true,
              cardOverlayEnabled: true,
              presentation: 'modal',
              ...TransitionPresets.ModalPresentationIOS,
            })}>
            <Stack.Screen name="Root" component={RootStack} />
            <Stack.Screen
              name="CreateListModal"
              component={CreateListModal}
              options={{
                title: 'Create list',
                headerShown: true,
              }}
            />
            <Stack.Screen
              name="DetailMovieModal"
              component={DetailMovieModal}
              options={({route, navigation}) => ({
                headerShown: true,
                header: () => (
                  <CustomHeader
                    title={route.params.title}
                    description={route.params.description}
                    itemsCount={route.params.itemsCount}
                    navigation={navigation}
                  />
                ),
              })}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </PaperProvider>
  );
};

export default App;
