import React from 'react';

const CourseGridBox = () => {
  const courses = ['Course 1', 'Course 2', 'Course 3', 'Course 4', 'Course 5'];

  return (
    <div className="w-full max-w-lg mx-auto space-y-4">
     
      <div className="flex justify-between">
        {courses.slice(0, 3).map((course, index) => (
          <div
            key={index}
            className="w-28 h-16 bg-white rounded-xl flex items-center justify-center text-xs font-medium shadow"
          >
            {course}
          </div>
        ))}
      </div>

      <div className="flex justify-center space-x-4">
        {courses.slice(3).map((course, index) => (
          <div
            key={index + 3}
            className="w-28 h-16 bg-white rounded-xl flex items-center justify-center text-xs font-medium shadow"
          >
            {course}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseGridBox;






// const CourseGridDisplay = ({ courses }) => {
//   return (
//     <div className="w-full max-w-lg mx-auto space-y-4">
//       <div className="flex justify-between">
//         {courses.slice(0, 3).map((course, index) => (
//           <div key={index} className="w-28 h-16 bg-white rounded-xl flex items-center justify-center text-xs font-medium shadow">
//             {course.name || `Course ${index + 1}`}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };
// export default CourseGridDisplay;
