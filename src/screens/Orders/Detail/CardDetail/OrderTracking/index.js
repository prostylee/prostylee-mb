import styles from './styles';
import React, {useState, useMemo} from 'react';
import {View, Text} from 'react-native';
import StepIndicator from 'react-native-step-indicator';
import {TrackingIcon} from 'svg/common';
import Header from '../Header';
import i18n from 'i18n';
import {getListUserOrderStatusSelector} from 'redux/selectors/myPage';
import {useSelector} from 'react-redux';

const thirdIndicatorStyles = {
  stepIndicatorSize: 16,
  currentStepIndicatorSize: 16,
  separatorStrokeWidth: 1,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: '#fff',
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: '#dedede',
  stepStrokeUnFinishedColor: '#fff',
  separatorFinishedColor: '#823FFD',
  separatorUnFinishedColor: '#dedede',
  stepIndicatorFinishedColor: '#823FFD',
  stepIndicatorUnFinishedColor: '#ffffff',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 0,
  currentStepIndicatorLabelFontSize: 0,
  stepIndicatorLabelCurrentColor: 'transparent',
  stepIndicatorLabelFinishedColor: 'transparent',
  stepIndicatorLabelUnFinishedColor: 'transparent',
  labelColor: '#999999',
  labelSize: 10,
  labelAlign: 'flex-start',
  currentStepLabelColor: '#823FFD',
};

const OrderTracking = ({navigation, timeLine = []}) => {
  const statusSelector = useSelector((state) =>
    getListUserOrderStatusSelector(state),
  );

  let listStatus = statusSelector?.content || [];

  listStatus = listStatus.sort((a, b) => a.id - b.id);

  const renderLabel = (item) => {
    return (
      <View style={styles.wrapStep}>
        <View>
          <Text style={styles.labelStepTitle}>{item?.statusName}</Text>
        </View>
        {item?.updatedAt && (
          <View>
            <Text style={styles.labelStepTime}>{item?.updatedAt}</Text>
          </View>
        )}
      </View>
    );
  };

  //console.log('TIMELINE', JSON.stringify(timeLine, null, 4));
  // console.log('ALL STATUS', JSON.stringify(listStatus, null, 2));

  // const dt =
  //   useMemo(() => {
  //     return newTimeLine?.map((item) => renderLabel(item));
  //   }, [JSON.stringify(newTimeLine)]) || [];

  return (
    <View style={styles.container}>
      <Header icon={<TrackingIcon />} title={i18n.t('orders.tracking')} />
      <View style={styles.stepIndicator}>
        <View style={styles.stepWrapper}>
          <View style={styles.circle}>
            <View style={styles.circleInner} />
          </View>
          <View style={styles.seperator} />
        </View>
        <View style={styles.inforWrapper}>
          <Text style={styles.labelStepTitle}>{timeLine?.[0]?.statusName}</Text>
          <Text style={styles.labelStepTime}>{timeLine?.[0]?.updatedAt}</Text>
        </View>
        {/* <StepIndicator
          stepCount={newTimeLine?.length || 0}
          customStyles={thirdIndicatorStyles}
          currentPosition={newTimeLine?.length ? newTimeLine?.length - 1 : 0}
          direction="vertical"
          onPress={() => {
            console.log('pressed');
          }}
          labels={dt}
        /> */}
      </View>
    </View>
  );
};

OrderTracking.defaultProps = {
  currentPage: 1,
};

OrderTracking.propTypes = {};

export default OrderTracking;
