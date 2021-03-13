import React, {useState} from 'react';
import i18n from 'i18n';
import {TouchableOpacity, Dimensions, View, Text} from 'react-native';
import {Avatar, Button} from 'react-native-paper';

import styles from './styles';

import {ThemeView, ImageBackground, Colors} from 'components';

import {More, Message} from 'svg/social';

const {width} = Dimensions.get('window');

const URL =
  'https://img.faballey.com/images/trendnew20/stripeswiped/stripeswiped1.jpg';
const InfoView = (props) => {
  const [followed, setFollowed] = useState(false);
  const _followPress = () => {};
  return (
    <ImageBackground fluid style={styles.viewBg} source={{uri: URL}}>
      <View style={styles.overlay} />
      <View style={styles.viewInfo}>
        <View style={styles.avatar}>
          <Avatar.Image size={80} source={{uri: URL}} />
        </View>
        <View style={styles.viewArea}>
          <Text style={styles.textName}>Alyssa Gardner</Text>
          <Text style={styles.textDescription}>
            I’m only a morning person on Christmas morning You are not just a
            Follower. 📚 Bookaholic - ✈️ Travelholic
          </Text>
        </View>
        <View style={styles.actions}>
          <Button
            mode="contained"
            uppercase={false}
            onPress={() => _followPress()}
            style={[styles.followBtn, followed && styles.followedBtn]}>
            {i18n.t(!followed ? 'common.textFollow' : 'common.textFollowed')}
          </Button>
          <TouchableOpacity style={styles.touchMess}>
            <Message width={18} heigh={12} color={Colors.$purple} />
          </TouchableOpacity>
        </View>
        <View style={styles.statisticalView}>
          <View style={styles.viewSection}>
            <Text style={styles.textTitle}>1244</Text>
            <Text>Người theo dõi</Text>
          </View>
          <View style={styles.viewSection}>
            <Text style={styles.textTitle}>1244</Text>
            <Text>Đang theo dõi</Text>
          </View>
          <View style={styles.viewSection}>
            <Text style={styles.textTitle}>1244</Text>
            <Text>Bài đăng</Text>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

InfoView.defaultProps = {};

InfoView.propTypes = {};

export default InfoView;
