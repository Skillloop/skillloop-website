import { motion } from 'framer-motion';

function WhySkillLoop() {
    return (
        <section className="min-h-screen lg:p-16 md:p-8 p-4 md:-mt-16 mt-4  relative overflow-hidden">
            <motion.h1 
                initial={{ opacity: 0, x: -30, y: 0 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.9 }}
                className="md:text-5xl text-4xl font-semibold text-left mb-8">Why SkillLoop ?
            </motion.h1>
            <div className="lg:grid lg:grid-cols-2 flex flex-col gap-4">
                <motion.div 
                    initial={{ opacity: 0, x: -100, y: 0 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut", staggerChildren: 1}}
                    viewport={{ once: true, amount: 0.3 }}
                    className="flex flex-col justify-around">
                    <motion.div 
                        initial={{ opacity: 1, x: 0, y: 0 }}
                        animate={{ opacity: 1, x: [0, 20, 0], y: 0 }}
                        transition={{ duration: 3, ease: "easeInOut", times: [0, 0.8, 1] }}
                        className="bg-[#FDF1DF] rounded-3xl md:px-16 px-8 py-8 mb-4 overflow-hidden md:grid md:grid-cols-2 flex flex-col gap-4 relative">
                        <img src="/vector_1.svg" alt="design" className="absolute top-0 h-full w-full object-contain" />
                        <p className="md:text-2xl text-xl font-semibold z-10">Adaptive Learning Programs</p>
                        <div className="flex flex-col items-start justify-center gap-4 z-10">
                            <p className="md:text-sm text-xs uppercase text-white px-6 py-2 bg-[#F4B860] rounded-full z-10">Class Format</p>
                            <p className="text-xs text-gray-600 z-10">Ideal for professionals balancing advanced studies with work commitments, offering flexible scheduling without fixed session constraints. Expert-Led Instruction</p>
                        </div>
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 1, x: 0, y: 0 }}
                        animate={{ opacity: 1, x: [0, 40, 0], y: 0 }}
                        transition={{ duration: 3, ease: "easeInOut", times: [0, 0.6, 1] }}
                        className="bg-[#FDF1DF] rounded-3xl md:px-16 px-8 py-8 mb-4 overflow-hidden md:grid md:grid-cols-2 flex flex-col gap-4 relative">
                        <img src="/vector_2.svg" alt="design" className="absolute top-0 h-full w-full object-contain" />
                        <span className="absolute h-16 w-16 bg-white top-0 left-0 rounded-full transform translate-x-8 -translate-y-1/2"></span>
                        <span className="absolute h-12 w-12 bg-white bottom-0 right-0 rounded-full transform -translate-x-8  -translate-y-6"></span>
                        <p className="md:text-2xl text-xl font-semibold z-10">Personalized Approach</p>
                        <div className="flex flex-col items-start justify-center gap-4 z-10">
                            <p className="md:text-sm text-xs uppercase text-white px-6 py-2 bg-[#F4B860] rounded-full z-10">Acheive goals quickly</p>
                        </div>
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 1, x: 0, y: 0 }}
                        animate={{ opacity: 1, x: [0, 60, 0], y: 0 }}
                        transition={{ duration: 3, ease: "easeInOut", times: [0, 0.4, 1] }}
                        className="bg-[#FDF1DF] rounded-3xl md:px-16 px-8 py-8 mb-4 overflow-hidden md:grid md:grid-cols-2 flex flex-col gap-4 relative">
                        <p className="md:text-2xl text-xl font-semibold">Accelerate Career Growth</p>
                        <div className="flex flex-col items-start justify-center gap-4">
                            <p className="md:text-sm text-xs uppercase text-white px-6 py-2 bg-[#F4B860] rounded-full">Improving Knowledge</p>
                        </div>
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 1, x: 0, y: 0 }}
                        animate={{ opacity: 1, x: [0, 80, 0], y: 0 }}
                        transition={{ duration: 3, ease: "easeInOut", times: [0, 0.2, 1] }}
                        className="bg-[#FDF1DF] rounded-3xl md:px-16 px-8 py-8 mb-4 overflow-hidden md:grid md:grid-cols-2 flex flex-col gap-4 relative">
                        <span className="absolute md:h-24 md:w-24 h-12 w-12 bg-white top-1/2 left-0 rounded-full transform -translate-x-1/2 -translate-y-1/2"></span>
                        <span className="absolute md:h-24 md:w-24 h-12 w-12 bg-white top-0 right-0 rounded-full transform translate-x-1/2 -translate-y-1/2"></span>
                        <span className="absolute md:h-24 md:w-24 h-12 w-12 bg-white bottom-0 right-1/4 rounded-full transform translate-x-1/2 translate-y-3/4"></span>
                        <p className="md:text-2xl text-xl font-semibold z-10">Seamless virtual learning environment</p>
                        <div className="flex flex-col items-start justify-center gap-4 z-10">
                            <p className="md:text-sm text-xs uppercase text-white px-6 py-2 bg-[#F4B860] rounded-full">STUDY FROM ANY LOCATION</p>
                        </div>
                    </motion.div>

                </motion.div>
                <motion.div
                    initial={{ opacity: 0, x: 100, y: 0 }}
                    whileInView={{ opacity: 1, x: [0, -20, 0], y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    viewport={{ once: true, amount: 0.1 }} 
                    className="hidden lg:grid lg:grid-rows-2 max-h-[80vh] gap-4 justify-around relative">
                    <img src="/why_img_1.svg" alt="Why SkillLoop" className="w-full h-full object-contain" />
                    <img src="/why_img_2.svg" alt="Why SkillLoop" className="w-full h-full object-contain" />
                </motion.div>
            </div>   
        </section>
    )
}

export default WhySkillLoop