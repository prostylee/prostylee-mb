import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  /**
   * comment list
   */
  list: {
    flex: 1,
    paddingHorizontal: 16,
    paddingLeft: 44,
  },
  commentItem: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 16,
  },
  itemAvatar: {
    width: 44,
    display: 'flex',
    height: '100%',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  commentInfo: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  commentUser: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500',
    color: '$black',
  },
  commentContent: {
    fontSize: 14,
    lineHeight: 20,
    color: '$lightGray',
    paddingVertical: 4,
  },
  commentStatus: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  commentLikeNum: {
    fontSize: 13,
    lineHeight: 18,
    color: '$lightGray',
    paddingLeft: 8,
  },
  reply: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 16,
  },
  replyText: {
    fontSize: 13,
    lineHeight: 18,
    color: '$lightGray',
    paddingLeft: 8,
  },
});