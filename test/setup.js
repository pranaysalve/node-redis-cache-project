const mongoose = require("mongoose");
const keys = require("../config/keys");
require("../models/User");

mongoose.Promise = global.Promise;

mongoose.connect(keys.mongoURI, {
  dbName: "blogpost",
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

afterAll(async () => {
  await mongoose.disconnect();
});
