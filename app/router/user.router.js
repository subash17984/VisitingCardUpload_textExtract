var router = require("express").Router();
const user = require("../controller/user.controller");
const { upload, processImage } = require("../middleware/user.middleware")
router.post("/upload", upload.single('file'), processImage, user.createUser);
router.get("/cards", user.getAllCards);
module.exports = router;