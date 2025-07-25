const Terms = () => {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Terms & Conditions
          </h1>
          <p className="text-lg text-gray-600">SkillLoop</p>
        </div>

        {/* Terms Content */}
        <div className="p-4">
          <div className="space-y-8">
            
            {/* Term 1 */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                1. Non-Refundable Courses
              </h2>
              <p className="text-gray-700 leading-relaxed">
                All course purchases are final and non-refundable. Each tier (Basic, Intermediate, 
                Advanced) must be bought separately.
              </p>
            </div>

            {/* Term 2 */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                2. Internship Policy
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Interns must meet weekly performance targets. Stipends are paid only after successful 
                2 month completion. Early exits or underperformance will lead to disqualification.
              </p>
            </div>

            {/* Term 3 */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                3. PPO Opportunity
              </h2>
              <p className="text-gray-700 leading-relaxed">
                All interns are eligible for a PPO of up to ₹8 LPA, based on performance and final 
                interview.
              </p>
            </div>

            {/* Term 4 */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                4. No Content Sharing
              </h2>
              <p className="text-gray-700 leading-relaxed">
                All course content is for personal use only. Sharing, copying, or redistributing is 
                strictly prohibited.
              </p>
            </div>

            {/* Term 5 */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                5. Code of Conduct
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Misuse of platform, fake sales, or misrepresentation may lead to immediate removal.
              </p>
            </div>

            {/* Term 6 */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                6. Modifications
              </h2>
              <p className="text-gray-700 leading-relaxed">
                SkillLoop may update course content, prices, or policies without prior notice.
              </p>
            </div>

            {/* Term 7 */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                7. Legal Jurisdiction
              </h2>
              <p className="text-gray-700 leading-relaxed">
                All disputes are subject to Jaipur, Rajasthan jurisdiction.
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;