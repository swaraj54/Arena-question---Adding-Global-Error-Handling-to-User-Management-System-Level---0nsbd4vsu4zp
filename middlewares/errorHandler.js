/*
The application requires a middleware function called errorHandler that will handle errors that occur during processing of incoming HTTP requests. The function should accept four parameters - err, req, res, and next.

The function should check if the err parameter has the name ValidationError. If so, it should extract the error messages from the err.errors object and map them to an array called errors. The function should then return a 400 status code with a JSON payload containing a message that describes the error as 'Validation Error', and the array of error messages.

If the err parameter does not have the name ValidationError, the function should log the error stack and return a 500 status code with a JSON payload containing a message that says 'Something went wrong'.

In case there is an error when handling the error (try-catch block), the function should log the error stack and return a 500 status code with a JSON payload containing a message that says 'Internal server error'.

This middleware function is intended to be used as part of a chain of middleware functions that are invoked in the order they are registered in the Express application.
*/
function errorHandler(err, req, res, next) {
    try {
        if (err.name === 'ValidationError') {
            const errors = Object.values(err.errors).map((e) => e.message);
            res.status(400).json({ message: 'Validation Error', errors });
        } else {
            console.error(err.stack);
            res.status(500).json({ message: 'Something went wrong' });
        }
    } catch (err) {
        console.error(err.stack);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = errorHandler;