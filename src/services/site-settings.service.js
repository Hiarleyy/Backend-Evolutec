const siteSettingsRepository = require("../repositories/site-settings.repository")

async function getSiteSettings() {
  return await siteSettingsRepository.getSiteSettings()
}

module.exports = {
  getSiteSettings
}