import React, { useState } from "react";
import Layout from "../layout/Layout";
import Form from "./Form";
import { useGetProductsQuery } from "../../../controller/api/admin/ApiProduct";
import Products from "./Products";
const AdminProducts = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [editData, setEditData] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  const { data, isLoading, refetch } = useGetProductsQuery({
    page,
    limit,
    search,
  });

  const handleCloseModal = () => {
    setEditData(null);
    setIsEdit(false);
  };

  // Handle loading state
  if (isLoading) {
    return (
      <Layout title='Admin Products'>
        <div className='container-fluid'>
          <div
            className='d-flex justify-content-center align-items-center'
            style={{ height: "80vh" }}>
            <div className='spinner-border text-primary' role='status'>
              <span className='visually-hidden'>Loading...</span>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  const { products = [], total = 0 } = data || {};

  // Calculate stats
  const totalProducts = total;
  const totalSales = products.reduce(
    (acc, curr) => acc + (curr.totalsales || 0),
    0
  );
  const averageRating =
    products.length > 0
      ? (
          products.reduce((acc, curr) => acc + (curr.rating || 0), 0) /
          products.length
        ).toFixed(1)
      : 0;
  const totalReviews = products.reduce(
    (acc, curr) => acc + (curr.reviewcount || 0),
    0
  );

  return (
    <Layout title='Admin Products'>
      <div className='container-fluid'>
        {/* Search and Add Product */}
        <div className='row mb-4'>
          <div className='col-md-6'>
            <div className='input-group'>
              <input
                type='text'
                className='form-control'
                placeholder='Search products...'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button className='btn btn-outline-secondary' type='button'>
                <i className='bi bi-search'></i>
              </button>
            </div>
          </div>
          <div className='col-md-6 text-end'>
            <button
              type='button'
              data-bs-toggle='modal'
              data-bs-target='#addproduct'
              className='btn btn-primary'>
              <i className='bi bi-plus-lg me-2'></i>
              Add Product
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className='row g-4 mb-4'>
          <div className='col-12 col-sm-6 col-xl-3'>
            <div className='card h-100'>
              <div className='card-body'>
                <div className='d-flex align-items-center'>
                  <div className='flex-shrink-0 me-3'>
                    <div className='p-3 rounded bg-primary bg-opacity-10'>
                      <i className='bi bi-box text-primary fs-4'></i>
                    </div>
                  </div>
                  <div className='flex-grow-1'>
                    <h6 className='text-muted mb-1'>Total Products</h6>
                    <h4 className='mb-0'>{totalProducts.toLocaleString()}</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='col-12 col-sm-6 col-xl-3'>
            <div className='card h-100'>
              <div className='card-body'>
                <div className='d-flex align-items-center'>
                  <div className='flex-shrink-0 me-3'>
                    <div className='p-3 rounded bg-success bg-opacity-10'>
                      <i className='bi bi-graph-up text-success fs-4'></i>
                    </div>
                  </div>
                  <div className='flex-grow-1'>
                    <h6 className='text-muted mb-1'>Total Sales</h6>
                    <h4 className='mb-0'>
                      {parseFloat(totalSales).toLocaleString("id-ID")}
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='col-12 col-sm-6 col-xl-3'>
            <div className='card h-100'>
              <div className='card-body'>
                <div className='d-flex align-items-center'>
                  <div className='flex-shrink-0 me-3'>
                    <div className='p-3 rounded bg-warning bg-opacity-10'>
                      <i className='bi bi-star text-warning fs-4'></i>
                    </div>
                  </div>
                  <div className='flex-grow-1'>
                    <h6 className='text-muted mb-1'>Average Rating</h6>
                    <h4 className='mb-0'>{averageRating}</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='col-12 col-sm-6 col-xl-3'>
            <div className='card h-100'>
              <div className='card-body'>
                <div className='d-flex align-items-center'>
                  <div className='flex-shrink-0 me-3'>
                    <div className='p-3 rounded bg-info bg-opacity-10'>
                      <i className='bi bi-chat-dots text-info fs-4'></i>
                    </div>
                  </div>
                  <div className='flex-grow-1'>
                    <h6 className='text-muted mb-1'>Total Reviews</h6>
                    <h4 className='mb-0'>
                      {parseFloat(totalReviews).toLocaleString("id-ID")}
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Products Table */}
        <Products
          products={products}
          total={total}
          page={page}
          limit={limit}
          setEditData={setEditData}
          setIsEdit={setIsEdit}
        />
      </div>
      <Form
        refetch={refetch}
        editData={editData}
        setEditData={() => setEditData(null)}
        isEdit={isEdit}
        setIsEdit={() => setIsEdit(false)}
        onClose={handleCloseModal}
      />
    </Layout>
  );
};

export default AdminProducts;
