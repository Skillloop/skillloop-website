
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { fireDB } from '../firebase/FirebaseConfig';

function JobOpenings() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleViewAll = () => {
    navigate('/jobopenings');
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const snapshot = await getDocs(collection(fireDB, 'jobOpenings'));
        const jobsData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setJobs(jobsData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching job openings:', error);
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  return (
    <>
      <motion.h1
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        viewport={{ once: true, amount: 0.5 }}
        id="job"
        className="md:text-5xl text-4xl font-bold lg:mt-16 md:mt-8 mt-4"
      >
        Job Openings
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1, x: [200, -20, 0] }}
        transition={{ duration: 2, ease: 'easeOut' }}
        viewport={{ once: true, amount: 0.5 }}
        className="text-gray-600 md:text-md text-sm max-w-3xl mt-4"
      >
        Launch your career with a role that makes an impact. Grow, innovate,
        and thrive alongside industry leaders in our dynamic workplace.
      </motion.p>

      <div className="flex w-full justify-end my-8">
        <motion.button
          onClick={handleViewAll}
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          viewport={{ once: true, amount: 0.1 }}
          className="z-[10] text-xs md:text-sm 
            bg-gradient-to-b from-[#F4B860] to-[#D35244] 
            bg-clip-text text-transparent 
            border-2 border-[#F9A825] rounded-full 
            py-1 md:py-2 px-4 md:px-8 cursor-pointer 
            transition-all duration-300
            hover:text-white hover:bg-gradient-to-b hover:from-[#D35244] hover:to-[#F4B860] hover:bg-clip-border hover:border-white"
        >
          View All
        </motion.button>
      </div>

      <motion.div
        initial={{ opacity: 0, x: 100 }}
        whileInView={{ opacity: 1, x: [0, -20, 0] }}
        transition={{ duration: 1, ease: 'easeOut' }}
        viewport={{ once: true, amount: 0.5 }}
        className="overflow-x-auto scrollbar-hide relative z-10"
      >
        {loading ? (
          <div className="text-center w-full py-10 text-gray-500">
            Loading jobs...
          </div>
        ) : jobs.length === 0 ? (
          <div className="text-center w-full py-10 text-gray-500">
            No job openings available right now.
          </div>
        ) : (
          <div className="flex space-x-4 w-max pb-4">
            {jobs.map(job => {
              const desc = job.description || '';
              const shortDesc = desc.slice(0, 100);

              return (
                <div
                  key={job.id}
                  className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 p-6 w-80 flex-shrink-0 space-y-4"
                >
                  <span className="inline-block bg-[#FDF1DF] text-[#D97706] md:text-sm text-xs font-medium px-3 py-1 rounded-md">
                    {job.location || job.jobType || 'N/A'}
                  </span>

                  <div>
                    <h2 className="md:text-lg text-md font-bold text-gray-900">
                      {job.title || 'Untitled Job'}
                    </h2>
                    <p className="text-gray-500 text-sm mt-1 line-clamp-2">
                      {shortDesc}...
                    </p>
                  </div>

                  <div className="flex justify-between md:text-sm text-xs text-gray-500 font-medium">
                    <span>{job.startDate || 'TBD'}</span>
                    <span className="text-gray-700 font-semibold">
                      {job.MinSalary && job.MaxSalary
                        ? `₹${job.MinSalary}–₹${job.MaxSalary}`
                        : ''}
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center space-x-3">
                      {job.company?.logo && (
                        <img
                          src={job.company.logo}
                          alt={job.company?.name || 'Company'}
                          className="md:w-10 md:h-10 h-8 w-8 rounded-full object-cover"
                        />
                      )}
                      <div>
                        <p className="font-semibold text-sm text-gray-900">
                          {job.company?.name || 'Company'}
                        </p>
                        <p className="md:text-sm text-xs text-gray-500">
                          {job.company?.address || job.location || 'N/A'}
                        </p>
                      </div>
                    </div>

                    <a
                      href={job.applicationLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-auto text-xs bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-1 px-3 rounded-full transition"
                    >
                      Apply Now
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </motion.div>
    </>
  );
}

export default JobOpenings;
