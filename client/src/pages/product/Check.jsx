import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useCheckPaymentMutation } from "../../../controller/api/order/ApiOrder";
import { useParams } from "react-router-dom";

const Check = () => {
  const { id } = useParams();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(false);

  const [
    checkPayment,
    { isLoading, isError, isSuccess, error, data: msg, reset },
  ] = useCheckPaymentMutation();

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = { email, productid: id };

    toast.promise(
      checkPayment(data)
        .unwrap()
        .then((res) => res.message),
      {
        loading: "Checking...",
        success: "Payment checked",
        error: "Payment not found",
      }
    );
  };

  useEffect(() => {
    if (isSuccess) {
      reset();
      setMessage(msg.message);
      setStatus(true);
    }

    if (isError) {
      reset();
      setMessage(error.data.message);
      setStatus(false);
    }
  }, [isSuccess, isError, msg, error]);

  return (
    <div
      className='modal fade'
      id='checkPayment'
      data-bs-backdrop='static'
      data-bs-keyboard='false'
      tabIndex='-1'
      aria-labelledby='staticBackdropLabel'
      aria-hidden='true'>
      <div className='modal-dialog modal-dialog-centered'>
        <div className='modal-content shadow-lg'>
          <div className='modal-header border-bottom-0 pb-0'>
            <h1
              className='modal-title fs-4 fw-bold text-primary'
              id='staticBackdropLabel'>
              Check Payment Status
            </h1>
            <button
              type='button'
              className='btn-close'
              data-bs-dismiss='modal'
              aria-label='Close'></button>
          </div>
          <div className='modal-body pt-4'>
            <form onSubmit={handleSubmit}>
              <div className='form-floating mb-4'>
                <input
                  type='email'
                  className='form-control form-control-lg'
                  id='email'
                  placeholder='Enter Email'
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor='email' className='text-muted'>
                  Email Address
                </label>
              </div>

              {message && (
                <div
                  className={`alert ${
                    status ? "alert-success" : "alert-danger"
                  } mb-4`}
                  role='alert'>
                  <i
                    className={`bi ${
                      status ? "bi-check-circle" : "bi-exclamation-circle"
                    } me-2`}></i>
                  {message}
                </div>
              )}

              <button
                type='submit'
                className='btn btn-primary btn-lg w-100 py-3'
                disabled={isLoading}>
                {isLoading ? (
                  <>
                    <span
                      className='spinner-border spinner-border-sm me-2'
                      role='status'
                      aria-hidden='true'></span>
                    Checking...
                  </>
                ) : (
                  "Check Payment"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Check;
