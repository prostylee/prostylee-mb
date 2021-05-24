import EStyleSheet from 'react-native-extended-stylesheet';
import {Dimensions} from 'react-native';

const {width} = Dimensions.get('window');

export default EStyleSheet.create({
  container: {
    flex: 1,
    width: width,
    padding: 16,
    display: 'flex',
    flexDirection: 'column',
  },
  choiceItem: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  titleRow: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 24,
  },
  itemLabel: {
    fontSize: 14,
    lineHeight: 20,
    color: '$lightGray',
  },
  linkSupport: {
    paddingLeft: 8,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  linkSupportText: {
    fontSize: 12,
    lineHeight: 16,
    color: '$linkBlue',
    paddingLeft: 4,
  },
  choiceList: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    paddingTop: 8,
  },
  choiceButtonContainer: {
    paddingRight: 8,
    height: 40,
  },
  choiceButton: {
    minWidth: 40,
    height: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E9EAEB',
    borderRadius: 3,
    paddingHorizontal: 10,
  },
  choiceButtonText: {
    fontSize: 14,
    lineHeight: 20,
    color: '$black',
  },
});
