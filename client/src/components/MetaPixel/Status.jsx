import React from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { useParams, useSearchParams } from "react-router-dom";
import { useGetProductByIdQuery } from "../../controller/api/product/ApiProduct";
import { useGetLandingPageQuery } from "../../controller/api/course/ApiCourse";

const Status = () => {
  const { type, id, name } = useParams();
  const [searchParams] = useSearchParams();
  const transactionStatus = searchParams.get("transaction_status");
  const orderId = searchParams.get("order_id");

  const { data, isLoading } = useGetProductByIdQuery(id, {
    skip: type !== "product",
  });
  const { data: courseData, isLoading: courseLoading } = useGetLandingPageQuery(
    id,
    { skip: type !== "course" }
  );

  console.log(courseData);

  const getStatusColor = (status) => {
    switch (status) {
      case "settlement":
        return "bg-success text-white";
      case "pending":
        return "bg-warning text-dark";
      default:
        return "bg-secondary text-white";
    }
  };

  const getStatusMessage = (status, productName) => {
    switch (status) {
      case "settlement":
        return `Pembayaran berhasil! Silahkan cek email, inbox atau spam Anda untuk mengakses "${productName}"`;
      case "pending":
        return "Pembayaran sedang diproses, silahkan selesaikan pembayaran Anda";
      default:
        return "Status pembayaran tidak diketahui";
    }
  };

  if (isLoading) {
    return (
      <div>
        <Navbar />
        <div className='min-vh-100 d-flex align-items-center justify-content-center'>
          <div className='spinner-border text-primary' role='status'>
            <span className='visually-hidden'>Loading...</span>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <main style={{ marginTop: 80 }} className='min-vh-50 bg-light py-5'>
        <div className='container'>
          <div className='row justify-content-center'>
            <div className='col-12 col-md-8 col-lg-6'>
              <div className='card shadow-sm'>
                <div className='card-body p-4'>
                  {/* Order Status Header */}
                  <div className='text-center mb-4'>
                    <h2 className='h3 mb-2'>Status Pembayaran</h2>
                    <p className='text-muted small mb-0'>Order ID: {orderId}</p>
                  </div>

                  {/* Product Info */}
                  {data && (
                    <div className='d-flex align-items-center gap-3 mb-4'>
                      <div className='flex-shrink-0'>
                        <img
                          src={data.image}
                          alt={data.name}
                          className='rounded'
                          style={{
                            width: "100px",
                            height: "100px",
                            objectFit: "cover",
                          }}
                        />
                      </div>
                      <div>
                        <h3 className='h5 mb-2'>{data.name}</h3>
                        <p className='text-muted mb-0'>
                          IDR {parseInt(data.price).toLocaleString("en-US")}
                        </p>
                      </div>
                    </div>
                  )}

                  {courseData && (
                    <div className='d-flex flex-column align-items-center gap-3 mb-4'>
                      <div className='flex-shrink-0'>
                        <img
                          src={courseData.thumbnail}
                          alt={courseData.name}
                          className='rounded'
                          style={{
                            width: "360px",
                            height: "200px",
                            objectFit: "cover",
                          }}
                        />
                      </div>
                      <div className='text-center'>
                        <h3 className='h5 mb-2'>{courseData.title}</h3>
                        <p className='fw-bold mb-0'>
                          IDR{" "}
                          {parseInt(courseData.price).toLocaleString("en-US")}
                        </p>
                        <small className='text-muted'>
                          Gunakan Email sebagai Username Dan No Whatsapp sebagai
                          Password
                        </small>
                      </div>
                    </div>
                  )}

                  {/* Status Badge */}
                  <div className='text-center mb-3'>
                    <span
                      className={`badge ${getStatusColor(
                        transactionStatus
                      )} px-3 py-2`}
                    >
                      {transactionStatus?.toUpperCase()}
                    </span>
                  </div>

                  {/* Status Message */}

                  {/* Action Button */}
                  {data && (
                    <>
                      <div className='text-center mb-4'>
                        <p className='mb-0'>
                          {getStatusMessage(transactionStatus, data?.name)}
                        </p>
                      </div>
                      <div className='text-center'>
                        <a
                          href={`/product/${id}/${name.replace(/\s+/g, "-")}`}
                          className='btn btn-primary px-4'
                        >
                          Kembali
                        </a>
                      </div>
                    </>
                  )}

                  {courseData && (
                    <div className='text-center'>
                      <a href={`/signin`} className='btn btn-primary px-4'>
                        Masuk
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Status;
