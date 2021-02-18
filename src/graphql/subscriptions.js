/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateComment = /* GraphQL */ `
  subscription OnCreateComment {
    onCreateComment {
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
export const onUpdateComment = /* GraphQL */ `
  subscription OnUpdateComment {
    onUpdateComment {
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
export const onDeleteComment = /* GraphQL */ `
  subscription OnDeleteComment {
    onDeleteComment {
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
