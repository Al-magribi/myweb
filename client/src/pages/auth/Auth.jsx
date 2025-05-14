import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  useSigninMutation,
  useSignupMutation,
} from "../../controller/api/ApiAuth";
import { toast } from "react-hot-toast";
import { setLogin, setLogout } from "../../controller/slice/sliceAuth";

const Auth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  // Local state for toggling between signin and signup
  const [isSignInMode, setIsSignInMode] = useState(true); // true: signin, false: signup
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const { user, isSignin } = useSelector((state) => state.auth);

  const [signin, { isLoading, isSuccess, error, data, reset }] =
    useSigninMutation();
  const [
    signup,
    {
      isLoading: isLoadingSignup,
      isSuccess: isSuccessSignup,
      error: errorSignup,
      data: dataSignup,
      reset: resetSignup,
    },
  ] = useSignupMutation();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isSignInMode) {
        const response = await signin({
          email: formData.email,
          password: formData.password,
        }).unwrap();

        dispatch(setLogin(response.user));

        if (response.user.level === "admin") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      } else {
        if (!formData.name || !formData.phone) {
          toast.error("Please fill in all required fields");
          return;
        }

        const response = await signup({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
        }).unwrap();

        dispatch(setLogin(response.user));

        if (user?.level === "admin") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      }
    } catch (error) {
      console.error("Authentication error:", error);
      if (error.data?.message) {
        toast.error(error.data.message);
      } else if (error.error) {
        toast.error(error.error);
      } else {
        toast.error("An error occurred during authentication");
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      password: "",
    });
  };

  const handleLogout = () => {
    dispatch(setLogout());
    setShowLogoutModal(false);
    resetForm();
  };

  const handleContinue = () => {
    setShowLogoutModal(false);
    if (user?.level === "admin") {
      console.log(user);
      navigate("/admin");
    } else {
      navigate("/");
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message);
      reset();
      resetForm();
    }

    if (error) {
      toast.error(error.data.message);
      reset();
    }
  }, [isSuccess, error]);

  useEffect(() => {
    if (isSuccessSignup) {
      toast.success(dataSignup.message);
      resetSignup();
      resetForm();
    }

    if (errorSignup) {
      toast.error(errorSignup.data.message);
      resetSignup();
    }
  }, [isSuccessSignup, errorSignup]);

  // Show logout modal if user is already signed in
  useEffect(() => {
    if (isSignin) {
      setShowLogoutModal(true);
    } else {
      setShowLogoutModal(false);
    }
  }, [isSignin]);

  const renderAuthForm = () => (
    <div className='card-body p-4 p-md-5'>
      <div className='text-center mb-4'>
        <h2 className='fw-bold text-primary mb-2'>
          {isSignInMode ? "Welcome Back!" : "Create Account"}
        </h2>
        <p className='text-muted'>
          {isSignInMode
            ? "Please sign in to continue"
            : "Fill in your details to get started"}
        </p>
      </div>

      <form onSubmit={handleSubmit} className='needs-validation'>
        {!isSignInMode && (
          <>
            <div className='form-floating mb-3'>
              <input
                type='text'
                className='form-control rounded-3'
                id='name'
                name='name'
                placeholder='John Doe'
                value={formData.name}
                onChange={handleChange}
                required={!isSignInMode}
              />
              <label htmlFor='name'>Full Name</label>
            </div>
            <div className='form-floating mb-3'>
              <input
                type='tel'
                className='form-control rounded-3'
                id='phone'
                name='phone'
                placeholder='+1234567890'
                value={formData.phone}
                onChange={handleChange}
                required={!isSignInMode}
              />
              <label htmlFor='phone'>Phone Number</label>
            </div>
          </>
        )}

        <div className='form-floating mb-3'>
          <input
            type='email'
            className='form-control rounded-3'
            id='email'
            name='email'
            placeholder='name@example.com'
            value={formData.email}
            onChange={handleChange}
            required
          />
          <label htmlFor='email'>Email address</label>
        </div>

        <div className='form-floating mb-4'>
          <input
            type='password'
            className='form-control rounded-3'
            id='password'
            name='password'
            placeholder='Password'
            value={formData.password}
            onChange={handleChange}
            required
          />
          <label htmlFor='password'>Password</label>
        </div>

        <button
          type='submit'
          className='btn btn-primary w-100 py-3 rounded-3 mb-3 fw-bold'>
          {isSignInMode ? "Sign In" : "Create Account"}
        </button>
      </form>

      <div className='text-center'>
        <p className='mb-0 text-muted'>
          {isSignInMode
            ? "Don't have an account? "
            : "Already have an account? "}
          <button
            className='btn btn-link text-primary p-0 text-decoration-none fw-bold'
            onClick={() => setIsSignInMode((prev) => !prev)}>
            {isSignInMode ? "Sign Up" : "Sign In"}
          </button>
        </p>
      </div>
    </div>
  );

  const renderLogoutModal = () => (
    <div className='card-body p-4 p-md-5'>
      <div className='text-center mb-4'>
        <h2 className='fw-bold text-primary mb-2'>Logout Confirmation</h2>
        <p className='text-muted'>
          Do you want to logout from your previous account?
        </p>
      </div>
      <div className='d-flex gap-3 justify-content-center'>
        <button
          onClick={handleLogout}
          className='btn btn-danger px-4 py-2 rounded-3'>
          Yes, Logout
        </button>
        <button
          onClick={handleContinue}
          className='btn btn-primary px-4 py-2 rounded-3'>
          No, Continue
        </button>
      </div>
    </div>
  );

  return (
    <div className='min-vh-100 d-flex align-items-center justify-content-center bg-light'>
      <div className='container py-5'>
        <div className='row justify-content-center'>
          <div className='col-md-6 col-lg-5'>
            <div className='card border-0 shadow-lg rounded-4'>
              {isSignin
                ? showLogoutModal
                  ? renderLogoutModal()
                  : null
                : renderAuthForm()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
