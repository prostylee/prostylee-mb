import styles from './styles';

import React from 'react';
import {View, Linking, Alert} from 'react-native';

/*Constants*/
import {getProfile} from 'services/api/userApi';
import {SUCCESS} from 'constants';

/*Hooks*/
import {useDispatch} from 'react-redux';

/*Components*/
import {ButtonRounded, ButtonOutlined, ProductLike} from 'components';

/*Translate*/
import i18n from 'i18n';

/*Proptypes*/
import PropTypes from 'prop-types';

/*Reducers*/
import {cartActions, commonActions} from 'reducers';

import {API, Auth, graphqlOperation} from 'aws-amplify';
import {createChat} from 'graphqlLocal/mutations';
const DEFAULT_CHAT_GROUP_ID = 'USER_2_USER'; // Rule: USER_2_USER

const Footer = ({navigation, productData, choiceSelect}) => {
  const dispatch = useDispatch();
  const isStore = productData.storeId ? true : false;
  const [awsData, setAwsData] = React.useState({});
  const [sellerData, setSellerData] = React.useState({});
  const [userData, setUserData] = React.useState({});

  React.useEffect(() => {
    if (!isStore) {
      if (productData && productData.productOwnerResponse) {
        getProfileData(productData.productOwnerResponse.id);
      }
    }
  }, []);

  const onAddToCart = () => {
    const productItem = {
      item: productData,
      quantity: 1,
      options: choiceSelect,
    };
    dispatch(cartActions.addItemToCart(productItem));
  };

  const getProfileData = async () => {
    const user = await Auth.currentAuthenticatedUser();
    setAwsData(user);
    try {
      const sellerRes = await getProfile(productData.productOwnerResponse.id);
      const userRes = await getProfile(user.attributes['custom:userId']);
      if (
        sellerRes.ok &&
        sellerRes.data.status === SUCCESS &&
        !sellerRes.data.error
      ) {
        setSellerData(sellerRes.data.data);
      }
      if (
        userRes.ok &&
        userRes.data.status === SUCCESS &&
        !userRes.data.error
      ) {
        setUserData(userRes.data.data);
      }
    } catch (err) {
      console.log(
        `cannot get profile ${productData.productOwnerResponse.id}, ${user.attributes['custom:userId']}`,
        err,
      );
    }
  };

  const goToStore = () => {
    navigation.navigate('StoreAddress', {storeId: productData.storeId});
  };
  const callSeller = (phoneNumber) => {
    if (phoneNumber) {
      Linking.openURL(`tel:${phoneNumber}`);
    } else {
      Alert.alert(i18n.t('common.textNoPhoneNumber'));
    }
  };
  const chatWithSeller = async () => {
    if (!sellerData) {
      return;
    }
    dispatch(commonActions.toggleLoading(true));
    try {
      const response = await API.graphql(
        graphqlOperation(createChat, {
          input: {
            parentId: DEFAULT_CHAT_GROUP_ID,
            ownerId: awsData.attributes.sub,
            owner: userData.username,
            ownerFullname: userData.fullName,
            participantUserIds: [sellerData.id, userData.id],
            imageUrls: [],
            content: JSON.stringify(productData),
            createdAt: new Date().toISOString(),
          },
        }),
      );
      navigation.navigate('ChatBox', {
        chatId: response.id,
        otherChatUserId: sellerData.id,
        userName: sellerData.fullName,
        userPhone: sellerData.phoneNumber,
        productData: productData,
      });
    } finally {
      dispatch(commonActions.toggleLoading(false));
    }
  };

  const FirstButton = () => {
    return isStore ? (
      <ButtonOutlined
        style={{}}
        contentStyle={{}}
        labelStyle={{}}
        label={i18n.t('productDetail.buttonStore')}
        onPress={goToStore}
      />
    ) : (
      <ButtonOutlined
        style={{}}
        contentStyle={{}}
        labelStyle={{}}
        label={i18n.t('productDetail.buttonCall')}
        onPress={() => callSeller(sellerData.phoneNumber)}
      />
    );
  };

  const SecondButton = () => {
    return isStore ? (
      <ButtonRounded
        style={{}}
        contentStyle={{}}
        labelStyle={{}}
        label={i18n.t('productDetail.buttonAddToCart')}
        onPress={onAddToCart}
      />
    ) : (
      <ButtonRounded
        style={{}}
        contentStyle={{}}
        labelStyle={{}}
        label={i18n.t('productDetail.buttonChat')}
        onPress={chatWithSeller}
      />
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.likeButton}>
        <ProductLike likeSize={26} unlikeSize={24} item={productData} />
      </View>
      <View style={{}}>
        <FirstButton />
      </View>
      <View style={{}}>
        <SecondButton />
      </View>
    </View>
  );
};

Footer.defaultProps = {
  productData: {},
  choiceSelect: [],
};

Footer.PropTypes = {
  navigation: PropTypes.object,
  productData: PropTypes.object,
  choiceSelect: PropTypes.array,
};

export default Footer;
