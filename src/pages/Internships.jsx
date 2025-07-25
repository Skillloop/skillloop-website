import { useState, useEffect } from "react";
import { JobSidebar } from "../components/Layout/JobSidebar.jsx";
import Footer from "../components/Footer.jsx";
import Background from "../ui/Background.jsx";
import Loading from "../components/Loader.jsx";
import { collection, getDocs } from "firebase/firestore";
import { fireDB } from "../firebase/FirebaseConfig";
import { InternshipHeader } from "../components/InternshipHeader.jsx";

const initialFilters = {
  types: [
    { label: "Full Time", checked: false },
    { label: "Part Time", checked: false },
    { label: "Remote", checked: false },
    { label: "Paid", checked: false },
    { label: "Unpaid", checked: false },
  ],
  experience: [
    { label: "No Experience", checked: false },
    { label: "Undergraduate", checked: false },
    { label: "Graduate", checked: false },
  ]
};

const INTERNSHIPS_PER_PAGE = 6;

export default function Internships() {
  const [filters, setFilters] = useState(initialFilters);
  const [allInternships, setAllInternships] = useState([]);
  const [visibleInternships, setVisibleInternships] = useState([]);
  const [page, setPage] = useState(1);
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const [loading, setLoading] = useState(true);

  const totalPages = Math.ceil(allInternships.length / INTERNSHIPS_PER_PAGE);

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
    const fetchInternships = async () => {
      setLoading(true);
      try {
        const snapshot = await getDocs(collection(fireDB, "internships"));
        const internshipsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAllInternships(internshipsData);
      } catch (error) {
        console.error("Error fetching internships:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchInternships();
  }, []);

  useEffect(() => {
    const startIndex = 0;
    const endIndex = page * INTERNSHIPS_PER_PAGE;

    // Example: if you later wire filters, filter here!
    const filtered = allInternships; // Add filter logic if needed
    const paginated = filtered.slice(0, endIndex);

    setVisibleInternships(paginated);
  }, [allInternships, page, filters]);

  return (
    <>
      <div className="min-h-screen">
        <InternshipHeader />

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
          ) : visibleInternships.length === 0 ? (
            <div className="text-center text-gray-500 font-medium py-10">
              No internships found.
            </div>
          ) : (
            <div className="flex-1">
              <p className="text-xl my-4">
                Showing <span className="font-bold">{visibleInternships.length}</span> internships
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {visibleInternships.map((internship) => {
                  const desc = internship.description || "";
                  const shortDesc = desc.slice(0, 100);

                  return (
                    <div
                      key={internship.id}
                      className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 p-6 flex flex-col space-y-4"
                    >
                      <span className="inline-block bg-[#FDF1DF] text-[#D97706] md:text-sm text-xs font-medium px-3 py-1 rounded-md">
                        {internship.place || "N/A"}
                      </span>

                      <div>
                        <h2 className="md:text-lg text-md font-bold text-gray-900">
                          {internship.internshipName || "Untitled Internship"}
                        </h2>
                        <p className="text-gray-500 text-sm mt-1 line-clamp-2">
                          {shortDesc}...
                        </p>
                      </div>

                      <div className="flex justify-between md:text-sm text-xs text-gray-500 font-medium">
                        <span>{internship.startDate || "TBD"}</span>
                        <span className="text-gray-700 font-semibold">
                          {  `₹${internship.MinStipend} - ₹${internship.MaxStipend}`}
                        </span>
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center space-x-3">
                          {internship.company?.logo && (
                            <img
                              src={internship.company.logo}
                              alt={internship.company?.name || "Company"}
                              className="md:w-10 md:h-10 h-8 w-8 rounded-full object-cover"
                            />
                          )}
                          <div>
                            <p className="font-semibold text-sm text-gray-900">
                              {internship.company?.name || "Company"}
                            </p>
                            <p className="md:text-sm text-xs text-gray-500">
                              {internship.company?.address || internship.location || "N/A"}
                            </p>
                          </div>
                        </div>

                        <a
                          href={internship.applicationLink}
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
