
import React, { useEffect, useState } from 'react';
import { FaPlus, FaFilter, FaSearch } from 'react-icons/fa';
import ApplicantTable from '../components/tables/ApplicantTable';
import { Link, useNavigate } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { fireDB } from '../firebase/FirebaseConfig';

const ManageInternship = () => {
  const navigate = useNavigate();
  const [internships, setInternships] = useState([]);

  useEffect(() => {
    const fetchInternships = async () => {
      try {
        const snapshot = await getDocs(collection(fireDB, 'internships'));
        const internshipData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setInternships(internshipData);
      } catch (error) {
        console.error('Error fetching internships:', error);
      }
    };

    fetchInternships();
  }, []);

  return (
    <div className="p-4 md:p-6 text-gray-700 space-y-6">
      {/* Internship Grid */}
      <div>
        <p className="text-lg font-semibold mb-4 text-gray-800">Internship Postings</p>

        <div className="flex flex-wrap gap-4">
          {internships.map((internship) => (
           <Link
      key={internship.id}
      to={`/internships/edit/${internship.id}`}
      className="w-64 p-4 border border-gray-300 rounded-lg bg-white shadow hover:shadow-md transition no-underline"
    >
      <h3 className="font-bold text-base mb-1">{internship.internshipName}</h3>
      <p className="text-sm text-gray-600 mb-1">Duration: {internship.duration}</p>
      <p className="text-sm text-gray-600">Place: {internship.place}</p>
    </Link>
          ))}

          {/* Add Internship Card */}
          <div
            onClick={() => navigate('/internships/new')}
            className="w-64 h-[132px] flex flex-col items-center justify-center border-2 border-dashed border-gray-400 rounded-lg cursor-pointer hover:bg-gray-50 transition"
          >
            <FaPlus className="text-4xl text-gray-500 mb-2" />
            <p className="text-sm font-medium text-gray-600">Add New Internship</p>
          </div>
        </div>
      </div>

      {/* Applicants Section */}
      {/* <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-xl font-semibold text-gray-800">Internship Applicants</h2>

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

      {/* <div className="w-full overflow-x-auto border border-gray-200 rounded-lg shadow-sm">
        <ApplicantTable />
      </div> */}
    </div>
  );
};

export default ManageInternship;
