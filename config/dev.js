const dotenv = require("dotenv");

dotenv.config({ path: "./env" });
module.exports = {
  googleClientID: process.env.googleClientID,
  googleClientSecret: process.env.googleClientSecret,
  mongoURI: process.env.mongoURI,
  cookieKey: process.env.cookieKey,
  accessKeyId: process.env.accessKeyId,
  secretAccessKey: process.env.secretAccessKey,
};
