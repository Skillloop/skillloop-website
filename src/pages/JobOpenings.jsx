import { useState, useEffect } from "react";
import { JobHeader } from "../components/JobHeader.jsx";
import { JobSidebar } from "../components/Layout/JobSidebar.jsx";
import Footer from "../components/Footer.jsx";
import Background from "../ui/Background.jsx";
import Loading from "../components/Loader.jsx";
import { collection, getDocs } from "firebase/firestore";
import { fireDB } from "../firebase/FirebaseConfig";

const initialFilters = {
  types: [
    { label: "Full Time", checked: false },
    { label: "Part Time", checked: false },
    { label: "Contract", checked: false },
    { label: "Remote", checked: false },
    { label: "Training", checked: false }
  ],
  experience: [
    { label: "Entry Level", checked: false },
    { label: "Mid-Level", checked: false },
    { label: "Senior Level", checked: false },
    { label: "No Experience", checked: false }
  ]
};

const JOBS_PER_PAGE = 6;

export default function JobOpenings() {
  const [filters, setFilters] = useState(initialFilters);
  const [allJobs, setAllJobs] = useState([]);
  const [visibleJobs, setVisibleJobs] = useState([]);
  const [page, setPage] = useState(1);
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const [loading, setLoading] = useState(true);

  const totalPages = Math.ceil(allJobs.length / JOBS_PER_PAGE);

  const handleFilterChange = (label) => {
    const updatedFilters = { ...filters };
    const updateGroup = (group) =>
      group.map((f) => f.label === label ? { ...f, checked: !f.checked } : f);

    updatedFilters.types = updateGroup(updatedFilters.types);
    updatedFilters.experience = updateGroup(updatedFilters.experience);
    setFilters(updatedFilters);
  };

  const handleShowMore = () => {
    if (page < totalPages) {
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const snapshot = await getDocs(collection(fireDB, "jobOpenings"));
        const jobsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAllJobs(jobsData);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  useEffect(() => {
    const startIndex = 0;
    const endIndex = page * JOBS_PER_PAGE;

    // Example: if you later wire filters, filter here!
    const filtered = allJobs; // Add filter logic here if needed
    const paginated = filtered.slice(0, endIndex);

    setVisibleJobs(paginated);
  }, [allJobs, page, filters]);

  return (
    <>
      <div className="min-h-screen">
        <JobHeader />

        {/* Mobile Filter Toggle */}
        <div className="md:hidden flex justify-end px-4 sm:px-8 lg:px-16 mt-4">
          <button
            onClick={() => setShowMobileFilter(!showMobileFilter)}
            className="px-4 py-2 border rounded-md border-gray-300 text-sm"
          >
            {showMobileFilter ? "Hide Filters" : "Show Filters"}
          </button>
        </div>

        {/* Dropdown Filter for Mobile */}
        {showMobileFilter && (
          <div className="md:hidden px-4 sm:px-8 lg:px-16 py-4 bg-white z-10">
            <JobSidebar filters={filters} onChange={handleFilterChange} />
          </div>
        )}

        <div className="flex flex-col sm:flex-row px-4 sm:px-8 lg:px-16 py-8 gap-8">
          {/* Sidebar for Desktop */}
          <div className="hidden md:block">
            <JobSidebar filters={filters} onChange={handleFilterChange} />
          </div>

          {loading ? (
            <div className="w-full flex flex-col justify-center items-center py-10">
              <Loading />
            </div>
          ) : visibleJobs.length === 0 ? (
            <div className="text-center text-gray-500 font-medium py-10">
              No jobs found.
            </div>
          ) : (
            <div className="flex-1">
              <p className="text-xl my-4">
                Showing <span className="font-bold">{visibleJobs.length}</span> jobs
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {visibleJobs.map((job) => {
                  const desc = job.description || "";
                  const shortDesc = desc.slice(0, 100);

                  return (
                    <div
                      key={job.id}
                      className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 p-6 flex flex-col space-y-4"
                    >
                      <span className="inline-block bg-[#FDF1DF] text-[#D97706] md:text-sm text-xs font-medium px-3 py-1 rounded-md">
                        {job.location || job.jobType || "N/A"}
                      </span>

                      <div>
                        <h2 className="md:text-lg text-md font-bold text-gray-900">
                          {job.title || "Untitled Job"}
                        </h2>
                        <p className="text-gray-500 text-sm mt-1 line-clamp-2">
                          {shortDesc}...
                        </p>
                      </div>

                      <div className="flex justify-between md:text-sm text-xs text-gray-500 font-medium">
                        <span>{job.startDate || "TBD"}</span>
                        <span className="text-gray-700 font-semibold">
                          {job.MinSalary && job.MaxSalary
                            ? `₹${job.MinSalary}–₹${job.MaxSalary}`
                            : ""}
                        </span>
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center space-x-3">
                          {job.company?.logo && (
                            <img
                              src={job.company.logo}
                              alt={job.company?.name || "Company"}
                              className="md:w-10 md:h-10 h-8 w-8 rounded-full object-cover"
                            />
                          )}
                          <div>
                            <p className="font-semibold text-sm text-gray-900">
                              {job.company?.name || "Company"}
                            </p>
                            <p className="md:text-sm text-xs text-gray-500">
                              {job.company?.address || job.location || "N/A"}
                            </p>
                          </div>
                        </div>

                        <a
                          href={job.applicationLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ml-auto text-xs bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-1 px-3 rounded-full transition"
                        >
                          Apply Now
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>

              {page < totalPages && (
                <div className="flex justify-center mt-8">
                  <button
                    onClick={handleShowMore}
                    className="text-sm block bg-gradient-to-b from-[#F4B860] to-[#D35244] bg-clip-text text-transparent border-2 border-[#FDF1DF] rounded-full py-2 px-8 text-center z-40"
                  >
                    Show me more
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <Background>
        <Footer />
      </Background>
    </>
  );
}











// import { useState, useEffect } from "react"
// import { JobHeader } from "../components/JobHeader.jsx"
// import { JobSidebar } from "../components/Layout/JobSidebar.jsx"
// import JobCardComponent from "../components/JobCardComponent.jsx"
// import Footer from "../components/Footer.jsx"
// import Background from "../ui/Background.jsx"
// import Loading from "../components/Loader.jsx"

// const initialFilters = {
//   types: [
//     { label: "Full Time", checked: false },
//     { label: "Part Time", checked: false },
//     { label: "Contract", checked: false },
//     { label: "Remote", checked: false },
//     { label: "Training", checked: false }
//   ],
//   experience: [
//     { label: "Entry Level", checked: false },
//     { label: "Mid-Level", checked: false },
//     { label: "Senior Level", checked: false },
//     { label: "No Experience", checked: false }
//   ]
// }

// const jobData = [
//   { title: "Financial Analyst", location: "Babasora, Odisha", type: "Full Time", date: "June 8, 2022", by: "Gramecare", image: "https://picsum.photos/id/1011/300", employeer_image: "https://picsum.photos/200" },
//   { title: "Human Resource Coordinator", location: "Babasora, Odisha", type: "Full Time", date: "June 8, 2022", by: "Gramecare", image: "https://picsum.photos/id/1012/300", employeer_image: "https://picsum.photos/200" },
//   { title: "Financial Analyst", location: "Babasora, Odisha", type: "Full Time", date: "June 8, 2022", by: "Gramecare", image: "https://picsum.photos/id/1013/300", employeer_image: "https://picsum.photos/200" },
//   { title: "Human Resource Coordinator", location: "Babasora, Odisha", type: "Full Time", date: "June 8, 2022", by: "Gramecare", image: "https://picsum.photos/id/1014/300", employeer_image: "https://picsum.photos/200" },
//   { title: "Financial Analyst", location: "Babasora, Odisha", type: "Full Time", date: "June 8, 2022", by: "Gramecare", image: "https://picsum.photos/id/1015/300", employeer_image: "https://picsum.photos/200" },
//   { title: "Human Resource Coordinator", location: "Babasora, Odisha", type: "Full Time", date: "June 8, 2022", by: "Gramecare", image: "https://picsum.photos/id/1016/300", employeer_image: "https://picsum.photos/200" },
//   { title: "Financial Analyst", location: "Babasora, Odisha", type: "Full Time", date: "June 8, 2022", by: "Gramecare", image: "https://picsum.photos/id/1020/300", employeer_image: "https://picsum.photos/200" },
//   { title: "Human Resource Coordinator", location: "Babasora, Odisha", type: "Full Time", date: "June 8, 2022", by: "Gramecare", image: "https://picsum.photos/id/1018/300", employeer_image: "https://picsum.photos/200" },
//   { title: "Financial Analyst", location: "Babasora, Odisha", type: "Full Time", date: "June 8, 2022", by: "Gramecare", image: "https://picsum.photos/id/1019/300", employeer_image: "https://picsum.photos/200" }
// ]

// const JOBS_PER_PAGE = 6

// export default function JobOpenings() {
//   const [filters, setFilters] = useState(initialFilters)
//   const [page, setPage] = useState(1)
//   const [showMobileFilter, setShowMobileFilter] = useState(false)
//   const [loading, setLoading] = useState(true)

//   const totalPages = Math.ceil(jobData.length / JOBS_PER_PAGE)

//   const handleFilterChange = (label) => {
//     const updatedFilters = { ...filters }
//     const updateGroup = (group) =>
//       group.map((f) => f.label === label ? { ...f, checked: !f.checked } : f)

//     updatedFilters.types = updateGroup(updatedFilters.types)
//     updatedFilters.experience = updateGroup(updatedFilters.experience)
//     setFilters(updatedFilters)
//   }

//   const handleShowMore = () => {
//     if (page < totalPages) {
//       setPage(prev => prev + 1)
//     }
//   }

//   const [visibleJobs, setVisibleJobs] = useState([])

//   useEffect(() => {
//     setLoading(true)
//     const startIndex = (page - 1) * JOBS_PER_PAGE
//     const endIndex = startIndex + JOBS_PER_PAGE
//     const sliced = jobData.slice(startIndex, endIndex)
//     setVisibleJobs(sliced)
//     const timer = setTimeout(() => {
//       setLoading(false)
//     }, 1000) // simulate 1s delay
//     return () => clearTimeout(timer)
//   }, [page, filters])
  

//   return (
//     <>
//     <div className="min-h-screen">
//       <JobHeader />

//       {/* Mobile Filter Toggle */}
//       <div className="md:hidden flex justify-end px-4 sm:px-8 lg:px-16 mt-4">
//         <button
//           onClick={() => setShowMobileFilter(!showMobileFilter)}
//           className="px-4 py-2 border rounded-md border-gray-300 text-sm"
//         >
//           {showMobileFilter ? "Hide Filters" : "Show Filters"}
//         </button>
//       </div>

//       {/* Dropdown Filter for Mobile */}
//       {showMobileFilter && (
//         <div className="md:hidden px-4 sm:px-8 lg:px-16 py-4 bg-white z-10">
//           <JobSidebar filters={filters} onChange={handleFilterChange} />
//         </div>
//       )}

//       <div className="flex flex-col sm:flex-row px-4 sm:px-8 lg:px-16 py-8 gap-8">
//         {/* Sidebar for Desktop */}
//         <div className="hidden md:block">
//           <JobSidebar filters={filters} onChange={handleFilterChange} />
//         </div>

//         {loading ? (
//           <div className="w-full flex flex-col justify-center items-center py-10">
//             <Loading />
//           </div>
//         ) : visibleJobs.length === 0 ? (
//           <div className="text-center text-gray-500 font-medium py-10">
//             No jobs found.
//           </div>
//         ) : (
//           <div className="flex-1">
//             <p className="text-xl my-4">
//               Showing <span className="font-bold">{visibleJobs.length}</span> jobs
//             </p>

//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//               {visibleJobs.map((job, index) => (
//                 <JobCardComponent key={index} job={job} />
//               ))}
//             </div>

//             <div className="flex justify-between items-center mt-6">
//               <div className="flex gap-2 z-40">
//                 {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
//                   <button
//                     key={p}
//                     onClick={() => setPage(p)}
//                     className={`w-8 h-8 rounded-md text-sm flex items-center justify-center border transition ${
//                       page === p
//                         ? "bg-orange-500 text-white border-orange-500"
//                         : "text-gray-500 border-gray-300 hover:border-orange-400"
//                     }`}
//                   >
//                     {p}
//                   </button>
//                 ))}
//               </div>

//               {page < totalPages && (
//                 <button
//                   onClick={handleShowMore}
//                   className="text-sm block bg-gradient-to-b from-[#F4B860] to-[#D35244] bg-clip-text text-transparent border-2 border-[#FDF1DF] rounded-full py-2 px-8 text-center z-40"
//                 >
//                   Show me more
//                 </button>
//               )}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//     <Background>
//         <Footer />
//     </Background>
//     </>
//   )
// }








