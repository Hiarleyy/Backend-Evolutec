const app = require("./src/app")

const PORT = Number(process.env.HTTP_PORT || process.env.PORT || 3000)

const server = app.listen(PORT, () => {
  console.log(`Servidor rodando em: http://localhost:${PORT}`)
})

server.on("error", (error) => {
  console.error(`Erro ao iniciar o servidor: ${error.message}`)
})