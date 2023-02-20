const mongoose = require("mongoose");
const cors = require("cors");
const express = require("express");

const studentRouter = require("./routes/student-routes");

const PORT = 3001;

const app = express();
app.use(express.json());
app.use(cors());
app.use("/students", studentRouter); // connected to the local host

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});
mongoose.set("strictQuery", false);
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
