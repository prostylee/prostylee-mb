/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateComment = /* GraphQL */ `
  subscription OnCreateComment {
    onCreateComment {
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
export const onUpdateComment = /* GraphQL */ `
  subscription OnUpdateComment {
    onUpdateComment {
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
export const onDeleteComment = /* GraphQL */ `
  subscription OnDeleteComment {
    onDeleteComment {
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
