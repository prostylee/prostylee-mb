import React from 'react';
import {Text, View, TouchableOpacity, TextInput, Image} from 'react-native';
import {ProgressBar} from 'react-native-paper';
import {useRoute, useTheme} from '@react-navigation/native';
import {Header, ButtonRounded, ThemeView} from 'components';
import i18n from 'i18n';
import {AddImageIcon} from 'svg/common';
import IconFont from 'react-native-vector-icons/FontAwesome';
import ImagePicker from 'react-native-image-crop-picker';
import RootNavigator from 'navigator/rootNavigator';
import styles from './styles';
import {useSelector, shallowEqual, useDispatch} from 'react-redux';
import {getPostProductInfoSelector} from 'redux/selectors/postProduct';
import {postProductActions} from 'redux/reducers';
import {showMessage} from 'react-native-flash-message';

const AddProductsInfor = ({navigation}) => {
  const dispatch = useDispatch();
  const route = useRoute();
  const {colors} = useTheme();

  const images = route?.params?.images || [];

  const productNameRef = React.useRef();
  const productDescriptionRef = React.useRef();

  const [productName, setProductName] = React.useState('');
  const [productDescription, setProductDescription] = React.useState('');

  const postProductInfo = useSelector(
    (state) => getPostProductInfoSelector(state),
    shallowEqual,
  );
  const {brand} = postProductInfo;

  const openCropImagePicker = async () => {
    ImagePicker.openPicker({
      mediaType: 'photo',
      multiple: true,
      maxFiles: 4,
    })
      .then((res) => {
        console.log(res);
        RootNavigator.navigate('CropPostProductImage', {images: res});
      })
      .catch((e) => console.log(e));
  };
  const onSubmitPress = () => {
    if (!productName || !productDescription || !images.length || !brand) {
      showMessage({
        message: i18n.t('addProduct.pleaseFillInformation'),
        type: 'danger',
      });
      return;
    }
    dispatch(
      postProductActions.setProductInfo({
        name: productName,
        description: productDescription,
        images: images,
      }),
    );
    navigation.navigate('ProductInformations');
  };
  return (
    <ThemeView style={styles.container} isFullView>
      <Header isDefault title={i18n.t('addProduct.generalInformationTitle')} />
      <ProgressBar progress={0.33} color={colors['$purple']} />
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <Text style={styles.title}>
            {i18n.t('addProduct.generalDescription')}
          </Text>
          <View style={styles.wrapperBorder}>
            {images && images.length ? (
              [0, 1, 2, 3].map((v) =>
                v < images.length ? (
                  <TouchableOpacity onPress={openCropImagePicker}>
                    <Image
                      style={styles.imgSelected}
                      source={{uri: images[v].uri}}
                    />
                  </TouchableOpacity>
                ) : v === images.length ? (
                  <TouchableOpacity
                    style={styles.shapesSelected}
                    onPress={openCropImagePicker}>
                    <AddImageIcon />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity onPress={openCropImagePicker}>
                    <View style={styles.shapes} />
                  </TouchableOpacity>
                ),
              )
            ) : (
              <>
                <TouchableOpacity
                  style={styles.shapesSelected}
                  onPress={openCropImagePicker}>
                  <AddImageIcon />
                </TouchableOpacity>
                <View style={styles.shapes} />
                <View style={styles.shapes} />
                <View style={styles.shapes} />
              </>
            )}
          </View>
          <Text style={styles.textPrimary}>Primary</Text>
        </View>

        <TouchableOpacity
          style={styles.boxWrap}
          activeOpacity={1}
          onPress={() => {
            productNameRef.current.focus();
          }}>
          <View style={styles.nameProduct}>
            <Text style={styles.title}>{`${i18n.t(
              'addProduct.descriptionName',
            )} (${productName.length}/255)`}</Text>
            <IconFont name="asterisk" size={6} color="red" />
          </View>
          <TextInput
            style={styles.productNameInput}
            ref={productNameRef}
            maxLength={255}
            value={productName}
            onChangeText={(text) => setProductName(text)}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.boxWrap}
          activeOpacity={1}
          onPress={() => {
            productDescriptionRef.current.focus();
          }}>
          <View style={styles.nameProduct}>
            <Text style={styles.title}>{`${i18n.t(
              'addProduct.descriptionContent',
            )} (${productDescription.length}/255)`}</Text>
            <IconFont name="asterisk" size={6} color="red" />
          </View>
          <TextInput
            style={styles.productNameInput}
            ref={productDescriptionRef}
            maxLength={255}
            value={productDescription}
            onChangeText={(text) => setProductDescription(text)}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.brandWrap}
          onPress={() => navigation.navigate('BrandFashions')}>
          <Text style={styles.title}>
            {i18n.t('addProduct.descriptionBrand')}
          </Text>
          {brand ? (
            <View style={styles.brand}>
              <Text>{brand?.name}</Text>
              <Image
                source={
                  brand.icon
                    ? {uri: brand.icon}
                    : require('../../../assets/images/uniqlo.png')
                }
                resizeMode={'cover'}
                style={styles.imgBrand}
              />
            </View>
          ) : null}
        </TouchableOpacity>
      </View>
      <View style={styles.button}>
        <TouchableOpacity>
          <ButtonRounded
            label={i18n.t('addProduct.descriptionButton')}
            onPress={onSubmitPress}
          />
        </TouchableOpacity>
      </View>
    </ThemeView>
  );
};
export default AddProductsInfor;
