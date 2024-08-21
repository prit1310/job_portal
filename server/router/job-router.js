const express = require('express');
const router = express.Router();
const validate = require('../middlewares/validate-middleware');
const jobController = require('../controllers/job-controller');
const { addJobSchema, updateJobSchema } = require('../validators/job-validator');
const Job = require('../models/job');

// Route to add a job
router.route('/addJob').post(validate(addJobSchema), jobController.addJob);

// Route to get a job by ID
router.route('/job/:id').get(jobController.getJob);

// Route to update a job by ID
router.route('/job/:id').put(validate(updateJobSchema), jobController.updateJob);

// Route to delete a job by ID
router.route('/job/:id').delete(jobController.deleteJob);

// Route to get all jobs
router.route('/jobs').get(async (req, res) => {
    try {
        const jobs = await Job.find();
        res.status(200).json(jobs);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

module.exports = router;
