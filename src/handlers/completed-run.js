const { artifact_folder } = require('../utils/constants');
const AWS = require('aws-sdk');
AWS.config.update({region: 'ap-southeast-2'});


var dynamoDb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

async function handleCompletedRun(context, { app }) {

  if (!context.payload.workflow_run.id) return;

  console.log(`workflow run id: ${context.payload.workflow_run.id}`)
  console.log(typeof context.payload.workflow_run.id);

  const params = {
    TableName: 'veracode-github-app',
    FilterExpression: "run_id = :run_id",
    ExpressionAttributeValues: {
      ":run_id": context.payload.workflow_run.id
    },
  };

  const result = await dynamoDb.scan(params).promise();
  console.log(result.Item);

  // const result = await dynamoDb.get(params).promise();

  // console.log(result);

  // if (!result.Item) {
  //   return res.sendStatus(404);
  // }

  // console.log(result.Item.sha);

  // const shaParams = {
  //   TableName: 'veracode-github-app',
  //   Key: {
  //     sha: result.Item.sha
  //   }
  // }

  // let shaResult;

  // try {
  //   shaResult = await dynamoDb.get(shaParams).promise();
  // } catch (error) {
  //   return {
  //     statusCode: 500,
  //     body: JSON.stringify({ message: 'Error getting item', error: error.message })
  //   };
  // }

  // if (!shaResult.Item) {
  //   return res.sendStatus(404);
  // }

  // const owner = context.payload.repository.owner.login;
  // const repo = context.payload.repository.name;
  // const run_id = context.payload.workflow_run.id;


  // const data = {
  //   owner: shaResult.Item.repository.owner,
  //   repo: shaResult.Item.repository.name,
  //   check_run_id: result.Item.checks_run_id,
  //   name: result.Item.name,
  //   status: context.payload.workflow_run?.status,
  //   conclusion: context.payload.workflow_run?.conclusion,
  //   // output: {
  //   //   annotations: annotationBatch,
  //   //   title: 'Veracode Static Analysis',
  //   //   summary: 'Here\'s the summary of the check result'
  //   // }
  // }

  // await context.octokit.checks.update(data);

}

module.exports = {
  handleCompletedRun,
}