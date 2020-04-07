exports.errorHandling = (error, req, res, next)=>{
    const statusCode = error.statusCode ? error.statusCode : 500
    return res.status(statusCode).json({ message: error.message })
}