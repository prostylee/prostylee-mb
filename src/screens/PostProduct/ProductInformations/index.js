import React, {useState} from 'react';
import {
  TextInput,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import i18n from 'i18n';
import {ProgressBar, Button} from 'react-native-paper';
import {Header, ButtonRounded, ThemeView} from 'components';
import RadioForm from 'react-native-simple-radio-button';
import Modal from 'react-native-modal';
import styles from './styles';
import Icon from 'react-native-vector-icons/AntDesign';
import ColorInfor from './Color';
import SizeInfor from './Size';
import {useDispatch} from 'react-redux';
import {postProductActions} from 'redux/reducers';
import {useNavigation} from '@react-navigation/native';
import {showMessage} from 'react-native-flash-message';
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
const ProductInfor = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  var radio_props = [
    {label: 'Mới', value: 0},
    {label: 'Đã qua sử dụng', value: 1},
  ];
  const [productPrice, setProductPrice] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleColor, setModalVisibleColor] = useState(false);

  const [status, setStatus] = useState(0);

  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);

  const Size = () => {
    return (
      <Modal
        transparent={true}
        animationOut="slideOutDown"
        isVisible={modalVisible}
        backdropOpacity={0.3}
        style={{justifyContent: 'flex-end', margin: 0}}
        testID={'modal'}
        deviceHeight={HEIGHT}
        deviceWidth={WIDTH}
        onBackdropPress={() => setModalVisible(false)}
        animationOutTiming={400}>
        <View style={styles.content}>
          <View style={styles.headerModal}>
            <Text style={styles.titleModal}>Kích thước</Text>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.closeButton}>
              <Icon name="close" size={20} />
            </TouchableOpacity>
          </View>
          <View>
            <SizeInfor
              setModalVisible={setModalVisible}
              setSelectedSizes={setSelectedSizes}
              defaultState={selectedSizes}
            />
          </View>
        </View>
      </Modal>
    );
  };

  const Color = () => {
    return (
      <Modal
        transparent={true}
        animationOut="slideOutDown"
        isVisible={modalVisibleColor}
        backdropOpacity={0.3}
        style={{justifyContent: 'flex-end', margin: 0}}
        testID={'modal'}
        deviceHeight={HEIGHT}
        deviceWidth={WIDTH}
        onBackdropPress={() => setModalVisibleColor(false)}
        animationOutTiming={400}>
        <View style={styles.contentColors}>
          <View style={styles.headerModal}>
            <Text></Text>
            <Text style={styles.titleModal}>Màu sắc</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisibleColor(false)}>
              <Icon name="close" size={20} />
            </TouchableOpacity>
          </View>
          <View>
            <ColorInfor
              setSelectedColors={setSelectedColors}
              setModalVisibleColor={setModalVisibleColor}
              defaultState={selectedColors}
            />
          </View>
        </View>
      </Modal>
    );
  };

  const onSubmitPress = () => {
    if (!selectedSizes.length || !selectedColors.length || !productPrice) {
      showMessage({
        message: i18n.t('addProduct.pleaseFillInformation'),
        type: 'danger',
      });
      return;
    }
    dispatch(
      postProductActions.setProductInfo({
        colors: [...selectedColors],
        sizes: [...selectedSizes],
        status: status,
        price: productPrice,
      }),
    );
    navigation.navigate('PaymentShipping');
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
                setStatus(value);
              }}
              buttonColor={'#BBC0C3'}
              buttonSize={8}
              buttonOuterSize={18}
            />
          </View>
        </View>

        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={styles.boxWrap}>
          <View style={styles.status}>
            <Text style={styles.title}>Kích thước</Text>
            <View style={styles.selectItemContainer}>
              {selectedSizes?.map((v) => (
                <View style={styles.viewStatus}>
                  <Text>{v.name}</Text>
                </View>
              ))}
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setModalVisibleColor(true)}
          style={styles.boxWrap}>
          <View style={styles.status}>
            <Text
              style={[
                styles.title,
                {
                  width: 100,
                },
              ]}>
              Màu
            </Text>
            <View style={styles.selectItemContainer}>
              {selectedColors?.map((v) => (
                <View style={styles.viewStatus}>
                  <Text>{v.name}</Text>
                </View>
              ))}
            </View>
          </View>
        </TouchableOpacity>

        <View style={styles.boxWrap}>
          <Text style={styles.title}>Giá sản phẩm</Text>
          <View style={styles.inputPrice}>
            <TextInput
              style={styles.input}
              onChangeText={setProductPrice}
              value={productPrice}
              placeholder="0"
              keyboardType="numeric"
            />
            <Text style={styles.verticalLine}>|</Text>
            <Text style={styles.currencyUnitText}>đ</Text>
          </View>
        </View>
      </View>
      <View style={styles.button}>
        <TouchableOpacity onPress={onSubmitPress}>
          <ButtonRounded label="Tiếp tục" />
        </TouchableOpacity>
      </View>
      <Size />
      <Color />
    </ThemeView>
  );
};
export default ProductInfor;
