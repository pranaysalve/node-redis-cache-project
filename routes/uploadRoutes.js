const AWS = require("aws-sdk");
const keys = require("../config/keys");
const uuid = require("uuid/v1");
const requireLogin = require("../middlewares/requireLogin");
const s3 = new AWS.S3({
  credentials: {
    accessKeyId: keys.accessKeyId,
    secretAccessKey: keys.secretAccessKey,
  },
  region: "ap-south-1",
});

module.exports = (app) => {
  app.get("/api/upload", requireLogin, (req, res) => {
    const key = `${req.user.id}/${uuid()}.jpeg`; // structure is -> 'directory/filename.jpeg'

    s3.getSignedUrl(
      "putObject",
      {
        Bucket: "blogpostbucket-123", //bucket name
        ContentType: "image/jpeg", // filt type which will be uploaded
        Key: key, //structure is -> 'directory/filename.jpeg'
      },
      (err, url) => res.send({ key, url })
    );
  });
};
