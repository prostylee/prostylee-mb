import styles from './styles';
import React from 'react';
import {View, Text} from 'react-native';

const Header = ({navigation, icon, title, style}) => {
  return (
    <View style={{...styles.wrapHeader, ...style}}>
      <View>{icon}</View>
      <View>
        <Text style={styles.labelHeader}>&nbsp;{title}</Text>
      </View>
    </View>
  );
};

Header.defaultProps = {};

Header.propTypes = {};

export default Header;
