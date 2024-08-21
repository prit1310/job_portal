const { z } = require('zod');

const contactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(1, 'Phone number is required'),
  title: z.string().min(1, 'Title is required')
});

module.exports = { contactSchema };
