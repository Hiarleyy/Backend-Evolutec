const AppError = require("../error/app-error")

function errorMiddleware(error, _req, res, _next) {
  const isUploadError = error && (error.name === "MulterError" || error.message === "Apenas arquivos PDF são permitidos.")
  const statusCode = error instanceof AppError ? error.statusCode : isUploadError ? 400 : 500
  const payload = {
    message: error instanceof AppError || isUploadError ? error.message : "Erro interno do servidor"
  }

  if (error instanceof AppError && error.details) {
    payload.details = error.details
  }

  if (statusCode >= 500) {
    console.error(error)
  }

  return res.status(statusCode).json(payload)
}

module.exports = errorMiddleware