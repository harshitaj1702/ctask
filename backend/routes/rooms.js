var express = require("express");
const upload = require("./multer");
var router = express.Router();
var pool = require("./pool");

router.get("/", function (req, res, next) {
  pool.query("select * from rooms", function (err, result) {
    if (err) {
      res.status(500).json({ status: false, message: err.message });
    } else {
      res
        .status(200)
        .json({ status: true, message: "Data found", data: result });
    }
  });
});

router.get("/display", function (req, res, next) {
  pool.query(
    "select * from rooms R left join booking B on B.roomid=R.id group by R.id",
    function (err, result) {
      if (err) {
        res.status(500).json({ status: false, message: err.message });
      } else {
        res
          .status(200)
          .json({ status: true, message: "Data found", data: result });
      }
    }
  );
});

router.get("/display/:id", function (req, res, next) {
  pool.query(
    "select *,group_concat(date) as dates from rooms R left join booking B on B.roomid=R.id where R.id=?",
    [req.params.id],
    function (err, result) {
      if (err) {
        res.status(500).json({ status: false, message: err.message });
      } else {
        if (result.length > 0) {
          res
            .status(200)
            .json({ status: true, message: "Data found", data: result[0] });
        } else {
          res.status(200).json({ status: false, message: "Data not found" });
        }
      }
    }
  );
});

router.get("/:id", function (req, res, next) {
  pool.query(
    "select * from rooms where id=?",
    [req.params.id],
    function (err, result) {
      if (err) {
        res.status(500).json({ status: false, message: err.message });
      } else {
        res
          .status(200)
          .json({ status: true, message: "Data found", data: result[0] });
      }
    }
  );
});

router.post("/", upload.any(), function (req, res, next) {
  const filenames = req.files.map((item) => item.filename).join(",");
  pool.query(
    "insert into rooms(title, description, price, offerprice, pictures) values(?,?,?,?,?)",
    [
      req.body.title,
      req.body.description,
      req.body.price,
      req.body.offerprice,
      filenames,
    ],
    function (err, result) {
      if (err) {
        res.status(500).json({ status: false, message: err.message });
      } else {
        res.status(200).json({ status: true, message: "Data found" });
      }
    }
  );
});

router.put("/:id", function (req, res, next) {
  pool.query(
    "update rooms set ? where id=?",
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

router.delete("/:id", function (req, res, next) {
  pool.query(
    "delete from rooms where id=?",
    [req.params.id],
    function (err, result) {
      if (err) {
        res.status(500).json({ status: false, message: err.message });
      } else {
        res
          .status(200)
          .json({ status: true, message: "Data deleted Successfully" });
      }
    }
  );
});

router.post("/book", function (req, res, next) {
  pool.query("insert into booking set ?", req.body, function (err, result) {
    if (err) {
      res.status(500).json({ status: false, message: err.message });
    } else {
      res
        .status(200)
        .json({ status: true, message: "Booking created Successfully" });
    }
  });
});

router.get("/mybooking/:id", function (req, res, next) {
  pool.query(
    "select * from rooms R left join booking B on B.roomid=R.id and B.userid=?",
    [req.params.id],
    function (err, result) {
      if (err) {
        res.status(500).json({ status: false, message: err.message });
      } else {
        res
          .status(200)
          .json({ status: true, message: "Data found", data: result });
      }
    }
  );
});

module.exports = router;
