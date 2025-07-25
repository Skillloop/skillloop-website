import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const testimonials = [
  {
    id: 1,
    name: "ASHUTOSH SONI",
    role: "Advanced tier of Data Analytics",
    image: "/test1.png",
    text: `What I really liked was how this course pushed me to think like a business analyst. The integrated 
dashboard project was very practical, and the case study on sales performance forced me to apply 
everything — charts, KPIs, interpretation, and even recommendations. It felt more like a live assignment 
than a tutorial. Definitely helped me during my internship presentations.`,
  },
  {
    id: 2,
    name: "VARUN KUMAWAT",
    role: "AI & Prompt Engineering",
    image: "/test2.png",
    text: `"As a core engineer, I used to think AI was only for coders — this course proved me wrong. From basic 
tools like ChatGPT and Copilot to building full AI-powered workflows, it made everything simple and 
practical. A perfect upskilling path for any engineer looking to stay ahead. The tiered format helped me 
grow step-by-step — from writing better prompts to solving real business problems. It’s not just a course, 
it’s a career booster `,
  },
  {
    id: 3,
    name: "Vaibhav Saraswat",
    role: "AI & Prompt Engineering",
    image: "/test3.png",
    text: `Before this course, AI felt like a buzzword reserved for tech experts. But SkillLoop’s AI for Engineers 
broke it down brilliantly. From prompt writing to using AI in real-world tasks like reporting and decisionmaking — everything felt relevant and doable. It’s the kind of course that doesn’t just teach you tools, it 
changes how you work.`,
  },
   {
    id: 4,
    name: "RAVI MEENA",
    role: "MARKETING INTERN SOCIAL MEDIA MANAGER",
    image: "/test4.png",
    text: `Receiving a PPO from SkillLoop was a proud milestone that reflected the growth I experienced 
throughout the internship. It wasn’t just about completing tasks — it was about building leadership, time 
management, and strategic thinking skills. With constant mentor support and a culture that encouraged 
initiative, I evolved from a learner to a confident professional, fully prepared not just for interviews, but 
for real-world challenges.`,
  },
     {
    id: 5,
    name: "VAIBHAV TALREJA",
    role: "HR INTERN",
    image: "/test5.png",
    text: `"My internship at SkillLoop was an eye-opener. From day one, I was given real responsibilities and 
exposure to actual corporate-style operations. The training, support, and weekly tasks helped me grow 
professionally and personally. I gained hands-on experience in HR coordination and team management, 
which I can proudly reflect on in future interviews. It was truly a rewarding journey!`,
  },
     {
    id: 6,
    name: "GORI SHANKAR JANGID",
    role: "MARKETING INTERN",
    image: "/test6.png",
    text: `My time as a Sales Intern at SkillLoop was filled with learning, challenges, and growth. From lead 
generation to pitching and closing sales, I experienced the entire cycle hands-on. What stood out the most 
was how SkillLoop trusted interns with real responsibilities — it pushed me to become more confident 
and target-driven. The weekly reviews and performance feedback helped me improve quickly. I’d highly 
recommend this to anyone looking to sharpen their sales and communication skills.`,
  },
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(1);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const next = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setActiveIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  const active = testimonials[activeIndex];

  return (
    <div className="lg:p-16 md:p-8 p-4 mb-8 overflow-y-visible" id="testimonials">
        <motion.h1 
          initial={{ opacity: 0, x: -100, y: 0 }}
          whileInView={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.5 }}
          className="md:text-5xl text-4xl font-bold text-gray-900 mb-4">Testimonials</motion.h1>
        <div className="justify-center relative flex flex-col items-center md:gap-8 gap-2">
            
            <motion.div 
              initial={{ opacity: 1, x: 0, y: 100 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.5 }}
              className="bg-linear-to-b from-[#F9A825] to-[#F4B860] text-white p-4 rounded-full shadow-[-21px_34px_37.8px_rgba(0,0,0,0.25)] md:w-16 md:h-16 h-12 w-12">
                <motion.img src='/quote.svg' alt="Quote Icon" 
                  initial={{ opacity: 0, x: -100, y: 0 }}
                  whileInView={{ opacity: 1, x: [0, 10, 0], y: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
                  viewport={{ once: true, amount: 0.5 }}
                  className="w-full h-full" />
            </motion.div>

            <motion.div 
              initial={{ opacity: 1, x: 0, y: 100 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.2 }}
              className="rounded-t-xl shadow-[-21px_34px_37.8px_rgba(0,0,0,0.25)] bg-[#F9F6F0] md:w-[80vw] w-full flex flex-col">
                <div className="relative flex flex-col items-center text-center font-semibold bg-white rounded-br-full md:text-xl text-sm md:py-4 p-10">
                    <p>Millions search for answers every month…</p>
                    <p>But true growth comes from structured learning</p>
                    <span className="absolute top-0 right-0 transform md:translate-x-1/2 -translate-y-1/2 md:h-16 md:w-16 h-12 w-12 bg-[#F4B860] rounded-full shadow-[#FF727242] shadow-lg"></span>
                </div>

                <div className="bg-white">
                    <div className="bg-[#F9F6F0] p-6 rounded-tl-[150px] flex md:flex-row flex-col items-center justify-around md:px-24 px-4 md:py-12 py-2 md:gap-8 gap-4">
                        <div className="relative min-w-[150px] min-h-[150px] flex items-center justify-center">
                            <div className="bg-[#E28050]/50 rounded-md p-1 -mb-3 z-0 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 sm:w-[75px] sm:h-[190px] w-[50px] h-[140px]"></div>
                            <img
                                src={active.image}
                                alt={active.name}
                                className="rounded-lg relative z-10 sm:w-[150px] sm:h-[150px] w-[100px] h-[100px] object-cover "
                            />
                        </div>
                        <div className="text-gray-600 text-sm mt-8 md:mt-0 text-left max-w-xl transition-all duration-500 ease-in-out">
                            <p className="font-semibold text-lg mb-2">{active.name}</p>
                            <p className="text-gray-500">{active.role}</p>
                            <p>{active.text}</p>
                        </div>
                    </div>   
                </div>

                <div className="relative">
                    <span className="absolute bottom-0 left-0 transform -translate-x-1/2 translate-y-1/2 sm:h-32 sm:w-32 h-16 w-16 rounded-full bg-[#E28050] z-5 blur-sm opacity-50 "></span>
                    <div className="relative flex justify-center items-center gap-6 md:py-0 py-4 overflow-clip">
                    <span className="absolute bottom-0 left-0 transform -translate-x-1/2 translate-y-1/2 sm:h-32 sm:w-32 h-16 w-16 md:border-[1rem] border-4 rounded-full border-[#E28050] bg-[#F9F6F0] z-5"></span>
                    
                    <button
                        onClick={prev}
                        className="p-2 rounded-full transition z-10"
                    >
                        ←
                    </button>

                    <div className="flex justify-center items-center gap-2 transition-all duration-500 ease-in-out relative">
                        {testimonials.map((t, index) => {
                            let position = index - activeIndex;
                            
                            // Loop positioning for carousel effect
                            if (position < -1) position += testimonials.length;
                            if (position > 1) position -= testimonials.length;
                            
                            const isActive = position === 0;
                            const opacity = Math.abs(position) > 1 ? 0 : 1;
                            const translateX = windowWidth > 480 ? position * 80 : position * 50;
                            
                            return (
                                <img
                                    key={t.id}
                                    src={t.image}
                                    alt={`Avatar ${t.name}`}
                                    className={`rounded-full cursor-pointer transition-all duration-500 ease-in-out absolute ${
                                        isActive ? "sm:h-16 sm:w-16 h-12 w-12 opacity-100" : "sm:h-8 sm:w-8 h-6 w-6 opacity-40"
                                    }`}
                                    style={{
                                        transform: `translateX(${translateX}px)`,
                                        zIndex: 10 - Math.abs(position),
                                        opacity,
                                    }}
                                    onClick={() => setActiveIndex(index)}
                                />
                            );
                        })}
                        <div className="sm:w-48 sm:h-24 h-18 w-36 opacity-0"></div>
                    </div>

                    <button
                        onClick={next}
                        className="p-2 rounded-full transition"
                    >
                        →
                    </button>
                    </div>
                </div>          
            </motion.div>
        </div>
    </div>
  );
};

export default Testimonials;
