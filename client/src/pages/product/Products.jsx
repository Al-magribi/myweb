import React, { Fragment, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import SEO from "../../components/SEO/SEO";
import { Link } from "react-router-dom";
import { useGetProductsQuery } from "../../controller/api/product/ApiProduct";

const Products = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(16);
  const [search, setSearch] = useState("");

  const { data, isLoading, error } = useGetProductsQuery({
    page,
    limit,
    search,
  });

  const {
    products = [],
    total = 0,
    page: totalPage,
    limit: totalLimit,
  } = data || {};

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <i key={`full-${i}`} className="bi bi-star-fill text-warning"></i>
      );
    }
    if (hasHalfStar) {
      stars.push(<i key="half" className="bi bi-star-half text-warning"></i>);
    }
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <i key={`empty-${i}`} className="bi bi-star text-warning"></i>
      );
    }

    return stars;
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1); // Reset to first page when searching
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const start = 240;

  const seoData = {
    title: "Products - ALMADEV",
    description:
      "Explore our collection of professional web development courses and tools. Find the perfect resources to advance your development skills.",
    keywords:
      "web development courses, programming tools, online learning, development resources",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "ItemList",
      itemListElement: products?.map((product, index) => ({
        "@type": "Product",
        position: index + 1,
        name: product.name,
        description: product.description,
        image: product.image,
        offers: {
          "@type": "Offer",
          price: product.price,
          priceCurrency: "IDR",
          availability: "https://schema.org/InStock",
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: product.rating || "0",
          reviewCount: product.reviewCount || "0",
        },
      })),
    },
  };

  if (isLoading) {
    return (
      <Fragment>
        <SEO title="Loading Products - ALMADEV" />
        <Navbar />
        <main style={{ marginTop: 80 }} className="container py-3">
          <div className="d-flex justify-content-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </main>
        <Footer />
      </Fragment>
    );
  }

  if (error) {
    return (
      <Fragment>
        <SEO title="Error - Products - ALMADEV" />
        <Navbar />
        <main style={{ marginTop: 80 }} className="container py-3">
          <div className="alert alert-danger" role="alert">
            Error loading products. Please try again later.
          </div>
        </main>
        <Footer />
      </Fragment>
    );
  }

  console.log(products);

  return (
    <Fragment>
      <SEO {...seoData} />
      <Navbar />
      <main style={{ marginTop: 80 }} className="container py-3">
        <h2 className="text-center mb-4">Products</h2>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="mb-4">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="btn btn-primary" type="submit">
              Search
            </button>
          </div>
        </form>

        {/* Products Grid */}
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
          {products?.map((product) => (
            <div key={product.id} className="col">
              <div className="card h-100 shadow-sm hover-shadow">
                <img
                  src={product.image}
                  className="card-img-top"
                  alt={product.name}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>

                  <p className="card-text fw-bold text-primary">
                    Rp {parseFloat(product.price).toLocaleString("id-ID")}
                  </p>

                  <div className="d-flex align-items-center mb-2">
                    <div className="me-2">{renderStars(product.rating)}</div>
                    <small className="text-muted">
                      {product.rating
                        ? Number(product.rating).toFixed(1)
                        : "0.0"}
                      {product.reviewCount ? ` (${product.reviewCount})` : ""}
                    </small>
                  </div>

                  <div className="text-success mb-3">
                    <i className="bi bi-graph-up-arrow me-1"></i>
                    {(Number(product?.totalsales) + start).toLocaleString(
                      "id-ID"
                    )}{" "}
                    sold
                  </div>

                  <Link
                    to={`/product/${product.id}/${product.name.replace(
                      / /g,
                      "-"
                    )}`}
                    className="btn btn-primary w-100"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {total > 0 && (
          <nav className="mt-4">
            <ul className="pagination pagination-sm justify-content-center">
              <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
                <button
                  className="page-link"
                  onClick={() => handlePageChange(page - 1)}
                  disabled={page === 1}
                >
                  <i className="bi bi-chevron-double-left"></i>
                </button>
              </li>
              {[...Array(Math.ceil(total / limit))].map((_, index) => (
                <li
                  key={index + 1}
                  className={`page-item ${page === index + 1 ? "active" : ""}`}
                >
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(index + 1)}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
              <li
                className={`page-item ${
                  page === Math.ceil(total / limit) ? "disabled" : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => handlePageChange(page + 1)}
                  disabled={page === Math.ceil(total / limit)}
                >
                  <i className="bi bi-chevron-double-right"></i>
                </button>
              </li>
            </ul>
          </nav>
        )}
      </main>
      <Footer />
    </Fragment>
  );
};

export default Products;
