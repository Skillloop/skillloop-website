
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RiCalendarScheduleLine } from "react-icons/ri";
import { TbCertificate, TbChecklist, TbShoppingBagSearch } from "react-icons/tb";
import CourseTopicCard from "./CourseTopicCard";
import { fireDB } from "../firebase/FirebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  const courses = user?.yourCourses || [];
  const [statusMap, setStatusMap] = useState({});
  const [certificateCount, setCertificateCount] = useState(0);

  const internshipCount = 2;
  const appliedJobsCount = 3;

  const statusColor = {
    Complete: "bg-[#E4EDE8] text-[#68946D]",
    Ongoing: "bg-[#D1EAFF] text-[#51749C]",
  };

  useEffect(() => {
    const fetchStatusesAndCertificates = async () => {
      if (!user || courses.length === 0) return;

      const newStatusMap = {};
      let certCount = 0;

      for (const course of courses) {
        // ✅ Count if certificateGenerated is true
        if (course.certificateGenerated === true) {
          certCount++;
        }

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
      setCertificateCount(certCount);
    };

    fetchStatusesAndCertificates();
  }, [user, courses]);

  return (
    <div className="p-4 md:p-6 flex flex-col xl:flex-row gap-6">
      {/* Main content */}
      <div className="flex-1 flex flex-col gap-6">
        {/* Top Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {[
            {
              label: "My Courses",
              value: courses.length,
              icon: (
                <RiCalendarScheduleLine
                  size={32}
                  className="text-[#2A9D8F]"
                />
              ),
            },
            {
              label: "Certificates",
              value: certificateCount,
              icon: (
                <TbCertificate size={32} className="text-[#E76F51]" />
              ),
            },
            {
              label: "Internships",
              value: internshipCount,
              icon: (
                <TbChecklist size={32} className="text-[#A6CEAB]" />
              ),
            },
            {
              label: "Applied Jobs",
              value: appliedJobsCount,
              icon: (
                <TbShoppingBagSearch
                  size={32}
                  className="text-[#DDA89A]"
                />
              ),
            },
          ].map((stat, idx) => (
            <div
              key={idx}
              className="border rounded-lg px-4 py-6 shadow-sm bg-white"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="text-gray-500 font-semibold">
                  {stat.icon}
                </div>
                <p className="text-md text-gray-600">{stat.label}</p>
              </div>
              <p className="text-3xl font-bold">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* My Courses Table */}
        <div className="bg-white rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-4">My Courses</h2>

          {courses.length === 0 ? (
            <p className="text-gray-500">
              You have not purchased any courses yet.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm min-w-[500px]">
                <thead>
                  <tr className="text-gray-500 border-b">
                    <th className="py-2">Course Name</th>
                    <th className="py-2">Status</th>
                    <th className="py-2">Purchased At</th>
                  </tr>
                </thead>
                <tbody>
                  {courses.map((course, idx) => {
                    const status =
                      statusMap[`${course.courseId}_${course.subCourseId}`] || "Ongoing";

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
          )}
        </div>
      </div>

      {/* Course Topic Card */}
      <div className="w-full lg:w-[300px] flex-shrink-0">
        <CourseTopicCard courses={courses} />
      </div>
    </div>
  );
};

export default UserDashboard;







