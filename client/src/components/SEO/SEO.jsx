import { useEffect } from "react";

const SEO = ({
  title,
  description,
  keywords,
  ogTitle,
  ogDescription,
  ogImage,
  ogUrl,
  canonicalUrl,
  structuredData,
  twitterCard = "summary_large_image",
  twitterSite = "@almadev",
  language = "id",
  author = "ALMADEV",
  themeColor = "#007bff",
}) => {
  useEffect(() => {
    // Update title
    document.title = title ? `${title} | ALMADEV` : "ALMADEV";

    // Set HTML lang attribute
    document.documentElement.setAttribute("lang", language);

    // Basic meta tags
    const metaTags = {
      description: description || "",
      keywords: keywords || "",
      author: author,
      "theme-color": themeColor,
      robots: "index, follow",
      viewport: "width=device-width, initial-scale=1, shrink-to-fit=no",
    };

    Object.entries(metaTags).forEach(([name, content]) => {
      if (content) {
        let metaTag = document.querySelector(`meta[name="${name}"]`);
        if (!metaTag) {
          metaTag = document.createElement("meta");
          metaTag.name = name;
          document.head.appendChild(metaTag);
        }
        metaTag.content = content;
      }
    });

    // Open Graph tags
    const ogTags = {
      "og:title": ogTitle || title,
      "og:description": ogDescription || description,
      "og:image": ogImage,
      "og:url": ogUrl || window.location.href,
      "og:type": "website",
      "og:site_name": "ALMADEV",
      "og:locale": language,
    };

    Object.entries(ogTags).forEach(([property, content]) => {
      if (content) {
        let metaTag = document.querySelector(`meta[property="${property}"]`);
        if (!metaTag) {
          metaTag = document.createElement("meta");
          metaTag.setAttribute("property", property);
          document.head.appendChild(metaTag);
        }
        metaTag.content = content;
      }
    });

    // Twitter Card tags
    const twitterTags = {
      "twitter:card": twitterCard,
      "twitter:site": twitterSite,
      "twitter:title": ogTitle || title,
      "twitter:description": ogDescription || description,
      "twitter:image": ogImage,
    };

    Object.entries(twitterTags).forEach(([name, content]) => {
      if (content) {
        let metaTag = document.querySelector(`meta[name="${name}"]`);
        if (!metaTag) {
          metaTag = document.createElement("meta");
          metaTag.name = name;
          document.head.appendChild(metaTag);
        }
        metaTag.content = content;
      }
    });

    // Canonical URL
    let canonicalTag = document.querySelector('link[rel="canonical"]');
    if (!canonicalTag) {
      canonicalTag = document.createElement("link");
      canonicalTag.rel = "canonical";
      document.head.appendChild(canonicalTag);
    }
    canonicalTag.href = canonicalUrl || window.location.href;

    // Structured Data
    if (structuredData) {
      let scriptTag = document.querySelector("#structured-data");
      if (!scriptTag) {
        scriptTag = document.createElement("script");
        scriptTag.id = "structured-data";
        scriptTag.type = "application/ld+json";
        document.head.appendChild(scriptTag);
      }
      scriptTag.textContent = JSON.stringify(structuredData);
    }

    // Add preconnect for common third-party domains
    const preconnectDomains = [
      "https://fonts.googleapis.com",
      "https://fonts.gstatic.com",
      "https://cdn.jsdelivr.net",
    ];

    preconnectDomains.forEach((domain) => {
      let linkTag = document.querySelector(
        `link[rel="preconnect"][href="${domain}"]`
      );
      if (!linkTag) {
        linkTag = document.createElement("link");
        linkTag.rel = "preconnect";
        linkTag.href = domain;
        document.head.appendChild(linkTag);
      }
    });

    // Cleanup function
    return () => {
      // Remove structured data when component unmounts
      const scriptTag = document.querySelector("#structured-data");
      if (scriptTag) {
        scriptTag.remove();
      }
    };
  }, [
    title,
    description,
    keywords,
    ogTitle,
    ogDescription,
    ogImage,
    ogUrl,
    canonicalUrl,
    structuredData,
    twitterCard,
    twitterSite,
    language,
    author,
    themeColor,
  ]);

  return null;
};

export default SEO;
