const crypto = require("crypto")
const AppError = require("../error/app-error")

function safeEqualText(left, right) {
  const leftBuffer = Buffer.from(String(left), "utf8")
  const rightBuffer = Buffer.from(String(right), "utf8")

  if (leftBuffer.length !== rightBuffer.length) {
    return false
  }

  return crypto.timingSafeEqual(leftBuffer, rightBuffer)
}

function parseBasicAuthHeader(authorizationHeader) {
  if (typeof authorizationHeader !== "string" || !authorizationHeader.startsWith("Basic ")) {
    return null
  }

  const base64Credentials = authorizationHeader.slice(6).trim()

  if (!base64Credentials) {
    return null
  }

  const decodedCredentials = Buffer.from(base64Credentials, "base64").toString("utf8")
  const separatorIndex = decodedCredentials.indexOf(":")

  if (separatorIndex <= 0) {
    return null
  }

  return {
    username: decodedCredentials.slice(0, separatorIndex),
    password: decodedCredentials.slice(separatorIndex + 1)
  }
}

function adminAuthMiddleware(req, res, next) {
  const adminUsername = process.env.ADMIN_USERNAME
  const adminPassword = process.env.ADMIN_PASSWORD

  if (!adminUsername || !adminPassword) {
    return next(new AppError("Credenciais de administrador não configuradas no ambiente.", 500))
  }

  const credentials = parseBasicAuthHeader(req.headers.authorization)

  if (!credentials) {
    res.set("WWW-Authenticate", "Basic realm=\"admin-area\"")
    return next(new AppError("Autenticação de administrador é obrigatória.", 401))
  }

  const hasValidUsername = safeEqualText(credentials.username, adminUsername)
  const hasValidPassword = safeEqualText(credentials.password, adminPassword)

  if (!hasValidUsername || !hasValidPassword) {
    return next(new AppError("Credenciais de administrador inválidas.", 403))
  }

  req.admin = {
    username: credentials.username
  }

  return next()
}

module.exports = adminAuthMiddleware