import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { fireDB } from "../firebase/FirebaseConfig";
import CourseCard from "./CourseCard";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();

  // Local fallback thumbnails
  const dupcourses = [
    { id: 1, image: "/data_analytics.jpg" },
    { id: 2, image: "/HR_Operations.jpg" },
    { id: 3, image: "Marketing.jpg" },
    { id: 4, image: "Finance.jpg" },
    { id: 5, image: "AI.jpg" },
  ];

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const snapshot = await getDocs(collection(fireDB, "courses"));
        const fetchedCourses = snapshot.docs.map((doc, index) => ({
          id: doc.id,
          image: dupcourses[index % dupcourses.length]?.image || "", // fallback image
          ...doc.data(),
        }));
        setCourses(fetchedCourses);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  const handleViewAllClick = () => {
    navigate(`/coursedetail`);
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  const next = () => {
    setActiveIndex((prev) => (prev + 1) % courses.length);
  };

  const prev = () => {
    setActiveIndex((prev) => (prev === 0 ? courses.length - 1 : prev - 1));
  };

  const coursesStructuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "SkillLoop MBA Certification Courses",
    description:
      "Comprehensive MBA-focused certification courses in Data Analytics, HR, Marketing, Finance, and AI",
    itemListElement: courses.map((course, index) => ({
      "@type": "Course",
      position: index + 1,
      name: course.title,
      description: course.onelineDescription || "",
      provider: {
        "@type": "Organization",
        name: "SkillLoop",
        url: "https://skill-loop-three.vercel.app",
      },
      educationalLevel: "Professional",
      courseMode: "Online",
      teaches: course.skills || [],
      inLanguage: "en",
      availableLanguage: "English",
      url: `https://skill-loop-three.vercel.app/courses/${course.seo?.slug}`,
    })),
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(coursesStructuredData)}
        </script>
      </Helmet>

      <section
        className="px-4 pb-4 md:px-8 md:pb-8 lg:px-16 lg:pb-16 pt-0 overflow-x-hidden"
        id="courses"
        aria-label="SkillLoop Courses"
      >
        <motion.h1
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.5 }}
          className="text-3xl md:text-4xl lg:text-5xl font-bold"
        >
          Courses
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1, x: [200, -20, 0] }}
          transition={{ duration: 2, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.5 }}
          className="text-gray-600 max-w-3xl mt-2 md:mt-4 text-sm md:text-base"
        >
          SkillLoop offers carefully designed certification programs, structured
          into three tiers —{" "}
          <span className="font-bold">
            Basic (₹599), Intermediate (₹799), and Advanced (₹999)
          </span>{" "}
          — allowing learners to grow progressively.
        </motion.p>

        <div className="flex w-full justify-end my-6">
          <motion.button
            onClick={handleViewAllClick}
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
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
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.1 }}
          className="w-full px-4 flex flex-col items-center relative overflow-hidden"
        >
          <div className="relative w-full max-w-6xl h-[450px]">
            {courses.map((course, index) => {
              let position = index - activeIndex;

              if (position < -2) position += courses.length;
              if (position > 2) position -= courses.length;

              const isActive = position === 0;
              const opacity = Math.abs(position) > 1 ? 0 : 1;
              const translateX = position * 110;
              const translateY = isActive ? 0 : 30;

              return (
                <div
                  key={course.id}
                  className="absolute top-0 left-1/2 transition-all duration-500 ease-in-out"
                  style={{
                    transform: `translateX(${translateX}%) translateX(-50%) translateY(${translateY}px)`,
                    zIndex: 10 - Math.abs(position),
                    opacity,
                    transition: "transform 0.5s, opacity 0.5s",
                    height: isActive ? "420px" : "360px",
                  }}
                >
                  <CourseCard
                    title={course.title}
                    id={course.id}
                    description={
                      course.onelineDescription?.length > 150
                        ? course.onelineDescription.slice(0, 150) + "..."
                        : course.onelineDescription
                    }
                    image={course.image} // using fallback
                    skills={course.skills}
                    slug={course.seo?.slug}
                    isActive={isActive}
                  />
                </div>
              );
            })}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center mt-6 gap-6 z-10">
            <button
              onClick={prev}
              className="bg-white border-2 border-[#F9A825] hover:border-none text-orange-500 hover:bg-gradient-to-b hover:from-[#F4B860] hover:to-[#D35244] hover:text-white transition rounded-full w-10 h-10 flex items-center justify-center"
            >
              ←
            </button>

            <div className="flex gap-2">
              {courses.map((_, idx) => (
                <div
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`w-3 h-3 rounded-full cursor-pointer transition ${
                    idx === activeIndex ? "bg-orange-500 w-6" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="bg-white border-2 border-[#F9A825] hover:border-none text-orange-500 hover:bg-gradient-to-b hover:from-[#F4B860] hover:to-[#D35244] hover:text-white transition rounded-full w-10 h-10 flex items-center justify-center"
            >
              →
            </button>
          </div>
          <div className="text-gray-600 mt-4 text-xs">
            Each course is slide-based, voiceover-enabled, and comes with a
            certificate after completion. Learners must purchase each tier
            separately. Courses are non-refundable and self-paced.
          </div>
        </motion.div>
      </section>
    </>
  );
};

export default Courses;











// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { collection, getDocs } from "firebase/firestore";
// import { fireDB } from "../firebase/FirebaseConfig";
// import CourseCard from "./CourseCard";
// import { motion } from "framer-motion";
// import { Helmet } from "react-helmet-async";

// const Courses = () => {
//   const [courses, setCourses] = useState([]);
//   const [activeIndex, setActiveIndex] = useState(0);
//   const navigate = useNavigate();

//   const dupcourses = [
//   {
//     id: 1,
//     title: "Data Analytics for MBAs",
//     description:
//       "Covers Excel, Power BI, and Tableau — from basics to building integrated dashboards and interpreting business performance data.",
//     image: "/data_analytics.jpg",
//     skills: ["Excel", "Power BI", "Tableau", "Data Visualization", "Business Intelligence"],
//     slug: "data-analytics"
//   },
//   {
//     id: 2,
//     title: "HR Operations & Analytics",
//     description:
//       "Focuses on recruitment, HRMS, ATS, and progresses to advanced analytics, budgeting, and HR scorecards.",
//     image: "/HR_Operations.jpg",
//     skills: ["HRMS", "ATS", "Recruitment Analytics", "HR Scorecards", "Budgeting"],
//     slug: "hr-operations"
//   },
//   {
//     id: 3,
//     title: "Marketing & Digital Growth",
//     description:
//       "Introduces the marketing funnel, SEO, and social media basics, then dives into ads, analytics, automation, and campaign strategy.",
//     image: "Marketing.jpg",
//     skills: ["SEO", "Social Media Marketing", "Marketing Analytics", "Campaign Strategy", "Marketing Automation"],
//     slug: "marketing-growth"
//   },
//   {
//     id: 4,
//     title: "Finance Tools & Strategy",
//     description:
//       "Starts with financial statements and budgeting, then covers valuation tools, forecasting, dashboards, and investor-focused planning.",
//     image: "Finance.jpg",
//     skills: ["Financial Modeling", "Valuation", "Forecasting", "Financial Dashboards", "Investment Planning"],
//     slug: "finance-strategy"
//   },
//   {
//     id: 5,
//     title: "AI & Prompt Engineering for MBAs",
//     description:
//       "Teaches how to use tools like ChatGPT and Notion AI for automation, content generation, and AI-powered business workflows.",
//     image: "AI.jpg",
//     skills: ["AI Automation", "Prompt Engineering", "ChatGPT", "Business AI Tools", "AI Workflows"],
//     slug: "ai-prompt-engineering"
//   },
// ];


//   useEffect(() => {
//     const fetchCourses = async () => {
//       try {
//         const snapshot = await getDocs(collection(fireDB, "courses"));
//         const fetchedCourses = snapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
//         setCourses(fetchedCourses);
//       } catch (error) {
//         console.error("Error fetching courses:", error);
//       }
//     };

//     fetchCourses();
//   }, []);

//   const handleViewAllClick = () => {
//     navigate(`/coursedetail`);
//     window.scrollTo({ top: 0, behavior: "instant" });
//   };

//   const next = () => {
//     setActiveIndex((prev) => (prev + 1) % courses.length);
//   };

//   const prev = () => {
//     setActiveIndex((prev) => (prev === 0 ? courses.length - 1 : prev - 1));
//   };

//   // JSON-LD structured data
//   const coursesStructuredData = {
//     "@context": "https://schema.org",
//     "@type": "ItemList",
//     name: "SkillLoop MBA Certification Courses",
//     description:
//       "Comprehensive MBA-focused certification courses in Data Analytics, HR, Marketing, Finance, and AI",
//     itemListElement: courses.map((course, index) => ({
//       "@type": "Course",
//       position: index + 1,
//       name: course.title,
//       description: course.onelineDescription || "",
//       provider: {
//         "@type": "Organization",
//         name: "SkillLoop",
//         url: "https://skill-loop-three.vercel.app",
//       },
//       educationalLevel: "Professional",
//       courseMode: "Online",
//       teaches: course.skills || [],
//       inLanguage: "en",
//       availableLanguage: "English",
//       url: `https://skill-loop-three.vercel.app/courses/${course.seo?.slug}`,
//     })),
//   };

//   return (
//     <>
//       <Helmet>
//         <script type="application/ld+json">
//           {JSON.stringify(coursesStructuredData)}
//         </script>
//       </Helmet>

//       <section
//         className="px-4 pb-4 md:px-8 md:pb-8 lg:px-16 lg:pb-16 pt-0 overflow-x-hidden"
//         id="courses"
//         aria-label="SkillLoop Courses"
//       >
//         <motion.h1
//           initial={{ opacity: 0, x: -100 }}
//           whileInView={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.5, ease: "easeOut" }}
//           viewport={{ once: true, amount: 0.5 }}
//           className="text-3xl md:text-4xl lg:text-5xl font-bold"
//         >
//           Courses
//         </motion.h1>

//         <motion.p
//           initial={{ opacity: 0 }}
//           whileInView={{ opacity: 1, x: [200, -20, 0] }}
//           transition={{ duration: 2, ease: "easeOut" }}
//           viewport={{ once: true, amount: 0.5 }}
//           className="text-gray-600 max-w-3xl mt-2 md:mt-4 text-sm md:text-base"
//         >
//           SkillLoop offers carefully designed certification programs, structured
//           into three tiers — <span className="font-bold">Basic (₹599), Intermediate (₹799), and Advanced (₹999)</span> — 
//           allowing learners to grow progressively.
//         </motion.p>

//         <div className="flex w-full justify-end my-6">
//           <motion.button
//             onClick={handleViewAllClick}
//             initial={{ opacity: 0, x: 100 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             transition={{ duration: 1, ease: "easeOut" }}
//             viewport={{ once: true, amount: 0.1 }}
//             className="z-[10] text-xs md:text-sm 
//                     bg-gradient-to-b from-[#F4B860] to-[#D35244] 
//                     bg-clip-text text-transparent 
//                     border-2 border-[#F9A825] rounded-full 
//                     py-1 md:py-2 px-4 md:px-8 cursor-pointer 
//                     transition-all duration-300
//                     hover:text-white hover:bg-gradient-to-b hover:from-[#D35244] hover:to-[#F4B860] hover:bg-clip-border hover:border-white"
//           >
//             View All
//           </motion.button>
//         </div>

//         <motion.div
//           initial={{ opacity: 0, y: 100 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 1, ease: "easeOut" }}
//           viewport={{ once: true, amount: 0.1 }}
//           className="w-full px-4 flex flex-col items-center relative overflow-hidden"
//         >
//           <div className="relative w-full max-w-6xl h-[450px]">
//             {courses.map((course, index) => {
//               let position = index - activeIndex;

//               if (position < -2) position += courses.length;
//               if (position > 2) position -= courses.length;

//               const isActive = position === 0;
//               const opacity = Math.abs(position) > 1 ? 0 : 1;
//               const translateX = position * 110;
//               const translateY = isActive ? 0 : 30;

//               return (
//                 <div
//                   key={course.id}
//                   className="absolute top-0 left-1/2 transition-all duration-500 ease-in-out"
//                   style={{
//                     transform: `translateX(${translateX}%) translateX(-50%) translateY(${translateY}px)`,
//                     zIndex: 10 - Math.abs(position),
//                     opacity,
//                     transition: "transform 0.5s, opacity 0.5s",
//                     height: isActive ? "420px" : "360px",
//                   }}
//                 >
//                   <CourseCard
//                     title={course.title}
//                     id={course.id}
//                     description={
//                       course.onelineDescription?.length > 150
//                         ? course.onelineDescription.slice(0, 150) + "..."
//                         : course.onelineDescription
//                     }
//                     image={course.thumbnail}
//                     skills={course.skills}
//                     slug={course.seo?.slug}
//                     isActive={isActive}
//                   />
//                 </div>
//               );
//             })}
//           </div>

//           {/* Navigation */}
//           <div className="flex items-center justify-center mt-6 gap-6 z-10">
//             <button
//               onClick={prev}
//               className="bg-white border-2 border-[#F9A825] hover:border-none text-orange-500 hover:bg-gradient-to-b hover:from-[#F4B860] hover:to-[#D35244] hover:text-white transition rounded-full w-10 h-10 flex items-center justify-center"
//             >
//               ←
//             </button>

//             <div className="flex gap-2">
//               {courses.map((_, idx) => (
//                 <div
//                   key={idx}
//                   onClick={() => setActiveIndex(idx)}
//                   className={`w-3 h-3 rounded-full cursor-pointer transition ${
//                     idx === activeIndex
//                       ? "bg-orange-500 w-6"
//                       : "bg-gray-300"
//                   }`}
//                 />
//               ))}
//             </div>

//             <button
//               onClick={next}
//               className="bg-white border-2 border-[#F9A825] hover:border-none text-orange-500 hover:bg-gradient-to-b hover:from-[#F4B860] hover:to-[#D35244] hover:text-white transition rounded-full w-10 h-10 flex items-center justify-center"
//             >
//               →
//             </button>
//           </div>
//           <div className="text-gray-600 mt-4 text-xs">
//             Each course is slide-based, voiceover-enabled, and comes with a certificate after
//             completion. Learners must purchase each tier separately. Courses are non-refundable and
//             self-paced.
//           </div>
//         </motion.div>
//       </section>
//     </>
//   );
// };

// export default Courses;






