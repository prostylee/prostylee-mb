/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

import {useSelector} from 'react-redux';

import {
  ContainerView as Container,
  Colors,
  ImageAnimated as Image,
} from 'components';

import {postOfUserSlector} from 'redux/selectors/user';

import styles from './styles';

const {width} = Dimensions.get('window');

const Grid = ({column, wImage, hImage}) => {
  const loadMoreLoading = false;

  const postOfUser = useSelector((state) => postOfUserSlector(state));

  const renderFooter = () => {
    if (!loadMoreLoading) {
      return <View style={styles.viewFooter} />;
    }

    return (
      <View style={[styles.viewFooter, styles.viewLoadingFooter]}>
        <ActivityIndicator animating color={Colors.$purple} size="small" />
      </View>
    );
  };
  return (
    <Container fluid style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        key={column}
        numColumns={column}
        columnWrapperStyle={styles.viewCol}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        keyExtractor={(item, index) => 'profileMeTab' + index}
        data={postOfUser?.content || []}
        renderItem={({item}) => (
          <TouchableOpacity
            activeOpacity={1}
            style={styles.viewImage}
            onPress={() => {}}>
            <Image
              source={
                item?.imageUrls.length
                  ? {uri: item?.imageUrls[0]}
                  : require('assets/images/default.png')
              }
              resizeMode="cover"
              style={{height: wImage, width: hImage, borderRadius: 4}}
              PlaceholderContent={<ActivityIndicator />}
            />
          </TouchableOpacity>
        )}
        // onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        initialNumToRender={10}
        ListFooterComponent={renderFooter}
        // refreshing={refreshing}
        // onRefresh={handleRefresh}
      />
    </Container>
  );
};

Grid.defaultProps = {
  column: 2,
  wImage: (width - 48) / 2,
  hImage: (width - 48) / 2,
};

Grid.propTypes = {};

export default Grid;
