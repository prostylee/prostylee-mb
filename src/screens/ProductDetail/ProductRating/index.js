import React from 'react';
import {View, TouchableOpacity, Text, Image, Dimensions} from 'react-native';
import IconIcons from 'react-native-vector-icons/Ionicons';
import i18n from 'i18n';
import ImageView from 'react-native-image-viewing';

import Entypo from 'react-native-vector-icons/Entypo';
import IonIcons from 'react-native-vector-icons/Ionicons';
import {useTheme} from '@react-navigation/native';
import styles from './styles';

const ProductRating = (props) => {
  const {colors} = useTheme();
  const data = props.data ? props.data : {};
  const totalRate = data.totalRate ? data.totalRate : 0;
  const numberOfRate = data.totalRateCount ? data.totalRateCount : 0;
  const commentList = data.list ? data.list.slice(0, 3) : [];
  const [imageListVisible, setImageListVisible] = React.useState(false);
  const [imageList, setImageList] = React.useState([]);
  const [imageListActive, setImageListActive] = React.useState(0);
  const numberOfImageAvailabel = Math.floor(
    (Dimensions.get('window').width - 32) / 64,
  );
  const Rating = ({value}) => {
    return [0, 1, 2, 3, 4].map((item) => {
      if (value - item >= 1) {
        return (
          <Entypo
            key={`star_${item}`}
            name={'star'}
            size={12}
            color={colors['$rateStar']}
          />
        );
      } else if (value - item > 0) {
        return (
          <IonIcons
            key={`star_${item}`}
            name={'star-half-sharp'}
            size={12}
            color={colors['$rateStar']}
          />
        );
      } else {
        return (
          <Entypo
            key={`star_${item}`}
            name={'star-outlined'}
            size={12}
            color={colors['$rateStar']}
          />
        );
      }
    });
  };
  const openImageModal = (item, index) => {
    setImageListActive(index);
    setImageList(item.commentImages);
    setImageListVisible(true);
  };
  return (
    <View style={styles.container}>
      <View style={styles.rateTitle}>
        <Text style={styles.rateTitleText}>
          {i18n.t('productDetail.rating')}
        </Text>
        <TouchableOpacity style={styles.ratingTotal} onPress={() => {}}>
          <Rating value={totalRate} />
          <Text style={styles.rateNumber}>{`${totalRate.toFixed(
            1,
          )} (${numberOfRate})`}</Text>
          <IonIcons
            name={'ios-chevron-forward'}
            size={14}
            color={colors['$lightGray']}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.ratingList}>
        {commentList.map((item) => {
          const user = item.user ? item.user : {};
          return (
            <View key={`rating_item_${item.id}`} style={styles.ratingItem}>
              <View style={styles.itemTitle}>
                <Text style={styles.itemUserName}>{user?.displayName}</Text>
                <Rating value={item?.value} />
              </View>
              <Text style={styles.itemContent}>{item?.content}</Text>
              <View style={styles.commentImage}>
                {item.commentImages
                  .slice(0, numberOfImageAvailabel - 1)
                  .map((imageItem, index) => {
                    return (
                      <TouchableOpacity
                        key={`comment_${item.id}_${index}`}
                        onPress={() => {
                          openImageModal(item, index);
                        }}>
                        <Image
                          style={[
                            styles.commentImageStyle,
                            {marginLeft: index > 0 ? 4 : 0},
                          ]}
                          source={{uri: imageItem.uri}}
                          resizeMethod={'cover'}
                        />
                      </TouchableOpacity>
                    );
                  })}
                {item.commentImages.length >= numberOfImageAvailabel ? (
                  <TouchableOpacity
                    style={styles.commentLastImage}
                    key={`comment_${item.id}_${numberOfImageAvailabel - 1}`}
                    onPress={() => {
                      openImageModal(item, numberOfImageAvailabel - 1);
                    }}>
                    <Image
                      style={[styles.commentImageStyle, {marginLeft: 4}]}
                      source={{
                        uri: item.commentImages[numberOfImageAvailabel - 1].uri,
                      }}
                      resizeMethod={'cover'}
                    />
                    {item.commentImages.length >= numberOfImageAvailabel + 1 ? (
                      <View style={styles.commentImageMore}>
                        <Text style={styles.commentImageMoreText}>{`+${
                          item.commentImages.length - numberOfImageAvailabel
                        }`}</Text>
                      </View>
                    ) : null}
                  </TouchableOpacity>
                ) : null}
              </View>
            </View>
          );
        })}
      </View>
      {data.list.length > 3 ? (
        <TouchableOpacity style={styles.readAllButton}>
          <Text style={styles.readAllButtonText}>{`${i18n.t(
            'productDetail.ratingAll',
          )} (${data.list.length})`}</Text>
        </TouchableOpacity>
      ) : null}
      <ImageView
        images={imageList}
        imageIndex={imageListActive}
        visible={imageListVisible}
        onRequestClose={() => setImageListVisible(false)}
      />
    </View>
  );
};

export default ProductRating;
