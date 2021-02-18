/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createComment = /* GraphQL */ `
  mutation CreateComment(
    $input: CreateCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    createComment(input: $input, condition: $condition) {
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
export const updateComment = /* GraphQL */ `
  mutation UpdateComment(
    $input: UpdateCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    updateComment(input: $input, condition: $condition) {
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
export const deleteComment = /* GraphQL */ `
  mutation DeleteComment(
    $input: DeleteCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    deleteComment(input: $input, condition: $condition) {
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
