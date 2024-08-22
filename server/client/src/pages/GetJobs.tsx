import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Spinner from './Spinner'; 
import { useAuth } from '../store/auth';

interface Job {
  _id: string;
  title: string;
  description: string;
  location: string;
  createdAt: string; 
}

const GetJobs = () => {
  const { isLoggedIn } = useAuth();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch('/api/jobs'); 
        
        if (response.ok) {
          const data: Job[] = await response.json();
          const sortedJobs = data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
          setJobs(sortedJobs);
        } else {
          throw new Error('Failed to fetch jobs');
        }
      } catch (error) {
        setError('Error fetching jobs');
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleSelectJob = (id: string) => {
    navigate(`/jobupdate/${id}`);
  };

  const deleteJob = async (id: string) => {
    try {
      const response = await fetch(`/api/job/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setJobs(jobs.filter(job => job._id !== id));
      } else {
        throw new Error('Failed to delete job');
      }
    } catch (error) {
      setError('Error deleting job');
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-100 to-blue-100 p-4 sm:p-6 md:p-8 lg:p-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-indigo-900 mb-4 text-center">Access Denied</h1>
        <p className="text-lg text-red-500 font-bold mb-4 text-center">You need to be signed in to see job details.</p>
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

  if (error) {
    return <div className="text-center text-red-600">{error}</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-100 to-blue-100 p-4 sm:p-6 md:p-8 lg:p-12">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-indigo-900 mb-8 text-center">Job Listings</h1>
      <div className="w-full max-w-4xl mx-auto mb-12">
        {jobs.length > 0 ? (
          <ul className="space-y-4">
            {jobs.map((job) => (
              <li
                key={job._id}
                className="bg-white p-4 sm:p-6 rounded-lg shadow-md border border-gray-200 cursor-pointer hover:bg-gray-100 transition duration-300"
              >
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800">{job.title}</h2>
                <p className="text-sm sm:text-base text-gray-600 mt-2">{job.description}</p>
                <p className="text-sm sm:text-base text-gray-500 mt-2">{job.location}</p>
                <div className="mt-4 flex flex-col sm:flex-row gap-2">
                  <button
                    className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 transition duration-300"
                    onClick={() => handleSelectJob(job._id)}
                  >
                    Update Job
                  </button>
                  <button
                    className="px-4 py-2 bg-red-600 text-white rounded-md shadow-md hover:bg-red-700 transition duration-300"
                    onClick={() => deleteJob(job._id)}
                  >
                    Delete Job
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-600">No jobs available</p>
        )}
      </div>
    </div>
  );
};

export default GetJobs;
