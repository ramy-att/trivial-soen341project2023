const downloadFile = async (req, res) => {
    console.log("DOWNLOAD FILE CONTROLLER");
    const file = `${__dirname}/uploads/`+req.body.type +'/'+ req.body.studentId + '.pdf' ;
    console.log(file);
    res.download(file); // Set disposition and send it.
}

exports.downloadFile=downloadFile;