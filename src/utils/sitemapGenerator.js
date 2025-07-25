// sitemap.xml generator for SkillLoop
export const generateSitemap = () => {
  const baseUrl = "https://skill-loop-three.vercel.app";
  const currentDate = new Date().toISOString().split('T')[0];
  
  const pages = [
    { url: '', priority: '1.0', changefreq: 'weekly' },
    { url: '/#about', priority: '0.8', changefreq: 'monthly' },
    { url: '/#courses', priority: '0.9', changefreq: 'weekly' },
    { url: '/#internships', priority: '0.9', changefreq: 'weekly' },
    { url: '/#testimonials', priority: '0.6', changefreq: 'monthly' },
    { url: '/#faq', priority: '0.5', changefreq: 'monthly' },
    { url: '/#contact', priority: '0.7', changefreq: 'monthly' }
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${pages.map(page => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return sitemap;
};

// robots.txt content
export const generateRobotsTxt = () => {
  const baseUrl = "https://skill-loop-three.vercel.app";
  
  return `User-agent: *
Allow: /

# Sitemap
Sitemap: ${baseUrl}/sitemap.xml

# Crawl-delay for bots
Crawl-delay: 1

# Block admin and private areas
Disallow: /admin/
Disallow: /private/
Disallow: /api/
Disallow: /*.json$

# Allow important files
Allow: /robots.txt
Allow: /sitemap.xml
Allow: /favicon.ico
Allow: /*.css$
Allow: /*.js$
Allow: /*.svg$
Allow: /*.png$
Allow: /*.jpg$
Allow: /*.jpeg$
Allow: /*.gif$
Allow: /*.webp$`;
};
