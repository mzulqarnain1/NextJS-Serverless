// Sending email to person who ordered the swag.

const aws = require("aws-sdk");
const ses = new aws.SES({ region: "us-east-1" });

export function sendEmail(email: string, name: string, days: number){
    const params = {
        Destination: {
            ToAddresses: [email],
        },
        Message: {
            Body: {
                Text: { Data: `Hey ${name}, Thank you for your swag request. You will receive a parcel within ${days} days.` },
            },

            Subject: { Data: "Swag From Stackbuilders" },
        },
        Source: "stackbuilders.swag@gmail.com",
    };

    return ses.sendEmail(params).promise()
}
