const AWS = require('aws-sdk');
const fs = require('fs');

// Configure the AWS SDK
const s3 = new AWS.S3({
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_KEY,
    endpoint: process.env.S3_ENDPOINT,
    s3ForcePathStyle: true,
});

const uploadFile = () => {
    const fileContent = fs.readFileSync(process.cwd() + '/app/regions.json');

    const params = {
        Bucket: process.env.S3_BUCKET,
        Key: 'regions/regions.json',
        Body: fileContent,
    };

    s3.upload(params, function(err, data) {
        if (err) {
            throw err;
        }
        console.log(`File uploaded successfully. ${data.Location}`);
    });
};

uploadFile();
