const mongoose = require("mongoose"); //Database
const express = require("express"); //Express
const cors = require("cors"); //HTTP Connection
const upload = require("express-fileupload");

const dotenv = require("dotenv"); //.env
const path = require("path"); //to get path to .env

const studentRouter = require("./routes/student-routes");
const applicationRouter = require("./routes/application-routes");
const postingRouter = require("./routes/jobPosting-routes");
const employerRouter = require("./routes/employer-routes");
const signinRouter = require("./routes/signin-routes");
const fileRouter = require("./routes/file-routes");

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(cors());
app.use(upload());
app.use("/students", studentRouter); // connected to the local host
app.use("/postings", postingRouter);
app.use("/employers", employerRouter);
app.use("/applications", applicationRouter);
app.use("/signin", signinRouter);
app.use("/file", fileRouter);

// [USED FOR TESTING IN upload.html]
app.get("/download", (req, res) => {
  const file = `${__dirname}/uploads/640bed07ba4b4ab648528f29.pdf`;
  res.download(file); // Set disposition and send it.
});
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/upload.html");
});
app.post("/", (req, res) => {
  if (req.files) {
    var file = req.files.file;
    var filename = file.name;

    file.mv("./server/uploads/" + filename, function (err) {
      if (err) {
        res.send(err);
      } else {
        res.send("File Uploaded");
      }
    });
  }
});

dotenv.config({ path: path.resolve(__dirname, "./.env") });

if (process.env.NODE_ENV !== "test") {
  mongoose.set("strictQuery", false);
  mongoose
    .connect(
      `mongodb+srv://admin:${process.env.DB_KEY}@cluster0.gdygsmu.mongodb.net/?retryWrites=true&w=majority`
    )
    .then(() =>
      app.listen(PORT, () => {
        console.log(`Server listening on ${PORT}`);
      })
    )
    .catch((err) => console.log("Could not connect to the database"));
}
module.exports = app;
