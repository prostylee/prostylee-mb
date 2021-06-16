import {createSelector} from 'reselect';

export const searchReducer = (state) => state.search;

//List product from categories
export const getSearchFeaturedCategoriesLoadingSelector = createSelector(
  searchReducer,
  (data) => data?.searchFeaturedCategoriesLoading,
);

export const getSearchFeaturedCategoriesSelector = createSelector(
  searchReducer,
  (data) => data?.searchFeaturedCategories || {},
);

export const getLoadSearchFeaturedCategoriesMoreLoading = createSelector(
  searchReducer,
  (data) => data?.loadSearchFeaturedCategoriesMoreLoading || false,
);

export const getHasLoadMoreSearchFeaturedCategoriesSelector = createSelector(
  searchReducer,
  (data) => data?.hasLoadMoreSearchFeaturedCategories || false,
);

export const getPageSearchFeaturedCategoriesSelector = createSelector(
  searchReducer,
  (data) => data?.pageSearchFeaturedCategories,
);
export const getCurrentKeyword = createSelector(
  searchReducer,
  (data) => data?.currentKeyword,
);
