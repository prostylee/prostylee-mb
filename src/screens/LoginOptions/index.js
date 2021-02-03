import React from 'react';
import {View, Text} from 'react-native';
import {connect} from 'react-redux';
import {Container} from 'components';
import {commonSelectors, commonActions} from 'reducers';

import styles from './styles';

import i18n from 'i18n';
import {Button} from 'react-native-paper';

export class LoginOptions extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {theme} = this.props;
    return (
      <Container>
        <View style={styles.container}>
          <Text style={styles[`${theme}Text`]}>{i18n.t('test')}</Text>
          <Text>{`Is loading : ${this.props.isLoading}`}</Text>
          <Button
            icon="camera"
            mode="contained"
            onPress={() => console.log('Pressed')}>
            Press me
          </Button>
        </View>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoading: commonSelectors.getLoading(state),
  theme: commonSelectors.getThemeMode(state),
});

const mapDispatchToProps = {
  toggleLoading: commonActions.toggleLoading,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginOptions);
