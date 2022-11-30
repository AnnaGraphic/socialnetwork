const aws = require("aws-sdk");

const { AWS_KEY, AWS_SECRET, EMAIL } = process.env;

const cryptoRandomString = require("crypto-random-string");
const secretCode = cryptoRandomString({
    length: 6,
});

// const ses = new aws.
const ses = new aws.SES({
    accessKeyId: AWS_KEY,
    secretAccessKey: AWS_SECRET,
    region: "eu-west-1",
});

module.exports.sendResetCode = () => {
    return ses
        .sendEmail({
            // the mail von der wir den code senden
            Source: "stitch.biology@spicedling.email",
            Destination: {
                ToAddresses: [`${EMAIL}`],
            },
            Message: {
                Body: {
                    Text: {
                        Data: `this is your reset code: ${secretCode}`,
                    },
                },
                Subject: {
                    Data: "Your Application Has Been Accepted!",
                },
            },
        })
        .promise()
        .then(() => console.log("it worked!"))
        .catch((err) => console.log(err));
};
