import React, { useEffect, useState } from "react";
import { useDeleteProductMutation } from "../../../controller/api/product/ApiProduct";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Reviews from "./Reviews";

const Products = ({ products, total, page, limit, setEditData, setIsEdit }) => {
  const [id, setId] = useState("");
  const navigate = useNavigate();
  const [deleteProduct, { isLoading, isSuccess, isError, reset }] =
    useDeleteProductMutation();

  const handleEdit = (product) => {
    setEditData(product);
    setIsEdit(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      toast.promise(
        deleteProduct(id)
          .unwrap()
          .then((res) => res.message),
        {
          loading: "Deleting product...",
          success: (message) => message,
          error: (error) => error.data.message,
        }
      );
    }
  };

  const handleDetail = (id) => {
    navigate(`/product/${id}`);
  };

  useEffect(() => {
    if (isSuccess || isError) {
      reset();
    }
  }, [isSuccess, isError]);

  console.log(products);
  return (
    <div className='card'>
      <div className='card-body'>
        <div className='table-responsive'>
          <table className='table table-hover align-middle'>
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
                <th>Rating</th>
                <th>Sales</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td style={{ width: "80px" }}>
                    <img
                      src={product.image}
                      alt={product.name}
                      className='rounded'
                      style={{
                        width: "60px",
                        height: "60px",
                        objectFit: "cover",
                      }}
                    />
                  </td>
                  <td>
                    <div>
                      <h6 className='mb-0'>{product.name}</h6>
                    </div>
                  </td>
                  <td>
                    Rp {parseFloat(product.price).toLocaleString("id-ID")}
                  </td>
                  <td>
                    <div className='d-flex align-items-center'>
                      <i className='bi bi-star-fill text-warning me-1'></i>
                      {Number(product.rating || 0).toFixed(1)}
                    </div>
                  </td>
                  <td>
                    {parseFloat(product.totalsales).toLocaleString("id-ID")}
                  </td>
                  <td>
                    <span
                      className={`badge bg-${
                        product.status === "active" ? "success" : "secondary"
                      }`}
                    >
                      {product.status}
                    </span>
                  </td>
                  <td>
                    <div className='d-flex gap-2'>
                      <button
                        data-bs-toggle='modal'
                        data-bs-target='#addproduct'
                        className='btn btn-sm btn-outline-warning'
                        onClick={() => handleEdit(product)}
                      >
                        <i className='bi bi-pencil-square'></i>
                      </button>

                      <button
                        className='btn btn-sm btn-outline-info'
                        data-bs-toggle='modal'
                        data-bs-target='#reviews'
                        onClick={() => setId(product.id)}
                      >
                        <i className='bi bi-chat-dots'></i>
                      </button>

                      <button
                        className='btn btn-sm btn-outline-danger'
                        onClick={() => handleDelete(product.id)}
                        disabled={isLoading}
                      >
                        <i className='bi bi-trash'></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {total > 0 && (
          <div className='d-flex justify-content-between align-items-center mt-4'>
            <div>
              Showing {products.length} of {total} products
            </div>
            <nav>
              <ul className='pagination pagination-sm mb-0'>
                <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
                  <button
                    className='page-link'
                    onClick={() => setPage(page - 1)}
                    disabled={page === 1}
                  >
                    Previous
                  </button>
                </li>
                <li className='page-item'>
                  <span className='page-link'>{page}</span>
                </li>
                <li
                  className={`page-item ${
                    page * limit >= total ? "disabled" : ""
                  }`}
                >
                  <button
                    className='page-link'
                    onClick={() => setPage(page + 1)}
                    disabled={page * limit >= total}
                  >
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        )}
      </div>
      <Reviews id={id} />
    </div>
  );
};

export default Products;
