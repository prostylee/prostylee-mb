import React from 'react';
import {View, ActivityIndicator, Dimensions} from 'react-native';
import styles from './styles';
import Modal from 'react-native-modal';
export default class SlideInModal extends React.PureComponent {
  static instance = null;

  static show = (onShowCb = () => {}, children = <View />) => {
    onShowCb();
    if (SlideInModal.instance) {
      SlideInModal.instance.setState({visible: false}, () => {
        SlideInModal.instance.setState({visible: true, children});
      });
    }
  };
  static hide = (onHideCb = () => {}) => {
    if (SlideInModal.instance) {
      SlideInModal.instance.setState({visible: false});
      onHideCb();
    }
  };

  constructor(props) {
    super(props);
    SlideInModal.instance = this;

    this.state = {
      visible: false,
      children: true,
    };
  }

  render() {
    const {width, height} = Dimensions.get('window');
    return (
      <Modal
        deviceWidth={width}
        deviceHeight={height}
        coverScreen={false}
        backdropColor="#fff"
        backdropOpacity={1}
        animationIn="slideInUp"
        animationInTiming={300}
        animationOutTiming={300}
        animationOut="slideOutDown"
        isVisible={SlideInModal?.instance?.state?.visible || false}
        onRequestClose={() => SlideInModal.hide()}
        onBackdropPress={() => SlideInModal.hide()}
        onSwipeComplete={() => SlideInModal.hide()}
        style={{
          margin: 0,
          padding: 0,
          flex: 1,
          zIndex: 9999,
          elevation: 9999,
          backgroundColor: '#333333',
        }}>
        {this.state.children ? this.state.children : <View />}
      </Modal>
    );
  }
}
