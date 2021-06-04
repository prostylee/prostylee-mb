import {Dimensions} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '$bgColor',
  },
  addressView: {
    flex: 8, 
    flexDirection: 'row', 
    alignContent: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 12,
    backgroundColor: '$white'
  },
  addressIconView: {
    flex: 1, 
    flexDirection: 'column', 
    alignItems: 'center'
  },
  addressDetailView: {
    flex: 4, 
    flexDirection: 'column'
  },
  addressDefaultView: {
    flex: 3, 
    flexDirection: 'column', 
    alignItems: 'flex-end', 
    paddingRight: 16
  },
  isDefaultText: {
    color: '#823FFD'
  },
  subText: {
    color: '#8B9399'
  },
  addAddressButtonView: {
    paddingLeft: 15, 
    backgroundColor: 'white', 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingVertical: 14
  }
});