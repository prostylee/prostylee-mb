import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles';
import {TouchableOpacity, View} from 'react-native';
import HeartButton from '../../components/HeartButton';
import CommentButton from '../../components/CommentButton';
import {ContainerView} from '../../../../components';
import {More} from '../../../../svg/social';

const NewFeedItemFooter = ({newFeedItem, targetType}) => {
  return (
    <ContainerView style={styles.actionWrapper}>
      <View style={styles.leftActionWrapper}>
        <HeartButton
          targetId={newFeedItem?.id}
          targetType={targetType}
          itemType={newFeedItem?.type}
          numberOfLike={
            newFeedItem?.productStatisticResponse?.numberOfLike || 0
          }
          likeStatus={newFeedItem?.likeStatusOfUserLogin}
        />
        <CommentButton
          newFeedItem={newFeedItem}
          numberOfComment={
            newFeedItem?.productStatisticResponse?.numberOfComment || 0
          }
        />
      </View>
      <TouchableOpacity>
        <More />
      </TouchableOpacity>
    </ContainerView>
  );
};

NewFeedItemFooter.propTypes = {
  newFeedItem: PropTypes.object.isRequired,
  targetType: PropTypes.string.isRequired,
};

export default NewFeedItemFooter;
