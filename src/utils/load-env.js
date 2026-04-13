const fs = require("fs")
const path = require("path")

function parseEnvLine(line) {
  const trimmedLine = line.trim()

  if (!trimmedLine || trimmedLine.startsWith("#")) {
    return null
  }

  const equalsIndex = trimmedLine.indexOf("=")

  if (equalsIndex <= 0) {
    return null
  }

  const key = trimmedLine.slice(0, equalsIndex).trim()
  let value = trimmedLine.slice(equalsIndex + 1).trim()

  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    value = value.slice(1, -1)
  }

  return { key, value }
}

function loadEnvFile(filePath = path.resolve(process.cwd(), ".env")) {
  if (!fs.existsSync(filePath)) {
    return
  }

  const contents = fs.readFileSync(filePath, "utf8")
  const lines = contents.split(/\r?\n/)

  for (const line of lines) {
    const entry = parseEnvLine(line)

    if (!entry || process.env[entry.key] !== undefined) {
      continue
    }

    process.env[entry.key] = entry.value
  }
}

module.exports = loadEnvFile