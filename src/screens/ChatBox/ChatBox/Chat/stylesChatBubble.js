import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  chatBubbleContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    position: 'relative',
  },
  chatBubble: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  chatSmallIcon: {
    position: 'absolute',
    left: -7,
    bottom: 0,
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  chatSmallIconStyle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 0.8,
    borderColor: '#E0E0E0',
  },
  chatBubbleDate: {
    width: '100%',
    height: 48,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  chatBubbleDateStyle: {
    fontSize: 13,
    lineHeight: 18,
    color: '#000',
    opacity: 0.5,
  },
  chatBubbleImageContainer: {
    marginVertical: 12,
  },
  chatBubbleImage: {
    width: 200,
  },
  chatConnectError: {
    width: '100%',
    height: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  chatConnectErrorText: {
    fontSize: 12,
    lineHeight: 16,
    color: '#BDBDBD',
    paddingLeft: 8,
  },
  chatMessageSeen: {
    width: '100%',
    height: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  chatMessageSeenText: {
    fontSize: 12,
    lineHeight: 16,
    color: '#BDBDBD',
  },
});
