import {dim} from 'utils/ui';
import {Platform} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const WIDTH = dim.width;

export default EStyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  header: {
    paddingRight: 16,
  },
  headerTitle: {
    fontWeight: Platform.OS === 'android' ? '700' : '500',
    fontSize: 16,
    lineHeight: 24,
    fontFamily: '$font1',
    letterSpacing: -0.02,
    paddingLeft: 46,
  },
  emptyContainer: {
    flex: 1,
    width: WIDTH,
    paddingVertical: 12,
    backgroundColor: '$white',
  },
  emptyText: {
    textAlign: 'center',
    width: '100%',
    fontSize: 13,
    lineHeight: 18,
    color: '$lightGray',
  },
  scrollContainer: {
    flex: 1,
    width: WIDTH,
  },

  title: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingLeft: 5,
  },
  avatar: {
    height: 30,
    width: 30,
    borderRadius: 15,
    paddingLeft: 30,
  },
  name: {
    paddingLeft: 8,
    color: '$black',
    fontFamily: '$font1',
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500',
  },

  /**
   * comment list
   */
  list: {
    flex: 1,
    width: '100%',
    backgroundColor: '$white',
  },
  commentItem: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 16,
    paddingHorizontal: 16,
  },
  itemAvatar: {
    width: 44,
    display: 'flex',
    height: '100%',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
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
