import {Dimensions} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {flexRow} from 'theme/style';

const WIDTH = Dimensions.get('window').width - 30;
export default EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '$white',
  },
  divider: {
    width: '100%',
    height: 6,
    backgroundColor: '$bgColor',
  },
  rightHeader: {
    ...flexRow,
    width: 80,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingRight: 12,
  },
  contentWrapper: {
    backgroundColor: '$white',
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#333333',
    borderBottomWidth: 0,
    paddingTop: 20,
  },
  animatedHeader: {
    flexDirection: 'column',
    backgroundColor: '#fff',
  },
  animatedHeaderContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: 0,
  },
  headerSearchBar: {
    maxWidth: WIDTH - 160,
    backgroundColor: '#F4F5F5',
  },
  headerWrap: {
    ...flexRow,
    paddingVertical: 10,
    width: WIDTH * 0.7,
  },
  headerLeftContainer: {
    height: 35,
    width: '10%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 6,
  },
  headerSearchBarBlack: {
    marginLeft: 10,
    zIndex: 10,
  },
  headerRightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
    maxWidth: 80,
    height: 35,
  },
  locationText: {
    fontSize: 14,
    color: '$white',
    marginLeft: 5,
    fontWeight: '500',
  },
  searchBarContainer: {
    width: '100%',
    paddingHorizontal: 16,
    marginBottom: 8,
  },
});
