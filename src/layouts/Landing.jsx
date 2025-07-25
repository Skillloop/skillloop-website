import Faqs from "../components/Faqs"
import Footer from "../components/Footer"
import Hero from "../components/Hero"
import Info from "../components/Info"
import Testimonials from "../components/Testimonials"
import WhySkillLoop from "../components/WhySkillLoop"
import Background from "../ui/Background"
import Openings from "./Openings"
import Courses from "../components/Courses"


function Landing() {
  return (
    <>
        <Hero />
        <Info />
        <div className="relative overflow-hidden">
          <span className='absolute bottom-0 right-0 transform translate-x-1/2 -translate-y-1/2 aspect-square w-full max-h-[100vh] bg-[#E2D65015] rounded-full  z-0 blur-3xl'></span>
          <WhySkillLoop />
          <Courses />
        </div>
        <Openings />
        <Testimonials />
        <Background>
        <Faqs />
        <Footer />
        </Background>
    </>
  )
}

export default Landing