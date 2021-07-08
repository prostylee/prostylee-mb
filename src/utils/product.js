export const getProductVarient = (choiceSelect) => {
  const choiceList = choiceSelect.map((item) => item.value.attrValue).sort();
  let attributeID = '';
  choiceList.forEach((element) => {
    attributeID = attributeID + '_' + element;
  });
  return attributeID;
};

export const getProductPrice = (productData) => {
  const productVarient = getProductVarient(productData.options);

  const attributeList = {};
  productData.item?.productPriceResponseList?.map((item) => {
    const attributeValues = item.productAttributes
      .map((attribute) => attribute.attrValue)
      .sort();
    let attributeID = '';
    attributeValues.forEach((element) => {
      attributeID = attributeID + '_' + element;
    });
    attributeList[attributeID] = {
      price: item?.price,
      priceSale: item?.priceSale,
    };
  });
  if (attributeList[productVarient]) {
    return attributeList[productVarient];
  } else {
    return 0;
  }
};
