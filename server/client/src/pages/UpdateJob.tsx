import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Spinner from './Spinner';
import { toast } from 'react-toastify';

const UpdateJob = () => {
  const { id } = useParams<{ id: string }>();
  const [formState, setFormState] = useState({
    title: '',
    description: '',
    requirements: '',
    location: '',
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJob = async () => {
      if (!id) {
        setError('No job ID provided');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`/api/job/${id}`);
        if (response.data) {
          setFormState({
            title: response.data.title || '',
            description: response.data.description || '',
            requirements: (response.data.requirements || []).join(', '),
            location: response.data.location || '',
          });
        } else {
          setError('Job not found');
        }
      } catch (error) {
        setError('Error fetching job details');
        console.error('Error fetching job:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.put(`/api/job/${id}`, {
        title: formState.title,
        description: formState.description,
        requirements: formState.requirements.split(',').map(req => req.trim()),
        location: formState.location,
      });

      if (response.status === 200) {
        toast.success('Job updated successfully');
      } else {
        toast.error('Failed to update job');
      }
    } catch (error) {
      toast.error('Error updating job');
      console.error('Error updating job:', error);
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-100 to-blue-100 p-4 sm:p-6 md:p-8 lg:p-12">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-indigo-900 mb-4">Update Job</h1>
      {error && <div className="text-center text-red-600 mb-4">{error}</div>}
      <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md border border-gray-200 mb-10">
        <div className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-gray-700 font-medium">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formState.title}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-gray-700 font-medium">Description</label>
            <textarea
              id="description"
              name="description"
              value={formState.description}
              onChange={handleChange}
              rows={4}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="requirements" className="block text-gray-700 font-medium">Requirements</label>
            <input
              type="text"
              id="requirements"
              name="requirements"
              value={formState.requirements}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="location" className="block text-gray-700 font-medium">Location</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formState.location}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 transition duration-300"
          >
            Update Job
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateJob;
