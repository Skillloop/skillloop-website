// SEO configuration for different pages/sections
export const seoConfig = {
  home: {
    title: "SkillLoop - Learn Today, Lead Tomorrow",
    description: "SkillLoop bridges the gap between education and industry with job-ready skills in Data Analytics, HR, Marketing, Finance, and AI. Get practical internship experience and certification courses designed for MBA professionals.",
    keywords: "MBA courses, Data Analytics, HR Operations, Digital Marketing, Finance Strategy, AI Prompt Engineering, EdTech, Internships, Professional Development, Business Intelligence, Career Growth",
    url: "https://skill-loop-three.vercel.app"
  },
  
  courses: {
    title: "SkillLoop - Learn Today, Lead Tomorrow",
    description: "Explore our comprehensive MBA-focused certification courses in Data Analytics, HR Operations, Digital Marketing, Finance Strategy, and AI Prompt Engineering. Practical, industry-relevant skills for career growth.",
    keywords: "MBA certification, Data Analytics course, HR Analytics, Digital Marketing course, Finance tools, AI for business, professional certification, career development",
    url: "https://skill-loop-three.vercel.app/#courses"
  },
  
  internships: {
    title: "SkillLoop - Learn Today, Lead Tomorrow",
    description: "Gain practical experience through our internship-driven model. Work on live projects, real-world challenges, and performance-based rewards while building confidence and credibility.",
    keywords: "internship programs, practical experience, live projects, professional internships, career experience, hands-on learning",
    url: "https://skill-loop-three.vercel.app/#internships"
  },
  
  about: {
    title: "SkillLoop - Learn Today, Lead Tomorrow",
    description: "Learn about SkillLoop's mission to transform learners into industry-ready professionals. Our affordable, laser-focused certification courses combine education with practical internship experience.",
    keywords: "about SkillLoop, EdTech platform, MBA education, professional development, career transformation, industry-ready skills",
    url: "https://skill-loop-three.vercel.app/#about"
  }
};

// Course-specific SEO data
export const courseSEO = {
  "data-analytics": {
    title: "Data Analytics for MBAs - Excel, Power BI, Tableau Course | SkillLoop",
    description: "Master Data Analytics with our comprehensive MBA course covering Excel, Power BI, and Tableau. Learn to build integrated dashboards and interpret business performance data.",
    keywords: "Data Analytics MBA, Excel course, Power BI training, Tableau certification, business intelligence, data visualization, analytics for business"
  },
  
  "hr-operations": {
    title: "HR Operations & Analytics Course - HRMS, ATS, HR Scorecards | SkillLoop",
    description: "Comprehensive HR Operations course focusing on recruitment, HRMS, ATS, and advanced HR analytics, budgeting, and scorecard development for MBA professionals.",
    keywords: "HR Operations, HR Analytics, HRMS training, ATS systems, HR scorecards, recruitment analytics, human resources course"
  },
  
  "marketing-growth": {
    title: "Digital Marketing & Growth Course - SEO, Social Media, Analytics | SkillLoop",
    description: "Learn digital marketing fundamentals including marketing funnel, SEO, social media, ads management, analytics, automation, and strategic campaign development.",
    keywords: "Digital Marketing course, SEO training, social media marketing, marketing analytics, campaign strategy, growth marketing, marketing automation"
  },
  
  "finance-strategy": {
    title: "Finance Tools & Strategy Course - Financial Modeling, Valuation | SkillLoop",
    description: "Master finance tools and strategy covering financial statements, budgeting, valuation tools, forecasting, dashboards, and investor-focused financial planning.",
    keywords: "Finance course, financial modeling, valuation techniques, financial planning, budgeting, financial dashboards, investment analysis"
  },
  
  "ai-prompt-engineering": {
    title: "AI & Prompt Engineering for MBAs - ChatGPT, Business Automation | SkillLoop",
    description: "Learn AI and prompt engineering using ChatGPT and Notion AI for business automation, content generation, and AI-powered workflows designed for MBA professionals.",
    keywords: "AI for business, prompt engineering, ChatGPT for business, AI automation, artificial intelligence course, business AI tools, AI workflow"
  }
};

// Generate FAQ structured data
export const faqStructuredData = (faqs) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
});

// Generate course structured data
export const courseStructuredData = (course) => ({
  "@context": "https://schema.org",
  "@type": "Course",
  "name": course.title,
  "description": course.description,
  "provider": {
    "@type": "Organization",
    "name": "SkillLoop",
    "url": "https://skill-loop-three.vercel.app"
  },
  "educationalLevel": "Professional",
  "courseMode": "Online",
  "teaches": course.skills || [],
  "inLanguage": "en",
  "availableLanguage": "English"
});

// Generate organization structured data
export const organizationStructuredData = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "name": "SkillLoop",
  "alternateName": "Skill Loop",
  "description": "SkillLoop is an EdTech platform that bridges the gap between education and industry with MBA-focused certification courses and practical internship experience.",
  "url": "https://skill-loop-three.vercel.app",
  "logo": "https://skill-loop-three.vercel.app/skillLoopLogo.svg",
  "foundingDate": "2024",
  "slogan": "Learn Today, Lead Tomorrow",
  "knowsAbout": [
    "Data Analytics",
    "HR Operations", 
    "Digital Marketing",
    "Finance Strategy",
    "Artificial Intelligence",
    "Business Intelligence",
    "Professional Development",
    "MBA Education"
  ],
  "areaServed": "Worldwide",
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "Customer Service",
    "availableLanguage": ["English"]
  }
};
