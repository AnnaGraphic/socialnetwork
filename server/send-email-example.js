const ses = require("./ses");
const { SOURCE_EMAIL } = process.env;

ses.senEmail({
    Source: `Cool cohort <${SOURCE_EMAIL}>`,
    Destination: {
        ToAdresses: ["sally.jones@spiced-academy.com"],
        Message: {
            Body: {
                Text: {
                    Data: "Please dress ",
                },
            },
            Subject: {
                Data: "Hi",
            },
        },
    },
}).promise();
