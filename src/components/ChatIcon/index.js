import React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import {TouchableOpacity, View, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Message} from 'svg/social';
import i18n from 'i18n';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';
import {commonSelectors} from 'reducers';

import {API, Auth, graphqlOperation} from 'aws-amplify';
import {listChats} from 'graphqlLocal/queries';
import {onCreateChat, onUpdateChat} from 'graphqlLocal/subscriptions';
import {showMessage} from 'react-native-flash-message';
const DEFAULT_CHAT_GROUP_ID = 'USER_2_USER'; // Rule: USER_2_USER

const ChatIcon = ({color, size, strokeWidth}) => {
  const navigation = useNavigation();
  const isForeGround = useSelector((state) =>
    commonSelectors.isForeGroundSelector(state),
  );
  const [hasNew, setHasNew] = React.useState(0);

  let createChatListener, updateChatListener;

  const checkNewChats = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      if (user.username) {
        API.graphql(
          graphqlOperation(listChats, {
            filter: {
              parentId: {eq: DEFAULT_CHAT_GROUP_ID},
              participantUserIds: {
                contains: `${user.attributes['custom:userId']}`,
              },
              // ownerFullname: {contains: 'Loc Nguyen'}, // TODO used for search
            },
            // limit: 4, // paging
            // nextToken: null, // fill token to get data of next page
          }),
        )
          .then(async (result) => {
            if (
              result.data?.listChats?.items &&
              result.data.listChats.items?.length
            ) {
              const hasNewMessageNumber = result.data.listChats.items.reduce(
                (total, item) => {
                  const itemNewMessage = item?.imageUrls;
                  const checkNewMessage = () => {
                    if (!itemNewMessage.length) {
                      return false;
                    } else {
                      const newMessage = itemNewMessage[0];
                      if (
                        item.currentUserId === newMessage ||
                        user.attributes.sub === newMessage
                      ) {
                        return false;
                      } else {
                        if (item.participantUserIds.length === 2) {
                          return true;
                        } else {
                          return false;
                        }
                      }
                    }
                  };
                  return checkNewMessage() ? total + 1 : total;
                },
                0,
              );
              setHasNew(hasNewMessageNumber);
            }
          })
          .catch((_) => {
            showMessage({
              message: i18n.t('unknownMessage'),
              type: 'danger',
              position: 'top',
            });
          });
      }
    } catch (_) {
      showMessage({
        message: i18n.t('unknownMessage'),
        type: 'danger',
        position: 'top',
      });
    }
  };

  const subScribeToChatChannel = async () => {
    try {
      createChatListener = API.graphql(
        graphqlOperation(onCreateChat),
      ).subscribe({
        next: () => {
          checkNewChats();
        },
        error: (error) => {
          console.warn(error);
        },
      });

      updateChatListener = API.graphql(
        graphqlOperation(onUpdateChat),
      ).subscribe({
        next: () => {
          checkNewChats();
        },
        error: (error) => {
          console.warn(error);
        },
      });
    } catch (e) {
      console.log('error subscribe chat channel');
    }
  };

  React.useEffect(() => {
    if (isForeGround) {
      subScribeToChatChannel();
    }
    return () => {
      if (createChatListener) {
        createChatListener.unsubscribe();
      }
      if (updateChatListener) {
        updateChatListener.unsubscribe();
      }
    };
  }, [isForeGround]);

  React.useEffect(() => {
    if (isForeGround) {
      checkNewChats();
    }
  }, [isForeGround]);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate('ChatList')}>
      <Message
        width={size}
        height={size}
        color={color}
        strokeWidth={strokeWidth}
      />
      {hasNew > 0 ? (
        <View style={styles.badge}>
          <Text style={styles.badgeNumber}>{hasNew}</Text>
        </View>
      ) : null}
    </TouchableOpacity>
  );
};
export default ChatIcon;

ChatIcon.defaultProps = {
  size: 24,
  color: '#9B9B9B',
  strokeWidth: 1.5,
};

ChatIcon.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
  strokeWidth: PropTypes.number,
};

const styles = EStyleSheet.create({
  container: {
    paddingHorizontal: 8,
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: 0,
    width: 16,
    height: 16,
    borderRadius: 10,
    backgroundColor: '$red',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeNumber: {
    fontFamily: '$font1',
    fontSize: 10,
    fontWeight: '400',
    lineHeight: 13,
    color: '$white',
  },
});
