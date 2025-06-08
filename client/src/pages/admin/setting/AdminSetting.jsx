import React, { useEffect, useState } from "react";
import Layout from "../layout/Layout";
import {
  useGetConfigQuery,
  useUpdateConfigMutation,
} from "../../../controller/api/setting/ApiSetting";
import { toast } from "react-hot-toast";

const AdminSetting = () => {
  const { data: config, isLoading } = useGetConfigQuery();
  const [
    updateConfig,
    { isSuccess, isLoading: updateLoading, isError, reset },
  ] = useUpdateConfigMutation();
  const [formData, setFormData] = useState({});

  React.useEffect(() => {
    if (config) {
      setFormData(config);
    }
  }, [config]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    toast.promise(
      updateConfig(formData)
        .unwrap()
        .then((res) => res.message),
      {
        loading: "Updating...",
        success: (message) => message,
        error: (error) => error.data.message,
      }
    );
  };

  useEffect(() => {
    if (isSuccess || isError) {
      reset();
    }
  }, [isSuccess, isError]);

  if (isLoading) {
    return (
      <Layout title='Admin Setting'>
        <div className='container-fluid'>
          <div className='d-flex justify-content-center'>
            <div className='spinner-border' role='status'>
              <span className='visually-hidden'>Loading...</span>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title='Admin Setting'>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-12'>
            <div className='card shadow'>
              <div className='card-header bg-primary text-white'>
                <h5 className='mb-0'>Application Settings</h5>
              </div>
              <div className='card-body'>
                <form onSubmit={handleSubmit}>
                  <div className='row'>
                    {/* Domain Settings */}
                    <div className='col-md-6 mb-3'>
                      <div className='card h-100'>
                        <div className='card-header bg-light'>
                          <h6 className='mb-0'>Domain Settings</h6>
                        </div>
                        <div className='card-body'>
                          <div className='mb-3'>
                            <label className='form-label'>Domain URL</label>
                            <input
                              type='text'
                              className='form-control'
                              name='domain'
                              value={formData.domain || ""}
                              onChange={handleChange}
                              placeholder='https://example.com'
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Midtrans Settings */}
                    <div className='col-md-6 mb-3'>
                      <div className='card h-100'>
                        <div className='card-header bg-light'>
                          <h6 className='mb-0'>Midtrans Settings</h6>
                        </div>
                        <div className='card-body'>
                          <div className='mb-3'>
                            <label className='form-label'>Server Key</label>
                            <input
                              type='text'
                              className='form-control'
                              name='mid_server_key'
                              value={formData.mid_server_key || ""}
                              onChange={handleChange}
                            />
                          </div>
                          <div className='mb-3'>
                            <label className='form-label'>Client Key</label>
                            <input
                              type='text'
                              className='form-control'
                              name='mid_client_key'
                              value={formData.mid_client_key || ""}
                              onChange={handleChange}
                            />
                          </div>
                          <div className='mb-3'>
                            <label className='form-label'>Merchant ID</label>
                            <input
                              type='text'
                              className='form-control'
                              name='mid_merchant_id'
                              value={formData.mid_merchant_id || ""}
                              onChange={handleChange}
                            />
                          </div>
                          <div className='mb-3'>
                            <label className='form-label'>Base URL</label>
                            <input
                              type='text'
                              className='form-control'
                              name='mid_base_url'
                              value={formData.mid_base_url || ""}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* SMTP Settings */}
                    <div className='col-md-6 mb-3'>
                      <div className='card h-100'>
                        <div className='card-header bg-light'>
                          <h6 className='mb-0'>SMTP Settings</h6>
                        </div>
                        <div className='card-body'>
                          <div className='mb-3'>
                            <label className='form-label'>SMTP Host</label>
                            <input
                              type='text'
                              className='form-control'
                              name='smtp_host'
                              value={formData.smtp_host || ""}
                              onChange={handleChange}
                            />
                          </div>
                          <div className='mb-3'>
                            <label className='form-label'>SMTP Port</label>
                            <input
                              type='text'
                              className='form-control'
                              name='smtp_port'
                              value={formData.smtp_port || ""}
                              onChange={handleChange}
                            />
                          </div>
                          <div className='mb-3'>
                            <label className='form-label'>SMTP Email</label>
                            <input
                              type='email'
                              className='form-control'
                              name='smtp_email'
                              value={formData.smtp_email || ""}
                              onChange={handleChange}
                            />
                          </div>
                          <div className='mb-3'>
                            <label className='form-label'>SMTP Password</label>
                            <input
                              type='password'
                              className='form-control'
                              name='smtp_pass'
                              value={formData.smtp_pass || ""}
                              onChange={handleChange}
                            />
                          </div>
                          <div className='mb-3'>
                            <label className='form-label'>SMTP From</label>
                            <input
                              type='text'
                              className='form-control'
                              name='smtp_from'
                              value={formData.smtp_from || ""}
                              onChange={handleChange}
                            />
                          </div>
                          <div className='mb-3'>
                            <label className='form-label'>SMTP Name</label>
                            <input
                              type='text'
                              className='form-control'
                              name='smtp_name'
                              value={formData.smtp_name || ""}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Meta Settings */}
                    <div className='col-md-6 mb-3'>
                      <div className='card h-100'>
                        <div className='card-header bg-light'>
                          <h6 className='mb-0'>Meta Settings</h6>
                        </div>
                        <div className='card-body'>
                          <div className='mb-3'>
                            <label className='form-label'>Meta Pixel ID</label>
                            <input
                              type='text'
                              className='form-control'
                              name='meta_pixel'
                              value={formData.meta_pixel || ""}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className='text-end mt-3'>
                    <button
                      type='submit'
                      className='btn btn-primary'
                      disabled={updateLoading}
                    >
                      {updateLoading ? "Saving..." : "Save Changes"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminSetting;
