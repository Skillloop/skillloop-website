import { useState } from 'react';
import { motion } from 'framer-motion';

function Faqs () {
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      id: 1,
      question: "What is SkillLoop’s refund policy?",
      answer:
        "All courses purchased on SkillLoop are non-refundable. Please review the course content and structure carefully before purchasing.",
    },
    {
      id: 2,
      question: "Is there an option to upgrade from Basic to Intermediate or Advanced levels?",
      answer:
        "No, SkillLoop follows a tiered purchase model. Each level (Basic, Intermediate, Advanced) must be purchased separately.",
    },
    {
      id: 3,
      question: "Will I receive a certificate for completing a course?",
      answer:
        "Yes! Every learner receives a completion certificate for each level they complete — Basic, Intermediate, and Advanced.",
    },
    {
      id: 4,
      question: "Can I take multiple courses at once?",
      answer:
        "Yes, you can enroll in as many SkillLoop courses as you'd like. Each course is sold and tracked separately.",
    },
    {
      id: 5,
      question: "Can I do the internship without purchasing any course?",
      answer:
        "Yes. Purchasing a course is not mandatory to apply for the internship. However, interns who enroll in a course gain deeper product knowledge, which often helps them perform better in HR or sales roles.",
    },
    {
      id: 6,
      question: "Is the internship remote?",
      answer:
        "Yes. All SkillLoop internships are 100% remote — allowing flexibility while delivering real-world exposure.",
    },
    {
      id: 7,
      question: "Will I get a Letter of Recommendation (LOR)?",
      answer:
        "Yes, top-performing interns will be awarded an LOR from the S&S Corporation leadership, in addition to their certificate and stipend.",
    },
    {
      id: 8,
      question: "Will I get a Pre-Placement Offer (PPO)?",
      answer:
        "Yes. All interns are eligible for a PPO of up to ₹8 LPA, based on performance during the internship and final interview with the SkillLoop core team.",
    },
  ];


  const toggleFaq = (id) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  return (
    <section className="py-16 lg:px-16 md:px-8 px-4 mb-16" id='faq'>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, x: -100, y: 0 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.5 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            Frequently Asked Questions
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, x: -100, y: 0 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.5 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our platform is built to help you work smarter, not harder. It adapts to your needs and supports your goals. Make the most of every feature.
          </motion.p>
        </div>

        {/* FAQ Items */}
        <motion.div 
          initial={{ opacity: 0, x: 0, y: -100 }}
          whileInView={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.5 }}
          className="space-y-4">
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className="bg-[#FFFFFF99] rounded-md border border-[#D9E8EE] overflow-hidden transition-all duration-300"
            >
              <button
                onClick={() => toggleFaq(faq.id)}
                className="w-full px-6 py-4 text-left transition-all duration-200"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900 pr-4">
                    {faq.id}.{'  '}
                    {faq.question}
                  </h3>
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-300">
                      {openFaq === faq.id ? (
                        // X Icon
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      ) : (
                        // Plus Icon
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 4v16m8-8H4"
                          />
                        </svg>
                      )}
                    </div>
                  </div>
                </div>
              </button>

              {/* Answer */}
              <div
                className={`transition-all duration-500 ease-in-out ${
                  openFaq === faq.id
                    ? 'max-h-96 opacity-100'
                    : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 pb-6">
                    <p className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Faqs;
