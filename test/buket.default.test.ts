import { App, Stack } from 'aws-cdk-lib';
import { Match, Template } from 'aws-cdk-lib/assertions';
import * as s3 from 'aws-cdk-lib/aws-s3';
import { SecurePipelineArtifactBucket } from '../src';

describe('SecurePipelineArtifactBucket default Testing', () => {

  const stack = new Stack(new App(), 'TestingStack', {
  });

  const bucket = new SecurePipelineArtifactBucket(stack, 'SecurePipelineArtifaceBucket');

  it('Is Bucket', () => {
    expect(bucket).toBeInstanceOf(s3.Bucket);
  });

  const template = Template.fromStack(stack);

  it('Should have encryption', () => {
    template.hasResourceProperties('AWS::S3::BucketPolicy', {
      Bucket: Match.objectEquals({
        Ref: Match.stringLikeRegexp('SecurePipelineArtifaceBucket'),
      }),
      PolicyDocument: {
        Version: '2012-10-17',
        Statement: Match.arrayWith([
          Match.objectEquals({
            Action: 's3:*',
            Effect: 'Allow',
            Principal: {
              AWS: {
                'Fn::Join': [
                  '',
                  [
                    'arn:aws:iam::',
                    {
                      Ref: 'AWS::AccountId',
                    },
                    ':role/cdk-hnb659fds-deploy-role-',
                    {
                      Ref: 'AWS::AccountId',
                    },
                    '-',
                    {
                      Ref: 'AWS::Region',
                    },
                  ],
                ],
              },
            },
            Resource: [
              {
                'Fn::GetAtt': [
                  Match.stringLikeRegexp('SecurePipelineArtifaceBucket'),
                  'Arn',
                ],
              },
              {
                'Fn::Join': [
                  '',
                  [
                    {
                      'Fn::GetAtt': [
                        Match.stringLikeRegexp('SecurePipelineArtifaceBucket'),
                        'Arn',
                      ],
                    },
                    '/*',
                  ],
                ],
              },
            ],
          }),
        ]),
      },
    });
  });


  it('Should match snapshot', () => {
    expect(template.toJSON()).toMatchSnapshot();
  });

});
