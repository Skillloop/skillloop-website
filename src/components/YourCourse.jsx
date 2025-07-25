
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { fireDB } from "../firebase/FirebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function YourCourse() {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const courses = user?.yourCourses || [];

  const [statusMap, setStatusMap] = useState({});

  const statusColor = {
    Complete: "bg-[#E4EDE8] text-[#68946D]",
    Ongoing: "bg-[#D1EAFF] text-[#51749C]",
  };

  useEffect(() => {
    const fetchStatuses = async () => {
      if (!user || courses.length === 0) return;

      const newStatusMap = {};

      for (const course of courses) {
        const progressRef = doc(
          fireDB,
          "userProgress",
          `${user.uid}_${course.courseId}_${course.subCourseId}`
        );
        const progressSnap = await getDoc(progressRef);

        if (progressSnap.exists()) {
          const data = progressSnap.data();
          newStatusMap[`${course.courseId}_${course.subCourseId}`] = data.completed
            ? "Complete"
            : "Ongoing";
        } else {
          newStatusMap[`${course.courseId}_${course.subCourseId}`] = "Ongoing";
        }
      }

      setStatusMap(newStatusMap);
    };

    fetchStatuses();
  }, [user, courses]);

  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg">
      <h2 className="text-lg font-semibold mb-4">My Course</h2>

      {/* Table layout for md+ screens */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left text-sm min-w-[600px]">
          <thead>
            <tr className="text-gray-500 border-b">
              <th className="py-2">Course Name</th>
              <th className="py-2">Status</th>
              <th className="py-2">Level</th>
              <th className="py-2">Price</th>
              <th className="py-2">Purchased At</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course, idx) => {
              const status =
                statusMap[`${course.courseId}_${course.subCourseId}`] ||
                "Ongoing";

              return (
                <tr
                  key={idx}
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() =>
                    navigate(
                      `/courses/${course.slug}/${course.courseId}/overview`,
                      {
                        state: {
                          plan: course.level,
                          price: course.price,
                        },
                      }
                    )
                  }
                >
                  <td className="flex items-center gap-3 py-3">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-10 h-10 rounded-md object-cover"
                    />
                    <span>{course.title}</span>
                  </td>
                  <td>
                    <span
                      className={`px-3 py-1 text-xs font-medium rounded-full ${statusColor[status]}`}
                    >
                      {status}
                    </span>
                  </td>
                  <td>{course.level || "—"}</td>
                  <td>₹{course.price || "—"}</td>
                  <td>
                    {course.purchasedAt
                      ? new Date(course.purchasedAt).toLocaleDateString()
                      : "—"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Card layout for small screens */}
      <div className="md:hidden space-y-4">
        {courses.map((course, idx) => {
          const status =
            statusMap[`${course.courseId}_${course.subCourseId}`] || "Ongoing";

          return (
            <div
              key={idx}
              onClick={() =>
                navigate(
                  `/courses/${course.slug}/${course.courseId}/overview`,
                  {
                    state: {
                      plan: course.level,
                      price: course.price,
                    },
                  }
                )
              }
              className="border rounded-lg p-4 flex gap-4 items-center shadow-sm cursor-pointer"
            >
              <img
                src={course.image}
                alt={course.title}
                className="w-16 h-16 rounded-md object-cover"
              />
              <div className="flex-1 space-y-1">
                <p className="font-medium">{course.title}</p>
                <span
                  className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${statusColor[status]}`}
                >
                  {status}
                </span>
                <p className="text-xs text-gray-600">
                  Level: {course.level || "—"}
                </p>
                <p className="text-xs text-gray-600">
                  Price: ₹{course.price || "—"}
                </p>
                <p className="text-xs text-gray-600">
                  Purchased:{" "}
                  {course.purchasedAt
                    ? new Date(course.purchasedAt).toLocaleDateString()
                    : "—"}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

