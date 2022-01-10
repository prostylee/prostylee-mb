/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';

import {
  ContainerView as Container,
  Colors,
  ImageAnimated as Image,
} from 'components';

import {postOfUserSlector} from 'redux/selectors/user';

import styles from './styles';
import {EmptyPost} from 'svg/profile';
import {EmptyComponent} from 'components';
import i18n from 'i18n';

const {width} = Dimensions.get('window');

const Grid = ({column, wImage, hImage, userProfile}) => {
  const loadMoreLoading = false;
  const navigation = useNavigation();
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
            style={styles.viewImage}
            onPress={() =>
              navigation.navigate('PostList', {
                profile: userProfile,
                postOfUser: postOfUser,
                selectedPost: item,
              })
            }>
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
        ListEmptyComponent={
          <EmptyComponent
            icon={<EmptyPost />}
            title={i18n.t('mypage.noPost')}
            subTitle={i18n.t('mypage.noPostSub', {
              name: userProfile?.username || '',
            })}
          />
        }
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
