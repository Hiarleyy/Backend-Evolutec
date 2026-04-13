const prisma = require("../database/prisma-client")

async function getSiteSettings() {
  // Get the first (and usually only) site settings record
  return await prisma.siteSettings.findFirst()
}

module.exports = {
  getSiteSettings
}