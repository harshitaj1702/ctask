var express = require("express");
var router = express.Router();
var pool = require("./pool");

router.post("/", function (req, res, next) {
  pool.query(
    "select * from admins where email=? and password=?",
    [req.body.email, req.body.password],
    function (err, result) {
      if (err) {
        res.status(500).json({ status: false, message: err.message });
      } else {
        if (result.length > 0) {
          res.status(200).json({ status: true, message: "Data found" });
        } else {
          res.status(200).json({ status: false, message: "Data found" });
        }
      }
    }
  );
});

router.get("/bookings", function (req, res, next) {
  pool.query(
    "select B.bookingid as id,B.*,R.title,R.description,R.price,R.offerprice,R.pictures,U.firstname,U.lastname,U.email,U.mobileno  from rooms R,booking B, users U where B.roomid=R.id and B.userid=U.id",
    function (err, result) {
      if (err) {
        res.status(500).json({ status: false, message: err.message });
      } else {
        console.log(result, "here");
        res
          .status(200)
          .json({ status: true, message: "Data found", data: result });
      }
    }
  );
});

router.put("/:id", function (req, res, next) {
  pool.query(
    "update booking set ? where bookingid=?",
    [req.body, req.params.id],
    function (err, result) {
      if (err) {
        res.status(500).json({ status: false, message: err.message });
      } else {
        res
          .status(200)
          .json({ status: true, message: "Data Edited Successfully" });
      }
    }
  );
});

module.exports = router;
