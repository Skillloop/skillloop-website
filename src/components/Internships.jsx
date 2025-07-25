
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { collection, getDocs } from "firebase/firestore";
import { fireDB } from "../firebase/FirebaseConfig";
import { useNavigate } from "react-router-dom";

function Internships() {
  const [internshipData, setInternshipData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchInternships = async () => {
      try {
        setLoading(true);
        const querySnapshot = await getDocs(collection(fireDB, "internships"));
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setInternshipData(data);
      } catch (error) {
        console.error("Error fetching internships:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInternships();
  }, []);

 const handleViewAll = () => {
    navigate('/internship');
    window.scrollTo(0, 0);
  };

  return (
    <>
      <motion.h1
        initial={{ opacity: 0, x: -100, y: 0 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.5 }}
        id="internships"
        className="md:text-5xl text-4xl font-bold z-10"
      >
        Internships
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, x: 0, y: 0 }}
        whileInView={{ opacity: 1, x: [200, -20, 0], y: 0 }}
        transition={{ duration: 2, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.5 }}
        className="text-gray-600 md:text-md text-sm max-w-3xl mt-4 z-10"
      >
        Kickstart your future with an internship that matters. Learn, contribute,
        and grow alongside industry leaders in a dynamic environment.
      </motion.p>

      <div className="flex w-full justify-end my-8 z-10">
        <motion.button 
          onClick={handleViewAll}
          initial={{ opacity: 0, x: 100, y: 0 }}
          whileInView={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.1 }}
          className="z-[10] text-xs md:text-sm 
            bg-gradient-to-b from-[#F4B860] to-[#D35244] 
            bg-clip-text text-transparent 
            border-2 border-[#F9A825] rounded-full 
            py-1 md:py-2 px-4 md:px-8 cursor-pointer 
            transition-all duration-300
            hover:text-white hover:bg-gradient-to-b hover:from-[#D35244] hover:to-[#F4B860] hover:bg-clip-border hover:border-white"
        >
          View All
        </motion.button>
      </div>

      <motion.div
        initial={{ opacity: 0, x: 100, y: 0 }}
        whileInView={{ opacity: 1, x: [0, -20, 0], y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.5 }}
        className="overflow-x-auto scrollbar-hide relative z-10"
      >
        {loading ? (
          <div className="w-full flex flex-col justify-center items-center py-10">
            <motion.div
              className="w-16 h-16 border-4 border-orange-400 border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
            ></motion.div>
            <div className="mt-4 text-gray-600 font-medium">Loading, please wait...</div>
          </div>
        ) : internshipData.length === 0 ? (
          <div className="w-full text-center text-gray-500 font-medium py-10">
            No internships found.
          </div>
        ) : (
          <div className="flex space-x-4 w-max pb-4">
            {internshipData.map((internship) => {
              // Get middle slice of description if it’s long
              const desc = internship.description || "";
              const midStart = Math.floor(desc.length / 3);
              const middleDesc = desc.slice(midStart, midStart + 100);

              return (
                <div
                  key={internship.id}
                  className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 p-6 w-80 flex-shrink-0 space-y-4"
                >
                  <span className="inline-block bg-[#FDF1DF] text-[#D97706] md:text-sm text-xs font-medium px-3 py-1 rounded-md">
                    {internship.place || "Remote"}
                  </span>

                  <div>
                    <h2 className="md:text-lg text-md font-bold text-gray-900">
                      {internship.internshipName || internship.title}
                    </h2>
                    <p className="text-gray-500 md:text-sm text-xs mt-1 line-clamp-2">
                      {middleDesc}...
                    </p>
                  </div>

                  <div className="flex justify-between md:text-sm text-xs text-gray-500 font-medium">
                    <span>{internship.startDate || internship.postedDate}</span>
                    <span className="text-gray-700 font-semibold">
                      ₹{internship.MinStipend} - ₹{internship.MaxStipend}
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center space-x-3">
                      <img
                        src={internship.company?.logo || "https://picsum.photos/150"}
                        alt={internship.company?.name || "Company"}
                        className="md:w-10 md:h-10 w-8 h-8 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-semibold text-sm text-gray-900">
                          {internship.company?.name}
                        </p>
                        <p className="md:text-sm text-xs text-gray-500">
                          {internship.company?.address}
                        </p>
                      </div>
                    </div>

                    {internship.googleFormLink && (
                      <a
                        href={internship.googleFormLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-auto text-xs bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-1 px-3 rounded-full transition"
                      >
                        Apply Now
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </motion.div>
    </>
  );
}

export default Internships;
