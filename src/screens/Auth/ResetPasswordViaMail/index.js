import React from 'react';
import {View, Text} from 'react-native';
import {ContainerWithoutScrollView, ButtonOutlined} from 'components';

import I18n from 'i18n';

import styles from './styles';

import {Success} from 'svg/common';

const Index = (props) => {
  const onBackToSignIn = () => {
    props.navigation.navigate('SignIn');
  };
  return (
    <View style={styles.container}>
      <ContainerWithoutScrollView>
        <View style={styles.mainWrapper}>
          <Success />
          <Text style={styles.label}>{I18n.t('pwChangeSuccess')}</Text>
          <Text style={styles.content}>{I18n.t('pwChangeSuccessNoti')}</Text>
          <ButtonOutlined
            label={I18n.t('backToSignIn')}
            contentStyle={styles.contentButton}
            style={styles.button}
            onPress={() => onBackToSignIn()}
          />
        </View>
      </ContainerWithoutScrollView>
    </View>
  );
};

export default Index;
