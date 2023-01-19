const pick = require('lodash.pick');

const { 
  default_organization_repository, 
  // app_route, 
  ngrok, 
  config_keys
} = require('../utils/constants');
const { shouldRun } = require('../utils/should-run');

const repository_dispatch_type = 'veracode-policy-scan';
const config_path = 'organization-workflows-settings.yml';


async function handlePush(context) {

  if(context.payload.deleted) return; // handle branch deletion - will not trigger the process

  const { config } = await context.octokit.config.get({
    owner: context.payload.repository.owner.login,
    repo: default_organization_repository,
    path: config_path,
    defaults: {
      workflows_repository: default_organization_repository,
      include_workflows_repository: false,
      exclude: {
        repositories: []
      }
    }
  });

  const excludedRepositories = config.exclude.repositories;

  if (!config.include_workflows_repository) {
    excludedRepositories.push(config.workflows_repository)
  }

  if(!shouldRun(context.payload.repository.name, excludedRepositories)) {
    return;
  }

  const sha = context.payload.after;
  // // const webhook = await context.octokit.apps.getWebhookConfigForApp()
  const token = await context.octokit.apps.createInstallationAccessToken({
    installation_id: context?.payload?.installation?.id || 0,
    repository_ids: [context.payload.repository.id]
  });

  const data = {
    sha,
    callback_url: `${ngrok}`,
    repository: {
      owner: context.payload.repository.owner.login,
      name: context.payload.repository.name,
      full_name: context.payload.repository.full_name,
    },
    config: pick(config, config_keys),
    token: token.data.token,
  }

  await context.octokit.repos.createDispatchEvent({
    owner: context.payload.repository.owner.login,
    repo: default_organization_repository,
    event_type: repository_dispatch_type,
    client_payload: {
      id: 12345678,
      token: token.data.token,
      ...data,
      event: context.payload
    }
  });
  
}

module.exports = {
  handlePush,
}