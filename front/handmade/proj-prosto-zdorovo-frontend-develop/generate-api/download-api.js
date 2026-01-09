import fs from 'node:fs';

const branchName = process.env.BRANCH_NAME;
const defaultBranchName = 'develop';
const projectId = 5823;
const configName = "api%2Fprosto-zdorovo%2Fopenapi:%20'3.0.yml";
const token = process.env.GITLAB_TOKEN;

const response = await fetchSchema(branchName);

const content = await response.text();

fs.writeFileSync('./generate-api/schema.yaml', content);

async function fetchSchema(branchName) {
  const response = await fetch(
    `https://gitlab.7bits.it/api/v4/projects/${projectId}/repository/files/${configName}/raw?ref=${branchName}`,
    {
      method: 'GET',
      headers: {
        'PRIVATE-TOKEN': token,
      },
    },
  );

  if (response.status === 404 && branchName != defaultBranchName) {
    console.log(
      `Branch [${branchName}] not found, fetch schema from default branch [${defaultBranchName}]`,
    );
    return fetchSchema(defaultBranchName);
  }

  return response;
}
