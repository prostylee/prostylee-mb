import styles from './styles';

import React, {useEffect} from 'react';

/*Hooks*/
import I18n from 'i18n';

/*Components*/
import {View, Text} from 'react-native';
import ListReview from './ListReview';
import {Header, ThemeView, RnRatingTap} from 'components';

const ReviewRating = ({navigation, data}) => {
  useEffect(() => {}, []);

  const onChangeRating = (rating) => {
    console.log('rating is: ', rating);
  };

  return (
    <ThemeView style={styles.container} isFullView>
      <Header title={I18n.t('reviewRating.count', {count: 15})} isDefault />
      <View style={styles.ratingWrapper}>
        <Text style={styles.label}>{data.ratingCount}</Text>
        <View style={styles.row}>
          <RnRatingTap
            onChangeValue={onChangeRating}
            value={4.6}
            isDisabled={true}
            size={20}
          />
        </View>
      </View>
      <ListReview navigation={navigation} data={data.reviews} />
    </ThemeView>
  );
};

ReviewRating.defaultProps = {
  data: {
    ratingCount: 4.6,
    reviews: [
      {
        author: {name: 'Vũ'},
        rating: 5,
        content: 'Sản phẩm tốt, chất lượng',
        images: [
          {
            key: '1',
            url: 'https://cdn3.yame.vn/pimg/so-mi-nam-no-style-td-km18-0018246/e4cebcc8-21b2-1a00-b6bc-00173fc25903.jpg?w=440',
          },
          {
            key: '2',
            url: 'https://sagasilk.com/wp-content/uploads/vay-dam-maxi-trang-dai-du-tiec-hang-hieu-cao-cap-2019.jpg',
          },
          {
            key: '3',
            url: 'https://cdn2.yame.vn/pimg/so-mi-nam-no-style-td-km18-0018246/7af60ad2-b54b-0400-1db4-00159060c9b0.jpg?w=440',
          },
          {
            key: '4',
            url: 'https://vaymaxi.vn/wp-content/uploads/2019/08/IMG_0790.jpg',
          },
          {
            key: '5',
            url: 'https://cdn2.yame.vn/pimg/so-mi-nam-no-style-td-km18-0018246/7af60ad2-b54b-0400-1db4-00159060c9b0.jpg?w=440',
          },
          {
            key: '6',
            url: 'https://sagasilk.com/wp-content/uploads/vay-dam-maxi-trang-dai-du-tiec-hang-hieu-cao-cap-2019.jpg',
          },
        ],
      },
      {
        author: {name: 'Vũ Nguyễn'},
        rating: 3,
        content:
          'I bought this product two weeks ago. I really really like it so elegant.',
        images: [
          {
            key: '1',
            url: 'https://cdn3.yame.vn/pimg/so-mi-nam-no-style-td-km18-0018246/e4cebcc8-21b2-1a00-b6bc-00173fc25903.jpg?w=440',
          },
          {
            key: '2',
            url: 'https://cdn2.yame.vn/pimg/so-mi-nam-no-style-td-km18-0018246/7af60ad2-b54b-0400-1db4-00159060c9b0.jpg?w=440',
          },
        ],
      },
      {
        author: {name: 'Vũ XYZ'},
        rating: 4,
        content:
          'Sản phẩm tốt, chất lượng. I bought this product two weeks ago. I really really like it so elegant.',
        images: [
          {
            key: '1',
            url: 'https://cdn3.yame.vn/pimg/so-mi-nam-no-style-td-km18-0018246/e4cebcc8-21b2-1a00-b6bc-00173fc25903.jpg?w=440',
          },
          {
            key: '2',
            url: 'https://cdn2.yame.vn/pimg/so-mi-nam-no-style-td-km18-0018246/7af60ad2-b54b-0400-1db4-00159060c9b0.jpg?w=440',
          },
        ],
      },
      {
        author: {name: 'Tran Vawn A'},
        rating: 1,
        content: 'Sản phẩm tốt, chất lượng',
        images: [],
      },
      {
        author: {name: 'Vũ Nguyeen'},
        rating: 5,
        content: 'Sản phẩm tốt, chất lượng',
        images: [],
      },
      {
        author: {name: 'Vũ 123'},
        rating: 5,
        content:
          'Sản phẩm tốt, chất lượng. I bought this product two weeks ago. I really really like it so elegant.',
        images: [],
      },
      {
        author: {name: 'Vũ ABC'},
        rating: 5,
        content: 'Sản phẩm tốt, chất lượng',
        images: [],
      },
      {
        author: {name: 'Vũ'},
        rating: 4,
        content: 'Sản phẩm tốt, chất lượng',
        images: [],
      },
      {
        author: {name: 'Vũ'},
        rating: 5,
        content: 'Sản phẩm tốt, chất lượng',
        images: [],
      },
      {
        author: {name: 'Vũ'},
        rating: 5,
        content: 'Sản phẩm tốt, chất lượng',
        images: [],
      },
      {
        author: {name: 'Vũ'},
        rating: 5,
        content: 'Sản phẩm tốt, chất lượng',
        images: [],
      },
      {
        author: {name: 'Vũ'},
        rating: 5,
        content: 'Sản phẩm tốt, chất lượng',
        images: [],
      },
    ],
  },
};

ReviewRating.propTypes = {};

export default ReviewRating;
