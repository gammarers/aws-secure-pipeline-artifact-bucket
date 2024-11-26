import { SecureBucket, SecureBucketProps } from '@gammarers/aws-secure-bucket';
import { Stack } from 'aws-cdk-lib';
import * as iam from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';


export interface SecurePipelineArtifactBucketProps extends SecureBucketProps {}

export class SecurePipelineArtifactBucket extends SecureBucket {

  constructor(scope: Construct, id: string, props?: SecurePipelineArtifactBucketProps) {
    super(scope, id, props);

    // 👇 Get account & region
    const account = Stack.of(this).account;
    const region = Stack.of(this).region;
    // 👇 Get qualifier
    const qualifier = Stack.of(this).synthesizer.bootstrapQualifier || 'hnb659fds';

    this.addToResourcePolicy(new iam.PolicyStatement({
      actions: [
        's3:*',
      ],
      resources: [
        `${this.bucketArn}`,
        `${this.bucketArn}/*`,
      ],
      principals: [
        new iam.ArnPrincipal(`arn:aws:iam::${account}:role/cdk-${qualifier}-deploy-role-${account}-${region}`),
      ],
    }));
  }

}
