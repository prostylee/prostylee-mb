import styles from './styles';
import React, {useState, useMemo} from 'react';
import {View, Text} from 'react-native';
import StepIndicator from 'react-native-step-indicator';
import {TrackingIcon} from 'svg/common';
import Header from '../Header';
import i18n from 'i18n';

const thirdIndicatorStyles = {
  stepIndicatorSize: 15,
  currentStepIndicatorSize: 15,
  separatorStrokeWidth: 1,
  currentStepStrokeWidth: 1,
  stepStrokeCurrentColor: '#823FFD',
  stepStrokeWidth: 1,
  stepStrokeFinishedColor: '#823FFD',
  stepStrokeUnFinishedColor: '#dedede',
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
  labelSize: 13,
  labelAlign: 'flex-start',
  currentStepLabelColor: '#823FFD',
};

const data = [
  {title: 'Đặt thành công', time: '12:00 01/06/2021'},
  {title: 'Chờ xác nhận', time: '12:00 01/06/2021'},
  {title: 'Đã xác nhận', time: '13:59 03/06/2021'},
  {title: 'Đã lấy hàng', time: '14:00 04/06/2021'},
  {title: 'Đang giao hàng'},
  {title: 'Giao hàng thành công'},
];

const OrderTracking = ({navigation, currentPage}) => {
  const renderLabel = (item) => {
    return (
      <View style={styles.wrapStep}>
        <View>
          <Text style={styles.labelStepTitle}>{item.title}</Text>
        </View>
        {item.time && (
          <View>
            <Text style={styles.labelStepTime}>{item.time}</Text>
          </View>
        )}
      </View>
    );
  };

  const dt =
    useMemo(
      () => data.map((item) => renderLabel(item)),
      [JSON.stringify(data)],
    ) || [];

  return (
    <View style={styles.container}>
      <Header icon={<TrackingIcon />} title={i18n.t('orders.tracking')} />
      <View style={styles.stepIndicator}>
        <StepIndicator
          stepCount={dt.length || 0}
          customStyles={thirdIndicatorStyles}
          currentPosition={currentPage}
          direction="vertical"
          onPress={() => {
            console.log('pressed');
          }}
          labels={dt}
        />
      </View>
    </View>
  );
};

OrderTracking.defaultProps = {
  currentPage: 1,
};

OrderTracking.propTypes = {};

export default OrderTracking;
