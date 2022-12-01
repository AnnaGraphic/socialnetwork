//require the module and use it to create an S3 client.

require("dotenv").config();
const aws = require("aws-sdk");
const { AWS_KEY, AWS_SECRET } = process.env;

let secrets;
if (process.env.NODE_ENV == "production") {
    secrets = process.env;
} else {
    secrets = require("./secrets.json");
}

module.exports.s3 = new aws.S3({
    accessKeyId: AWS_KEY,
    secretAccessKey: AWS_SECRET,
});
