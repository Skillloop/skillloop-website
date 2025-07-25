import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { collection, doc, setDoc, getDocs } from 'firebase/firestore';
import { fireDB } from '../firebase/FirebaseConfig';
import { toast } from 'react-toastify';
import InputField from '../components/Form/InputField';
import TextAreaField from '../components/Form/TextAreaField';
import UploadBox from '../components/Form/UploadBox';
import { FaArrowLeft } from 'react-icons/fa';
import { LuArrowUpFromLine } from 'react-icons/lu';

const AddSubCategory = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const [subLevel, setSubLevel] = useState('Basic');
  const [subPrice, setSubPrice] = useState(0);
  const [subDescription, setSubDescription] = useState('');
  const [subHighlights, setSubHighlights] = useState('');
  const [subSections, setSubSections] = useState('');
  const [subVideoDuration, setSubVideoDuration] = useState(0);
  const [subLanguage, setSubLanguage] = useState('');
  const [subThumbnail, setSubThumbnail] = useState('');

  const [videoUrl, setVideoUrl] = useState('');
  const [uploadedVideo, setUploadedVideo] = useState('');

  const [usedLevels, setUsedLevels] = useState([]);

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const courseRef = doc(fireDB, 'courses', courseId);
      const subCollection = collection(courseRef, 'subCategories');

      const snapshot = await getDocs(subCollection);
      const existing = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        existing.push(data.level?.toLowerCase());
      });
      setUsedLevels(existing);

      if (existing.includes(subLevel.toLowerCase())) {
        toast.error(`Level '${subLevel}' already exists!`);
        return;
      }

      if (existing.length >= 3) {
        toast.error('Already has 3 subcategories.');
        return;
      }

      // ✅ Final video: URL or uploaded
      const finalVideo = videoUrl || uploadedVideo;
      if (!finalVideo) {
        toast.error('Please provide either a Video URL or upload a Video file.');
        return;
      }

      const newSub = doc(subCollection);
      await setDoc(newSub, {
        level: subLevel,
        videoUrl: finalVideo,
        subThumbnail: subThumbnail,
        price: Number(subPrice),
        courseDescription: subDescription,
        highlightedHeadings: subHighlights.split(',').map((h) => h.trim()),
        sections: subSections.split(',').map((s) => s.trim()),
        videoDuration: Number(subVideoDuration),
        language: subLanguage,
        numberOfEnrolled: 0,
        enrolledStudents: [],
        reviews: [],
      });

      toast.success(`Subcategory '${subLevel}' added!`);
      navigate(`/courses`);
    } catch (err) {
      console.error(err);
      toast.error('Failed to add subcategory');
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
              <LuArrowUpFromLine /> Manage Courses
            </li>
            <li className="px-6 py-3 bg-orange-300 font-medium">Add Subcategory</li>
          </ul>
        </nav>
        <button
          onClick={() => navigate('/courses')}
          className="mt-auto px-6 py-3 text-left flex items-center gap-2"
        >
          <FaArrowLeft /> Back
        </button>
      </div>

      {/* Main Form */}
      <div className="ml-64 flex-1 p-10 bg-white overflow-y-auto">
        <h1 className="text-2xl font-bold mb-6 text-center">Add Subcategory</h1>
        <form onSubmit={handleAdd} className="space-y-6 max-w-4xl mx-auto">
          <div>
            <label className="block mb-1">Level</label>
            <select
              value={subLevel}
              onChange={(e) => setSubLevel(e.target.value)}
              className="w-full border border-gray-300 rounded px-4 py-2"
            >
              <option value="Basic" disabled={usedLevels.includes('basic')}>Basic</option>
              <option value="Intermediate" disabled={usedLevels.includes('intermediate')}>Intermediate</option>
              <option value="Advanced" disabled={usedLevels.includes('advanced')}>Advanced</option>
            </select>
          </div>

          <InputField
            label="Price"
            type="number"
            value={subPrice}
            onChange={(e) => setSubPrice(e.target.value)}
          />

          <h2 className="text-lg font-semibold">Add Video</h2>

          <InputField
            label="Video URL"
            type="text"
            value={videoUrl}
            onChange={(e) => {
              setVideoUrl(e.target.value);
              if (e.target.value) {
                setUploadedVideo('');
              }
            }}
            placeholder="https://yourvideo.com/video.mp4"
            disabled={uploadedVideo !== ''}
          />

          <UploadBox
            label="Or Upload Video File"
            id="uploadVideoFile"
            onUpload={(url) => {
              setUploadedVideo(url);
              if (url) {
                setVideoUrl('');
              }
            }}
            disabled={videoUrl !== ''}
          />

            <UploadBox
            label="Add Sub-Course Thumbnail"
            id="sub_thumbnail"
            onUpload={(url) => setSubThumbnail(url)}
          />

          <InputField
            label="Highlighted Headings"
            value={subHighlights}
            onChange={(e) => setSubHighlights(e.target.value)}
          />

          <InputField
            label="Sections"
            value={subSections}
            onChange={(e) => setSubSections(e.target.value)}
          />

          <TextAreaField
            label="Description"
            value={subDescription}
            onChange={(e) => setSubDescription(e.target.value)}
          />

          <InputField
            label="Video Duration (min)"
            type="number"
            value={subVideoDuration}
            onChange={(e) => setSubVideoDuration(e.target.value)}
          />

          <InputField
            label="Language"
            value={subLanguage}
            onChange={(e) => setSubLanguage(e.target.value)}
          />

          <button
            type="submit"
            className="px-6 py-2 border border-gray-400 bg-gray-100 hover:bg-gray-200 rounded"
          >
            Add Subcategory
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddSubCategory;
