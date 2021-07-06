export const getProductVarient = (choiceSelect) => {
  const choiceList = choiceSelect.map((item) => item.value.attrValue).sort();
  let attributeID = '';
  choiceList.forEach((element) => {
    attributeID = attributeID + '_' + element;
  });
  return attributeID;
};
