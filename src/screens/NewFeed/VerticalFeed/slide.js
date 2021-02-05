import React, { useRef, useState } from 'react'
import EStyleSheet from 'react-native-extended-stylesheet';
import {
  View,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  Dimensions,
} from 'react-native'

import { ImageAnimated as Image} from 'components'

import { absoluteCenter, absolute } from 'theme/style'

const DEFAULT_IMG = require('assets/images/default.png')
const WIDTH = Dimensions.get('window').width
const RATIO_IMG = 1.5

const Slide = React.memo(props => {
  const {
    product,
    width,
    height,
  } = props
  const {
    images,
  } = product

  const flatListRef = useRef(null)

  const [state, setState] = useState({ visible: false, indexCurrency: 0, })

  const _getItemLayout = (data, index) => {
    return { length: width, offset: width * index, index };
  }

  const onViewRef = useRef(({ viewableItems }) => {
    setState({
      ...state,
      indexCurrency: viewableItems[0] ? viewableItems[0].index : 0,
    })
  })

  const _renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        activeOpacity={1}
        style={styles.viewImage}
        onPress={() => {}}>
        <Image
          source={{ uri: item.src, cache: 'reload' }}
          resizeMode="cover"
          style={{ height: height, width: width }}
          PlaceholderContent={<ActivityIndicator />}
        />
      </TouchableOpacity>
    )
  }
  return (
    <View style={styles.container}>
      <View style={styles.imageWrapper}>
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
                style={{ height: height, width: width }}
              />
            ) : null
          }
        />
        <View style={styles.footerImage}>
          <Pagination
            containerStyle={styles.viewPagination}
            activeVisit={state.indexCurrency}
            count={images.length}
          />
        </View>
      </View>
    </View>
  )
})

const styles = EStyleSheet.create({
  container: {
    flex: 1,
  },
  viewImage: {
    width: WIDTH,
    alignItems: 'center',
  },
  footerImage: {
    ...absoluteCenter,
    top: null,
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: margin.large,
    paddingHorizontal: padding.large,
    zIndex: 99,
  },
  touchZoom: {
    ...absolute(null, 0, null, 0),
    justifyContent: 'flex-end',
    padding: padding.large,
  },
  viewPagination: {
    marginRight: margin.base,
  },
  infoContainer: {
    flexDirection: 'row',
  },
  viewInfo: {
    width: WIDTH * 0.55,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderRightColor: grey1,
    borderBottomColor: grey1,
  },
  categories: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: WIDTH * 0.45 - 16,
    marginTop: margin.small,
    marginLeft: margin.base,
  },
  categoryTag: {
    backgroundColor: grey1,
    paddingHorizontal: padding.small,
    borderRadius: borderRadius.base,
    marginVertical: 2,
    marginHorizontal: 4,
    lineHeight: 28,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: padding.small,
  },
  nameRating: {
    fontSize: 10,
    marginLeft: margin.small - 2,
  },
  textName: {
    paddingTop: 4
  },
  textPrice: {
    paddingTop: 4
  },
  textSale: {
    paddingTop: 4,
    color: grey6
  }
})

Slide.defaultProps = {
  width: WIDTH,
  height: WIDTH * RATIO_IMG,
  navigationType: 'navigate',
}

export default Slide
