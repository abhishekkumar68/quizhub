// Basic global error handler middleware
const errorHandler = (err, req, res, next) => {
    // If no status code is set (e.g., standard 200 OK), default to 500 (Server Error)
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

    // Set the response status and return the error message in JSON format
    res.status(statusCode).json({
        message: err.message
    });
};

module.exports = { errorHandler };
