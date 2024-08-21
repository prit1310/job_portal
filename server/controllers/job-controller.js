const mongoose = require('mongoose');
const Job = require('../models/job');

// Add a new job
const addJob = async (req, res) => {
    const { title, description, requirements, location } = req.body;

    try {
        const newJob = new Job({
            title,
            description,
            requirements,
            location
        });

        await newJob.save();

        res.status(201).json({
            message: 'Job added successfully',
            job: newJob
        });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Get a job by ID
const getJob = async (req, res) => {
    const jobId = req.params.id;

    try {
        const objectId = new mongoose.Types.ObjectId(jobId);

        const job = await Job.findById(objectId);
        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }

        const { title, description, requirements, location } = job;

        res.status(200).json({
            title,
            description,
            requirements,
            location
        });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Define getJobById function
const getJobById = async (id) => {
    try {
        return await Job.findById(id);
    } catch (error) {
        console.error('Error fetching job:', error);
        throw error;
    }
};

// Define updateJob function
const updateJob = async (req, res) => {
    const jobId = req.params.id;
    const { title, description, requirements, location } = req.body;

    try {
        const updatedJob = await Job.findByIdAndUpdate(
            jobId,
            { title, description, requirements, location },
            { new: true }
        );

        if (!updatedJob) {
            return res.status(404).json({ message: 'Job not found' });
        }

        res.status(200).json({
            message: 'Job updated successfully',
            job: updatedJob
        });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Define deleteJob function
const deleteJob = async (req, res) => {
    const jobId = req.params.id;

    try {
        const deletedJob = await Job.findByIdAndDelete(jobId);

        if (!deletedJob) {
            return res.status(404).json({ message: 'Job not found' });
        }

        res.status(200).json({
            message: 'Job deleted successfully'
        });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Export the functions
module.exports = {
    addJob,
    getJob,
    updateJob,
    deleteJob
};
