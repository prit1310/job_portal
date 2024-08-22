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
  requirements: string[];
}

const Home = () => {
  const { isLoggedIn } = useAuth();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch('/api/jobs');

        if (response.ok) {
          const data = await response.json();
          const jobsData: Job[] = Object.keys(data).map(key => data[key]);
          const sortedJobs = jobsData.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
          setJobs(sortedJobs);
          setFilteredJobs(sortedJobs);
        } else {
          throw new Error('Failed to fetch jobs');
        }
      } catch (error) {
        console.error('Error fetching jobs:', error);
        setError('Error fetching jobs');
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const lowercasedQuery = searchQuery.toLowerCase();
      setFilteredJobs(jobs.filter(job => job.title.toLowerCase().includes(lowercasedQuery)));
    } else {
      setFilteredJobs(jobs);
    }
  }, [searchQuery, jobs]);

  const handleSelectJob = (job: Job) => {
    setSelectedJob(job);
  };

  const handleCloseDetails = () => {
    setSelectedJob(null);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleAddJobRedirect = () => {
    navigate('/jobadd');
  };

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <div className="text-center text-red-600">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 p-4 sm:p-6">
      <header className="text-center mb-8 sm:mb-12">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900">Welcome to JobPortal</h1>
        <p className="text-base sm:text-lg text-gray-700 mt-2">Your go-to platform for finding and posting jobs.</p>
      </header>

      <section className="mb-8 sm:mb-12">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800">Find Jobs</h3>
            <input
              type="text"
              placeholder="Search by title..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            <p className="text-gray-600 mt-2">Search for job opportunities based on your skills and preferences.</p>
          </div>
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg" onClick={handleAddJobRedirect}>
            <h3
              className="text-lg sm:text-xl font-semibold text-gray-800 cursor-pointer hover:text-teal-600"
            >
              Post Jobs
            </h3>
            <p className="text-gray-600 mt-2">Post job openings to attract the best talent for your company.</p>
          </div>
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800">Manage Applications</h3>
            <p className="text-gray-600 mt-2">Easily track, review, and manage job applications in one place.</p>
            <p className="text-gray-600 mt-1">Monitor application statuses, communicate with candidates, and ensure a smooth hiring process.</p>
          </div>
        </div>
      </section>

      {isLoggedIn ? (
        <section className="mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Latest Job Listings</h2>
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg">
            {filteredJobs.length > 0 ? (
              <ul>
                {filteredJobs.map((job) => (
                  <li key={job._id} className="border-b border-gray-200 py-2 sm:py-4">
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-800">{job.title}</h3>
                    <p className="text-gray-600">{job.location}</p>
                    <button
                      onClick={() => handleSelectJob(job)}
                      className="text-teal-600 hover:underline"
                    >
                      View Details
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No job listings available at the moment.</p>
            )}
          </div>
        </section>
      ) : (
        <p className="text-base sm:text-lg text-red-500 font-bold mb-4">You need to be signed in to see job details.</p>
      )}

      {selectedJob && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg max-w-lg w-full">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800">{selectedJob.title}</h2>
            <p className="text-gray-600 mt-2">{`Description: ${selectedJob.description}`}</p>
            <p className="text-gray-500 mt-2">{`Location: ${selectedJob.location}`}</p>
            {selectedJob.requirements.length > 0 && (
              <div className="mt-4">
                <h3 className="text-lg font-semibold text-gray-800">Requirements:</h3>
                <ul className="list-disc list-inside text-gray-600 mt-2">
                  {selectedJob.requirements.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
              </div>
            )}
            <button
              onClick={handleCloseDetails}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 w-full sm:w-auto"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
