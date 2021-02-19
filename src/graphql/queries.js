/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getComment = /* GraphQL */ `
  query GetComment($id: ID!) {
    getComment(id: $id) {
      id
      ownerId
      owner
      targetId
      targetType
      content
      numberOfLikes
      createdAt
      parentId
      parent {
        id
        ownerId
        owner
        targetId
        targetType
        content
        numberOfLikes
        createdAt
        parentId
        parent {
          id
          ownerId
          owner
          targetId
          targetType
          content
          numberOfLikes
          createdAt
          parentId
          updatedAt
        }
        childrens {
          nextToken
        }
        updatedAt
      }
      childrens {
        items {
          id
          ownerId
          owner
          targetId
          targetType
          content
          numberOfLikes
          createdAt
          parentId
          updatedAt
        }
        nextToken
      }
      updatedAt
    }
  }
`;
export const listComments = /* GraphQL */ `
  query ListComments(
    $filter: ModelCommentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listComments(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        ownerId
        owner
        targetId
        targetType
        content
        numberOfLikes
        createdAt
        parentId
        parent {
          id
          ownerId
          owner
          targetId
          targetType
          content
          numberOfLikes
          createdAt
          parentId
          updatedAt
        }
        childrens {
          nextToken
        }
        updatedAt
      }
      nextToken
    }
  }
`;
