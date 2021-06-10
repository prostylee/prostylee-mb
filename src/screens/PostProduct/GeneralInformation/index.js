import React from 'react';
import {Text, View, TouchableOpacity, TextInput, Image} from 'react-native';
import {ProgressBar} from 'react-native-paper';
import {useTheme} from '@react-navigation/native';
import {Header, ButtonRounded, ThemeView} from 'components';
import i18n from 'i18n';
import IconMeterial from 'react-native-vector-icons/MaterialCommunityIcons';
import IconFont from 'react-native-vector-icons/FontAwesome';
import styles from './styles';
const AddProductsInfor = (props) => {
  const {colors} = useTheme();
  const productNameRef = React.useRef();
  const productDescriptionRef = React.useRef();
  const [productName, setProductName] = React.useState('');
  const [productDescription, setProductDescription] = React.useState('');
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
            <View style={styles.shapesSelected}>
              <IconMeterial name="image-plus" size={30} />
            </View>
            <View style={styles.shapes} />
            <View style={styles.shapes} />
            <View style={styles.shapes} />
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
          onPress={() => props.navigation.navigate('BrandFashions')}>
          <Text style={styles.title}>
            {i18n.t('addProduct.descriptionBrand')}
          </Text>
          <View style={styles.brand}>
            <Text>Uniqlo</Text>
            <Image
              source={require('../../../assets/images/uniqlo.png')}
              resizeMode={'cover'}
              style={styles.imgBrand}
            />
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.button}>
        <TouchableOpacity>
          <ButtonRounded
            label={i18n.t('addProduct.descriptionButton')}
            onPress={() => {
              props.navigation.navigate('ProductInformations');
            }}
          />
        </TouchableOpacity>
      </View>
    </ThemeView>
  );
};
export default AddProductsInfor;
