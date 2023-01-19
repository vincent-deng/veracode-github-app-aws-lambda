const { handlePush } = require('./handlers/push');
// const { handleCompletedRun } = require('./handlers/completed-run');


module.exports = async (app) => {
  
  app.on('push', handlePush);
  // app.on("workflow_run.completed", context => {
  //   handleCompletedRun(context, { app })});

  app.on("issues.opened", async (context) => {
    const issueComment = context.issue({
      body: "Thanks for opening this issue!",
    });
    return context.octokit.issues.createComment(issueComment);
  });
}
