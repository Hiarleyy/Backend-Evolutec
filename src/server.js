require('dotenv').config();
const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/auth.routes');
const courseRoutes = require('./routes/course.routes');
const blogRoutes = require('./routes/blog.routes');
const testimonialRoutes = require('./routes/testimonial.routes');
const faqRoutes = require('./routes/faq.routes');
const unitRoutes = require('./routes/unit.routes');
const statRoutes = require('./routes/stat.routes');
const jobRoutes = require('./routes/job.routes');
const leadRoutes = require('./routes/lead.routes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/faq', faqRoutes);
app.use('/api/units', unitRoutes);
app.use('/api/stats', statRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/leads', leadRoutes);

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
