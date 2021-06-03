import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  background: {
    height: 60,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  left: {
    height: 25,
    width: 3,
    backgroundColor: 'white',
    transform: [{rotate: '45deg'}],
  },
  right: {
    height: 25,
    width: 3,
    backgroundColor: 'white',
    transform: [{rotate: '90deg'}],
  },
});
