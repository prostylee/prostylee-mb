/* eslint-disable react-hooks/rules-of-hooks */
import styles from './styles';

import React from 'react';
import {ActivityIndicator, Text, View} from 'react-native';

import {Image, RnRatingTap} from 'components';

const ReviewItem = ({item}) => {
  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <View style={styles.header}>
          <View style={styles.author}>
            <Text style={styles.textAuthor}>{item.author.name}</Text>
          </View>
          <View style={styles.rating}>
            <RnRatingTap
              onChangeValue={() => {}}
              value={item.rating}
              isDisabled={true}
              size={20}
            />
          </View>
        </View>
        <View style={styles.content}>
          <Text style={styles.textContent}>{item.content}</Text>
        </View>
        <View style={styles.images}>
          {item.images.map((vl) => (
            <Image
              key={vl.key}
              source={
                vl.url ? {uri: vl.url} : require('assets/images/default.png')
              }
              style={styles.imageChild}
              PlaceholderContent={<ActivityIndicator />}
            />
          ))}
        </View>
      </View>
    </View>
  );
};

ReviewItem.defaultProps = {};

ReviewItem.propTypes = {};

export default ReviewItem;
