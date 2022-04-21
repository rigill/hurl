import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as lambda from 'aws-cdk-lib/aws-lambda-nodejs';
import * as s3 from 'aws-cdk-lib/aws-s3';
import {Construct} from 'constructs';
import {Stack, StackProps, RemovalPolicy} from 'aws-cdk-lib';

export class HurlStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const bucket = new s3.Bucket(this, 'MyBucket', {
      removalPolicy: RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
    });

    const fn = new lambda.NodejsFunction(this, 'MyFunction', {
      entry: './src/index.ts',
      environment: {
        BUCKET_NAME: bucket.bucketName,
      },
    });

    bucket.grantReadWrite(fn);

    const api = new apigateway.RestApi(this, 'MyRestApi', {
      restApiName: 'MyRestApi',
    });

    api.root.addMethod(
        'POST',
        new apigateway.LambdaIntegration(fn),
    );
  }
}
