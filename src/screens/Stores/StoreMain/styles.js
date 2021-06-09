import {Dimensions} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {center, flexRow} from 'theme/style';

const WIDTH = Dimensions.get('window').width - 30;
export default EStyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '$bgColor',
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
    borderBottomWidth: 0,
    paddingHorizontal: 16,
  },
  headerWrap: {
    ...flexRow,
    paddingVertical: 10,
    width: WIDTH * 0.7,
  },
  headerLeftContainer: {
    flexDirection: 'row',
    // borderWidth: 1,
  },
  headerRightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
    width: 80,
  },
  locationText: {
    fontSize: 14,
    color: '$white',
    marginLeft: 5,
    fontWeight: '500',
  },
  searchBarContainer: {
    width: '100%',
    height: 35,
    borderRadius: 0,
    elevation: 0,
    paddingHorizontal: 16,
  },
  wrapSearchBar: {
    width: '100%',
    backgroundColor: '#F4F5F5',
    height: 35,
    borderRadius: 4,
    elevation: 0,
    padding: 0,
  },
  wrapSearchBarInput: {
    height: 35,
    fontSize: 14,
    lineHeight: 18,
    elevation: 0,
  },
});
