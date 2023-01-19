const {
  DynamoDbSchema,
  DynamoDbTable,
} = require('@aws/dynamodb-data-mapper');

// class Post {
//   // Declare methods and properties as usual
// }

// class PostMetadata {
//   // Methods and properties
// }

// Object.defineProperty(PostMetadata.prototype, DynamoDbSchema, {
//   value: {
//       draft: {type: 'Boolean'},
//       tags: {
//           type: 'Set',
//           memberType: 'String'
//       }
//   }
// });

// Object.defineProperties(Post.prototype, {
//   [DynamoDbTable]: {
//       value: 'Posts'
//   },
//   [DynamoDbSchema]: {
//       value: {
//           id: {
//               type: 'String',
//               keyType: 'HASH',
//               defaultProvider: v4,
//           },
//           createdAt: {
//               type: 'Date',
//               keyType: 'RANGE'
//           },
//           authorUsername: {type: 'String'},
//           title: {type: 'String'},
//           metadata: embed(PostMetadata)
//       },
//   },
// });
class Run {}

Object.defineProperties(Run.prototype, {
  [DynamoDbTable]: { 
    value: 'veracode-github-app' 
  },
  [DynamoDbSchema]: {
    value: {
      run_id: {
        type: 'Number',
        keyType: 'HASH'
      },
      sha: { type: 'String' },
      repository_owner: { type: 'String' },
      repository_name: { type: 'String' },
      repository_full_name: { type: 'String' },
      checks_run_id: { type: 'Number' }
    },
  },
});


module.exports = Run