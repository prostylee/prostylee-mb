import {Dimensions} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  container: {
    height: '100%',
    position: 'relative',
  },
  wrapChip: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: 'white',
    justifyContent: 'flex-start',
    paddingLeft: 15,
    paddingBottom: 20,
    height: '65%',
  },
  itemChips: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    minWidth: 40,
    marginTop: 8,
    marginRight: 10,
    backgroundColor: '$white',
    borderColor: '$line',
    borderRadius: 10,
    borderWidth: 1,
    fontSize: 15,
    paddingHorizontal: 10,
  },
  button: {
    width: '90%',
    alignSelf: 'center',
    position: 'absolute',
    bottom: 100,
  },
  checkAllButton: {
    position: 'absolute',
    top: -31,
    left: 16,
  },
});
