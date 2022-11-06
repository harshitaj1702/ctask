var express = require("express");
const pool = require("./pool");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/signup", function (req, res, next) {
  pool.query("insert into users set ?", req.body, function (err, result) {
    if (err) {
      res.status(500).json({ status: false, message: err.message });
    } else {
      const { password, ...rest } = req.body;
      res.status(200).json({
        status: true,
        message: "Signup Successfully",
        data: { id: result.insertId, ...rest },
      });
    }
  });
});

router.post("/login", function (req, res, next) {
  pool.query(
    "select * from users where (email=? or mobileno=?) and password=?",
    [req.body.email, req.body.email, req.body.password],
    function (err, result) {
      if (err) {
        res.status(500).json({ status: false, message: err.message });
      } else {
        if (result.length > 0) {
          const { password, ...rest } = result[0];
          res.status(200).json({
            status: true,
            message: "Signin Successfully",
            data: rest,
          });
        } else {
          res.status(200).json({
            status: false,
            message: "Invalid Email/Mobile/Password",
          });
        }
      }
    }
  );
});

module.exports = router;
