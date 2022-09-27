const auth = require("../middleware/auth");
const view = require("../views/auth.view");
const express = require("express");
const router = express.Router();

router.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

router.post("/signup/", [auth.checkDuplicateUsernameOrEmail], view.signup);

router.post("/signin/", view.signin);

router.get("/confirm/:confirmationCode/", view.verifyUser);

module.exports = router;
