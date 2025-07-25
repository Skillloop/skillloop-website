

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import { collection, getDocs } from 'firebase/firestore';
import { fireDB } from '../firebase/FirebaseConfig';
import Loading from '../components/Loader';

const CourseDetails = () => {
  const navigate = useNavigate();

  // 👇 Store fetched courses
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const querySnapshot = await getDocs(collection(fireDB, 'courses'));
        const courseList = [];
        querySnapshot.forEach((doc) => {
          courseList.push({ id: doc.id, ...doc.data() });
        });
        setCourses(courseList);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

  return (
    <>
      <div className="max-w-6xl mx-auto px-4 py-12 text-gray-800">
        <h1 className="text-2xl md:text-4xl font-bold mb-6 text-center md:text-left">Explore Courses</h1>

        {courses.length === 0 ? (
          <Loading/>
        ) : (
          courses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-xl border shadow-sm p-2 md:p-4 mb-6 flex flex-col md:flex-row items-center md:items-start justify-between gap-4 md:gap-6"
            >
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-full md:w-36 h-34 md:h-20 rounded-md object-cover"
              />
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-lg font-semibold">{course.title}</h2>
                <p className="text-gray-600 text-sm mt-1">
                  {course.onelineDescription}
                </p>
              </div>
              <button
                onClick={() => {
                  navigate(`/courses/${course.seo.slug}/${course.id}/enroll`);
                  window.scrollTo({ top: 0, behavior: 'instant' });
                }}
                className="text-sm font-medium border-2 border-orange-500 text-orange-600 px-4 py-1.5 rounded-full bg-white transition-all duration-500 hover:text-white hover:border-transparent hover:bg-gradient-to-r hover:from-orange-400 hover:to-orange-600 cursor-pointer lg:mt-6 md:mt-6"
              >
                View All
              </button>
            </div>
          ))
        )}
      </div>

      <div className="bg-[linear-gradient(to_right,white,#f0fdf4,#fefce8,white)]">
        <Footer />
      </div>
    </>
  );
};

export default CourseDetails;
