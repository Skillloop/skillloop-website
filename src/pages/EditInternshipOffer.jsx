
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

const EditInternshipOffer = () => {
  const navigate = useNavigate();
  const { internshipId } = useParams();

  const [internshipName, setInternshipName] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [duration, setDuration] = useState('');
  const [stipendMin, setStipendMin] = useState('');
  const [stipendMax, setStipendMax] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [companyLogo, setCompanyLogo] = useState('');
  const [companyAddress, setCompanyAddress] = useState('');
  const [place, setPlace] = useState('Remote');
  const [googleFormLink, setGoogleFormLink] = useState('');
  const [capacity, setCapacity] = useState(1);

  useEffect(() => {
    const fetchInternship = async () => {
      try {
        const docRef = doc(fireDB, 'internships', internshipId);
        const snapshot = await getDoc(docRef);
        if (snapshot.exists()) {
          const data = snapshot.data();
          setInternshipName(data.internshipName || '');
          setDescription(data.description || '');
          setStartDate(data.startDate || '');
          setDuration(data.duration || '');
          setStipendMin(data.MinStipend || '');
          setStipendMax(data.MaxStipend || '');
          setCompanyName(data.company?.name || '');
          setCompanyLogo(data.company?.logo || '');
          setCompanyAddress(data.company?.address || '');
          setPlace(data.place || 'Remote');
          setGoogleFormLink(data.googleFormLink || '');
          setCapacity(data.capacity || 1);
        } else {
          toast.error('Internship not found!');
          navigate('/postings');
        }
      } catch (error) {
        console.error('Error fetching internship:', error);
        toast.error('Error fetching internship.');
      }
    };

    fetchInternship();
  }, [internshipId, navigate]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const docRef = doc(fireDB, 'internships', internshipId);
      await updateDoc(docRef, {
        internshipName,
        description,
        startDate,
        duration,
        MinStipend: stipendMin,
        MaxStipend: stipendMax,
        company: {
          name: companyName,
          logo: companyLogo,
          address: companyAddress,
        },
        place,
        googleFormLink,
        capacity: Number(capacity),
      });

      toast.success('Internship updated successfully!');
      navigate('/postings');
    } catch (error) {
      console.error('Error updating internship:', error);
      toast.error('Error: ' + error.message);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this internship? This action cannot be undone.'
    );

    if (!confirmDelete) return;

    try {
      const docRef = doc(fireDB, 'internships', internshipId);
      await deleteDoc(docRef);

      toast.success('Internship deleted successfully!');
      navigate('/postings');
    } catch (error) {
      console.error('Error deleting internship:', error);
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
              Edit Internship
            </li>
          </ul>
        </nav>
        <button
          onClick={() => navigate('/internships')}
          className="mt-auto px-6 py-3 text-left flex items-center gap-2"
        >
          <FaArrowLeft /> Back
        </button>
      </div>

      {/* Main Form */}
      <div className="ml-64 flex-1 p-10 bg-white overflow-y-auto">
        <h1 className="text-2xl font-semibold text-center mb-8">
          Edit Internship Offer
        </h1>

        <form className="space-y-8 max-w-4xl mx-auto" onSubmit={handleUpdate}>
          <InputField
            label="Internship Name *"
            value={internshipName}
            onChange={(e) => setInternshipName(e.target.value)}
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

          <InputField
            label="Duration (e.g., 3 months)"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            type="text"
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <InputField
              label="Minimum Stipend (Rs.)"
              value={stipendMin}
              onChange={(e) => setStipendMin(e.target.value)}
              type="number"
              required
            />
            <InputField
              label="Maximum Stipend (Rs.)"
              value={stipendMax}
              onChange={(e) => setStipendMax(e.target.value)}
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
              Internship Place *
            </label>
            <select
              value={place}
              onChange={(e) => setPlace(e.target.value)}
              className="w-full border border-gray-300 rounded px-4 py-2"
              required
            >
              <option value="Remote">Remote</option>
              <option value="In-Office">In-Office</option>
            </select>
          </div>

          <InputField
            label="Google Form Link *"
            value={googleFormLink}
            onChange={(e) => setGoogleFormLink(e.target.value)}
            type="url"
            required
          />

          <InputField
            label="Total Intern Capacity *"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
            type="number"
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
              Delete Internship
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditInternshipOffer;
