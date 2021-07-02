import {Dimensions} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const {height, width} = Dimensions.get('window');

export default EStyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    overflow: 'hidden',
  },

  stepIndicator: {
    flexDirection: 'row',
    paddingTop: 10,
  },
  wrapTrackingHeader: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  wrapStep: {
    flexDirection: 'row',
    paddingTop: 20,
  },
  labelStepTitle: {
    color: '#333333',
    fontSize: 14,
    // lineHeight: 20,
  },
  labelStepTime: {
    color: '#8B9399',
    fontSize: 14,
    lineHeight: 20,
  },
  labelTrackingHeader: {
    color: '#333333',
    fontSize: 14,
    lineHeight: 20,
  },
  stepWrapper: {
    width: 20,
    height: '100%',
    flexDirection: 'column',
    alignItems: 'center',
  },
  inforWrapper: {
    flexDirection: 'column',
    paddingLeft: 8,
    paddingBottom: 16,
  },
  circle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: 'rgba(130, 63, 253, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#823FFD',
  },
  seperator: {
    width: 1,
    height: '100%',
    backgroundColor: '#823FFD',
    alignSelf: 'center',
  },
});
