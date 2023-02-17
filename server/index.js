const mongoose = require("mongoose");
const express = require("express");
const postingRouter = require("./routes/jobPosting-routes");
const employerRouter = require("./routes/employer-routes");
const studentRouter = require("./routes/student-routes");

const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.json());
app.use("/students", studentRouter); // connected to the local host

app.use(express.json());
app.use("/postings", postingRouter);
app.use("/employers", employerRouter);


app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});
mongoose
  .connect(
    "mongodb+srv://admin:MkfbFlvNy2W1FwKh@cluster0.gdygsmu.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() =>
    app.listen(PORT, () => {
      console.log(`Server listening on ${PORT}`);
    })
  )
  .catch((err) => console.log("Could not connect to the database"));
