import React, { useState, useEffect } from 'react';
import { FaPlus, FaSearch, FaFilter } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import CourseTable from '../components/tables/CourseTable';
import OngoingCourses from '../components/Chart/OngoingCourses';

import { fireDB } from '../firebase/FirebaseConfig';
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
} from 'firebase/firestore';
import Loading from '../components/Loader';

const ManageCourses = () => {
  const [courses, setCourses] = useState([]);

  const fetchCourses = async () => {
    const snapshot = await getDocs(collection(fireDB, 'courses'));
    const courseList = [];

    for (const docSnap of snapshot.docs) {
      const mainCourse = docSnap.data();
      const subSnap = await getDocs(collection(fireDB, 'courses', docSnap.id, 'subCategories'));

      const subCategories = subSnap.docs.map((sub) => ({
        id: sub.id,
        ...sub.data(),
      }));

      courseList.push({
        id: docSnap.id,
        title: mainCourse.title,
        thumbnail: mainCourse.thumbnail,
        subCategories,
      });
    }

    setCourses(courseList);
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleDeleteMainCourse = async (courseId) => {
    await deleteDoc(doc(fireDB, 'courses', courseId));
    fetchCourses();
  };

  const handleDeleteSubCategory = async (courseId, subId) => {
    await deleteDoc(doc(fireDB, 'courses', courseId, 'subCategories', subId));
    fetchCourses();
  };

  if (!courses) return <Loading />;

  return (
    <div className="p-4 md:p-6 space-y-8 text-gray-700">
      <OngoingCourses courses={courses} />

      <section>
        <h2 className="text-xl font-semibold mb-3">Add a New Course</h2>
        <Link to="/courses/new">
          <div className="w-32 h-32 sm:w-40 sm:h-40 bg-gray-200 rounded-lg flex items-center justify-center cursor-pointer shadow hover:bg-gray-300 transition">
            <FaPlus className="text-3xl sm:text-4xl text-gray-600" />
          </div>
        </Link>
      </section>

      <section>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h2 className="text-xl font-semibold">Manage Courses</h2>
          <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
            <div className="relative w-full md:w-auto">
              <input
                type="text"
                placeholder="Search"
                className="border px-3 py-1 rounded pl-8 text-sm w-full md:w-64 outline-none"
              />
              <FaSearch className="absolute left-2 top-2.5 text-gray-400 text-sm" />
            </div>
            <button className="flex items-center gap-1 border px-3 py-1 rounded text-sm hover:bg-gray-100">
              <FaFilter />
              <span>Filter</span>
            </button>
          </div>
        </div>

        <div className="w-full overflow-x-auto mt-4">
          <CourseTable
            courses={courses}
            onDeleteMain={handleDeleteMainCourse}
            onDeleteSub={handleDeleteSubCategory}
          />
        </div>
      </section>
    </div>
  );
};

export default ManageCourses;
