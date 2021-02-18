/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getComment = /* GraphQL */ `
  query GetComment($id: ID!) {
    getComment(id: $id) {
      id
      commentOwnerId
      commentOwnerUsername
      targetId
      targetType
      content
      createdAt
      parentId
      parent {
        id
        commentOwnerId
        commentOwnerUsername
        targetId
        targetType
        content
        createdAt
        parentId
        parent {
          id
          commentOwnerId
          commentOwnerUsername
          targetId
          targetType
          content
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
          commentOwnerId
          commentOwnerUsername
          targetId
          targetType
          content
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
        commentOwnerId
        commentOwnerUsername
        targetId
        targetType
        content
        createdAt
        parentId
        parent {
          id
          commentOwnerId
          commentOwnerUsername
          targetId
          targetType
          content
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
