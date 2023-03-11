const downloadFile = async (req, res, next) => {
    const file = `${__dirname}/server/uploads/` + req.id ;
    res.download(file); // Set disposition and send it.
}

