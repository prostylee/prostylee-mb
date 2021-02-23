import React from 'react';
import {View} from 'react-native';
import {Container, HeaderBack} from 'components';

import styles from './styles';

import AutoHeightWebView from 'react-native-autoheight-webview';

const Index = (props) => {
  const onGoBack = () => {
    props.navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <HeaderBack title={props.route.params.title} onBack={() => onGoBack()} />
      <Container>
        <View style={styles.mainWrapper}>
          {props.route.params?.url && (
            <AutoHeightWebView
              originWhitelist={['*']}
              source={{
                url: props.route.params.url,
              }}
              style={styles.webview}
              viewportContent={
                'width=device-width, user-scalable=no, initial-scale=0.9'
              }
            />
          )}
        </View>
      </Container>
    </View>
  );
};

export default Index;
