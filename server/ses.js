require("dotenv").config():
const aws = require("aws-sdk");

const { AWS_KEY, AWS_SECRET, AWS_REGION } = process.env;

const cryptoRandomString = require('crypto-random-string');
const secretCode = cryptoRandomString({
    length: 6
});

// const ses = new aws.
const ses = new aws.SES({
    accessKeyId: AWS_KEY,
    secretAccessKey: AWS_SECRET,
    region: AWS_REGION
});