/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onLikeComment = /* GraphQL */ `
  subscription OnLikeComment {
    onLikeComment {
      id
      ownerId
      owner
      ownerFullname
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
        ownerFullname
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
          ownerFullname
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
          ownerFullname
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
export const onUnlikeComment = /* GraphQL */ `
  subscription OnUnlikeComment {
    onUnlikeComment {
      id
      ownerId
      owner
      ownerFullname
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
        ownerFullname
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
          ownerFullname
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
          ownerFullname
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
export const onCreateComment = /* GraphQL */ `
  subscription OnCreateComment {
    onCreateComment {
      id
      ownerId
      owner
      ownerFullname
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
        ownerFullname
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
          ownerFullname
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
          ownerFullname
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
export const onUpdateComment = /* GraphQL */ `
  subscription OnUpdateComment {
    onUpdateComment {
      id
      ownerId
      owner
      ownerFullname
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
        ownerFullname
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
          ownerFullname
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
          ownerFullname
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
export const onDeleteComment = /* GraphQL */ `
  subscription OnDeleteComment {
    onDeleteComment {
      id
      ownerId
      owner
      ownerFullname
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
        ownerFullname
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
          ownerFullname
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
          ownerFullname
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
export const onCreateChat = /* GraphQL */ `
  subscription OnCreateChat {
    onCreateChat {
      id
      ownerId
      owner
      ownerFullname
      content
      participantUserIds
      imageUrls
      createdAt
      parentId
      parent {
        id
        ownerId
        owner
        ownerFullname
        content
        participantUserIds
        imageUrls
        createdAt
        parentId
        parent {
          id
          ownerId
          owner
          ownerFullname
          content
          participantUserIds
          imageUrls
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
          ownerFullname
          content
          participantUserIds
          imageUrls
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
export const onUpdateChat = /* GraphQL */ `
  subscription OnUpdateChat {
    onUpdateChat {
      id
      ownerId
      owner
      ownerFullname
      content
      participantUserIds
      imageUrls
      createdAt
      parentId
      parent {
        id
        ownerId
        owner
        ownerFullname
        content
        participantUserIds
        imageUrls
        createdAt
        parentId
        parent {
          id
          ownerId
          owner
          ownerFullname
          content
          participantUserIds
          imageUrls
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
          ownerFullname
          content
          participantUserIds
          imageUrls
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
export const onDeleteChat = /* GraphQL */ `
  subscription OnDeleteChat {
    onDeleteChat {
      id
      ownerId
      owner
      ownerFullname
      content
      participantUserIds
      imageUrls
      createdAt
      parentId
      parent {
        id
        ownerId
        owner
        ownerFullname
        content
        participantUserIds
        imageUrls
        createdAt
        parentId
        parent {
          id
          ownerId
          owner
          ownerFullname
          content
          participantUserIds
          imageUrls
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
          ownerFullname
          content
          participantUserIds
          imageUrls
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
