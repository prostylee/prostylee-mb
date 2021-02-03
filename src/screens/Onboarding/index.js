import React from 'react';
import {View} from 'react-native';
import {Image} from 'components';

import Onboarding from 'react-native-onboarding-swiper';

const IMG_01 = require('assets/images/onboarding01.png');
const IMG_02 = require('assets/images/onboarding02.png');

import styles from './styles';

const Index = (props) => {
  return (
    <Onboarding
      containerStyles={styles.container}
      imageContainerStyles={styles.imageWrapper}
      titleStyles={styles.titleStyles}
      subTitleStyles={styles.subTitleStyles}
      pages={[
        {
          backgroundColor: '#fff',
          image: (
            <Image source={IMG_01} style={styles.image} resizeMode="contain" />
          ),
          title: 'Cộng đồng thời trang lớn nhất Việt Nam',
          subtitle:
            'Cập nhật xu hướng, chia sẻ những bức ảnh thời trang đẹp nhất của bạn với cộng đồng của chúng tôi.',
        },
        {
          backgroundColor: '#fff',
          image: (
            <Image source={IMG_02} style={styles.image} resizeMode="contain" />
          ),
          title: 'Onboarding',
          subtitle: 'Done with React Native Onboarding Swiper',
          containerStyles: styles.container,
          imageContainerStyles: styles.imageWrapper,
          titleStyles: styles.titleStyles,
          subTitleStyles: styles.subTitleStyles,
        },
      ]}
    />
  );
};

export default Index;
