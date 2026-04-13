const express = require("express")
const publicRoutes = require("./public.routes")
const leadsRoutes = require("./leads.routes")

const router = express.Router()

router.use("/", publicRoutes)
router.use("/leads", leadsRoutes)

module.exports = router