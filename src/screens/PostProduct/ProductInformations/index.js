import React, {useState} from 'react';
import {
  TextInput,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from 'react-native';
import {CheckBox} from 'react-native-elements';
import {ProgressBar, Button} from 'react-native-paper';
import {Header, ButtonRounded, HeaderBack} from 'components';
import RadioForm from 'react-native-simple-radio-button';
import Modal from 'react-native-modalbox';
import styles from './styles';
import Icon from 'react-native-vector-icons/AntDesign';
const COLOR = [
  {
    id: '0',
    title: 'Đen',
  },
  {
    id: '1',
    title: 'Trắng',
  },
  {
    id: '2',
    title: 'Xám ',
  },
  {
    id: '3',
    title: 'Cam',
  },
  {
    id: '4',
    title: 'Hồng',
  },
  {
    id: '5',
    title: 'Đỏ',
  },
  {
    id: '6',
    title: 'Tím',
  },
  {
    id: '7',
    title: 'xanh lá cây',
  },
  {
    id: '8',
    title: 'Khác',
  },
];
const ProductInfor = () => {
  var radio_props = [
    {label: 'Mới', value: 0},
    {label: 'Đã qua sử dụng', value: 1},
  ];
  const [number, onChangeNumber] = React.useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleColor, setModalVisibleColor] = useState(false);
  const [isSelected, setSelection] = useState(false);
  const Item = ({item, onPress}) => {
    return (
      <TouchableOpacity onPress={onPress}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            margin: -10,
          }}>
          <CheckBox value={isSelected} onValueChange={setSelection} />
          <Text>{item.title}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  const Size = () => {
    return (
      <Modal
        entry="bottom"
        backdropPressToClose={true}
        isOpen={modalVisible}
        style={styles.modalBox}
        onClosed={() => setModalVisible(false)}>
        <View style={styles.content}>
          <View style={styles.headerModal}>
            <Text style={{color: '#823FFD', fontSize: 14}}>Chọn toàn bộ</Text>
            <Text style={styles.titleModal}>Kích thước</Text>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Icon name="close" size={20} />
            </TouchableOpacity>
          </View>
          <View></View>
          <View style={styles.button}>
            <TouchableOpacity>
              <ButtonRounded label="Chọn" />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };
  const [selectedId, setSelectedId] = useState(null);
  const renderItem = ({item}) => {
    return <Item item={item} onPress={() => setSelectedId(item.id)} />;
  };
  const Color = () => {
    return (
      <Modal
        entry="bottom"
        backdropPressToClose={true}
        isOpen={modalVisibleColor}
        style={styles.modalBox}
        onClosed={() => setModalVisibleColor(false)}>
        <View style={styles.content}>
          <View style={styles.headerModal}>
            <Text></Text>
            <Text style={styles.titleModal}>Màu sắc</Text>
            <TouchableOpacity onPress={() => setModalVisibleColor(false)}>
              <Icon name="close" size={20} />
            </TouchableOpacity>
          </View>
          <View>
            <FlatList
              data={COLOR}
              renderItem={renderItem}
              style={{paddingTop: 10}}
            />
          </View>
          <View style={styles.button}>
            <TouchableOpacity>
              <ButtonRounded label="Chọn" />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };
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
          <Text style={styles.middleComponent}>Thông tin sản phẩm</Text>
        }
      />
      <ProgressBar progress={0.6} color="#823FFD" />
      <View style={styles.container}>
        {Size()}
        {Color()}
        <View style={styles.boxWrap}>
          <Text style={styles.title}>Tình trạng sản phẩm</Text>
          <View style={{paddingTop: 10}}>
            <RadioForm
              radio_props={radio_props}
              onPress={(value) => {
                this.setState({value: value});
              }}
              borderWidth={0.3}
              animation={true}
              buttonColor={'#BBC0C3'}
              buttonOuterSize={20}
              buttonSize={10}
            />
          </View>
        </View>

        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={styles.boxWrap}>
          <Text style={styles.title}>Kích thước</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setModalVisibleColor(true)}
          style={styles.boxWrap}>
          <Text style={styles.title}>Màu</Text>
        </TouchableOpacity>

        <View style={styles.boxWrap}>
          <Text style={styles.title}>Giá sản phẩm</Text>
          <View
            style={{
              borderBottomWidth: 0.3,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <TextInput
              style={styles.input}
              onChangeText={onChangeNumber}
              value={number}
              placeholder="0"
              keyboardType="numeric"
            />
            <Text>| đ</Text>
          </View>
        </View>
      </View>
      <View style={styles.button}>
        <TouchableOpacity>
          <ButtonRounded label="Tiếp tục" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
export default ProductInfor;
