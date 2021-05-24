import React from 'react';
import {View, Text, TouchableWithoutFeedback, SafeAreaView} from 'react-native';
import styles from './styles';

import Modal from 'react-native-modal';

const RnActionSheet = (props) => {
  return (
    <Modal
      animationIn="fadeIn"
      animationOut="fadeOut"
      transparent={true}
      isVisible={props.visible}
      animationOutTiming={20}
      backdropOpacity={0.3}>
      <SafeAreaView style={styles.containerAlert}>
        <View style={styles.modalAlert}>
          <View style={styles.body}>
            <Text style={styles.title}>{props.title}</Text>
            {props.data &&
              props.data.map((item, index) => {
                return (
                  <TouchableWithoutFeedback
                    onPress={() => props.onSelectItem(item)}
                    key={index}>
                    <View style={styles.item}>
                      <Text style={styles.label}>{item.name}</Text>
                    </View>
                  </TouchableWithoutFeedback>
                );
              })}
          </View>
          <View style={styles.footer}>
            <TouchableWithoutFeedback onPress={props.onCancel}>
              <View style={styles.btn}>
                <Text style={styles.btnText}>HỦY</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default RnActionSheet;
