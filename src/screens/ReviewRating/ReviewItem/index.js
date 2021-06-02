/* eslint-disable react-hooks/rules-of-hooks */
import styles from './styles';

import React from 'react';
import {ActivityIndicator, Text, View, TouchableOpacity} from 'react-native';
import {Image, AirbnbRating, GridImageReviewer} from 'components';

const ReviewItem = ({item, navigation}) => {
  const renderGridImage = (item) => {
    return (
      <Image
        key={item.key}
        source={
          item.url ? {uri: item.url} : require('assets/images/default.png')
        }
        style={{...styles.imageChild}}
        PlaceholderContent={<ActivityIndicator />}
      />
    );
  };

  const renderModalImage = (item) => {
    return (
      <Image
        key={item.key}
        style={{
          ...styles.img_modal,
          backgroundColor: `rgba(0, 0, 0, 0,8)`,
        }}
        source={
          item.url ? {uri: item.url} : require('assets/images/default.png')
        }
      />
    );
  };

  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.item}>
        <View style={styles.header}>
          <View style={styles.author}>
            <Text style={styles.textAuthor}>{item.user.fullName}</Text>
          </View>
          <View style={styles.rating}>
            <AirbnbRating
              isDisabled={true}
              size={20}
              showRating={false}
              defaultRating={item.value}
              reviewColor="#333333"
              reviewSize={14}
            />
          </View>
        </View>
        <View style={styles.content}>
          <Text style={styles.textContent}>{item.content}</Text>
        </View>
        {item.images.length > 0 && (
          <View style={styles.images}>
            <GridImageReviewer
              data={item.images}
              renderGridImage={renderGridImage}
              renderModalImage={renderModalImage}
            />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

ReviewItem.defaultProps = {};

ReviewItem.propTypes = {};

export default ReviewItem;
