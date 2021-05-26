import React, {useState} from 'react';
import {SafeAreaView, Text, View, TouchableOpacity} from 'react-native';
import {RadioButton} from 'react-native-paper';
import styles from './styles';
import Accordion from 'react-native-collapsible/Accordion';
import Icon from 'react-native-vector-icons/Ionicons';
const CONTENT = [
  {
    id: 1,
    title: 'Tình trạng sản phẩm',
    content: 'Content.....',
  },
  {
    id: 2,
    title: 'Chất liệu',
    content: 'Content.....',
  },
  {
    id: 3,
    title: 'Phong cách',
    content: 'Content.....',
  },
];
const Search = ({navigation}) => {
  const [activeSections, setActiveSections] = useState([]);
  const [value, setValue] = React.useState(' ');
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
    if (section.id === 1) {
      return (
        <View
          duration={400}
          style={[styles.content, isActive ? styles.active : styles.inactive]}
          transition="backgroundColor">
          <RadioButton.Group
            onValueChange={(newValue) => setValue(newValue)}
            value={value}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <RadioButton value="first" />
              <Text>Tự thiết kế</Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <RadioButton value="second" />
              <Text>Dã sử dụng</Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <RadioButton value="thrid" />
              <Text>Đã mua nhưng chưa sử dụng</Text>
            </View>
          </RadioButton.Group>
        </View>
      );
    } else {
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
    }
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
