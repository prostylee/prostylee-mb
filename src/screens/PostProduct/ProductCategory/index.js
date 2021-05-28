import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Container, HeaderBack} from 'components';
import {useTheme, useRoute, useNavigation} from '@react-navigation/native';
import * as CommonIcon from 'svg/common';
import {userTokenSelector} from 'redux/selectors/user';
import styles from './styles';
import i18n from 'i18n';
import {useBackHandler} from '@react-native-community/hooks';
import {commonActions, statusSelectors} from 'reducers';
import {useDispatch, useSelector} from 'react-redux';

import {dim} from 'utils/common';

const WIDTH = dim.width;

const PostProductCategory = (props) => {
  //Theme
  const {colors} = useTheme();
  const dispatch = useDispatch();
  const imagesRef = React.useRef();
  const [textValue, setTextValue] = React.useState('');

  //route
  const route = useRoute();
  const navigation = useNavigation();

  const storeSelected = useSelector((state) =>
    statusSelectors.getStatusStore(state),
  );
  const userProfile = useSelector((state) => userTokenSelector(state));
  const userData = userProfile
    ? userProfile.signInUserSession?.idToken.payload.identities?.[0]
    : {};

  //BackHandler handle
  useBackHandler(() => {
    return true;
  });

  return (
    <View style={styles.container}>
      <HeaderBack
        onBack={navigation.goBack}
        title={i18n.t('addProduct.categoryScreenTitle')}
      />
      <Container style={styles.mainContent}></Container>
    </View>
  );
};

export default PostProductCategory;
