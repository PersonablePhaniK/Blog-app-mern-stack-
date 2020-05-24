const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config(); // for loading environment variables
const passport = require("passport");
const cors = require('cors');

/**Initialize the app */
const app = express();

/** Middlewares */
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/** configure db */
const MONG_URI = process.env.MONGO_URI;

mongoose
  .connect(MONG_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Mongo connection successful"))
  .catch((err) => console.log("err"));

mongoose.set("useFindAndModify", false);
mongoose.Promise = global.Promise;

/**associate the routes with app */
app.use(passport.initialize());
require("./middleware/passport")(passport);
app.use("/api/users/", require("./routes/users_routes"));
app.use("/api/posts/", require("./routes/post_routes"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

/**Server listining to port while up and running */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server up and running on port ${PORT}`);
});
