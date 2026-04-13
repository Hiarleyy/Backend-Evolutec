const siteSettingsService = require("../services/site-settings.service")

async function getSiteSettings(_req, res, next) {
  try {
    const siteSettings = await siteSettingsService.getSiteSettings()

    return res.status(200).json({
      data: siteSettings
    })
  } catch (error) {
    return next(error)
  }
}

module.exports = {
  getSiteSettings
}