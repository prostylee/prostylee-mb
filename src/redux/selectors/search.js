import {createSelector} from 'reselect';

export const productReducer = (state) => state.product;

//List product from categories
export const getSearchFeaturedCategoriesLoadingSelector = createSelector(
  productReducer,
  (data) => data?.searchFeaturedCategoriesLoading,
);

export const getSearchFeaturedCategoriesSelector = createSelector(
  productReducer,
  (data) => data?.searchFeaturedCategories || {},
);

export const getLoadSearchFeaturedCategoriesMoreLoading = createSelector(
  productReducer,
  (data) => data?.loadSearchFeaturedCategoriesMoreLoading || false,
);

export const getHasLoadMoreSearchFeaturedCategoriesSelector = createSelector(
  productReducer,
  (data) => data?.hasLoadMoreSearchFeaturedCategories || false,
);

export const getPageSearchFeaturedCategoriesSelector = createSelector(
  productReducer,
  (data) => data?.pageSearchFeaturedCategories,
);
