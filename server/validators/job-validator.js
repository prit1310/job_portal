const { z } = require('zod');

const addJobSchema = z.object({
  title: z.string().min(1, 'Job title must be provided'),
  description: z.string().min(1, 'Job description must be provided'),
  requirements: z.array(z.string()).nonempty('At least one requirement must be provided'),
  location: z.string().min(1, 'Job location must be provided'),
});

const updateJobSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  requirements: z.array(z.string()).optional(),
  location: z.string().optional(),
}).refine(data => Object.keys(data).length > 0, {
  message: 'At least one field must be provided for update',
});

module.exports = { addJobSchema, updateJobSchema };
