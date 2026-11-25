// middleware/errorHandler.js: one place that turns errors into JSON responses.

// Creates an Error that carries an HTTP status code
const httpError = (status, message) => Object.assign(new Error(message), { status })

// Express 4 doesn't catch errors from async functions, so this wrapper forwards them
const asyncHandler = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)

const notFound = (req, res, next) =>
  next(httpError(404, `Route not found: ${req.method} ${req.originalUrl}`))

// Express knows this is an error handler because it has 4 parameters
const errorHandler = (err, req, res, next) => {
  // 11000 = MongoDB duplicate key (e.g. two signups at the same instant)
  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern || {})[0] || 'value'
    return res.status(409).json({ message: `That ${field} is already taken.` })
  }
  const status = err.status || 500
  if (status === 500) console.error(err) // log real bugs in the terminal only
  res.status(status).json({
    message: status === 500 ? 'Server error. Please try again.' : err.message,
  })
}

module.exports = { httpError, asyncHandler, notFound, errorHandler }