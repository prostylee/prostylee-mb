import styles from './styles';

import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Dimensions,
  TouchableOpacity,
  Modal,
  FlatList,
  Image,
  ScrollView,
  Platform,
  NativeModules,
  Text,
} from 'react-native';
import Cross from '../Cross';
import MoveLeft from '../MoveLeft';
import MoveRight from '../MoveRight';

const GridImageView = ({
  data,
  headers = null,
  renderGridImage = null,
  renderModalImage = null,
  transparent = 0.8,
}) => {
  const [modal, setModal] = useState({visible: false, data: 0});
  const ref = useRef();
  var key = 0;

  const {StatusBarManager} = NativeModules;
  const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBarManager.HEIGHT;
  const [height, setHeight] = useState(STATUSBAR_HEIGHT);

  useEffect(() => {
    if (Platform.OS === 'ios') {
      StatusBarManager.getHeight((statusBarHeight) => {
        setHeight(statusBarHeight.height);
      });
    }
  }, []);

  const Component = ({style = {flex: 1}}) => {
    return (
      <ScrollView
        showsHorizontalScrollIndicator={false}
        ref={ref}
        style={{...style}}
        snapToInterval={Dimensions.get('window').width}
        decelerationRate="fast"
        horizontal>
        {data.map((item, key) => (
          <View key={key}>
            {renderModalImage !== null ? (
              renderModalImage(item, {
                ...styles.imgModal,
                backgroundColor: `rgba(0, 0, 0, ${transparent})`,
              })
            ) : (
              <Image
                style={{
                  ...styles.imgModal,
                  backgroundColor: `rgba(0, 0, 0, ${transparent})`,
                }}
                source={{
                  uri: item.image,
                  ...(headers == null || headers == undefined || headers == {}
                    ? {}
                    : {method: 'POST', headers}),
                }}
              />
            )}
          </View>
        ))}
      </ScrollView>
    );
  };

  return (
    <View style={styles.background}>
      <Modal
        // propagateSwipe={true}
        animationType="slide"
        transparent={true}
        visible={modal.visible}
        onRequestClose={() => {
          setModal({visible: false, data: 0});
        }}>
        <Component />

        <View style={styles.moveLeftView}>
          <TouchableOpacity
            onPress={() => {
              if (modal.data - 1 >= 0) {
                setTimeout(() => {
                  ref.current.scrollTo({
                    x: Dimensions.get('window').width * (modal.data - 1),
                    y: 0,
                    animated: false,
                  });
                }, 1);
                setModal({visible: true, data: modal.data - 1});
              }
            }}>
            <MoveLeft />
          </TouchableOpacity>
        </View>

        <View style={{...styles.cross, top: height + 5}}>
          <TouchableOpacity
            onPress={() => {
              setModal({visible: false, data: 0});
            }}>
            <Cross />
          </TouchableOpacity>
        </View>

        <View style={styles.moveRightView}>
          <TouchableOpacity
            onPress={() => {
              if (modal.data + 1 < data.length) {
                setTimeout(() => {
                  ref.current.scrollTo({
                    x: Dimensions.get('window').width * (modal.data + 1),
                    y: 0,
                    animated: false,
                  });
                }, 1);
                setModal({visible: true, data: modal.data + 1});
              }
            }}>
            <MoveRight />
          </TouchableOpacity>
        </View>
      </Modal>

      <FlatList
        contentContainerStyle={{paddingBottom: 40}}
        data={data.slice(0, 5)}
        renderItem={({item, index}) => {
          return (
            <View style={styles.unit}>
              {index > 3 ? (
                <View style={styles.unitItem}>
                  <TouchableOpacity
                    onPress={() => {
                      setModal({visible: true, data: index});

                      setTimeout(() => {
                        ref.current.scrollTo({
                          x: Dimensions.get('window').width * index,
                          y: 0,
                          animated: false,
                        });
                      }, 1);
                    }}
                    style={styles.unitItem}>
                    {renderGridImage !== null ? (
                      renderGridImage(item, styles.img)
                    ) : (
                      <Image
                        style={styles.img}
                        source={{
                          uri: item.image,
                          ...(headers == null ||
                          headers == undefined ||
                          headers == {}
                            ? {}
                            : {method: 'POST', headers}),
                        }}
                      />
                    )}
                    {data.length > 5 && (
                      <View style={styles.unitItemPlus}>
                        <View style={styles.plusImage}>
                          <Text style={styles.plusText}>{`+${
                            data.length - 5
                          }`}</Text>
                        </View>
                      </View>
                    )}
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={styles.unitItem}>
                  <TouchableOpacity
                    onPress={() => {
                      setModal({visible: true, data: index});

                      setTimeout(() => {
                        ref.current.scrollTo({
                          x: Dimensions.get('window').width * index,
                          y: 0,
                          animated: false,
                        });
                      }, 1);
                    }}
                    style={styles.unitItem}>
                    {renderGridImage !== null ? (
                      renderGridImage(item, styles.img)
                    ) : (
                      <Image
                        style={styles.img}
                        source={{
                          uri: item.image,
                          ...(headers == null ||
                          headers == undefined ||
                          headers == {}
                            ? {}
                            : {method: 'POST', headers}),
                        }}
                      />
                    )}
                  </TouchableOpacity>
                </View>
              )}
            </View>
          );
        }}
        keyExtractor={(item) => {
          key++;
          return key.toString();
        }}
        style={styles.flatlist}
      />
    </View>
  );
};

export default GridImageView;
