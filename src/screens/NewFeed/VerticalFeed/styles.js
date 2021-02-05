import EStyleSheet from 'react-native-extended-stylesheet';
import {center,flexRow} from 'theme/style'

export default EStyleSheet.create({
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerWrap: {
    ...flexRow,
  },
  textTitle: {
    paddingLeft: 10,
    fontSize: '$mediumText',
    fontSize: '$largeText'
  },
  wrapFollow: {
    ...center,
  },


  mainWrapper: {
    flex: 1,
    backgroundColor: '$white',
    paddingHorizontal: '4%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: '10rem',
  },
  addressWrapper: {
    flexGrow: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconLocation: {
    width: '15rem',
    height: '15rem',
    marginRight: '8rem',
    '@media ios': {
      tintColor: '$lightGray',
    },
  },
  address: {
    fontSize: '$mediumText',
    color: '$black',
    fontWeight: 'bold',
  },
  controlWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnIconWrapper: {
    width: '22rem',
    height: '22rem',
    marginLeft: '8rem',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerIcon: {
    width: '16rem',
    height: '16rem',
    '@media ios': {
      tintColor: '$lightGray',
    },
  },
  wrapperSearchBox: {
    zIndex: 999,
  },
  searchBox: {
    borderWidth: 0,
    backgroundColor: '$bgColor',
    borderRadius: '15rem',
  },
  sliderWrapper: {
    marginTop: '10rem',
  },
  sliderDotContainer: {
    position: 'absolute',
    bottom: 0,
    padding: 0,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    paddingVertical: '10rem',
  },
  sliderDot: {
    width: '10rem',
    height: '10rem',
    borderRadius: '5rem',
    marginHorizontal: 0,
    padding: 0,
    margin: 0,
    backgroundColor: '$lightGray',
  },
  sliderImage: {
    borderRadius: '10rem',
    width: '97%',
  },
  friendhubContainer: {
    backgroundColor: '$organ',
  },
  friendWrapper: {
    width: '130rem',
    height: '150rem',
    marginRight: '20rem',
    paddingVertical: '8rem',
  },
  friendAvatarWrapper: {
    flex: 1,
    borderRadius: '25rem',
  },
  friendAvatar: {
    flex: 1,
    width: null,
    height: null,
    borderRadius: '25rem',
  },
  friendInfo: {
    paddingTop: '8rem',
    paddingHorizontal: '5%',
  },
  friendInfoText: {
    fontSize: '$mediumText',
    color: '$gray',
    lineHeight: '18rem',
    textAlign: 'center',
  },
  viewAllWrapper: {
    width: '130rem',
    height: '150rem',
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewAllText: {
    fontSize: '$largeText',
    color: '$gray',
  },
});
