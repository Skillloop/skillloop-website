import React, { useEffect, useState } from 'react';
import { FaPlus, FaFilter, FaSearch } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { fireDB } from '../firebase/FirebaseConfig';

const ManagePosting = () => {
  const navigate = useNavigate();
  const [postings, setPostings] = useState([]);

  useEffect(() => {
    const fetchPostings = async () => {
      try {
        const snapshot = await getDocs(collection(fireDB, 'jobOpenings'));
        const jobs = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPostings(jobs);
      } catch (error) {
        console.error('Error fetching job postings:', error);
      }
    };

    fetchPostings();
  }, []);

  return (
    <div className="p-4 md:p-6 text-gray-700 space-y-6">
      {/* Job Postings Grid */}
      <div>
        <p className="text-lg font-semibold mb-4 text-gray-800">Job Postings</p>

        <div className="flex flex-wrap gap-4">
          {postings.map((posting) => (
            <Link
              key={posting.id}
              to={`/postings/edit/${posting.id}`}
              className="w-64 p-4 border border-gray-300 rounded-lg bg-white shadow hover:shadow-md transition no-underline"
            >
              <h3 className="font-bold text-base mb-1">{posting.title}</h3>
              <p className="text-sm text-gray-600 mb-1">Company: {posting.company.address}</p>
              <p className="text-sm text-gray-600">Location: {posting.location}</p>
            </Link>
          ))}

          {/* Add New Job Card */}
          <div
            onClick={() => navigate('/postings/new')}
            className="w-64 h-[132px] flex flex-col items-center justify-center border-2 border-dashed border-gray-400 rounded-lg cursor-pointer hover:bg-gray-50 transition"
          >
            <FaPlus className="text-4xl text-gray-500 mb-2" />
            <p className="text-sm font-medium text-gray-600">Add New Job</p>
          </div>
        </div>
      </div>

      {/* Applicants Section — OPTIONAL */}
      {/* <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-xl font-semibold text-gray-800">Job Applicants</h2>

        <div className="flex flex-col md:flex-row items-start md:items-center gap-3 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="Search applicants"
              className="border border-gray-300 px-3 py-2 rounded pl-9 text-sm w-full outline-none focus:ring-2 focus:ring-yellow-300"
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400 text-sm" />
          </div>

          <button className="flex items-center gap-2 border border-gray-300 px-4 py-2 rounded text-sm bg-white hover:bg-gray-100 transition">
            <FaFilter />
            Filter
          </button>
        </div>
      </div> */}

      <div className="w-full overflow-x-auto border border-gray-200 rounded-lg shadow-sm">
        {/* 👉 Swap this with your own ApplicantTable if needed */}
        {/* <ApplicantTable /> */}
        {/* <p className="p-4 text-sm text-gray-500">Applicants table will go here.</p> */}
      </div>
    </div>
  );
};

export default ManagePosting;
