import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  scrollView: {
    backgroundColor: '$bgColor',
  },
  subText: {
    color: '#8B9399',
  },
  firstRowView: {
    flex: 5,
    flexDirection: 'column',
    backgroundColor: 'white',
    justifyContent: 'space-around',
  },
  subTextCheckin: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  storeName: {
    flexDirection: 'row',
    backgroundColor: '#000000',
    opacity: 0.7,
    position: 'absolute',
    bottom: 10,
    left: 10,
    borderRadius: 100,
    padding: 8,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  horizontalDot: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  viewHeaderItem: {flex: 1, height: 56, paddingLeft: 16, paddingRight: 16},
  viewBodyItem: {flex: 2},
  viewFooterItem: {flex: 1, height: 48},
  wrapFollow: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  wrapHeaderItem: {flex: 3, flexDirection: 'row'},
  wrapUserInfoItem: {flex: 1, flexDirection: 'row', alignItems: 'center'},
  btnFollowText: {color: '$purple', fontSize: 14, lineHeight: 20},
});
