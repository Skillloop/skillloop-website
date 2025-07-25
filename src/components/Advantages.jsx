import { useState } from "react";
import { motion } from "framer-motion";
import AdvantageCard from "./AdvantageCard";

const advantages = [
  {
    id: 1,
    title: "Affordable, High-Impact Courses",
    description:
      "Gain industry-relevant skills like Excel, Power BI, Tableau, and HR analytics at just ₹599–₹999 — no overpriced fluff.",
    color: "#A6CEAB",
  },
  {
    id: 2,
    title: "Tiered Learning Structure",
    description:
      "Choose from Basic, Intermediate, or Advanced levels — learn at your own pace and budget.",
    color: "#AADDD7",
  },
  {
    id: 3,
    title: "Real Internship Experience",
    description:
      "Our HR and Sales internship model gives hands-on exposure in recruitment, onboarding, and client handling — not just theory.",
    color: "#F4B860",
  },
  {
    id: 4,
    title: "Performance-Based Stipends",
    description:
      "Earn while you learn — get ₹6,000 for meeting clear, achievable targets over two months.",
    color: "#FF69B4",
  },
  {
    id: 5,
    title: "Skill-Building + Earning Loop",
    description:
      "The more you learn and perform, the more opportunities you get — a true SkillLoop in action.",
    color: "#1E90FF",
  },
  {
    id: 6,
    title: "Certification with Credibility",
    description:
      "Get completion certificates for each course level — great for resumes and LinkedIn profiles.",
    color: "#FF8C00",
  },
  {
    id: 7,
    title: "Community & Mentorship",
    description:
      "Be part of a thriving learner network with support from mentors, peers, and recruiters.",
    color: "#32CD32",
  },
  {
    id: 8,
    title: "Zero Prior Experience Needed",
    description:
      "Whether you're a student or a fresher — start from scratch and build confidence step by step.",
    color: "#BA55D3",
  },
];


function AdvantageCarousel() {
  const [activeIndex, setActiveIndex] = useState(2);
  const [displayIndex, setDisplayIndex] = useState(2);
  const [slideOutIndex, setSlideOutIndex] = useState(null);
  const [direction, setDirection] = useState(1);

  const transitionDuration = 500;

  const goTo = (dir) => {
    const newIndex = (activeIndex + dir + advantages.length) % advantages.length;
    setSlideOutIndex(activeIndex);
    setDirection(dir);
    setActiveIndex(newIndex);

    setTimeout(() => {
      setSlideOutIndex(null);
      setDisplayIndex(newIndex);
    }, transitionDuration);
  };

  const next = () => goTo(1);
  const prev = () => goTo(-1);

  return (
    <section className="flex flex-col items-center justify-start w-full h-full">
       <motion.h1 
        initial={{ opacity: 0, x: 100, y: 0 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.3 }}
        className="md:text-5xl text-4xl font-semibold leading-tight w-full md:text-right text-left">Your Advantages</motion.h1>
       {/* Navigation Buttons */}
         <div className="flex items-end justify-end gap-6 my-6 z-10 w-full">
            <button
            onClick={prev}
            className="bg-white border-2 border-[#F9A825] hover:border-none text-orange-500 hover:bg-linear-to-b hover:from-[#F4B860] hover:to-[#D35244] hover:text-white transition rounded-full w-10 h-10 flex items-center justify-center"
            >
            ←
            </button>
            <button
            onClick={next}
            className="bg-white border-2 border-[#F9A825] hover:border-none text-orange-500 hover:bg-linear-to-b hover:from-[#F4B860] hover:to-[#D35244] hover:text-white transition rounded-full w-10 h-10 flex items-center justify-center"
              >
            →
            </button>
        </div>
      <div className="md:w-[42vw] w-[100vw] px-4 py-10 flex flex-col items-center justify-center relative overflow-x-visible">
        

        <div className="relative w-full max-w-6xl h-[450px]">
          {advantages.map((advantage, index) => {
            let position = index - displayIndex;

            if (position < -Math.floor(advantages.length / 2))
              position += advantages.length;
            if (position > Math.floor(advantages.length / 2))
              position -= advantages.length;

            const isActive = index === activeIndex;
            const isSlidingOut = index === slideOutIndex;

            const rotate = position * 4;
            const translateY = Math.abs(position) * 5;

            const zIndex = isActive
              ? 46
              : isSlidingOut
              ? 47
              : 43 - Math.abs(position);

            return (
              <motion.div
                key={advantage.id}
                initial={{
                  opacity: 0,
                  x: "-50%",
                  y: "-50%",
                  rotate: 0,
                }}
                animate={{
                  opacity: 1,
                  x: isSlidingOut
                    ? direction === 1
                      ? "80%"
                      : "-80%"
                    : "-50%",
                  y: `calc(-50% + ${translateY}px)`,
                  rotate,
                }}
                transition={{ duration: transitionDuration / 1000 }}
                className="absolute left-1/2 top-1/2"
                style={{
                  zIndex,
                }}
              >
                <AdvantageCard {...advantage} isActive={index === displayIndex} />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default AdvantageCarousel;

