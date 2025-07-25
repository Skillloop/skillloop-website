import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { fireDB } from '../firebase/FirebaseConfig';
import { toast } from 'react-toastify';
import InputField from '../components/Form/InputField';
import TextAreaField from '../components/Form/TextAreaField';
import UploadBox from '../components/Form/UploadBox';
import { FaArrowLeft } from 'react-icons/fa';
import { LuArrowUpFromLine } from 'react-icons/lu';
import Loading from '../components/Loader';

const EditMainCourse = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const docRef = doc(fireDB, 'courses', courseId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setCourse(docSnap.data());
        } else {
          toast.error('Course not found');
          navigate('/courses');
        }
      } catch (err) {
        console.error(err);
        toast.error('Error fetching course');
      }
    };
    fetchCourse();
  }, [courseId, navigate]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const docRef = doc(fireDB, 'courses', courseId);
      await updateDoc(docRef, {
        title: course.title,
        onelineDescription: course.onelineDescription,
        thumbnail: course.thumbnail,
        seo: course.seo,
      });
      toast.success('Course updated!');
      navigate('/courses');
    } catch (err) {
      console.error(err);
      toast.error('Update failed');
    }
  };

if (!course) return <Loading />;

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
            <li className="px-6 py-3 bg-orange-300 font-medium">Edit Main-Course</li>
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
        <h1 className="text-2xl font-bold mb-6 text-center">Edit Main Course</h1>
        <form onSubmit={handleUpdate} className="space-y-6 max-w-4xl mx-auto">
          <InputField
            label="Course Title"
            value={course.title}
            onChange={(e) => setCourse({ ...course, title: e.target.value })}
          />
          <TextAreaField
            label="Description"
            value={course.onelineDescription}
            onChange={(e) => setCourse({ ...course, onelineDescription: e.target.value })}
          />
          <UploadBox
            label="Thumbnail"
            id="thumbnail"
            onUpload={(url) => setCourse({ ...course, thumbnail: url })}
          />
          <h2 className="text-xl font-semibold">SEO Settings</h2>
          <InputField
            label="SEO Title"
            value={course.seo?.title || ''}
            onChange={(e) => setCourse({ ...course, seo: { ...course.seo, title: e.target.value } })}
          />
          <TextAreaField
            label="Meta Description"
            value={course.seo?.metaDescription || ''}
            onChange={(e) => setCourse({ ...course, seo: { ...course.seo, metaDescription: e.target.value } })}
          />
          <InputField
            label="Slug"
            value={course.seo?.slug || ''}
            onChange={(e) => setCourse({ ...course, seo: { ...course.seo, slug: e.target.value } })}
          />
          <UploadBox
            label="Social Preview"
            id="socialPreview"
            onUpload={(url) => setCourse({ ...course, seo: { ...course.seo, socialPreview: url } })}
          />
          <div className="flex justify-between pt-4">
            <button
              type="submit"
              className="px-6 py-2 border border-gray-400 bg-gray-100 hover:bg-gray-200 rounded"
            >
              Save Changes
            </button>
            <Link
              to={`/courses/${courseId}/subcategory/add`}
              className="px-6 py-2 border border-gray-400 bg-green-200 hover:bg-green-300 rounded flex items-center gap-2"
            >
              ➕ Add Subcategory
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditMainCourse;
