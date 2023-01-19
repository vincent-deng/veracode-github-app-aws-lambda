const AWS = require('aws-sdk');
const DataMapper = require('@aws/dynamodb-data-mapper').DataMapper;

let config = {};

config.region = 'us-east-1';

const client = new AWS.DynamoDB(config);
const mapper = new DataMapper({client});

module.exports = mapper;