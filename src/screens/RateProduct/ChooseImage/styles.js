import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  inputStyle: {
    fontSize: 20,
    color: '#000',
  },
  labelStyle: {
    fontSize: 14,
    color: '#8B9399',
    fontWeight: '400',
    lineHeight: 20,
    letterSpacing: 0.1,
  },
  listImageUpload: {
    flexDirection: 'row',
  },
  buttonUpload: {
    width: 80,
    height: 80,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333333',
    borderStyle: 'dashed',
    margin: 5,
  },
  buttonUploadEmpty: {
    width: 80,
    height: 80,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#BBC0C3',
    borderStyle: 'dashed',
    margin: 5,
  },
  imageChoose: {
    width: 80,
    height: 80,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

    margin: 5,
  },
  containerStyle: {
    flexDirection: 'column',
    marginTop: 10,
    marginBottom: 10,
  },
});
