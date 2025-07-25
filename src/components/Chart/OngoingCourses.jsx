
import React from 'react';

const OngoingCourses = ({ courses }) => {
 if (!courses || courses.length === 0) {
    return (
      <>
      <h2 className="text-xl font-semibold mb-3">Ongoing Courses</h2>
      
      <h6 className="text-black ml-2 text-sm font-medium">
        No ongoing courses.
      </h6>
      </>
    );
  }
  return (
    <section>
      <h2 className="text-xl font-semibold mb-3">Ongoing Courses</h2>
      <div className="flex overflow-x-auto space-x-4 scrollbar-hide">
        {courses.map(course => (
          <div
            key={course.id}
            className="min-w-[320px] h-[250px] bg-gray-200 rounded-lg flex-shrink-0 shadow flex flex-col overflow-hidden"
          >
            <img src={course.thumbnail} alt="Thumbnail" className="w-full h-45 object-cover" />
            <div className="p-3">
              <h3 className="text-lg font-medium">{course.title}</h3>
              <p className="text-xs text-gray-600">{course.onelineDescription}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OngoingCourses;





// import React from 'react';

// const OngoingCourses = ({ courses }) => {
//   if (!courses) return null;

//   return (
//     <section>
//       <h2 className="text-xl font-semibold mb-3">Ongoing Courses</h2>
//       <div className="flex overflow-x-auto space-x-4 scrollbar-hide">
//         {courses.map((course) => (
//           <div
//             key={course.id}
//             className="min-w-[320px] h-[180px] bg-gray-200 rounded-lg flex-shrink-0 shadow overflow-hidden"
//           >
//             <img
//               src={course.thumbnail}
//               alt={course.title}
//               className="w-full h-full object-cover"
//             />
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default OngoingCourses;





