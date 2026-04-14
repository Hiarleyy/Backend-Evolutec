require("./utils/load-env")()
const app = require("./app")

const PORT = Number(process.env.HTTP_PORT || process.env.PORT || 3333)

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})
