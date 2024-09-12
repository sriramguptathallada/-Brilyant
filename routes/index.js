const express = require("express");
const router = express.Router();

const taskRoute = require("./taskRoutes");


router.use("/tasks", taskRoute);

module.exports = router