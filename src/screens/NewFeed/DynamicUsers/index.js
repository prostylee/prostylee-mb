import React from 'react';
import {ScrollView, View} from 'react-native';
import {isEmpty} from 'lodash';
import i18n from 'i18n';

import {ContainerView as Container, Title} from 'components';

import Item from './Item';

import styles from './styles';

const DynamicUsers = ({
  listDynamicUsers,
  navigation,
  targetType,
  allNewFeedsUserFollowed = [],
  followUserAction = () => {},
  unFollowUserAction = () => {},
}) => {
  if (
    !listDynamicUsers ||
    isEmpty(listDynamicUsers) ||
    !listDynamicUsers?.content?.length
  ) {
    return null;
  }

  const listDynamicUser = listDynamicUsers?.content;

  return (
    <>
      <Container style={styles.titleContainer}>
        <Title
          title={i18n.t('dynamicUsers.titleDynamicUser')}
          style={styles.textTitle}
          containerStyle={{}}
          // subTitle={i18n.t('common.textSeeMore')}
          // onPress={() => {
          //   navigation.navigate('Stores');
          // }}
        />
      </Container>
      <Container fluid>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {listDynamicUser.map((item, index) => (
            <View
              key={`listDynamicUser_${targetType}_${index}_${allNewFeedsUserFollowed?.includes(
                Number(item?.id),
              )}`}
              style={styles.viewContainer}>
              <Item
                targetType={targetType}
                item={item}
                style={{flex: 1}}
                allNewFeedsUserFollowed={allNewFeedsUserFollowed}
                followUserAction={followUserAction}
                unFollowUserAction={unFollowUserAction}
              />
            </View>
          ))}
        </ScrollView>
      </Container>
    </>
  );
};

export default DynamicUsers;
