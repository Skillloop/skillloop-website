function Footer() {
  return (
    <div className="px-4 pt-16 mx-auto w-full sm:max-w-xl md:max-w-full md:px-24 lg:px-8">
      {/* Top Flex Container to enable justify-between */}
      <div className="lg:flex lg:justify-between lg:items-start gap-10 mb-8">
        {/* Logo + Description */}
        <div className="mb-10 lg:mb-0 max-w-md">
          <a
            href="/"
            aria-label="Go home"
            title="Company"
            className="inline-flex items-center"
          >
            <img src="/skillLoopLogo.svg" alt="SkillLoop Logo" className="h-16 w-16" />
            <span className="ml-2 text-xl font-bold tracking-wide text-gray-800 uppercase">
              Skill Loop
            </span>
          </a>
          <div className="mt-4">
            <p className="text-sm text-gray-800">
              Grow your skills with interactive courses, internships, and job opportunities. Start your journey today!
            </p>
          </div>
        </div>

        {/* Link Sections Grid */}
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          <div>
            <p className="font-semibold tracking-wide text-gray-800">Product</p>
            <ul className="mt-2 space-y-2">
              {["Web", "eCommerce", "Business", "Entertainment", "Portfolio"].map(item => (
                <li key={item}>
                  <a href="/" className="text-gray-600 hover:text-deep-purple-accent-400 transition-colors duration-300">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-semibold tracking-wide text-gray-800">Resources</p>
            <ul className="mt-2 space-y-2">
              {["Media", "Brochure", "Nonprofit", "Educational", "Projects"].map(item => (
                <li key={item}>
                  <a href="/" className="text-gray-600 hover:text-deep-purple-accent-400 transition-colors duration-300">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-semibold tracking-wide text-gray-800">Company</p>
            <ul className="mt-2 space-y-2">
              {["Infopreneur", "Personal", "Wiki", "Forum"].map(item => (
                <li key={item}>
                  <a href="/" className="text-gray-600 hover:text-deep-purple-accent-400 transition-colors duration-300">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="flex flex-col justify-between pt-5 pb-10 border-t sm:flex-row">
        <p className="text-sm text-gray-600">© 2025 Skill Loop. All rights reserved.</p>
        <div className="flex items-center mt-4 space-x-4 sm:mt-0">
          {["Privacy Policy", "Refund Policy", "Terms & Conditions"].map((text) => (
            <a key={text} href="/terms" className="text-gray-500 underline">
              {text}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Footer;
