/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const likeComment = /* GraphQL */ `
  mutation LikeComment($id: ID!, $userId: String!) {
    likeComment(id: $id, userId: $userId) {
      id
      ownerId
      owner
      targetId
      targetType
      content
      numberOfLikes
      userIdLikes
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
        userIdLikes
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
          userIdLikes
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
          userIdLikes
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
export const unlikeComment = /* GraphQL */ `
  mutation UnlikeComment($id: ID!, $userId: String!) {
    unlikeComment(id: $id, userId: $userId) {
      id
      ownerId
      owner
      targetId
      targetType
      content
      numberOfLikes
      userIdLikes
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
        userIdLikes
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
          userIdLikes
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
          userIdLikes
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
export const createComment = /* GraphQL */ `
  mutation CreateComment(
    $input: CreateCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    createComment(input: $input, condition: $condition) {
      id
      ownerId
      owner
      targetId
      targetType
      content
      numberOfLikes
      userIdLikes
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
        userIdLikes
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
          userIdLikes
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
          userIdLikes
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
      ownerId
      owner
      targetId
      targetType
      content
      numberOfLikes
      userIdLikes
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
        userIdLikes
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
          userIdLikes
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
          userIdLikes
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
      ownerId
      owner
      targetId
      targetType
      content
      numberOfLikes
      userIdLikes
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
        userIdLikes
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
          userIdLikes
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
          userIdLikes
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
