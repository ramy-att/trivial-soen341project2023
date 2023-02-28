//contain all the route structure of the server where the api will be called
const express = require("express");
const { signin, verifyJWT } = require("../controller/signin-controller");

const signinRouter = express.Router();

signinRouter.post("/", signin); // sign in user
signinRouter.get("/", verifyJWT);

module.exports = signinRouter;
