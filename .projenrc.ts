import { awscdk, javascript } from 'projen';
const project = new awscdk.AwsCdkConstructLibrary({
  author: 'yicr',
  authorAddress: 'yicr@users.noreply.github.com',
  authorOrganization: true,
  cdkVersion: '2.80.0',
  typescriptVersion: '5.5.x',
  jsiiVersion: '5.5.x',
  defaultReleaseBranch: 'main',
  name: '@gammarers/aws-secure-pipeline-artifact-bucket',
  description: 'This S3 bucket is the artifact bucket used for CDK pipelines, created when the --qualifier option is specified during the CDK bootstrap process. If you specify the --qualifier option or explicitly define an artifact bucket for CDK pipelines, you need to configure a policy that allows access to this bucket from the CDK deploy role.',
  keywords: ['aws', 'cdk', 'aws-cdk', 'bucket', 'pipeline', 'artifact', 'qualifier'],
  projenrcTs: true,
  repositoryUrl: 'https://github.com/gammarers/aws-secure-pipeline-artifact-bucket.git',
  deps: [
    '@gammarers/aws-secure-bucket@2.0.23',
  ],
  devDeps: [
    '@gammarers/aws-secure-bucket@2.0.23',
  ],
  peerDeps: [
    '@gammarers/aws-secure-bucket@^2.0.23',
  ],
  releaseToNpm: true,
  npmAccess: javascript.NpmAccess.PUBLIC,
  minNodeVersion: '18.0.0',
  workflowNodeVersion: '22.4.x',
  depsUpgradeOptions: {
    workflowOptions: {
      labels: ['auto-approve', 'auto-merge'],
      schedule: javascript.UpgradeDependenciesSchedule.expressions(['11 17 * * 0']),
    },
  },
  autoApproveOptions: {
    secret: 'GITHUB_TOKEN',
    allowedUsernames: ['yicr'],
  },
});
project.synth();