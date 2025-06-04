import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import {
  useCreateOrderMutation,
  useGetTokenMutation,
} from "../../controller/api/order/ApiOrder";

const Form = ({ item, type }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [getToken, { data, isLoading: isLoadingToken }] = useGetTokenMutation();
  const [createOrder, { isLoading: isLoadingOrder }] = useCreateOrderMutation();

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.phone) {
      toast.error("Please fill in all fields");
      return;
    }

    if (window.fbq) {
      window.fbq("track", "InitiateCheckout", {
        content_name: item.name,
        content_ids: [item.id],
        content_type: type,
        value: item.price,
        currency: "IDR",
      });
    }

    try {
      // Step 1: Get Midtrans token
      await getToken({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        itemId: item.id,
        type: type,
        quantity: 1,
      }).unwrap();
    } catch (error) {
      console.error("Error:", error);
      toast.error(error?.data?.message || "Failed to process order");
    }
  };

  const handleOrderCreation = async (orderId, status) => {
    try {
      await createOrder({
        order_id: orderId,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        itemId: item.id,
        type: type,
        quantity: 1,
        status: status,
        total_amount: item.price,
      }).unwrap();

      if (window.fbq) {
        window.fbq("track", "Purchase", {
          value: item.price,
          currency: "IDR",
          content_name: item.name,
          content_ids: [item.id],
          content_type: type,
          num_items: 1,
        });
      }

      toast.success("Order processed successfully");
      handleClose();
    } catch (error) {
      console.error("Error creating order:", error);
      toast.error(error?.data?.message || "Failed to create order");
      handleClose();
    }
  };

  const handleClose = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
    });
    const closeModal = document.querySelector("[data-bs-dismiss='modal']");
    if (closeModal) {
      closeModal.click();
    }
    // Restore scrolling
    document.body.classList.remove("modal-open");
    document.body.style.removeProperty("overflow");
    document.body.style.removeProperty("padding-right");
    const modalBackdrop = document.querySelector(".modal-backdrop");
    if (modalBackdrop) {
      modalBackdrop.remove();
    }
  };

  useEffect(() => {
    // You can also change below url value to any script url you wish to load,
    // for example this is snap.js for Sandbox Env (Note: remove `.sandbox` from url if you want to use production version)
    const midtransScriptUrl = import.meta.env.VITE_MIDTRANS_BASE_URL;

    let scriptTag = document.createElement("script");
    scriptTag.src = midtransScriptUrl;

    // Optional: set script attribute, for example snap.js have data-client-key attribute
    // (change the value according to your client-key)
    const myMidtransClientKey = import.meta.env.VITE_MIDTRANS_CLIENT_KEY;
    scriptTag.setAttribute("data-client-key", myMidtransClientKey);

    document.body.appendChild(scriptTag);

    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);

  useEffect(() => {
    if (data?.token) {
      window.snap?.pay(data.token, {
        onSuccess: async (result) => {
          console.log("Success:", result);
          await handleOrderCreation(result.order_id, result.transaction_status);
        },
        onPending: async (result) => {
          console.log("Pending:", result);
          await handleOrderCreation(result.order_id, result.transaction_status);
        },
        onError: (error) => {
          console.log("Error:", error);
          toast.error("Payment failed");
          handleClose();
        },
        onClose: () => {
          console.log("Closed without completing payment");
        },
      });

      const closeModal = document.querySelector("[data-bs-dismiss='modal']");
      if (closeModal) {
        closeModal.click();
      }
    }
  }, [data?.token]);

  return (
    <div
      className='modal fade'
      id='order'
      data-bs-backdrop='static'
      data-bs-keyboard='false'
      tabIndex='-1'
      aria-labelledby='staticBackdropLabel'
      aria-hidden='true'
    >
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
              onClick={handleClose}
            ></button>
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
              onClick={handleClose}
            >
              Batal
            </button>
            <button
              type='button'
              className='btn btn-success'
              disabled={isLoadingToken || isLoadingOrder}
              onClick={handleSubmit}
            >
              Proses Pemesanan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
