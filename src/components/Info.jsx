import AdvantageCarousel from "./Advantages"
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"

function Info() {
  const [showMore, setShowMore] = useState(false)

  return (
    <section className='md:grid md:grid-cols-2 flex flex-col space-x-4 lg:p-16 md:p-8 p-4 relative overflow-hidden' id="about">
      <span className='absolute top-1/2 left-0 transform -translate-x-1/2 -translate-y-1/2 aspect-square w-full max-h-screen bg-[#F98B2510] rounded-full z-0 blur-3xl'></span>

      <div className='flex flex-col items-center justify-start gap-2 w-full relative z-10'>
        <motion.h1 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.9 }}
          className="md:text-5xl text-4xl font-semibold leading-tight w-full"
        >
          About Us
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.9 }}
          className="text-sm md:text-base text-gray-600 max-w-3xl"
        >
          <p>
            At <span className="font-semibold">SkillLoop</span>, we believe that in today's competitive world,{" "}
            <span className="font-semibold">skills are the real currency of success</span>. We are not just another EdTech platform — we are a{" "}
            <span className="font-semibold">launchpad for ambition</span>, built to transform learners into professionals who lead with confidence, competence, and clarity.
          </p>

          <AnimatePresence>
            {showMore && (
              <motion.div
                key="more-content"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.5 }}
                className="overflow-hidden"
              >
                <p className="mt-4">
                  SkillLoop was founded with a bold vision: to bridge the gap between what education delivers and what the industry demands. Our goal is simple yet revolutionary — to{" "}
                  <span className="font-semibold">empower students and freshers with job-ready skills</span>, real-world exposure, and practical internship experience — all in one streamlined ecosystem.
                </p>
                <p className="mt-4">
                  We offer <span className="font-semibold">affordable, laser-focused certification courses</span> across a wide range of high-impact domains including{" "}
                  <span className="font-semibold">Data Analytics, Human Resources, Finance, Marketing, Artificial Intelligence, Business Intelligence</span>, and more. Each course is designed to be time-efficient, slide-based, and structured for maximum learning with minimal fluff.
                </p>
                <p className="mt-4">
                  What sets us apart is our <span className="font-semibold">internship-driven model</span> — where learners don’t just study, they{" "}
                  <span className="font-semibold">sell, recruit, manage, and execute</span>. At SkillLoop, we provide hands-on opportunities through live projects, real-world challenges, and performance-based rewards — helping learners build confidence and credibility before entering the corporate world.
                </p>
                <p className="mt-4">
                  At SkillLoop, learning isn't a phase. It's a loop — a journey of growth, experience, and excellence.{" "}
                  <span className="font-semibold">Learn Today. Lead Tomorrow.</span>
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <button
            onClick={() => setShowMore(!showMore)}
            className="mt-4 text-gray-600 underline text-sm"
          >
            {showMore ? "Read less" : "Read more"}
          </button>
        </motion.div>

        {/* Only show image if showMore is false */}
        {!showMore && (
          <motion.img
            key="about-image"
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
            src='/about_us.gif'
            alt='About Us'
            className='w-full md:max-w-xl sm:max-w-1/2 h-auto mt-4'
          />
        )}
      </div>

      <div className='flex flex-col items-start justify-start gap-2 w-full h-full overflow-hidden'>
        <AdvantageCarousel />
      </div>
    </section>
  )
}

export default Info
