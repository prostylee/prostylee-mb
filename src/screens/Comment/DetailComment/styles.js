import {dim} from 'utils/ui';
import EStyleSheet from 'react-native-extended-stylesheet';

const WIDTH = dim.width;

export default EStyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 16,
    backgroundColor: '$white',
  },
  backButton: {
    position: 'relative',
    top: -8,
  },
  emptyContainer: {
    flex: 1,
    width: WIDTH - 120,
    paddingTop: 12,
  },
  emptyText: {
    textAlign: 'center',
    width: '100%',
    fontSize: 13,
    lineHeight: 18,
    color: '$lightGray',
  },

  /**
   * comment list
   */
  list: {
    flex: 1,
    paddingHorizontal: 16,
    paddingLeft: 44,
    width: WIDTH - 32,
  },
  parentCommentContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    position: 'relative',
    left: -14,
    paddingVertical: 8,
  },
  parentCommentItem: {
    width: '90%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 16,
  },
  commentItem: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 16,
    paddingLeft: 32,
  },
  parentItemAvatar: {
    width: 44,
    display: 'flex',
    height: '100%',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  itemAvatar: {
    width: 44,
    display: 'flex',
    height: '100%',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingTop: 16,
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
