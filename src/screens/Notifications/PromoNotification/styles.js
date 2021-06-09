import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '$white',
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
    backgroundColor: '$white',
    borderBottomWidth: 0,
    paddingHorizontal: 16,
  },
  promoInfoContainer: {
    width: '100%',
    height: 64,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    backgroundColor: '$white',
  },
  promoTextContainer: {
    flexDirection: 'column',
    paddingLeft: 10,
    justifyContent: 'space-around',
    alignItems: 'flex-start',
  },
  notiItemContainer: {
    flex: 1,
    // width: '100%',
    // height: 375,
    flexDirection: 'row',
    padding: 16,
  },
  avatarContainer: {
    flex: 1,
  },
  notiInfoContainer: {
    flex: 10,
    paddingLeft: 12,
  },
  title: {
    fontSize: 14,
    fontWeight: '500',
    color: '$black',
    lineHeight: 20,
  },
  subTitle: {
    fontSize: 12,
    fontWeight: '400',
    color: '$lightGray',
    lineHeight: 16,
  },
  content: {
    fontSize: 12,
    fontWeight: '400',
    color: '$black',
    lineHeight: 16,
  },
  imageListWrapper: {
    flexDirection: 'row',
    marginBottom: 2,
    marginTop: 2,
  },
  imgContainer: {
    width: 40,
    height: 40,
    borderRadius: 6,
    marginRight: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 6,
  },
  avatarWrapper: {
    width: 32,
    height: 32,
    borderRadius: 16,
    overflow: 'hidden',
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 16,
  },
  emptyView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: '$gray',
    fontSize: 14,
    fontWeight: '400',
    marginTop: 30,
  },
});
