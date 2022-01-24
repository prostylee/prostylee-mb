import React, {useState, useEffect} from 'react';
import i18n from 'i18n';
import {useNavigation} from '@react-navigation/native';
import {View, Text} from 'react-native';
import {Avatar, Button} from 'react-native-paper';
import {
  commonActions,
  userSelectors,
  newFeedSelectors,
  newFeedActions,
} from 'reducers';

import styles from './styles';

import {SUCCESS, TYPE_USER} from 'constants';
import {ButtonOutlined} from 'components';
import {follow, unfollow} from 'services/api/socialApi';
import {useDispatch, useSelector} from 'react-redux';
import {API, Auth, graphqlOperation} from 'aws-amplify';
import {listChats} from 'graphqlLocal/queries';
import {createChat} from 'graphqlLocal/mutations';
import {showMessage} from 'react-native-flash-message';

const DEFAULT_CHAT_GROUP_ID = 'USER_2_USER'; // Rule: USER_2_USER

const InfoView = ({profile, statistics}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const userProfile = useSelector((state) =>
    userSelectors.getUserProfile(state),
  );
  const localFollowedUser = useSelector((state) =>
    newFeedSelectors.getLocalFollowedUser(state),
  );
  const [followed, setFollowed] = useState(profile?.followedByLoggedInUser);
  const [awsData, setAwsData] = React.useState({});

  useEffect(() => {
    getProfileData();
  }, []);

  const _navigateChat = () => {
    dispatch(commonActions.toggleLoading(true));
    try {
      API.graphql(
        graphqlOperation(listChats, {
          filter: {
            parentId: {eq: DEFAULT_CHAT_GROUP_ID},
            and: [
              {
                participantUserIds: {
                  contains: profile.id,
                },
              },
              {
                participantUserIds: {
                  contains: userProfile.id,
                },
              },
              {
                content: {
                  eq: '',
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
              otherChatUserId: profile.id,
              userName: profile.fullName,
              userPhone: profile.phoneNumber,
              userAvatar: profile.avatar,
              productData: null,
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
    if (!profile) {
      return;
    }
    try {
      const response = await API.graphql(
        graphqlOperation(createChat, {
          input: {
            parentId: DEFAULT_CHAT_GROUP_ID,
            ownerId: awsData.attributes.sub,
            owner: userProfile.username,
            ownerFullname: userProfile.fullName,
            participantUserIds: [profile.id, userProfile.id],
            imageUrls: [],
            content: '',
            createdAt: new Date().toISOString(),
          },
        }),
      );
      if (response && response.data) {
        navigation.navigate('ChatBox', {
          chatId: response.data.createChat.id,
          otherChatUserId: profile.id,
          userName: profile.fullName,
          userPhone: profile.phoneNumber,
          productData: null,
        });
      }
    } finally {
      dispatch(commonActions.toggleLoading(false));
    }
  };

  const getProfileData = async () => {
    const user = await Auth.currentAuthenticatedUser();
    setAwsData(user);
  };

  const _followPress = async () => {
    if (!followed) {
      const res = await follow({
        targetId: profile?.id,
        targetType: TYPE_USER,
      });
      if (res.ok && res.data.status === SUCCESS) {
        setFollowed(true);
        if (localFollowedUser && localFollowedUser?.length) {
          if (!localFollowedUser?.includes(profile?.id)) {
            dispatch(
              newFeedActions.setLocalFollowedUser([
                ...localFollowedUser,
                profile?.id,
              ]),
            );
          }
        } else {
          dispatch(newFeedActions.setLocalFollowedUser([profile?.id]));
        }
      }
    } else {
      const res = await unfollow({
        targetId: profile?.id,
        targetType: TYPE_USER,
      });
      if (res.ok && res.data.status === SUCCESS) {
        setFollowed(false);
        if (localFollowedUser && localFollowedUser?.length) {
          if (localFollowedUser?.includes(profile?.id)) {
            const itemIndex = localFollowedUser?.findIndex(
              (item) => item == profile?.id,
            );
            dispatch(
              newFeedActions.setLocalFollowedUser([
                ...localFollowedUser.slice(0, itemIndex),
                ...localFollowedUser.slice(itemIndex + 1),
              ]),
            );
          }
        }
      }
    }
  };

  return (
    <View style={styles.viewInfo}>
      <View style={styles.infoTop}>
        <Avatar.Image
          size={100}
          source={
            profile?.avatar
              ? {uri: profile.avatar}
              : require('assets/images/default.png')
          }
        />
        <View style={styles.statisticalView}>
          <View style={styles.viewSection}>
            <Text style={styles.textTitle}>{statistics?.followers}</Text>
            <Text style={styles.textLabel}>
              {i18n.t('common.textFollower')}
            </Text>
          </View>
          <View style={styles.viewSection}>
            <Text style={styles.textTitle}>{statistics?.followings}</Text>
            <Text style={styles.textLabel}>
              {i18n.t('common.textFollowing')}
            </Text>
          </View>
          <View style={styles.viewSection}>
            <Text style={styles.textTitle}>
              {Number(statistics?.posts) + Number(statistics?.productPosts)}
            </Text>
            <Text style={styles.textLabel}>{i18n.t('common.textPost')}</Text>
          </View>
        </View>
      </View>

      <View style={styles.textDescriptionContainer}>
        <Text style={styles.textName}>{profile?.fullName}</Text>
        {profile?.bio ? (
          <Text style={styles.textDescription}>{profile?.bio}</Text>
        ) : null}
      </View>
      <View style={styles.actions}>
        <Button
          mode="contained"
          uppercase={false}
          onPress={() => _followPress()}
          contentStyle={styles.followBtnContent}
          labelStyle={[
            styles.followBtnLabel,
            followed ? styles.followedBtnLabel : {},
          ]}
          style={[styles.followBtn, followed ? styles.followedBtn : {}]}>
          {i18n.t(!followed ? 'common.textFollow' : 'common.textFollowed')}
        </Button>
        <ButtonOutlined
          label={i18n.t('message')}
          style={styles.messageBtn}
          labelStyle={styles.messageBtnLabel}
          onPress={_navigateChat}
        />
      </View>
    </View>
  );
};

InfoView.defaultProps = {};

InfoView.propTypes = {};

export default InfoView;
