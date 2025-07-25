import React from "react";

export default function EnrollmentTable({ students = [] }) {
  return (
    <table className="w-full text-xs text-left bg-white rounded-lg overflow-hidden border border-gray-300 shadow">
      <thead className="bg-gray-100 text-gray-500">
        <tr>
          {[
            "Enrollment Id",
            "Payment Id",
            "Full Name",
            "Contact Email",
            "Contact Number",
            "Course Enrolled",
            "Enrolled On",
          ].map((heading, index, array) => (
            <th
              key={heading}
              className={`px-4 py-2 border-b border-gray-300 ${
                index !== array.length - 1 ? "border-r border-gray-300" : ""
              }`}
            >
              {heading}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {students.length === 0 ? (
          <tr>
            <td colSpan="5" className="px-4 py-4 text-center text-gray-500">
              No enrollments found.
            </td>
          </tr>
        ) : (
          students.map((student, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="px-4 py-2 border-b border-gray-200">
                {index + 1}
              </td>
              <td className="px-4 py-2 border-b border-gray-200">
                {student.paymentId || "N/A"}
              </td>
              <td className="px-4 py-2 border-b border-gray-200">
                {student.name || "N/A"}
              </td>
              <td className="px-4 py-2 border-b border-gray-200">
                {student.email || "N/A"}
              </td>
              <td className="px-4 py-2 border-b border-gray-200">
                {student.contact || "N/A"}
              </td>
              <td className="px-4 py-2 border-b border-gray-200">
                {student.courseTitle || "N/A"}
              </td>
              <td className="px-4 py-2 border-b border-gray-200">
                {student.purchasedAt
                  ? new Date(student.purchasedAt).toLocaleString("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })
                  : "N/A"}
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}

// const EnrollmentTable = ({ enrollments }) => (
//   <table className="w-full text-xs text-left bg-white rounded-lg overflow-hidden border border-gray-300 shadow">
//     <thead className="bg-gray-100 text-gray-500">
//       <tr>
//         {[
//           "Enrollment Id",
//           "Full Name",
//           "Contact Number",
//           "Email Id",
//           "Course Enrolled",
//           "Enrolled On",
//         ].map((heading, index, array) => (
//           <th
//             key={heading}
//             className={`px-4 py-2 border-b border-gray-300 ${
//               index !== array.length - 1 ? "border-r border-gray-300" : ""
//             }`}
//           >
//             {heading}
//           </th>
//         ))}
//       </tr>
//     </thead>
//     <tbody>
//       {enrollments.slice(0, 5).map((enroll, idx) => (
//         <tr key={idx} className="border-b border-gray-300">
//           <td className="px-4 py-2">{enroll.enrollmentId}</td>
//           <td className="px-4 py-2">{enroll.fullName}</td>
//           <td className="px-4 py-2">{enroll.contactNumber}</td>
//           <td className="px-4 py-2">{enroll.email}</td>
//           <td className="px-4 py-2">{enroll.courseName}</td>
//           <td className="px-4 py-2">{new Date(enroll.createdAt).toLocaleDateString()}</td>
//         </tr>
//       ))}
//     </tbody>
//   </table>
// );
// export default EnrollmentTable;
