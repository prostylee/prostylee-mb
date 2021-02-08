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
    images,
    width,
    height,
  } = props

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
          source={{ uri: item, cache: 'reload' }}
          resizeMode="cover"
          style={{ height: height, width: width }}
          PlaceholderContent={<ActivityIndicator />}
        />
      </TouchableOpacity>
    )
  }
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
              style={{ height: height, width: width }}
            />
          ) : null
        }
      />
      {/* <View style={styles.footerImage}>
        <Pagination
          containerStyle={styles.viewPagination}
          activeVisit={state.indexCurrency}
          count={images.length}
        />
      </View> */}
    </>
  )
})

const styles = EStyleSheet.create({
})

Slide.defaultProps = {
  width: WIDTH,
  height: WIDTH,
  navigationType: 'navigate',
}

export default Slide
