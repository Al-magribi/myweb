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
}) => {
  useEffect(() => {
    // Update title
    document.title = title ? `${title} | ALMADEV` : "ALMADEV";

    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement("meta");
      metaDescription.name = "description";
      document.head.appendChild(metaDescription);
    }
    metaDescription.content = description || "";

    // Update meta keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement("meta");
      metaKeywords.name = "keywords";
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.content = keywords || "";

    // Open Graph tags
    const ogTags = {
      "og:title": ogTitle || title,
      "og:description": ogDescription || description,
      "og:image": ogImage,
      "og:url": ogUrl || window.location.href,
      "og:type": "website",
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

    // Cleanup function
    return () => {
      // Optional: Remove structured data when component unmounts
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
  ]);

  return null;
};

export default SEO;
