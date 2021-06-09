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

const data = [
  {
    id: 134,
    imageUrls: [
      'https://d1fq4uh0wyvt14.cloudfront.net/fit-in/600x900/public/ec72c651-d66a-4bfb-950c-f6b8e2132f30/557e3db0-c889-488b-8afd-79a8c90f17d6.jpeg',
    ],
    name: 'Nguyễn Tuấn Vũ',
    checkin: 'Sài Gòn - Việt Nam',
    image:
      'https://d1fq4uh0wyvt14.cloudfront.net/fit-in/600x900/public/ec72c651-d66a-4bfb-950c-f6b8e2132f30/557e3db0-c889-488b-8afd-79a8c90f17d6.jpeg',
    isFollowed: true,
    store: 'H&M',
    heartcount: 12,
    commentcount: 2,
    avatar:
      'https://d1fq4uh0wyvt14.cloudfront.net/fit-in/600x900/public/ec72c651-d66a-4bfb-950c-f6b8e2132f30/557e3db0-c889-488b-8afd-79a8c90f17d6.jpeg',
  },
  {
    id: 135,
    imageUrls: [
      'https://d1fq4uh0wyvt14.cloudfront.net/fit-in/600x900/public/ec72c651-d66a-4bfb-950c-f6b8e2132f30/557e3db0-c889-488b-8afd-79a8c90f17d6.jpeg',
    ],
  },
  {
    id: 136,
    imageUrls: [
      'https://d1fq4uh0wyvt14.cloudfront.net/fit-in/600x900/public/ec72c651-d66a-4bfb-950c-f6b8e2132f30/557e3db0-c889-488b-8afd-79a8c90f17d6.jpeg',
    ],
    name: 'Nguyễn Tuấn Vũ',
    checkin: 'Sài Gòn - Việt Nam',
    image:
      'https://d1fq4uh0wyvt14.cloudfront.net/fit-in/600x900/public/ec72c651-d66a-4bfb-950c-f6b8e2132f30/557e3db0-c889-488b-8afd-79a8c90f17d6.jpeg',
    isFollowed: true,
    store: 'H&M',
    heartcount: 12,
    commentcount: 2,
    avatar:
      'https://d1fq4uh0wyvt14.cloudfront.net/fit-in/600x900/public/ec72c651-d66a-4bfb-950c-f6b8e2132f30/557e3db0-c889-488b-8afd-79a8c90f17d6.jpeg',
  },
  {
    id: 137,
    imageUrls: [
      'https://d1fq4uh0wyvt14.cloudfront.net/fit-in/600x900/public/ec72c651-d66a-4bfb-950c-f6b8e2132f30/557e3db0-c889-488b-8afd-79a8c90f17d6.jpeg',
    ],
    name: 'Nguyễn Tuấn Vũ',
    checkin: 'Sài Gòn - Việt Nam',
    image:
      'https://d1fq4uh0wyvt14.cloudfront.net/fit-in/600x900/public/ec72c651-d66a-4bfb-950c-f6b8e2132f30/557e3db0-c889-488b-8afd-79a8c90f17d6.jpeg',
    isFollowed: true,
    store: 'H&M',
    heartcount: 12,
    commentcount: 2,
    avatar:
      'https://d1fq4uh0wyvt14.cloudfront.net/fit-in/600x900/public/ec72c651-d66a-4bfb-950c-f6b8e2132f30/557e3db0-c889-488b-8afd-79a8c90f17d6.jpeg',
  },
  {
    id: 138,
    imageUrls: [
      'https://d1fq4uh0wyvt14.cloudfront.net/fit-in/600x900/public/ec72c651-d66a-4bfb-950c-f6b8e2132f30/557e3db0-c889-488b-8afd-79a8c90f17d6.jpeg',
    ],
    name: 'Nguyễn Tuấn Vũ',
    checkin: 'Sài Gòn - Việt Nam',
    image:
      'https://d1fq4uh0wyvt14.cloudfront.net/fit-in/600x900/public/ec72c651-d66a-4bfb-950c-f6b8e2132f30/557e3db0-c889-488b-8afd-79a8c90f17d6.jpeg',
    isFollowed: true,
    store: 'H&M',
    heartcount: 12,
    commentcount: 2,
    avatar:
      'https://d1fq4uh0wyvt14.cloudfront.net/fit-in/600x900/public/ec72c651-d66a-4bfb-950c-f6b8e2132f30/557e3db0-c889-488b-8afd-79a8c90f17d6.jpeg',
  },
  {
    id: 139,
    imageUrls: [
      'https://d1fq4uh0wyvt14.cloudfront.net/fit-in/600x900/public/ec72c651-d66a-4bfb-950c-f6b8e2132f30/557e3db0-c889-488b-8afd-79a8c90f17d6.jpeg',
    ],
    name: 'Nguyễn Tuấn Vũ',
    checkin: 'Sài Gòn - Việt Nam',
    image:
      'https://d1fq4uh0wyvt14.cloudfront.net/fit-in/600x900/public/ec72c651-d66a-4bfb-950c-f6b8e2132f30/557e3db0-c889-488b-8afd-79a8c90f17d6.jpeg',
    isFollowed: true,
    store: 'H&M',
    heartcount: 12,
    commentcount: 2,
    avatar:
      'https://d1fq4uh0wyvt14.cloudfront.net/fit-in/600x900/public/ec72c651-d66a-4bfb-950c-f6b8e2132f30/557e3db0-c889-488b-8afd-79a8c90f17d6.jpeg',
  },
  {
    id: 140,
    imageUrls: [
      'https://d1fq4uh0wyvt14.cloudfront.net/fit-in/600x900/public/ec72c651-d66a-4bfb-950c-f6b8e2132f30/557e3db0-c889-488b-8afd-79a8c90f17d6.jpeg',
    ],
    name: 'Nguyễn Tuấn Vũ',
    checkin: 'Sài Gòn - Việt Nam',
    image:
      'https://d1fq4uh0wyvt14.cloudfront.net/fit-in/600x900/public/ec72c651-d66a-4bfb-950c-f6b8e2132f30/557e3db0-c889-488b-8afd-79a8c90f17d6.jpeg',
    isFollowed: true,
    store: 'H&M',
    heartcount: 12,
    commentcount: 2,
    avatar:
      'https://d1fq4uh0wyvt14.cloudfront.net/fit-in/600x900/public/ec72c651-d66a-4bfb-950c-f6b8e2132f30/557e3db0-c889-488b-8afd-79a8c90f17d6.jpeg',
  },

  {
    id: 141,
    imageUrls: [
      'https://d1fq4uh0wyvt14.cloudfront.net/fit-in/600x900/public/ec72c651-d66a-4bfb-950c-f6b8e2132f30/557e3db0-c889-488b-8afd-79a8c90f17d6.jpeg',
    ],
    name: 'Nguyễn Tuấn Vũ',
    checkin: 'Sài Gòn - Việt Nam',
    image:
      'https://d1fq4uh0wyvt14.cloudfront.net/fit-in/600x900/public/ec72c651-d66a-4bfb-950c-f6b8e2132f30/557e3db0-c889-488b-8afd-79a8c90f17d6.jpeg',
    isFollowed: true,
    store: 'H&M',
    heartcount: 12,
    commentcount: 2,
    avatar:
      'https://d1fq4uh0wyvt14.cloudfront.net/fit-in/600x900/public/ec72c651-d66a-4bfb-950c-f6b8e2132f30/557e3db0-c889-488b-8afd-79a8c90f17d6.jpeg',
  },
];

const GridView = ({column, wImage, hImage}) => {
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
        data={data || []}
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

GridView.defaultProps = {
  column: 2,
  wImage: (width - 48) / 2,
  hImage: (width - 48) / 2,
};

GridView.propTypes = {};

export default GridView;
