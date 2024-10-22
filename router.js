const express = require('express');
const router = express.Router();

const userRouter = require('./app/router/user.router');

router.use("/user", userRouter);



module.exports = router;