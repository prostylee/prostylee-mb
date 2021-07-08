import EStyleSheet from 'react-native-extended-stylesheet';
export default EStyleSheet.create({
  productItem: {
    backgroundColor: 'white',
    flexDirection: 'row',
    padding: 5,
    alignItems: 'center',
    marginHorizontal: 15,
    marginVertical: 8,
    borderRadius: 5,
  },
  itemTitle: {
    paddingLeft: 10,
  },
  itemName: {
    paddingBottom: 5,
  },
  priceItem: {
    fontWeight: 'bold',
    color: '#EA3F49',
    paddingTop: 0,
    fontSize: 15,
  },
  image: {
    width: 30,
    height: 40,
    borderRadius: 3,
  },
});
