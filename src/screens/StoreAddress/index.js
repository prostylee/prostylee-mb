import React, {useCallback, useState} from 'react';
import {
  Dimensions,
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from 'react-native';
import styles from './styles';
import {ThemeView, Header, ButtonRounded} from 'components';
import Accordion from 'react-native-collapsible/Accordion';
import Icon from 'react-native-vector-icons/Ionicons';
import ListStoreAddress from './ListStoreAddress';
import {flatMap} from 'lodash-es';
const CONTENT = [
  {
    id: 1,
    title: 'TP.Hồ Chí Minh',
    content: 'Content.....',
  },
];
const StoreAddress = ({navigation}) => {
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
        <Icon
          name="location-outline"
          color="grey"
          size={30}
          style={{paddingRight: 15}}
        />
        <Text style={styles.headerText}>{section.title}</Text>
        <Icon name="caret-down-outline" color="grey" />
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
        <ThemeView>
          <Header
            isDefault
            containerStyle={{
              paddingBottom: 10,
              borderBottomWidth: 0,
              height: 50,
              borderBottomWidth: 1,
            }}
            leftStyle={{
              height: 30,
              fontWeight: 'bold',
            }}
            middleComponent={
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 18,
                  fontWeight: 'bold',
                }}>
                Cửa hàng
              </Text>
            }
          />
        </ThemeView>
        <View>
          <Accordion
            activeSections={activeSections}
            sections={CONTENT}
            touchableComponent={TouchableOpacity}
            renderHeader={renderHeader}
            renderContent={renderContent}
            duration={400}
            onChange={setSections}
          />
          <ListStoreAddress />
        </View>
      </View>
      <TouchableOpacity style={{paddingVertical: 150}}>
        <ButtonRounded label="Áp Dụng" style={{margin: 20}} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};
export default StoreAddress;
