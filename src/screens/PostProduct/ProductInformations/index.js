import React, {useState} from 'react';
import {TextInput, Text, View, TouchableOpacity} from 'react-native';
import i18n from 'i18n';
import {ProgressBar, Button} from 'react-native-paper';
import {Header, ButtonRounded, ThemeView} from 'components';
import RadioForm from 'react-native-simple-radio-button';
import Modal from 'react-native-modalbox';
import styles from './styles';
import Icon from 'react-native-vector-icons/AntDesign';
import ColorInfor from './Color';
import SizeInfor from './Size';

const ProductInfor = () => {
  var radio_props = [
    {label: 'Mới', value: 0},
    {label: 'Đã qua sử dụng', value: 1},
  ];
  const [number, onChangeNumber] = React.useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleColor, setModalVisibleColor] = useState(false);

  const Size = () => {
    return (
      <Modal
        entry="bottom"
        backdropPressToClose={true}
        isOpen={modalVisible}
        style={styles.modalBox}
        onClosed={() => setModalVisible(false)}>
        <View style={styles.content}>
          <View style={styles.headerModal}>
            <Text style={{color: '#823FFD', fontSize: 14}}>Chọn toàn bộ</Text>
            <Text style={styles.titleModal}>Kích thước</Text>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Icon name="close" size={20} />
            </TouchableOpacity>
          </View>
          <View>
            <SizeInfor />
          </View>
        </View>
      </Modal>
    );
  };

  const Color = () => {
    return (
      <Modal
        entry="bottom"
        backdropPressToClose={true}
        isOpen={modalVisibleColor}
        style={styles.modalBox}
        onClosed={() => setModalVisibleColor(false)}>
        <View style={styles.contentColors}>
          <View style={styles.headerModal}>
            <Text></Text>
            <Text style={styles.titleModal}>Màu sắc</Text>
            <TouchableOpacity onPress={() => setModalVisibleColor(false)}>
              <Icon name="close" size={20} />
            </TouchableOpacity>
          </View>
          <View>
            <ColorInfor />
          </View>
        </View>
      </Modal>
    );
  };
  return (
    <ThemeView style={styles.container} isFullView>
      <Header isDefault title={i18n.t('addProduct.productInformationTitle')} />
      <ProgressBar progress={0.67} color="#823FFD" />
      <View style={styles.container}>
        <View style={styles.boxWrap}>
          <Text style={styles.title}>Tình trạng sản phẩm</Text>
          <View style={{paddingTop: 10}}>
            <RadioForm
              radio_props={radio_props}
              onPress={(value) => {
                this.setState({value: value});
              }}
              borderWidth={0.3}
              animation={true}
              buttonColor={'#BBC0C3'}
              buttonOuterSize={20}
              buttonSize={10}
            />
          </View>
        </View>

        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={styles.boxWrap}>
          <View style={styles.status}>
            <Text style={styles.title}>Kích thước</Text>
            <View style={styles.viewStatus}>
              <Text>one-size</Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setModalVisibleColor(true)}
          style={styles.boxWrap}>
          <View style={styles.status}>
            <Text style={styles.title}>Màu</Text>
            <View style={styles.viewStatus}>
              <Text>Đen</Text>
            </View>
          </View>
        </TouchableOpacity>

        <View style={styles.boxWrap}>
          <Text style={styles.title}>Giá sản phẩm</Text>
          <View style={styles.inputPrice}>
            <TextInput
              style={styles.input}
              onChangeText={onChangeNumber}
              value={number}
              placeholder="0"
              keyboardType="numeric"
            />
            <Text>| đ</Text>
          </View>
        </View>
      </View>
      <View style={styles.button}>
        <TouchableOpacity>
          <ButtonRounded label="Tiếp tục" />
        </TouchableOpacity>
      </View>
      <Size />
      <Color />
    </ThemeView>
  );
};
export default ProductInfor;
