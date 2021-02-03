import React from 'react';
import {View, Text} from 'react-native';
import {connect} from 'react-redux';
import {Container} from 'components';
import {commonSelectors, commonActions} from 'reducers';
import {useTheme} from '@react-navigation/native';

import styles from './styles';

import i18n from 'i18n';
import {Button} from 'react-native-paper';

const LoginOptions = (props) => {
  const {colors} = useTheme();
  return (
    <Container>
      <View style={styles.container}>
        <Text style={styles[`${props.theme}Text`]}>{i18n.t('test')}</Text>
        <Text>{`Is loading : ${props.isLoading}`}</Text>
        <Button
          icon="camera"
          mode="contained"
          onPress={() => console.log('Pressed')}>
          Press me
        </Button>
        <Text style={{color: colors.loading}}>Tesst theme!</Text>
      </View>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  isLoading: commonSelectors.getLoading(state),
  theme: commonSelectors.getThemeMode(state),
});

const mapDispatchToProps = {
  toggleLoading: commonActions.toggleLoading,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginOptions);
