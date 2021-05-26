import {Dimensions} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  wrapper: {
    marginVertical: 3,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 18,
    fontWeight: '300',
  },
  header: {
    backgroundColor: 'white',
    marginVertical: 0.8,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerText: {
    textAlign: 'left',
    fontSize: 16,
    fontWeight: '500',
  },
  content: {
    padding: 20,
    backgroundColor: '#fff',
  },
  active: {
    backgroundColor: 'white',
  },
  inactive: {
    backgroundColor: 'white',
    paddingBottom: 15,
  },
});
