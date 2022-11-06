var multer = require("multer");
var storage = multer.diskStorage({
  destination: (req, file, path) => {
    path(null, "public/images");
  },
  filename: (req, file, path) => {
    var lastIndex = file.originalname.lastIndexOf(".");
    const fileExtension = file.originalname.slice(lastIndex);
    const timestamp = new Date().valueOf();
    const startName = file.originalname.slice(0, lastIndex);
    const newFileName = startName + "-" + timestamp + fileExtension;
    path(null, newFileName);
  },
});
var upload = multer({ storage: storage });
module.exports = upload;
