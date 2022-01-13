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
import {useNavigation} from '@react-navigation/native';
import {ImageAnimated as Image, Title} from 'components';

import {userSelectors} from 'reducers';

import styles from './styles';

import {
  getStoreInfoSelector,
  getStorePostSelector,
} from 'redux/selectors/storeProfile';
import {EmptyPost} from 'svg/profile';
import {EmptyComponent} from 'components';
import i18n from 'i18n';

const {width} = Dimensions.get('window');

const PostList = ({column, wImage, hImage}) => {
  const navigation = useNavigation();

  const storeInfo = useSelector((state) => getStoreInfoSelector(state));
  const userProfile = useSelector((state) =>
    userSelectors.getUserProfile(state),
  );

  const postListSelector = useSelector((state) => getStorePostSelector(state));

  const postList = postListSelector?.content || [];

  if (!postList?.length) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.divider} />
      <View style={styles.labelContainer}>
        <Title
          title={i18n.t('stores.topPost')}
          style={styles.labelText}
          containerStyle={{}}
          subTitle={i18n.t('common.textSeeMore')}
          subTitleWithIcon={true}
          onPress={() => {
            navigation.navigate('PostList', {
              profile: storeInfo,
              postOfUser: postListSelector,
              selectedPost: null,
            });
          }}
        />
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        scrollEnabled={false}
        key={column}
        numColumns={column}
        columnWrapperStyle={styles.viewCol}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        keyExtractor={(item, index) => 'profileMeTab' + index}
        data={postList?.slice(0, 6) || []}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.viewImage}
            onPress={() =>
              navigation.navigate('PostList', {
                profile: storeInfo,
                postOfUser: postListSelector,
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
        onEndReachedThreshold={0.5}
        initialNumToRender={10}
        contentContainerStyle={{paddingVertical: 10}}
        ListEmptyComponent={
          <EmptyComponent
            icon={<EmptyPost />}
            title={i18n.t('mypage.noPost')}
            subTitle={i18n.t('mypage.noPostSub', {
              name: userProfile?.username || '',
            })}
          />
        }
      />
    </View>
  );
};

PostList.defaultProps = {
  column: 2,
  wImage: (width - 48) / 2,
  hImage: (width - 48) / 2,
};

PostList.propTypes = {};

export default PostList;
