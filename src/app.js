require("./utils/load-env")()

const express = require("express")
const cors = require("cors")
const swaggerUi = require("swagger-ui-express")
const swaggerSpec = require("./config/swagger")
const routes = require("./routes")
const requestLogger = require("./middlewares/request-logger")
const notFoundMiddleware = require("./middlewares/not-found-middleware")
const errorMiddleware = require("./middlewares/error-middleware")

const app = express()

app.use(cors({
  origin: process.env.CORS_ORIGIN || "*",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"]
}))

app.use(express.json())
app.use(requestLogger)

// Documentação Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  swaggerOptions: {
    persistAuthorization: true
  }
}))

app.get("/", (_req, res) => {
  res.status(200).json({
    status: "ok",
    message: "Backend Evolutec rodando"
  })
})

app.use("/api", routes)
app.use(notFoundMiddleware)
app.use(errorMiddleware)

module.exports = app