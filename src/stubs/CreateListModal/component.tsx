import React, {useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {TextInput, Button, HelperText} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {createMovieList, resetCreateError} from '../../store/actionTypes';
import * as Yup from 'yup';
import {Formik} from 'formik';
import {useNavigation} from '@react-navigation/native';

const validationSchema = Yup.object().shape({
  movieName: Yup.string()
    .required("Can't be blank")
    .max(255, 'Must be equal or less than 255 characters'),
  description: Yup.string()
    .required("Can't be blank")
    .max(1000, 'Must be equal or less than 1000 characters'),
});

const CreateListModal = () => {
  const dispatch = useDispatch();
  const apiError = useSelector((state: any) => state.addMovieList.error);
  const navigation = useNavigation();

  useEffect(() => {
    return () => {
      if (apiError) {
        dispatch(resetCreateError());
      }
    };
  });

  const handleFormSubmit = (values: {movieName: ''; description: ''}) => {
    dispatch(createMovieList(values.movieName, values.description, navigation));
  };

  return (
    <Formik
      initialValues={{movieName: '', description: ''}}
      onSubmit={handleFormSubmit}
      validationSchema={validationSchema}>
      {({handleChange, values, errors, handleSubmit}) => (
        <View style={styles.container}>
          <TextInput
            placeholder="Movie Name"
            onChangeText={handleChange('movieName')}
            value={values.movieName}
            error={Boolean(errors.movieName)}
          />
          <HelperText type="error" visible={Boolean(errors.movieName)}>
            {errors.movieName}
          </HelperText>
          <TextInput
            style={styles.multiLine}
            placeholder="Description"
            onChangeText={handleChange('description')}
            value={values.description}
            error={Boolean(errors.description)}
          />
          <HelperText type="error" visible={Boolean(errors.description)}>
            {errors.description}
          </HelperText>

          <HelperText type="error" visible={Boolean(apiError)}>
            {apiError}
          </HelperText>
          <Button
            style={styles.buttonMargin}
            onPress={() => handleSubmit()}
            mode="contained">
            Create
          </Button>
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  error: {
    color: 'red',
  },
  multiLine: {
    marginVertical: 2,
    height: 80,
  },
  buttonMargin: {
    marginTop: 20,
  },
});

export default CreateListModal;
