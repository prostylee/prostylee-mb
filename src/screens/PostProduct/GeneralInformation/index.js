import React, {useEffect} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Dimensions,
  Platform,
  SafeAreaView,
} from 'react-native';
import {ProgressBar} from 'react-native-paper';
import {useNavigation, useRoute, useTheme} from '@react-navigation/native';
import {Header, ButtonRounded, ThemeView, ActionSheet} from 'components';
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
import {rem} from 'utils/common';

const HEIGHT_HEADER = Platform.OS === 'ios' ? 78 * rem + 45 : 80 * rem + 45;

const CANCEL_INDEX = 0;
// const DESTRUCTIVE_INDEX = 0;
const PICK_IMAGE_OPTIONS = ['Huỷ', 'Chọn từ bộ sưu tập ảnh', 'Chụp hình'];

const AddProductsInfor = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const actionSheetRef = React.useRef();

  const postProductInfo = useSelector(
    (state) => getPostProductInfoSelector(state),
    shallowEqual,
  );

  const route = useRoute();

  const {colors} = useTheme();

  const images = route?.params?.images || [];

  const [listImagePicked, setListImagePicked] = React.useState(
    images.length
      ? images
      : postProductInfo?.images
      ? postProductInfo?.images
      : [],
  );

  const productNameRef = React.useRef();

  const productDescriptionRef = React.useRef();

  const [productName, setProductName] = React.useState(
    postProductInfo?.name || '',
  );
  const [productDescription, setProductDescription] = React.useState(
    postProductInfo?.description || '',
  );

  const imageRef = React.useRef();
  const nameRef = React.useRef();
  const brandRef = React.useRef();
  const descriptionRef = React.useRef();

  const {brand} = postProductInfo;
  const HEIGHT = Dimensions.get('window').height;
  const openCropImagePicker = async () => {
    ImagePicker.openPicker({
      mediaType: 'photo',
      multiple: true,
      maxFiles: 4 - (listImagePicked?.length || 0),
    })
      .then((res) => {
        RootNavigator.navigate('CropPostProductImage', {images: res});
      })
      .catch((e) => {});
  };
  const onSubmitPress = () => {
    if (
      !productName ||
      !productDescription ||
      !listImagePicked.length ||
      !brand
    ) {
      showMessage({
        message: i18n.t('addProduct.pleaseFillInformation'),
        type: 'danger',
        position: 'top',
      });
      return;
    }
    dispatch(
      postProductActions.setProductInfo({
        name: productName,
        description: productDescription,
        images: listImagePicked,
      }),
    );
    navigation.navigate('ProductInformations');
  };
  React.useEffect(() => {
    if (images.length) {
      let newListImage = [];
      if (listImagePicked.length + images.length <= 4) {
        newListImage = newListImage
          .concat([...listImagePicked])
          .concat([...images]);
        setListImagePicked([...newListImage]);
      } else {
        let lengthRemove = 4 - images.length;
        newListImage = [...listImagePicked];
        newListImage.splice(0, lengthRemove);
        newListImage = newListImage.concat([...images]);
        setListImagePicked([...newListImage]);
      }
    }
    return;
  }, [images]);

  const onCaptureImagePress = () => {
    ImagePicker.openCamera({
      width: 600,
      height: 600,
      cropping: true,
      compressImageQuality: 0.8,
      includeBase64: true,
      mediaType: 'photo',
    })
      .then((res) => {
        let image = {
          uri: res?.path,
          index: (listImagePicked?.length || 0) + 1,
        };
        setListImagePicked([...listImagePicked, image]);
      })
      .catch((e) => {
        // showMessage({
        //   message: I18n.t('unknownMessage'),
        //   type: 'danger',
        //   position: 'top',
        // });
      });
  };

  useEffect(() => {
    nameRef.current = productName;
    descriptionRef.current = productDescription;
    imageRef.current = listImagePicked;
  }, [brand, productName, productDescription, listImagePicked]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', (e) => {
      dispatch(
        postProductActions.setProductInfo({
          name: nameRef.current,
          description: descriptionRef.current,
          images: imageRef.current,
        }),
      );
    });
    return unsubscribe;
  }, []);

  return (
    <ThemeView style={styles.container} isFullView>
      <KeyboardAvoidingView
        style={styles.contentContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView>
          <Header
            isDefault
            title={i18n.t('addProduct.generalInformationTitle')}
          />
          <ProgressBar progress={0.33} color={colors['$purple']} />
          <View
            style={{
              height: HEIGHT - HEIGHT_HEADER,
            }}>
            <View style={styles.wrapper}>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.title}>
                  {i18n.t('addProduct.generalDescription')}
                </Text>
                <IconFont name="asterisk" size={6} color="red" />
              </View>

              <View style={styles.wrapperBorder}>
                {listImagePicked && listImagePicked.length ? (
                  [0, 1, 2, 3].map((v) =>
                    v < listImagePicked.length ? (
                      <Image
                        style={styles.imgSelected}
                        source={{uri: listImagePicked[v].uri}}
                        key={v}
                      />
                    ) : v === listImagePicked.length ? (
                      <TouchableOpacity
                        key={v}
                        style={styles.shapesSelected}
                        onPress={() => {
                          actionSheetRef.current.show();
                        }}>
                        <AddImageIcon />
                      </TouchableOpacity>
                    ) : (
                      <View style={styles.shapes} key={v} />
                    ),
                  )
                ) : (
                  <>
                    <TouchableOpacity
                      style={styles.shapesSelected}
                      onPress={() => {
                        actionSheetRef.current.show();
                      }}>
                      <AddImageIcon />
                    </TouchableOpacity>
                    <View style={styles.shapes} />
                    <View style={styles.shapes} />
                    <View style={styles.shapes} />
                  </>
                )}
              </View>
              <Text style={styles.textPrimary}>
                {i18n.t('addProduct.primaryImg')}
              </Text>
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
                style={styles.descriptionInput}
                ref={productDescriptionRef}
                maxLength={255}
                multiline={true}
                value={productDescription}
                onChangeText={(text) => setProductDescription(text)}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.brandWrap}
              onPress={() => navigation.navigate('BrandFashions')}>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.title}>
                  {i18n.t('addProduct.descriptionBrand')}
                </Text>
                <IconFont name="asterisk" size={6} color="red" />
              </View>

              {brand ? (
                <View style={styles.brand}>
                  <Text>{brand?.name}</Text>
                  <Image
                    source={
                      brand.icon
                        ? {uri: brand.icon}
                        : require('assets/images/default.png')
                    }
                    resizeMode={'cover'}
                    style={styles.imgBrand}
                  />
                </View>
              ) : null}
            </TouchableOpacity>
          </View>
        </ScrollView>
        <View style={styles.button}>
          <TouchableOpacity>
            <ButtonRounded
              label={i18n.t('addProduct.descriptionButton')}
              onPress={onSubmitPress}
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
      <ActionSheet
        ref={actionSheetRef}
        options={PICK_IMAGE_OPTIONS}
        cancelButtonIndex={CANCEL_INDEX}
        onPress={(value) => {
          if (value === 1) {
            openCropImagePicker();
            return;
          }
          if (value === 2) {
            onCaptureImagePress();
          }
        }}
      />
    </ThemeView>
  );
};
export default AddProductsInfor;
