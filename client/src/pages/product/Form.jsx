import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useCreateOrderMutation } from "../../controller/api/order/ApiOrder";

const Form = ({ product }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [createOrder, { isLoading, data, isSuccess, error, isError, reset }] =
    useCreateOrderMutation();

  const handleSubmit = () => {
    if (!formData.name || !formData.email || !formData.phone) {
      toast.error("Please fill in all fields");
      return;
    }

    if (window.fbq) {
      window.fbq("track", "InitiateCheckout", {
        content_name: product.name,
        content_ids: [product.id],
        content_type: "product",
        value: product.price,
        currency: "IDR",
      });
    }

    const data = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      productid: product.id,
      quantity: 1,
      url: window.location.href,
    };

    toast.promise(createOrder(data).unwrap(), {
      loading: "Memproses Pemesanan...",
      success: "Pemesanan Berhasil",
      error: error?.data?.message || "Pemesanan Gagal",
    });
  };

  const handleClose = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
    });
  };

  useEffect(() => {
    if (isSuccess) {
      // Track purchase event with Meta Pixel
      if (window.fbq) {
        window.fbq("track", "Purchase", {
          value: product.price,
          currency: "IDR",
          content_name: product.name,
          content_ids: [product.id],
          content_type: "product",
          num_items: 1,
        });
      }

      setFormData({
        name: "",
        email: "",
        phone: "",
      });
      reset();
      const closeModal = document.querySelector("[data-bs-dismiss='modal']");
      closeModal.click();
      window.location.href = data.redirect_url;
    }

    if (isError) {
      reset();
      console.log(error);
    }
  }, [isSuccess, isError, error]);

  return (
    <div
      className='modal fade'
      id='order'
      data-bs-backdrop='static'
      data-bs-keyboard='false'
      tabIndex='-1'
      aria-labelledby='staticBackdropLabel'
      aria-hidden='true'>
      <div className='modal-dialog'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h1 className='modal-title fs-5' id='staticBackdropLabel'>
              Detail Pemesanan
            </h1>
            <button
              type='button'
              className='btn-close'
              data-bs-dismiss='modal'
              aria-label='Close'
              onClick={handleClose}></button>
          </div>
          <div className='modal-body'>
            <div className='d-flex flex-column gap-3'>
              <div className='form-floating'>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Nama Lengkap'
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
                <label htmlFor='name'>Nama Lengkap</label>
              </div>

              <div className='form-floating'>
                <input
                  type='email'
                  className='form-control'
                  placeholder='Email'
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
                <label htmlFor='email'>Email</label>
              </div>

              <div className='form-floating'>
                <input
                  type='number'
                  className='form-control'
                  placeholder='Whatsapp'
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                />
                <label htmlFor='phone'>Whatsapp</label>
              </div>
            </div>
          </div>
          <div className='modal-footer'>
            <button
              type='button'
              className='btn btn-outline-danger'
              data-bs-dismiss='modal'
              onClick={handleClose}>
              Batal
            </button>
            <button
              type='button'
              className='btn btn-success'
              disabled={isLoading}
              onClick={handleSubmit}>
              Proses Pemesanan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
