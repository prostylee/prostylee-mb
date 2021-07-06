import styles from './styles';

import React from 'react';
import {View, TouchableOpacity, Text, Image, Dimensions} from 'react-native';

/*Hooks*/
import {useSelector} from 'react-redux';
import {useTheme} from '@react-navigation/native';

/*Translate*/
import i18n from 'i18n';

/*Components*/
import {CustomRating} from 'components';
import ImageView from 'react-native-image-viewing';
import IonIcons from 'react-native-vector-icons/Ionicons';

/*Reducers*/
import {productSelectors} from 'reducers';

/*Proptypes*/
import PropTypes from 'prop-types';

const ProductRating = ({data, ref, productId, navigation}) => {
  const {colors} = useTheme();
  const totalElements = data.totalElements ? data.totalElements : 0;
  const commentList = data.content ? data.content.slice(0, 3) : [];
  const [imageListVisible, setImageListVisible] = React.useState(false);
  const [imageList, setImageList] = React.useState([]);
  const [imageListActive, setImageListActive] = React.useState(0);

  const totalRate = useSelector((state) =>
    productSelectors.getProductCommentsAverage(state),
  );
  const totalRateDisplay =
    typeof totalRate === 'number' ? totalRate?.toFixed(1) : 0;

  const numberOfImageAvailabel = Math.floor(
    (Dimensions.get('window').width - 32) / 64,
  );

  const openImageModal = (item, index) => {
    setImageListActive(index);
    setImageList(item.images);
    setImageListVisible(true);
  };

  return (
    <View style={styles.container} ref={ref}>
      <View style={styles.rateTitle}>
        <Text style={styles.rateTitleText}>
          {i18n.t('productDetail.rating')}
        </Text>
        <TouchableOpacity
          style={styles.ratingTotal}
          onPress={() => {
            navigation.navigate('ReviewRating', {
              productId: productId,
            });
          }}>
          <CustomRating rate={totalRate} />
          <Text
            style={
              styles.rateNumber
            }>{`${totalRateDisplay} (${totalElements})`}</Text>
          <IonIcons
            name={'ios-chevron-forward'}
            size={14}
            color={colors['$lightGray']}
          />
        </TouchableOpacity>
      </View>
      {commentList.length ? (
        <View style={styles.ratingList}>
          {commentList.map((item) => {
            const user = item.user ? item.user : {};
            return (
              <View key={`rating_item_${item.id}`} style={styles.ratingItem}>
                <View style={styles.itemTitle}>
                  <Text style={styles.itemUserName}>{user?.fullName}</Text>
                  <CustomRating rate={item?.value} />
                </View>
                <Text style={styles.itemContent}>{item?.content}</Text>
                <View style={styles.commentImage}>
                  {item.images
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
                            source={{uri: imageItem.original}}
                            resizeMode={'cover'}
                          />
                        </TouchableOpacity>
                      );
                    })}
                  {item.images.length >= numberOfImageAvailabel ? (
                    <TouchableOpacity
                      style={styles.commentLastImage}
                      key={`comment_${item.id}_${numberOfImageAvailabel - 1}`}
                      onPress={() => {
                        openImageModal(item, numberOfImageAvailabel - 1);
                      }}>
                      <Image
                        style={[styles.commentImageStyle, {marginLeft: 4}]}
                        source={{
                          uri: item.images[numberOfImageAvailabel - 1].uri,
                        }}
                        resizeMode={'cover'}
                      />
                      {item.images.length >= numberOfImageAvailabel + 1 ? (
                        <View style={styles.commentImageMore}>
                          <Text style={styles.commentImageMoreText}>{`+${
                            item.images.length - numberOfImageAvailabel
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
      ) : (
        <Text style={styles.ratingNotFound}>
          {i18n.t('rateProduct.notHaveRate')}
        </Text>
      )}

      {data.content && data.content.length > 3 ? (
        <TouchableOpacity
          style={styles.readAllButton}
          onPress={() => {
            navigation.navigate('ReviewRating', {
              productId: productId,
            });
          }}>
          <Text style={styles.readAllButtonText}>{`${i18n.t(
            'productDetail.ratingAll',
          )} (${data.content.length})`}</Text>
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

ProductRating.defaultProps = {
  data: {},
  productId: null,
};

ProductRating.propTypes = {
  data: PropTypes.object,
  ref: PropTypes.element,
  productId: PropTypes.number,
};

export default ProductRating;
