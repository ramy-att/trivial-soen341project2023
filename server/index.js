const mongoose = require("mongoose"); //Database
const express = require("express"); //Express
const cors = require("cors"); //HTTP Connection
const bodyParser = require('body-parser');
const dotenv = require("dotenv"); //.env
const path = require("path"); //to get path to .env

const studentRouter = require("./routes/student-routes");
const applicationRouter = require("./routes/application-routes");
const postingRouter = require("./routes/jobPosting-routes");
const employerRouter = require("./routes/employer-routes");
const signinRouter = require("./routes/signin-routes");
const fileRoutes = require('./routes/file-upload-routes');
// const verifyJWT = require("./controller/signin-controller");

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(bodyParser.json({__dirname}));
app.use("/students", studentRouter); // connected to the local host
app.use("/postings", postingRouter);
app.use("/employers", employerRouter);
app.use("/applications", applicationRouter);
app.use("/signin", signinRouter);
app.use('/api', fileRoutes.routes);

dotenv.config({ path: path.resolve(__dirname, "./.env") });

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
