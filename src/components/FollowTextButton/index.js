import React from 'react';
import {TouchableOpacity} from 'react-native';
import {
  followStoreService,
  unFollowStoreService,
} from '../../services/api/storeApi';
const FollowTextButton = ({item}) => {
  console.log('ITEM FOLLOW', item);
  return (
    <TouchableOpacity>
      <Text>Theo dõi</Text>
    </TouchableOpacity>
  );
};
export default FollowTextButton;
