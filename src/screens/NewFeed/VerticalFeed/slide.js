import React, {useRef, useState} from 'react';
import {
  View,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  Dimensions,
  Text,
} from 'react-native';
import styles from './styles';

import {ImageAnimated as Image} from 'components';

import {IMG_STATUS, IMG_PRODUCT, TYPE_USER} from 'constants';

const DEFAULT_IMG = require('assets/images/default.png');
const WIDTH = Dimensions.get('window').width;

const Slide = React.memo((props) => {
  const {images, width, targetType} = props;
  const IMG_RATIO = targetType === TYPE_USER ? IMG_STATUS : IMG_PRODUCT;

  const flatListRef = useRef(null);

  const [state, setState] = useState({visible: false, indexCurrency: 1});

  const _getItemLayout = (data, index) => {
    return {length: width, offset: width * index, index};
  };

  const onViewRef = useRef(({viewableItems}) => {
    setState({
      ...state,
      indexCurrency: viewableItems[0] ? viewableItems[0].index : 0,
    });
  });

  const _renderItem = ({item}) => {
    return (
      <TouchableOpacity
        activeOpacity={1}
        style={styles.viewImage}
        onPress={() => {}}>
        <Image
          source={{uri: item}}
          resizeMode="cover"
          style={{height: width * IMG_RATIO, width: width}}
          PlaceholderContent={<ActivityIndicator />}
        />
      </TouchableOpacity>
    );
  };
  return (
    <>
      <FlatList
        ref={flatListRef}
        keyExtractor={(item, index) => `${item.id}${index}`}
        data={images}
        horizontal
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        decelerationRate={0.993}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 50,
        }}
        renderItem={_renderItem}
        getItemLayout={_getItemLayout}
        onViewableItemsChanged={onViewRef.current}
        ListHeaderComponent={
          images.length < 1 ? (
            <Image
              source={DEFAULT_IMG}
              style={{height: width * IMG_RATIO, width: width}}
            />
          ) : null
        }
      />
      <View style={styles.renderSlide}>
        <Text>
          {(images.length ? state.indexCurrency + 1 : 0) + '/' + images.length}
        </Text>
      </View>
    </>
  );
});

Slide.defaultProps = {
  width: WIDTH,
  navigationType: 'navigate',
};

export default Slide;
