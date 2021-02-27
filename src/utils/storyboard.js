import {TYPE_STORE, TYPE_USER} from 'constants';

export const KEY = 'ListStoriesCoverted';

export const TYPE = 'image';

export const convertStoriesData = (stories, targetType) => {
  if (!stories?.length) {
    return [];
  }
  const listStoriesConverted = stories.map((story, _i) => {
    const {createdAt, createdBy, deletedAt, id} = story;
    let name = null,
      logo = null;
    if (targetType === TYPE_USER) {
      name = story?.userForStoryResponse?.fullName;
      logo = story?.userForStoryResponse?.avatar;
    } else {
      name = story?.storeForStoryResponse?.name;
      logo = story?.storeForStoryResponse?.logoUrl;
    }
    const listImageStory = story?.storyLargeImageUrls || [];
    return {
      id,
      createdAt,
      createdBy,
      deletedAt,
      username: name,
      profile: logo,
      store: targetType === TYPE_STORE && story?.store ? story.store : {},
      product: targetType === TYPE_STORE && story?.product ? story.product : {},
      productId: targetType === TYPE_STORE ? story.productId : null,
      storeId: targetType === TYPE_USER ? story.storeId : null,
      stories: listImageStory.map((url, i) => ({
        id: KEY + story.id + i,
        url,
        type: TYPE,
        duration: 2,
        isReadMore: true,
      })),
    };
  });
  return listStoriesConverted;
};
