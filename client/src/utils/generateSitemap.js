import fs from "fs";
import path from "path";

const BASE_URL = "https://jadidalmargibi.com";

const pages = [
  "",
  "/products",
  "/courses",
  "/edubyte",
  "/full-stack-web-developer",
  "/ecommerce-toserba",
];

const generateSitemap = () => {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${pages
    .map((page) => {
      return `
    <url>
      <loc>${BASE_URL}${page}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>daily</changefreq>
      <priority>${page === "" ? "1.0" : "0.8"}</priority>
    </url>`;
    })
    .join("")}
</urlset>`;

  fs.writeFileSync(
    path.join(__dirname, "../../public/sitemap.xml"),
    sitemap.trim()
  );
};

module.exports = generateSitemap;
