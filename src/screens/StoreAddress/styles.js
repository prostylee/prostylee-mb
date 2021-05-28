import {Dimensions} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
export default EStyleSheet.create({
  wrapper: {
    flexDirection: 'column',
  },
  content: {
    padding: 10,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: 'white',
    marginVertical: 0.8,
    paddingLeft: 15,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  headerText: {
    textAlign: 'left',
    fontSize: 15,
    color: 'grey',
    paddingRight: 5,
  },
});
