import EStyleSheet from 'react-native-extended-stylesheet';
import {Dimensions} from 'react-native';
const {width: WIDTH} = Dimensions.get('window');
export default EStyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {flex: 1},
  wrapper: {
    marginTop: 15,
    backgroundColor: 'white',
    padding: 15,
  },
  headerContain: {
    paddingBottom: 10,
    borderBottomWidth: 0,
    height: 50,
  },
  middleComponent: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  wrapperBorder: {
    flexDirection: 'row',
    paddingTop: 10,
    alignSelf: 'center',
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 14,
    lineHeight: 20,
    color: '$lightGray',
  },
  productNameInput: {
    marginTop: 12,
  },
  descriptionInput: {
    marginTop: 12,
    minHeight: 16,
  },
  shapes: {
    width: (WIDTH - 54) / 4,
    height: (WIDTH - 54) / 4,
    borderColor: '$lightGray',
    borderWidth: 1,
    borderRadius: 5,
    borderStyle: 'dashed',
    marginHorizontal: 5,
  },
  shapesSelected: {
    width: (WIDTH - 54) / 4,
    height: (WIDTH - 54) / 4,
    borderColor: 'gray',
    backgroundColor: '#F4F5F5',
    borderWidth: 1,
    borderRadius: 5,
    borderStyle: 'dashed',
    marginHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textPrimary: {
    color: 'gray',
    fontSize: 15,
    paddingTop: 5,
    paddingHorizontal: 10,
  },
  nameProduct: {
    flexDirection: 'row',
  },
  boxWrap: {
    backgroundColor: 'white',
    flexDirection: 'column',
    marginTop: 8,
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  imgSelected: {
    width: (WIDTH - 54) / 4,
    height: (WIDTH - 54) / 4,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  brandWrap: {
    height: 62,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '$white',
    marginTop: 8,
    paddingHorizontal: 16,
  },
  brand: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imgBrand: {
    width: 30,
    height: 30,
    borderRadius: 30,
    marginLeft: 5,
  },
  button: {
    width: '90%',
    alignSelf: 'center',
    paddingBottom: 44,
  },
});
