import { Helmet } from 'react-helmet-async';

const SEO = ({
  title = "SkillLoop - Learn Today, Lead Tomorrow | MBA-Focused EdTech Platform",
  description = "SkillLoop bridges the gap between education and industry with job-ready skills in Data Analytics, HR, Marketing, Finance, and AI. Get practical internship experience and certification courses designed for MBA professionals.",
  keywords = "skillloop, Skill Loop, skill-loop, skill loop, learn app, MBA courses, Data Analytics, HR Operations, Digital Marketing, Finance Strategy, AI Prompt Engineering, EdTech, Internships, Professional Development, Business Intelligence, Career Growth",
  image = "/skillLoopLogo.svg",
  url = "https://skill-loop-three.vercel.app",
  type = "website",
  author = "SkillLoop Team"
}) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "SkillLoop",
    "description": description,
    "url": "https://skill-loop-three.vercel.app/",
    "logo": "https://skill-loop-three.vercel.app/skillLoopLogo.svg",
    "foundingDate": "2024",
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Customer Service",
      "availableLanguage": ["English"]
    },
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "IN"
    },
    "offers": [
      {
        "@type": "Course",
        "name": "Data Analytics for MBAs",
        "description": "Covers Excel, Power BI, and Tableau — from basics to building integrated dashboards and interpreting business performance data.",
        "provider": {
          "@type": "Organization",
          "name": "SkillLoop"
        }
      },
      {
        "@type": "Course",
        "name": "HR Operations & Analytics",
        "description": "Focuses on recruitment, HRMS, ATS, and progresses to advanced analytics, budgeting, and HR scorecards.",
        "provider": {
          "@type": "Organization",
          "name": "SkillLoop"
        }
      },
      {
        "@type": "Course",
        "name": "Marketing & Digital Growth",
        "description": "Introduces the marketing funnel, SEO, and social media basics, then dives into ads, analytics, automation, and campaign strategy.",
        "provider": {
          "@type": "Organization",
          "name": "SkillLoop"
        }
      },
      {
        "@type": "Course",
        "name": "Finance Tools & Strategy",
        "description": "Starts with financial statements and budgeting, then covers valuation tools, forecasting, dashboards, and investor-focused planning.",
        "provider": {
          "@type": "Organization",
          "name": "SkillLoop"
        }
      },
      {
        "@type": "Course",
        "name": "AI & Prompt Engineering for MBAs",
        "description": "Teaches how to use tools like ChatGPT and Notion AI for automation, content generation, and AI-powered business workflows.",
        "provider": {
          "@type": "Organization",
          "name": "SkillLoop"
        }
      }
    ]
  };

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <html lang="en" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      
      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={`${url}${image}`} />
      <meta property="og:image:alt" content="SkillLoop Logo - MBA-Focused EdTech Platform" />
      <meta property="og:site_name" content="SkillLoop" />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${url}${image}`} />
      <meta name="twitter:image:alt" content="SkillLoop Logo - MBA-Focused EdTech Platform" />
      <meta name="twitter:creator" content="@SkillLoop" />
      
      {/* Additional SEO Meta Tags */}
      <meta name="theme-color" content="#F4B860" />
      <meta name="msapplication-TileColor" content="#F4B860" />
      <meta name="application-name" content="SkillLoop" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={url} />
      
      {/* Favicon and Icons */}
      <link rel="icon" type="image/svg+xml" href="/skillLoopLogo.svg" />
      <link rel="apple-touch-icon" href="/skillLoopLogo.svg" />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
      
    </Helmet>
  );
};

export default SEO;
