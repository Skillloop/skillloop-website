function Background({ children }) {
  return (
    <div className="relative w-full overflow-x-hidden -mt-16">
        {/* Top Left */}
        <span className="absolute top-1/2 left-0 transform -translate-y-3/4 w-1/3 h-1/3 bg-[#E28050] opacity-20 blur-3xl"></span>

        {/* Center Right */}
        <span className="absolute top-1/3 right-0 transform  w-1/2 h-1/2 bg-[#F9E025] opacity-20 blur-3xl z-5"></span>

        {/* Bottom Left */}
        <span className="absolute bottom-0 left-1/4 w-1/2 h-1/2 bg-[#A6CEAB] opacity-30 blur-3xl"></span>

        {/* Circle 1 */}
        <span className="absolute top-1/4 left-16 w-6 h-6 bg-[#E28050] rounded-full z-5"></span>

        {/* Circle 2 */}
        <span className="absolute top-24 left-2/12 w-3 h-3 bg-[#E28050] rounded-full z-5"></span>

        {/* Circle 3 */}
        <span className="absolute top-10 left-1/3 w-4 h-4 bg-[#A6CEAB] rounded-full z-5"></span>

        {/* Circle 4 */}
        <span className="absolute top-1/2 right-8 w-2 h-2 bg-[#F4B860] rounded-full z-5"></span>

        {/* Circle 5 */}
        <span className="absolute top-16 right-1/3 w-5 h-5 bg-[#AADDD7] rounded-full z-5"></span>

        {/* Circle 6 */}
        <span className="absolute top-1/4 right-8 w-4 h-4 bg-[#A6CEAB] rounded-full z-5"></span>

        <div className="relative z-10 pt-16">
          {children}
        </div>
    </div>
  )
}

export default Background