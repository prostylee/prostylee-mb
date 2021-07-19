import React from 'react';
import {View, ActivityIndicator, Dimensions} from 'react-native';
import styles from './styles';
import Modal from 'react-native-modal';
export default class SlideInModal extends React.PureComponent {
  static instance = null;

  static show = (
    onShowCb = () => {},
    children = <View />,
    animationIn = 'slideInUp',
    animationOut = 'slideOutDown',
  ) => {
    onShowCb();
    if (SlideInModal.instance) {
      SlideInModal.instance.setState({visible: false}, () => {
        SlideInModal.instance.setState({
          visible: true,
          children,
          animationIn,
          animationOut,
        });
      });
    }
  };

  static hide = (onHideCb = () => {}) => {
    if (SlideInModal.instance) {
      SlideInModal.instance.setState({visible: false});
      const timeout = setTimeout(() => {
        onHideCb();
        clearTimeout(timeout);
      }, 300);
    }
  };

  constructor(props) {
    super(props);
    SlideInModal.instance = this;

    this.state = {
      visible: false,
      children: <View />,
      animationIn: 'slideInUp',
      animationOut: 'slideOutDown',
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
        backdropOpacity={0.4}
        animationIn={this.state.animationIn || 'slideInUp'}
        animationInTiming={300}
        animationOutTiming={300}
        animationOut={this.state.animationOut || 'slideOutDown'}
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
          backgroundColor: 'rgba(0,0,0,0.3)',
          position: 'relative',
        }}>
        {this.state.children ? this.state.children : <View />}
      </Modal>
    );
  }
}
