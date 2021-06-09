import React from 'react';
import {Text, View, ScrollView} from 'react-native';
import styles from './styles';

const NewFeed = ({children}) => {
  return (
    <ScrollView style={styles.container}>
      {children}
    </ScrollView>
  )
}

export default NewFeed;