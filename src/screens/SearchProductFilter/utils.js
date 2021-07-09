import {getBestSellerFilterStateSelector} from 'redux/selectors/storeMain/bestSellers';
import {storeActions} from 'redux/reducers';
import {getPersonalSalersFilterStateSelector} from 'redux/selectors/storeMain/personalSalers';

import {getProductCategoriesFilterStateSelector} from 'redux/selectors/product';
import {productActions} from 'redux/reducers';

import {getProductFilterState} from 'redux/selectors/search/productFilter';
import {searchActions} from 'redux/reducers';

import {getStoreProfileFilterStateSelector} from 'redux/selectors/storeProfile';
import {storeProfileActions} from 'redux/reducers';

const getActionFunction = (screenName = '') => {
  switch (screenName) {
    case 'BestSeller': {
      return {
        filterDispatchAction: storeActions.getBestSellers,
        getFilterStateSelectorFunction: getBestSellerFilterStateSelector,
        setFilterStateAction: storeActions.setBestSellersFilterState,
        clearFilterStateAction: storeActions.clearBestSellersFilterState,
      };
    }
    case 'PersonalSalers': {
      return {
        getFilterStateSelectorFunction: getPersonalSalersFilterStateSelector,
        filterDispatchAction: storeActions.getPersonalSalers,
        setFilterStateAction: storeActions.setPersonalSalersFilterState,
        clearFilterStateAction: storeActions.clearPersonalSalersFilterState,
      };
    }
    case 'Products': {
      return {
        filterDispatchAction: productActions.getListProduct,
        getFilterStateSelectorFunction: getProductCategoriesFilterStateSelector,
        clearFilterStateAction:
          productActions.clearProductCategoriesFilterState,
        setFilterStateAction: productActions.setProductCategoriesFilterState,
      };
    }
    case 'SearchProducts': {
      return {
        filterDispatchAction: searchActions.getProductsSearch,
        getFilterStateSelectorFunction: getProductFilterState,
        clearFilterStateAction: searchActions.clearProductsFilterState,
        setFilterStateAction: searchActions.setProductFilterState,
      };
    }
    case 'StoreProfileMain': {
      return {
        filterDispatchAction: storeProfileActions.getAllStoreProduct,
        getFilterStateSelectorFunction: getStoreProfileFilterStateSelector,
        clearFilterStateAction:
          storeProfileActions.clearStoreProfileFilterState,
        setFilterStateAction: storeProfileActions.setStoreProfileFilterState,
      };
    }
    default: {
      return {
        filterDispatchAction: () => {},
        getFilterStateSelectorFunction: () => {},
        clearFilterStateAction: () => {},
        setFilterStateAction: () => {},
      };
    }
  }
};
export default getActionFunction;
