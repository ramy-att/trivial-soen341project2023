const Student = require("../model/student");
const Employer = require("../model/employer");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
  const token = req.headers("x-access-token")?.split(" ")[1];
  if (token) {
    jwt.verify(token, process.JWT_SECRET, (error, decoded) => {
      if (error) {
        return res.json({
          isLoggedIn: false,
          message: "Failed to authenticate",
        });
      }
      req.user = {};
      req.user.id = decoded.id;
      req.user.email = decoded.email;
      req.user.name = decoded.name;
      req.user.type = decoded.type;
      next();
    });
  } else {
    res.json({ err: "Incorrect Token", isLoggedIn: false });
  }
};
const signin = async (req, res, next) => {
  const { email, password } = req.body;

  const employer = await Employer.findOne({ email: email });
  const student = await Student.findOne({ studentEmail: email });

  if (!employer && !student) {
    return res.json({ err: "Invalid credentials" });
  } else if (employer) {
    const compare = await bcrypt.compare(password, employer.password); // true || false
    if (compare) {
      const payload = {
        id: employer._id,
        name: employer.name,
        email: employer.email,
        type: "employer",
      };
      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: 86400 },
        (error, token) => {
          if (error) {
            return res.json({ err: error });
          }
          return res.json({ message: "Success", token: "Bearer " + token });
        }
      );
    } else {
      return res.json({ err: "Invalid Credentials" });
    }
  } else if (student) {
    const compare = await bcrypt.compare(password, student.studentPassword); // true || false
    if (compare) {
      const payload = {
        id: student._id,
        name: student.studentName,
        email: student.studentEmail,
        type: "student",
      };
      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: 86400 },
        (error, token) => {
          if (error) {
            return res.json({ err: error });
          }
          return res.json({ message: "Success", token: "Bearer " + token });
        }
      );
    } else {
      return res.json({ err: "Invalid Credentials" });
    }
  }
};

exports.signin = signin;
exports.verifyJWT = verifyJWT;
