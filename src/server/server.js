const express = require('express');
const AWS = require('aws-sdk');
const { Octokit } = require("@octokit/rest");

const { github_host } = require('../utils/constants')

// const dynamoDb = new AWS.DynamoDB.DocumentClient();

const server = express();
server.disable('x-powered-by');

const router = express.Router();
server.use('/veracode-github-app', router);
server.use(express.json());

router.get('/register', async (req, res) => {
  const { id, run_id, name, sha, enforce, enforce_admin, documentation } = req.query

  console.log(req.query);

  // const params = {
  //   TableName: 'veracode-github-app',
  //   Key: {
  //     sha: sha
  //   }
  // };

  // let result;
  // try {
  //   result = await dynamoDb.get(params).promise();
  // } catch (error) {
  //   return {
  //     statusCode: 500,
  //     body: JSON.stringify({ message: 'Error getting item', error: error.message })
  //   };
  // }

  // if (!result.Item) {
  //   return res.sendStatus(404);
  // }

  // console.log(result.Item);
  // const data = {
  //   owner: result.Item.repository.owner,
  //   repo: result.Item.repository.name,
  //   head_sha: result.Item.sha,
  //   name: name,
  //   details_url: `${github_host}/${result.Item.repository.owner}/${result.Item.config.workflows_repository}/actions/runs/${run_id}`,
  //   status: 'in_progress'
  // }

  // const token = result.Item.token;

  // const octokit = new Octokit({
  //   auth: token
  // });

  // const checks_run = await octokit.rest.checks.create(data);

  // // const checkInfo = {
  // //   name: data.name,
  // //   run_id: Number(run_id),
  // //   checks_run_id: checks_run.data.id,
  // // };

  // // const updateParams = {
  // //   TableName: 'veracode-github-app',
  // //   Key: {
  // //     "sha": sha
  // //   },
  // //   UpdateExpression: "SET checks = list_append(if_not_exists(checks, :empty_list), :newObject)",
  // //   ExpressionAttributeValues: {
  // //     ":newObject": [checkInfo],
  // //     ":empty_list": []
  // //   }
  // // };

  // // await dynamoDb.update(updateParams).promise();

  // // const checkInfo = {
  // //   name: data.name,
  // //   run_id: run_id,
  // //   sha: sha,
  // //   checks_run_id: checks_run.data.id,
  // // };

  // // const runIdParams = {
  // //   TableName: 'veracode-github-app-runid',
  // //   Item: checkInfo
  // // };

  // // try {
  // //   await dynamoDb.put(runIdParams).promise();
  // // } catch (error) {
  // //   console.log(error);
  // //   return;
  // // }

  // const updateParams = {
  //   TableName: 'veracode-github-app',
  //   Key: {
  //     "sha": sha
  //   },
  //   UpdateExpression: "SET run_id = :run_id, check_run_id = :check_run_id, check_run_name = :check_run_name",
  //   ExpressionAttributeValues: {
  //     ":run_id": run_id,
  //     ":check_run_id": checks_run.data.id,
  //     ":check_run_name" : data.name
  //   }
  // };

  // await dynamoDb.update(updateParams).promise();

  return res.sendStatus(200);
  
});

module.exports = {
  server,
}