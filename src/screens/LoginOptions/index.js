import React from 'react';
import {View, Text} from 'react-native';
import {connect} from 'react-redux';
import {Container} from 'components';
import {dataSelectors, dataActions} from 'reducers';

import styles from './styles';

import I18n from 'I18n';

export class LoginOptions extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Container>
        <View style={styles.container}>
          <Text>{I18n.t('test')}</Text>
          <Text>{`Is loading : ${this.props.isLoading}`}</Text>
        </View>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoading: dataSelectors.getLoading(state),
});

const mapDispatchToProps = {
  toggleLoading: dataActions.toggleLoading,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginOptions);
