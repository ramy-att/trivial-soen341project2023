const downloadFile = async (req, res) => {
  const file =
    `${__dirname}/uploads/` + req.body.type + "/" + req.body.studentId + ".pdf";
  res.download(file); // Set disposition and send it.
};

exports.downloadFile = downloadFile;
