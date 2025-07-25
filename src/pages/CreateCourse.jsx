import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { LuArrowUpFromLine } from 'react-icons/lu';
import InputField from '../components/Form/InputField';
import TextAreaField from '../components/Form/TextAreaField';
import UploadBox from '../components/Form/UploadBox';

import { collection, doc, setDoc, getDocs } from 'firebase/firestore';
import { fireDB } from '../firebase/FirebaseConfig';
import { toast } from 'react-toastify';

const CreateCourse = () => {
  const navigate = useNavigate();

  // MAIN COURSE FIELDS
  const [courseTitle, setCourseTitle] = useState('');
  const [description, setDescription] = useState('');
  const [thumbnail, setThumbnail] = useState('');

  // Video: Two input types
  const [videoUrl, setVideoUrl] = useState('');
  const [uploadedVideo, setUploadedVideo] = useState('');

  // SEO FIELDS
  const [seoTitle, setSeoTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [slug, setSlug] = useState('');
  const [socialPreview, setSocialPreview] = useState('');

  // SUBCATEGORY FIELDS
  const [subLevel, setSubLevel] = useState('Basic');
  const [subPrice, setSubPrice] = useState(0);
  const [subDescription, setSubDescription] = useState('');
  const [subHighlights, setSubHighlights] = useState('');
  const [subSections, setSubSections] = useState('');
  const [subVideoDuration, setSubVideoDuration] = useState(0);
  const [subLanguage, setSubLanguage] = useState('');
  const [subThumbnail, setSubThumbnail] = useState('');

  // Store already used levels so we can disable them in the dropdown
  const [usedLevels, setUsedLevels] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // ✅ Final video source: URL or uploaded file
      const finalVideoPath = videoUrl || uploadedVideo;
      if (!finalVideoPath) {
        toast.error('Please provide either a video URL or upload a video file.');
        return;
      }

      // 1️⃣ Create main course doc
      const courseRef = doc(collection(fireDB, 'courses'));
      await setDoc(courseRef, {
        title: courseTitle,
        onelineDescription: description,
        thumbnail: thumbnail,
        seo: {
          title: seoTitle,
          metaDescription: metaDescription,
          slug: slug,
          socialPreview: socialPreview,
        },
      });

      // 2️⃣ Get existing subcategories under this course
      const subCategoriesCollection = collection(courseRef, 'subCategories');
      const snapshot = await getDocs(subCategoriesCollection);

      const existingLevels = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        existingLevels.push(data.level?.toLowerCase());
      });

      setUsedLevels(existingLevels);

      if (existingLevels.includes(subLevel.toLowerCase())) {
        toast.error(`A '${subLevel}' level subcategory already exists.`);
        return;
      }

      if (existingLevels.length >= 3) {
        toast.error('This course already has 3 subcategories. You cannot add more.');
        return;
      }

      // 3️⃣ Create new subcategory
      const subCategoryRef = doc(subCategoriesCollection);
      await setDoc(subCategoryRef, {
        level: subLevel,
        videoUrl: finalVideoPath,
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

      toast.success(`Course & '${subLevel}' subcategory created!`);
      navigate('/courses');
    } catch (error) {
      console.error('Error creating course:', error);
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
              <LuArrowUpFromLine /> Manage Courses
            </li>
            <li className="px-6 py-3 bg-orange-300 font-medium">Add new course</li>
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
        <h1 className="text-2xl font-semibold text-center mb-8">
          Create a New Course
        </h1>

        <form className="space-y-8 max-w-4xl mx-auto" onSubmit={handleSubmit}>
          <InputField
            label="Course Title *"
            value={courseTitle}
            onChange={(e) => setCourseTitle(e.target.value)}
            type="text"
            required
          />

          <TextAreaField
            label="Description *"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          <UploadBox
            label="Add Thumbnail"
            id="thumbnail"
            onUpload={(url) => setThumbnail(url)}
          />

          <UploadBox
            label="Add Sub-Course Thumbnail"
            id="sub_thumbnail"
            onUpload={(url) => setSubThumbnail(url)}
          />

          <h2 className="text-xl font-semibold pt-4">Video Upload</h2>
          <div className="space-y-4">
            <InputField
              label="Video URL"
              value={videoUrl}
              onChange={(e) => {
                setVideoUrl(e.target.value);
                if (e.target.value) {
                  setUploadedVideo('');
                }
              }}
              type="text"
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
          </div>

          <h2 className="text-xl font-semibold pt-4">Sub Category</h2>

          <div>
            <label className="block text-sm font-medium mb-1">
              Level (Basic/Intermediate/Advanced)
            </label>
            <select
              value={subLevel}
              onChange={(e) => setSubLevel(e.target.value)}
              className="w-full border border-gray-300 rounded px-4 py-2"
              required
            >
              <option value="Basic" disabled={usedLevels.includes('basic')}>
                Basic {usedLevels.includes('basic') && '(Already exists)'}
              </option>
              <option value="Intermediate" disabled={usedLevels.includes('intermediate')}>
                Intermediate {usedLevels.includes('intermediate') && '(Already exists)'}
              </option>
              <option value="Advanced" disabled={usedLevels.includes('advanced')}>
                Advanced {usedLevels.includes('advanced') && '(Already exists)'}
              </option>
            </select>
          </div>

          <InputField
            label="Price"
            value={subPrice}
            onChange={(e) => setSubPrice(e.target.value)}
            type="number"
            required
          />

          <InputField
            label="Highlighted Headings (comma separated)"
            value={subHighlights}
            onChange={(e) => setSubHighlights(e.target.value)}
            type="text"
            required
          />

          <TextAreaField
            label="SubCategory Description"
            value={subDescription}
            onChange={(e) => setSubDescription(e.target.value)}
            required
          />

          <InputField
            label="Sections (comma separated)"
            value={subSections}
            onChange={(e) => setSubSections(e.target.value)}
            type="text"
            required
          />

          <InputField
            label="Video Duration (minutes)"
            value={subVideoDuration}
            onChange={(e) => setSubVideoDuration(e.target.value)}
            type="number"
            required
          />

          <InputField
            label="Language"
            value={subLanguage}
            onChange={(e) => setSubLanguage(e.target.value)}
            type="text"
            required
          />

          <div className="pt-4">
            <h2 className="text-xl font-semibold mb-4">SEO Settings</h2>

            <InputField
              label="SEO Title *"
              value={seoTitle}
              onChange={(e) => setSeoTitle(e.target.value)}
              type="text"
              required
            />

            <TextAreaField
              label="Meta Description *"
              value={metaDescription}
              onChange={(e) => setMetaDescription(e.target.value)}
              required
            />

            <InputField
              label="Slug / URL Handle *"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              type="text"
              required
            />

            <UploadBox
              label="Social Share Preview"
              id="socialPreview"
              onUpload={(url) => setSocialPreview(url)}
            />
          </div>

          <div className="flex justify-around gap-4 pt-6">
            <button
              type="submit"
              className="px-6 py-2 border border-gray-400 bg-gray-100 hover:bg-gray-200 rounded"
            >
              Publish
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCourse;
