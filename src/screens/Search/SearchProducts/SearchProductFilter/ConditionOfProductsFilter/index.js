import React, {useState} from 'react';
import {
  SafeAreaView,
  Switch,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

import styles from './styles';
import Accordion from 'react-native-collapsible/Accordion';
import Icon from 'react-native-vector-icons/Ionicons';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
const CONTENT = [
  {
    title: 'Tình trạng sản phẩm',
    content: 'Content.....',
  },
  {
    title: 'Chất liệu',
    content: 'Content.....',
  },
  {
    title: 'Phong cách',
    content: 'Content.....',
  },
];
const Search = ({navigation}) => {
  const [activeSections, setActiveSections] = useState([]);
  const setSections = (sections) => {
    setActiveSections(sections.includes(undefined) ? [] : sections);
  };

  const renderHeader = (section, _, isActive) => {
    return (
      <View
        duration={400}
        style={[styles.header, isActive ? styles.active : styles.inactive]}
        transition="backgroundColor">
        <Text style={styles.headerText}>{section.title}</Text>
        <Icon name="caret-down-outline" />
      </View>
    );
  };

  const renderContent = (section, _, isActive) => {
    return (
      <View
        duration={400}
        style={[styles.content, isActive ? styles.active : styles.inactive]}
        transition="backgroundColor">
        <Text
          animation={isActive ? 'bounceIn' : undefined}
          style={{textAlign: 'left'}}>
          {section.content}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView>
      <View style={styles.wrapper}>
        <Accordion
          activeSections={activeSections}
          sections={CONTENT}
          touchableComponent={TouchableOpacity}
          renderHeader={renderHeader}
          renderContent={renderContent}
          duration={400}
          onChange={setSections}
        />
      </View>
    </SafeAreaView>
  );
};
export default Search;
