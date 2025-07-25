import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { seoConfig, courseSEO, faqStructuredData, courseStructuredData } from '../utils/seoConfig';

// Custom hook for SEO management
export const useSEO = (pageType, customConfig = {}) => {
  const config = { ...seoConfig[pageType], ...customConfig };
  
  useEffect(() => {
    if (config.title) {
      document.title = config.title;
    }
  }, [config.title]);
  
  return config;
};

// SEO component for specific pages/sections
export const PageSEO = ({ 
  pageType, 
  customTitle, 
  customDescription, 
  customKeywords,
  structuredData,
  children 
}) => {
  const config = useSEO(pageType, {
    title: customTitle,
    description: customDescription,
    keywords: customKeywords
  });
  
  return (
    <>
      <Helmet>
        <title>{config.title}</title>
        <meta name="description" content={config.description} />
        <meta name="keywords" content={config.keywords} />
        <meta property="og:title" content={config.title} />
        <meta property="og:description" content={config.description} />
        <meta property="og:url" content={config.url} />
        <meta name="twitter:title" content={config.title} />
        <meta name="twitter:description" content={config.description} />
        <link rel="canonical" href={config.url} />
        
        {structuredData && (
          <script type="application/ld+json">
            {JSON.stringify(structuredData)}
          </script>
        )}
      </Helmet>
      {children}
    </>
  );
};

// Course-specific SEO component
export const CourseSEO = ({ courseKey, courseData }) => {
  const seoData = courseSEO[courseKey];
  const structuredData = courseStructuredData(courseData);
  
  return (
    <Helmet>
      <title>{seoData?.title}</title>
      <meta name="description" content={seoData?.description} />
      <meta name="keywords" content={seoData?.keywords} />
      <meta property="og:title" content={seoData?.title} />
      <meta property="og:description" content={seoData?.description} />
      <meta name="twitter:title" content={seoData?.title} />
      <meta name="twitter:description" content={seoData?.description} />
      
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};

// FAQ SEO component
export const FAQSEO = ({ faqs }) => {
  const structuredData = faqStructuredData(faqs);
  
  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};
