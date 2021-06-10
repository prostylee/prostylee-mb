import React, {useState} from 'react';
import {
  FlatList,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from 'react-native';
import {ProgressBar, Colors} from 'react-native-paper';
import {Header, ButtonRounded} from 'components';
import IconMeterial from 'react-native-vector-icons/MaterialCommunityIcons';
import IconFont from 'react-native-vector-icons/FontAwesome';
import styles from './styles';
const AddProductsInfor = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Header
        isDefault
        containerStyle={styles.headerContain}
        leftStyle={{
          height: 30,
          fontWeight: 'bold',
        }}
        middleComponent={
          <Text style={styles.middleComponent}>Thông tin chung</Text>
        }
      />
      <ProgressBar progress={0.3} color="#823FFD" />
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <Text style={styles.title}>
            Upload up to 4 photos and complete the item description.
          </Text>
          <View style={styles.wrapperBorder}>
            <View style={styles.shapes}>
              <View>
                <Image
                  source={require('../../../assets/images/cmt3.jpeg')}
                  resizeMode={'cover'}
                  style={styles.imgSelected}></Image>
              </View>
            </View>
            <View style={styles.shapes}>
              <View>
                <Image
                  source={require('../../../assets/images/cmt3.jpeg')}
                  resizeMode={'cover'}
                  style={styles.imgSelected}></Image>
              </View>
            </View>
            <View style={styles.shapesSelected}>
              <View>
                <IconMeterial name="image-plus" size={30} />
              </View>
            </View>
            <View style={styles.shapes}></View>
          </View>
          <Text style={styles.textPrimary}>Primary</Text>
        </View>

        <TouchableOpacity style={styles.boxWrap}>
          <View style={styles.nameProduct}>
            <Text style={styles.title}>Tên sản phẩm (0/255)</Text>
            <IconFont name="asterisk" size={6} color="red" />
          </View>
          <Text>Hoa tai vòng bạc cỡ lớn 88mm</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.boxWrap}>
          <View style={styles.nameProduct}>
            <Text style={styles.title}>Mô tả sản phẩm (0/255)</Text>
            <IconFont name="asterisk" size={6} color="red" />
          </View>
          <Text>
            Sản phẩm được thiết kế thủ công: - Được làm từ bạc s925. - Gồm 2
            chiếc khuyên tai kèm hộp - Thiết kế nhẹ nhàng - Dễ sử dụng, dễ phối
            đồ
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.brandWrap}>
          <Text style={styles.title}>Thương hiệu</Text>
          <View style={styles.brand}>
            <Text>Uniqlo</Text>
            <Image
              source={require('../../../assets/images/uniqlo.png')}
              resizeMode={'cover'}
              style={styles.imgBrand}></Image>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.button}>
        <TouchableOpacity>
          <ButtonRounded label="Tiếp tục" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
export default AddProductsInfor;
