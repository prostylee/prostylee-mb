import React, { useEffect, useState } from 'react'
import { ScrollView, TouchableOpacity, View } from 'react-native'
import { isEmpty } from 'lodash'

import { ContainerView as Container, Title } from 'components'

import Item from './Item'

import styles from './styles'

const TopTrending = ({ topProduct }) => {

  if (isEmpty(topProduct) || !topProduct?.content?.length) return null

  const topProductList = topProduct?.content
  return (
    <>
     <Container>
        <Title
          title={
            'Cửa hàng nổi bật'
          }
          style={styles.textTitle}
          containerStyle={{ }}
          subTitle={'Xem thêm'}
          onPress={() => { }}
        />
      </Container>
      <Container fluid>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {topProductList.map((item, index) => (
            <View
              key={item.id}
              style={styles.viewContainer}>
              <Item item={item} style={{ flex: 1 }} />
            </View>
          ))}
        </ScrollView>
      </Container>
    </>
  )
}

export default TopTrending
