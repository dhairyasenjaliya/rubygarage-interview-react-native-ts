import React, {useEffect, useState} from 'react';
import {StyleSheet, FlatList, Text, View, SafeAreaView} from 'react-native';
import {
  Card,
  Title,
  Paragraph,
  Portal,
  Dialog,
  Button,
  Snackbar,
  ActivityIndicator,
} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {StackNavigation} from '../../components/App';
import {useDispatch, useSelector} from 'react-redux';
import {fetchMovieList, resetMovieList} from '../../store/actionTypes';
import {getMovieListLength} from '../../helper/utils';

const RemoveDialog = ({visible, hideDialog, onOkPress}) => (
  <Portal>
    <Dialog visible={visible} onDismiss={hideDialog} style={styles.dialog}>
      <Dialog.Content>
        <Paragraph>Do you want to delete list?</Paragraph>
      </Dialog.Content>
      <Dialog.Actions>
        <Button onPress={hideDialog} textColor="#0378ff" uppercase mode="text">
          Cancel
        </Button>
        <Button onPress={onOkPress} mode="text" textColor="#ff0000" uppercase>
          Delete
        </Button>
      </Dialog.Actions>
    </Dialog>
  </Portal>
);

const RemoveDialogError = ({visible, onDismissSnackBar}) => (
  <Snackbar visible={visible} onDismiss={onDismissSnackBar}>
    Oops, something went wrong
  </Snackbar>
);

const Lists = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const navigation = useNavigation<StackNavigation>();

  const dispatch = useDispatch();
  const {data, loading, error} = useSelector((state: any) => state.movieList);
  const movieList = useSelector((state: any) => state.movieList.data?.list);
  const currentPage = useSelector(
    (state: any) => state.movieList.data?.currentPage || 1,
  );

  const totalPages = useSelector(
    (state: any) => state.movieList.data?.totalPages,
  );

  useEffect(() => {
    dispatch(fetchMovieList(currentPage));

    return () => {
      dispatch(resetMovieList());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const showModal = () => {
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
  };

  const showSnackbar = () => {
    showModal();
    setSnackbarVisible(true);
  };

  const hideSnackbar = () => {
    setSnackbarVisible(false);
  };

  const handleLoadMore = () => {
    if (currentPage <= totalPages) {
      dispatch(fetchMovieList(currentPage + 1));
    }
  };

  return (
    <SafeAreaView>
      {error && <Text style={styles.error}>{'error'}</Text>}
      <FlatList
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={[
          {flex: getMovieListLength(data?.results?.length)},
        ]}
        keyExtractor={item => item.id.toString()}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.1}
        maxToRenderPerBatch={20}
        data={movieList}
        renderItem={({item}) => {
          const {name = '', description = '', item_count = ''} = item;
          return (
            <Card style={styles.card}>
              <Card.Content>
                <Title>{name}</Title>
                <Paragraph>{description}</Paragraph>
              </Card.Content>
              <Card.Actions>
                <Button
                  onPress={() =>
                    navigation.navigate('DetailMovieModal', {
                      title: name,
                      description: description,
                      itemsCount: item_count,
                    })
                  }
                  textColor="#0378ff"
                  mode="text"
                  uppercase>
                  View
                </Button>
                <Button
                  textColor="#0378ff"
                  uppercase
                  mode="text"
                  onPress={showModal}>
                  Delete
                </Button>
              </Card.Actions>
            </Card>
          );
        }}
        ListEmptyComponent={
          <View style={styles.empty}>
            {loading ? (
              <ActivityIndicator animating={loading} />
            ) : (
              <View>{!error && <Text>No result</Text>}</View>
            )}
          </View>
        }
      />
      <RemoveDialog
        visible={modalVisible}
        hideDialog={hideModal}
        onOkPress={showSnackbar}
      />
      <RemoveDialogError
        visible={snackbarVisible}
        onDismissSnackBar={hideSnackbar}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  dialog: {
    backgroundColor: '#ffffff',
  },
  card: {
    flex: 1,
    margin: 5,
    backgroundColor: '#ffffff',
  },
  row: {
    flex: 1,
    justifyContent: 'space-around',
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  error: {
    color: 'red',
    alignSelf: 'center',
  },
});

export default Lists;
