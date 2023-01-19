const {
  createLambdaFunction,
  createProbot,
} = require("@probot/adapter-aws-lambda-serverless");
const serverless = require('serverless-http');
const { server } = require('../server/server');

const appFn = require("..");

module.exports.webhooks = createLambdaFunction(appFn, {
  probot: createProbot(),
});

module.exports.api = serverless(server);