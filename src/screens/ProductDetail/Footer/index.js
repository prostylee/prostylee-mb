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
import {listChats} from 'graphqlLocal/queries';
import {showMessage} from 'react-native-flash-message';

const DEFAULT_CHAT_GROUP_ID = 'USER_2_USER'; // Rule: USER_2_USER

const Footer = ({navigation, productData, priceList, choiceSelect}) => {
  const dispatch = useDispatch();
  const isStore = productData.storeId ? true : false;
  const [awsData, setAwsData] = React.useState({});
  const [sellerData, setSellerData] = React.useState({});
  const [userData, setUserData] = React.useState({});
  const [productExist, setProductExist] = React.useState(true);
  const attributes = productData?.productAttributeOptionResponse || [];
  let isMounted = true;

  React.useEffect(() => {
    if (!isStore) {
      if (productData && productData.productOwnerResponse) {
        getProfileData(productData.productOwnerResponse.id);
      }
    }
    return () => {
      isMounted = false;
    };
  }, []);

  const onAddToCart = () => {
    const productItem = {
      item: productData,
      quantity: 1,
      options: choiceSelect,
    };
    dispatch(cartActions.addItemToCart(productItem));
  };

  const checkButtonEnability = () => {
    const choiceList = choiceSelect.map((item) => item.value.attrValue).sort();
    let attributeID = '';
    choiceList.forEach((element) => {
      attributeID = attributeID + '_' + element;
    });
    if (priceList[attributeID]) {
      setProductExist(true);
    } else {
      setProductExist(false);
    }
  };

  React.useEffect(() => {
    checkButtonEnability();
  }, [choiceSelect]);

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
        if (isMounted) {
          setSellerData(sellerRes.data.data);
        }
      }
      if (
        userRes.ok &&
        userRes.data.status === SUCCESS &&
        !userRes.data.error
      ) {
        if (isMounted) {
          setUserData(userRes.data.data);
        }
      }
    } catch (err) {
      showMessage({
        message: i18n.t('unknownMessage'),
        type: 'danger',
        position: 'top',
      });
    }
  };

  const goToStore = () => {
    navigation.navigate('StoreAddress', {
      storeId: productData.storeId,
      productId: productData.id,
    });
  };
  const callSeller = (phoneNumber) => {
    if (phoneNumber) {
      Linking.openURL(`tel:${phoneNumber}`);
    } else {
      Alert.alert(i18n.t('common.textNoPhoneNumber'));
    }
  };
  const checkExistedChat = async () => {
    dispatch(commonActions.toggleLoading(true));
    try {
      API.graphql(
        graphqlOperation(listChats, {
          filter: {
            parentId: {eq: DEFAULT_CHAT_GROUP_ID},
            and: [
              {
                participantUserIds: {
                  contains: userData.id,
                },
              },
              {
                participantUserIds: {
                  contains: sellerData.id,
                },
              },
              {
                content: {
                  contains: `"id":${productData.id}`,
                },
              },
            ],
          },
        }),
      )
        .then(async (result) => {
          if (!result.data.listChats.items.length) {
            chatWithSeller();
          } else {
            const latestChat =
              result.data.listChats.items[
                result.data.listChats.items.length - 1
              ];
            dispatch(commonActions.toggleLoading(false));
            navigation.navigate('ChatBox', {
              chatId: latestChat.id,
              otherChatUserId: sellerData.id,
              userName: sellerData.fullName,
              userPhone: sellerData.phoneNumber,
              productData: productData,
            });
          }
        })
        .catch((_) => {
          dispatch(commonActions.toggleLoading(false));
          showMessage({
            message: i18n.t('unknownMessage'),
            type: 'danger',
            position: 'top',
          });
        });
    } catch (_) {
      dispatch(commonActions.toggleLoading(false));
      showMessage({
        message: i18n.t('unknownMessage'),
        type: 'danger',
        position: 'top',
      });
    }
  };
  const chatWithSeller = async () => {
    if (!sellerData) {
      return;
    }
    const product = {
      id: productData.id,
      name: productData.name,
      imageUrls: productData.imageUrls,
      price: productData.price,
      priceSale: productData.priceSale,
      productPriceResponseList: productData.productPriceResponseList,
    };
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
            content: JSON.stringify(product),
            createdAt: new Date().toISOString(),
          },
        }),
      );
      if (response && response.data) {
        navigation.navigate('ChatBox', {
          chatId: response.data.createChat.id,
          otherChatUserId: sellerData.id,
          userName: sellerData.fullName,
          userPhone: sellerData.phoneNumber,
          productData: productData,
        });
      }
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
        disabled={!productExist || attributes.length !== choiceSelect.length}
      />
    ) : (
      <ButtonRounded
        style={{}}
        contentStyle={{}}
        labelStyle={{}}
        label={i18n.t('productDetail.buttonChat')}
        onPress={checkExistedChat}
        disabled={!productExist || attributes.length !== choiceSelect.length}
      />
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.likeButton}>
        <ProductLike item={productData} />
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

Footer.propTypes = {
  navigation: PropTypes.object,
  productData: PropTypes.object,
  choiceSelect: PropTypes.array,
};

export default Footer;
