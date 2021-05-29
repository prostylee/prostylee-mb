import {Dimensions} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const WIDTH = Dimensions.get('window').width - 32;
export default EStyleSheet.create({
  container: {
    marginTop: 6,
  },
  wrapHeader: {
    backgroundColor: '$white',
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 16,
    paddingBottom: 4,
    alignItems: 'flex-start',
  },
  wrapList: {
    height: 120,
  },
  wrapItems: {
    backgroundColor: '$white',
    paddingBottom: 4,
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: '100%',
    // width: WIDTH / 2,
    // borderWidth: 1,
  },
  categoryButton: {
    backgroundColor: '$bgColor',
    width: 50,
    height: 50,
    borderRadius: 16,
    // borderWidth: 1,
    padding: 13,
    borderColor: '$purple',
  },
  title: {
    color: '$icon',
  },
  titleCategory: {
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    color: '$black',
    width: 70,
    fontSize: 11,
    lineHeight: 16,
    fontWeight: '400',
    textAlign: 'center',
  },
  viewFooter: {
    marginBottom: 6,
  },
});
