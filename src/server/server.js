const express = require('express');
const AWS = require('aws-sdk');
const { Octokit } = require("@octokit/rest");
const { github_host, default_organization_repository } = require('../utils/constants')
const mapper = require('../db/dynamo-client')
const Run = require('../models/Run.model')

const server = express();
server.disable('x-powered-by');

const router = express.Router();
server.use('/veracode-github-app', router);
server.use(express.json());

router.get('/register', async (req, res) => {
  const { 
    run_id, 
    name, 
    sha, 
    enforce, 
    enforce_admin, 
    token, 
    repository_owner,
    repository_name,
    repository_full_name
  } = req.query

  console.log(req.query);

  
  const data = {
    owner: repository_owner,
    repo: repository_name,
    head_sha: sha,
    name: name,
    details_url: `${github_host}/${repository_owner}/${default_organization_repository}/actions/runs/${run_id}`,
    status: 'in_progress'
  }

  const octokit = new Octokit({
    auth: token
  });

  const checks_run = await octokit.rest.checks.create(data);

  const run = new Run();
  run.run_id = run_id;
  run.sha = sha;
  run.repository_owner = repository_owner;
  run.repository_name = repository_name;
  run.repository_full_name = repository_full_name;
  run.checks_run_id = checks_run.data.id;

  try {
    const result = await mapper.put({ item: run });
    console.log(result)
  } catch (error) {
    console.error(error);
    return response.status(500).json({err: 'DynamoError'});
  }

  return res.sendStatus(200);
});

module.exports = {
  server,
}