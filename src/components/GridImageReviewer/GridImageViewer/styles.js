import {Dimensions} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  background: {
    flex: 1,
  },
  flatlist: {
    height: 60,
    width: Dimensions.get('window').width,
    alignItems: 'center',
    marginTop: 10,
    margin: 5,
    flexDirection: 'row',
    flexWrap: 'wrap',
    display: 'flex',
    flex: 0,
  },
  unit: {
    flexDirection: 'row',
  },
  unitItem: {
    marginRight: 5,
  },
  img: {
    flex: 1,
  },
  imgModal: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    resizeMode: 'contain',
  },
  cross: {
    position: 'absolute',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    left: 0,
  },
  moveLeftView: {
    position: 'absolute',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    top: 0,
    bottom: 0,
    left: 10,
  },
  moveRightView: {
    position: 'absolute',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    top: 0,
    bottom: 0,
    right: 10,
  },
  unitItemPlus: {
    position: 'absolute',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: `rgba(25, 25, 25, 0.5)`,
    zIndex: 100,
  },
  plusImage: {
    flex: 1,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  plusText: {
    fontSize: 16,
    color: '#ffffff',
  },
});
