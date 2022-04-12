#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import {HurlStack} from '../lib/hurl-stack';
import {execSync} from 'child_process';
import * as pkg from '../package.json';

// const revision = execSync('git rev-parse HEAD') .toString().trim();
const branch = execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
const version = pkg.version.replace(/\./g, '');
const stackName = `${pkg.name}-${version}-${branch}`;

const app = new cdk.App();

new HurlStack(app, 'HurlStack', {
  stackName,
});
