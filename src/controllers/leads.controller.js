const leadsService = require("../services/leads.service")

async function createContactLead(req, res, next) {
  try {
    const lead = await leadsService.createContactLead(req.body)

    return res.status(201).json({
      message: "Lead de contato salvo com sucesso.",
      data: lead
    })
  } catch (error) {
    return next(error)
  }
}

async function createEbookLead(req, res, next) {
  try {
    const lead = await leadsService.createEbookLead(req.body)

    return res.status(201).json({
      message: "Lead de download salvo com sucesso.",
      data: {
        ...lead,
        downloadUrl: lead.ebookLead?.downloadUrl
      }
    })
  } catch (error) {
    return next(error)
  }
}

module.exports = {
  createContactLead,
  createEbookLead
}