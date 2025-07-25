import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import InputField from '../components/Form/InputField';
import TextAreaField from '../components/Form/TextAreaField';
import UploadBox from '../components/Form/UploadBox';

import {
  doc,
  getDoc,
  updateDoc,
} from 'firebase/firestore';
import { fireDB } from '../firebase/FirebaseConfig';
import { toast } from 'react-toastify';
import { LuArrowUpFromLine } from 'react-icons/lu';
import Loading from '../components/Loader';

const EditSubCategory = () => {
  const navigate = useNavigate();
  const { courseId, subCategoryId } = useParams();

  const [loading, setLoading] = useState(true);

  // Fields for subcategory
  const [videoUrl, setVideoUrl] = useState('');
  const [uploadedVideo, setUploadedVideo] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [subPrice, setSubPrice] = useState(0);
  const [subDescription, setSubDescription] = useState('');
  const [subHighlights, setSubHighlights] = useState('');
  const [subSections, setSubSections] = useState('');
  const [subVideoDuration, setSubVideoDuration] = useState(0);
  const [subLanguage, setSubLanguage] = useState('');
  const [subLevel, setSubLevel] = useState('');

  useEffect(() => {
    const fetchSubCategory = async () => {
      try {
        const subCategoryRef = doc(
          fireDB,
          'courses',
          courseId,
          'subCategories',
          subCategoryId
        );
        const subDoc = await getDoc(subCategoryRef);

        if (subDoc.exists()) {
          const data = subDoc.data();
          setVideoUrl(data.videoUrl || '');
          setSubPrice(data.price);
          setSubDescription(data.courseDescription);
          setSubHighlights(data.highlightedHeadings?.join(', ') || '');
          setSubSections(data.sections?.join(', ') || '');
          setSubVideoDuration(data.videoDuration);
          setSubLanguage(data.language);
          setSubLevel(data.level);
          setThumbnailUrl(data.subThumbnail || '');
        } else {
          toast.error('Subcategory not found!');
          navigate('/courses');
        }
      } catch (error) {
        console.error(error);
        toast.error('Error fetching subcategory: ' + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSubCategory();
  }, [courseId, subCategoryId, navigate]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      // ✅ Final video: URL or uploaded file
      const finalVideoPath = videoUrl || uploadedVideo;
      if (!finalVideoPath) {
        toast.error('Please provide either a video URL or upload a video file.');
        return;
      }

      const subCategoryRef = doc(
        fireDB,
        'courses',
        courseId,
        'subCategories',
        subCategoryId
      );

      await updateDoc(subCategoryRef, {
        videoUrl: finalVideoPath,
        price: Number(subPrice),
        courseDescription: subDescription,
        highlightedHeadings: subHighlights.split(',').map((h) => h.trim()),
        sections: subSections.split(',').map((s) => s.trim()),
        videoDuration: Number(subVideoDuration),
        language: subLanguage,
        subThumbnail: thumbnailUrl,
      });

      toast.success(`Subcategory '${subLevel}' updated!`);
      navigate('/courses');
    } catch (error) {
      console.error(error);
      toast.error('Update failed: ' + error.message);
    }
  };

  if (loading) return <Loading />;

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
            <li className="px-6 py-3 bg-orange-300 font-medium">Edit Sub-Course</li>
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
          Edit Subcategory - {subLevel}
        </h1>

        <form className="space-y-8 max-w-4xl mx-auto" onSubmit={handleUpdate}>
          <h2 className="text-xl font-semibold">Update Video</h2>
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

          <UploadBox
            label="Update Sub-Thumbnail"
            id="sub_thumbnail"
            onUpload={(url) => setThumbnailUrl(url)}
          />

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

          <div className="flex justify-center pt-6">
            <button
              type="submit"
              className="px-6 py-2 border border-gray-400 bg-gray-100 hover:bg-gray-200 rounded"
            >
              Update Subcategory
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditSubCategory;
