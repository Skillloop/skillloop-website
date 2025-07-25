
import React from 'react';
import { Link } from 'react-router-dom';

const CourseTable = ({ courses, onDeleteMain, onDeleteSub }) => {
  return (
    <div className="overflow-auto border rounded-lg">
      <table className="min-w-full text-xs text-center border border-gray-200 bg-white">
        <thead className="bg-gray-100 text-gray-500">
          <tr>
            <th className="px-4 py-2 border">Thumbnail</th>
            <th className="px-4 py-2 border">Course Title</th>
            <th className="px-4 py-2 border">Level</th>
            <th className="px-4 py-2 border">Price</th>
            <th className="px-4 py-2 border">Students</th>
            <th className="px-4 py-2 border">Subcategory Actions</th>
            <th className="px-4 py-2 border">Main Course Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => {
            const hasSubs = course.subCategories && course.subCategories.length > 0;

            if (hasSubs) {
              return course.subCategories.map((sub, subIdx) => (
                <tr key={sub.id} className="border-b">
                  {subIdx === 0 && (
                    <>
                      <td rowSpan={course.subCategories.length} className="border px-4 py-2">
                        <img
                          src={course.thumbnail}
                          alt={course.title}
                          className="w-32 h-18 object-cover rounded ml-10"
                        />
                      </td>
                      <td rowSpan={course.subCategories.length} className="border px-4 py-2">
                        {course.title}
                      </td>
                    </>
                  )}
                  <td className="border px-4 py-2">{sub.level}</td>
                  <td className="border px-4 py-2">Rs.₹ {sub.price}/-</td>
                  <td className="border px-4 py-2">{sub.enrolledStudents.length}</td>
                  <td className="border px-4 py-2">
                    <div className="flex gap-2 justify-center">
                      <button className="text-xs px-2 py-1 bg-gray-200 rounded cursor-pointer">View</button>
                      {/* <button className="text-xs px-2 py-1 bg-gray-200 rounded">Edit</button> */}
                      <Link
                      to={`/courses/${course.id}/subcategory/${sub.id}/edit`}
                      className="text-xs px-2 py-1 bg-gray-200 rounded cursor-pointer"
                       >
                      Edit
                      </Link>
                      <button
                        onClick={() => onDeleteSub(course.id, sub.id)}
                        className="text-xs px-2 py-1 bg-red-200 rounded cursor-pointer"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                  {subIdx === 0 && (
                    <td rowSpan={course.subCategories.length} className="border px-4 py-2">
                      <div className="flex gap-2 justify-center">
                        <button className="text-xs px-2 py-1 bg-gray-200 rounded cursor-pointer">View</button>
                        {/* <button className="text-xs px-2 py-1 bg-gray-200 rounded cursor-pointer">Edit</button> */}
                        <Link to={`/courses/${course.id}/edit`} className="text-xs px-2 py-1 bg-gray-200 rounded cursor-pointer">
                        Edit
                        </Link>

                        <button
                          onClick={() => onDeleteMain(course.id)}
                          className="text-xs px-2 py-1 bg-red-200 rounded cursor-pointer"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ));
            } else {
              return (
                <tr key={course.id} className="border-b">
                  <td className="border px-4 py-2">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-20 h-12 object-cover rounded"
                    />
                  </td>
                  <td className="border px-4 py-2">{course.title}</td>
                  <td className="border px-4 py-2 italic text-gray-400">None</td>
                  <td className="border px-4 py-2 italic text-gray-400">None</td>
                  <td className="border px-4 py-2 italic text-gray-400">None</td>
                  <td className="border px-4 py-2 italic text-gray-400">No subcategory</td>
                  <td className="border px-4 py-2">
                    <div className="flex gap-2 justify-center ">
                      <button className="text-xs px-2 py-1 bg-gray-200 rounded cursor-pointer">View</button>
                      <button className="text-xs px-2 py-1 bg-gray-200 rounded cursor-pointer">Edit</button>
                      <button
                        onClick={() => onDeleteMain(course.id)}
                        className="text-xs px-2 py-1 bg-red-200 rounded cursor-pointer"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              );
            }
          })}
        </tbody>
      </table>
    </div>
  );
};

export default CourseTable;
