import React, { useState } from 'react';
import axios from 'axios';
import Spinner from './Spinner';
import { toast } from 'react-toastify';
import { useAuth } from '../store/auth';
import { useNavigate } from 'react-router-dom';

const AddJob = () => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    title: '',
    description: '',
    requirements: [''],
    location: '',
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleRequirementChange = (index: number, value: string) => {
    const updatedRequirements = [...formState.requirements];
    updatedRequirements[index] = value;
    setFormState({ ...formState, requirements: updatedRequirements });
  };

  const handleAddRequirement = () => {
    setFormState({ ...formState, requirements: [...formState.requirements, ''] });
  };

  const handleRemoveRequirement = (index: number) => {
    const updatedRequirements = formState.requirements.filter((_, i) => i !== index);
    setFormState({ ...formState, requirements: updatedRequirements });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null); 

    try {
      const response = await axios.post('/api/addjob', {
        title: formState.title,
        description: formState.description,
        requirements: formState.requirements,
        location: formState.location,
      });

      if (response.status === 201) {
        toast.success('Job added successfully');
        setFormState({
          title: '',
          description: '',
          requirements: [''],
          location: '',
        }); 
      } else {
        setError('Failed to add job');
        toast.error('Failed to add job');
      }
    } catch (error) {
      setError('Error adding job');
      toast.error('Error adding job');
      console.error('Error adding job:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-100 to-blue-100 p-4 sm:p-6 md:p-8 lg:p-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-indigo-900 mb-4">Access Denied</h1>
        <p className="text-lg text-red-500 font-bold mb-4">You need to be signed in to see job details.</p>
        <button
          onClick={() => navigate('/login')} 
          className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Login
        </button>
      </div>
    );
  }

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-100 to-blue-100 p-4 sm:p-6 md:p-8 lg:p-12">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-indigo-900 mb-4">Add Job</h1>
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
              required
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
              required
            />
          </div>
          <div>
            <label htmlFor="requirements" className="block text-gray-700 font-medium">Requirements</label>
            {formState.requirements.map((req, index) => (
              <div key={index} className="flex items-center mb-3">
                <input
                  type="text"
                  value={req}
                  onChange={(e) => handleRequirementChange(index, e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder={`Requirement ${index + 1}`}
                  required
                />
                <button
                  type="button"
                  onClick={() => handleRemoveRequirement(index)}
                  className="ml-2 px-3 py-1 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddRequirement}
              className="mt-2 px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Add Requirement
            </button>
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
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 transition duration-300"
          >
            Add Job
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddJob;
