# AWS Secure Pipeline Artifact Bucket

This S3 bucket is the artifact bucket used for CDK pipelines, created when the --qualifier option is specified during the CDK bootstrap process. If you specify the --qualifier option or explicitly define an artifact bucket for CDK pipelines, you need to configure a policy that allows access to this bucket from the CDK deploy role.

## Install

### TypeScript

#### install by npm

```shell
npm install @gammarers/aws-secure-pipeline-artifact-bucket
```

#### install by yarn

```shell
yarn add @gammarers/aws-secure-pipeline-artifact-bucket
```

## Example

```typescript
import { SecurePipelineArtifaceBucket } from '@gammarers/aws-secure-pipeline-artifact-bucket';

const bucket = new SecurePipelineArtifaceBucket(stack, 'SecurePipelineArtifaceBucket');
```

## License

This project is licensed under the Apache-2.0 License.
