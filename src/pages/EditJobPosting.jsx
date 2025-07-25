import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { LuArrowUpFromLine } from 'react-icons/lu';
import InputField from '../components/Form/InputField';
import TextAreaField from '../components/Form/TextAreaField';
import UploadBox from '../components/Form/UploadBox';

import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { fireDB } from '../firebase/FirebaseConfig';
import { toast } from 'react-toastify';

const EditJobPosting = () => {
  const navigate = useNavigate();
  const { jobId } = useParams();

  const [jobTitle, setJobTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [jobType, setJobType] = useState('Full-Time');
  const [salaryMin, setSalaryMin] = useState('');
  const [salaryMax, setSalaryMax] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [companyLogo, setCompanyLogo] = useState('');
  const [companyAddress, setCompanyAddress] = useState('');
  const [location, setLocation] = useState('Remote');
  const [applicationLink, setApplicationLink] = useState('');

  useEffect(() => {
    const fetchJobPosting = async () => {
      try {
        const docRef = doc(fireDB, 'jobOpenings', jobId);
        const snapshot = await getDoc(docRef);
        if (snapshot.exists()) {
          const data = snapshot.data();
          setJobTitle(data.title || '');
          setDescription(data.description || '');
          setStartDate(data.startDate || '');
          setJobType(data.jobType || 'Full-Time');
          setSalaryMin(data.MinSalary || '');
          setSalaryMax(data.MaxSalary || '');
          setCompanyName(data.company?.name || '');
          setCompanyLogo(data.company?.logo || '');
          setCompanyAddress(data.company?.address || '');
          setLocation(data.location || 'Remote');
          setApplicationLink(data.applicationLink || '');
        } else {
          toast.error('Job posting not found!');
          navigate('/postings');
        }
      } catch (error) {
        console.error('Error fetching job posting:', error);
        toast.error('Error fetching job posting.');
      }
    };

    fetchJobPosting();
  }, [jobId, navigate]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const docRef = doc(fireDB, 'jobOpenings', jobId);
      await updateDoc(docRef, {
        title: jobTitle,
        description,
        startDate,
        jobType,
        MinSalary: salaryMin,
        MaxSalary: salaryMax,
        company: {
          name: companyName,
          logo: companyLogo,
          address: companyAddress,
        },
        location,
        applicationLink,
      });

      toast.success('Job posting updated successfully!');
      navigate('/postings');
    } catch (error) {
      console.error('Error updating job posting:', error);
      toast.error('Error: ' + error.message);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this job posting? This action cannot be undone.'
    );

    if (!confirmDelete) return;

    try {
      const docRef = doc(fireDB, 'jobOpenings', jobId);
      await deleteDoc(docRef);

      toast.success('Job posting deleted successfully!');
      navigate('/postings');
    } catch (error) {
      console.error('Error deleting job posting:', error);
      toast.error('Error: ' + error.message);
    }
  };

  return (
    <div className="min-h-screen font-sans flex">
      {/* Sidebar */}
      <div className="w-64 h-screen fixed top-0 left-0 bg-orange-200 border-r border-black flex flex-col z-10">
        <div className="p-6 text-xl font-bold text-black">SkillLoop</div>
        <nav className="flex-1">
          <ul>
            <li className="px-6 py-3 hover:bg-orange-200 cursor-pointer flex items-center gap-2">
              <LuArrowUpFromLine /> Manage Postings
            </li>
            <li className="px-6 py-3 bg-orange-300 font-medium">
              Edit Job Posting
            </li>
          </ul>
        </nav>
        <button
          onClick={() => navigate('/postings')}
          className="mt-auto px-6 py-3 text-left flex items-center gap-2"
        >
          <FaArrowLeft /> Back
        </button>
      </div>

      {/* Main Form */}
      <div className="ml-64 flex-1 p-10 bg-white overflow-y-auto">
        <h1 className="text-2xl font-semibold text-center mb-8">
          Edit Job Posting
        </h1>

        <form className="space-y-8 max-w-4xl mx-auto" onSubmit={handleUpdate}>
          <InputField
            label="Job Title *"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            type="text"
            required
          />

          <TextAreaField
            label="Description *"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          <InputField
            label="Start Date *"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            type="date"
            required
          />

          <div>
            <label className="block text-sm font-medium mb-1">Job Type *</label>
            <select
              value={jobType}
              onChange={(e) => setJobType(e.target.value)}
              className="w-full border border-gray-300 rounded px-4 py-2"
              required
            >
              <option value="Full-Time">Full-Time</option>
              <option value="Part-Time">Part-Time</option>
              <option value="Contract">Contract</option>
              <option value="Internship">Internship</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <InputField
              label="Minimum Salary (Rs.)"
              value={salaryMin}
              onChange={(e) => setSalaryMin(e.target.value)}
              type="number"
              required
            />
            <InputField
              label="Maximum Salary (Rs.)"
              value={salaryMax}
              onChange={(e) => setSalaryMax(e.target.value)}
              type="number"
              required
            />
          </div>

          <InputField
            label="Company Name *"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            type="text"
            required
          />

          <UploadBox
            label="Company Logo"
            id="companyLogo"
            onUpload={(url) => setCompanyLogo(url)}
          />

          <InputField
            label="Company Address"
            value={companyAddress}
            onChange={(e) => setCompanyAddress(e.target.value)}
            type="text"
            required
          />

          <div>
            <label className="block text-sm font-medium mb-1">
              Job Location *
            </label>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full border border-gray-300 rounded px-4 py-2"
              required
            >
              <option value="Remote">Remote</option>
              <option value="On-Site">On-Site</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>

          <InputField
            label="Application Link *"
            value={applicationLink}
            onChange={(e) => setApplicationLink(e.target.value)}
            type="url"
            required
          />

          <div className="flex justify-around gap-4 pt-6">
            <button
              type="submit"
              className="px-6 py-2 border border-gray-400 bg-gray-100 hover:bg-gray-200 rounded"
            >
              Update
            </button>

            <button
              type="button"
              onClick={handleDelete}
              className="px-6 py-2 border border-red-500 text-red-600 hover:bg-red-50 rounded"
            >
              Delete Job Posting
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditJobPosting;
