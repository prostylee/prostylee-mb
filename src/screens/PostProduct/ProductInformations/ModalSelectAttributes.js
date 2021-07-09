import React from 'react';
import {Dimensions, View, TouchableOpacity, Text} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Modal from 'react-native-modal';
import styles from './styles';
import ButtonAttributes from './ButtonAttributes';
import PropTypes from 'prop-types';
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
const ModalSelectAttributes = ({
  item = {},
  setSelectedModalItem = () => {},
  _handleSelectAttributes = () => {},
  selectedAttributes = {},
  selectedModalItem = {},
}) => {
  return (
    <Modal
      transparent={true}
      animationOut="slideOutDown"
      isVisible={Object.keys(selectedModalItem).length > 0}
      backdropOpacity={0.3}
      style={{justifyContent: 'flex-end', margin: 0}}
      testID={'modal'}
      deviceHeight={HEIGHT}
      deviceWidth={WIDTH}
      onBackdropPress={() => setSelectedModalItem({})}
      animationOutTiming={400}>
      <View style={styles.contentColors}>
        <View style={styles.headerModal}>
          <Text style={styles.titleModal}>{item.label}</Text>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setSelectedModalItem({})}>
            <Icon name="close" size={20} />
          </TouchableOpacity>
        </View>
        <View>
          <ButtonAttributes
            data={item}
            setModalVisible={() => setSelectedModalItem({})}
            defaultState={selectedAttributes?.[item.key]}
            submitSelect={_handleSelectAttributes}
            allowSelectMultiple={true}
          />
        </View>
      </View>
    </Modal>
  );
};
ModalSelectAttributes.defaultProps = {
  item: {},
  setSelectedModalItem: () => {},
  _handleSelectAttributes: () => {},
  selectedAttributes: {},
  selectedModalItem: {},
};

ModalSelectAttributes.propTypes = {
  item: PropTypes.object.isRequired,
  setSelectedModalItem: PropTypes.func.isRequired,
  _handleSelectAttributes: PropTypes.func.isRequired,
  selectedAttributes: PropTypes.object.isRequired,
  selectedModalItem: PropTypes.object.isRequired,
};
export default ModalSelectAttributes;
