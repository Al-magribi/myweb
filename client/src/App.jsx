import { lazy, Suspense, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useLoadUserMutation } from "../src/controller/api/ApiAuth";
import MetaPixel from "./components/MetaPixel/MetaPixel";

import Home from "./pages/Home/Home";
import Auth from "./pages/auth/Auth";

import Status from "./components/MetaPixel/Status";
import AI from "./pages/Landing/AI";
import { useSelector, useDispatch } from "react-redux";
import { setLogin } from "./controller/slice/sliceAuth";

// admin
const AdminDash = lazy(() => import("./pages/admin/dashboard/AdminDash"));
const AdminProducts = lazy(() => import("./pages/admin/product/AdminProducts"));
const AdminCourse = lazy(() => import("./pages/admin/course/AdminCourse"));
const DetailPage = lazy(() => import("./pages/admin/course/detail/DetailPage"));
const AdminProject = lazy(() => import("./pages/admin/project/AdminProject"));
const AdminSetting = lazy(() => import("./pages/admin/setting/AdminSetting"));
const AdminOrder = lazy(() => import("./pages/admin/order/AdminOrder"));

// User
const UserDash = lazy(() => import("./pages/user/dashboard/UserDash"));
const UserPayment = lazy(() => import("./pages/user/payment/UserPayment"));
const UserLearning = lazy(() => import("./pages/user/learning/UserLearning"));
const UserProduct = lazy(() => import("./pages/user/product/UserProduct"));
const UserReferal = lazy(() => import("./pages/user/referal/UserReferal"));

// Public
const Edubyte = lazy(() => import("./pages/EduByte/Edubtye"));
const Course = lazy(() => import("./pages/course/Course"));
const Fswd = lazy(() => import("./pages/Landing/Fswd"));
const Ecom = lazy(() => import("./pages/course/Ecom"));
const Products = lazy(() => import("./pages/product/Products"));
const Detail = lazy(() => import("./pages/product/Detail"));

const App = () => {
  const dispatch = useDispatch();
  const [loadUser] = useLoadUserMutation();

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Use a timeout to prevent hanging if the server doesn't respond
        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error("Request timed out")), 10000)
        );

        // Race between the actual request and the timeout
        const response = await Promise.race([
          loadUser().unwrap(),
          timeoutPromise,
        ]);

        dispatch(setLogin(response));
      } catch (error) {
        // Don't show error to user, just silently fail
        // This allows the app to continue functioning for non-logged in users
        console.error(error.status);
      }
    };

    // Always fetch user data from server on app load
    fetchUser();
  }, [loadUser]);

  return (
    <BrowserRouter>
      <MetaPixel />
      <Toaster position='top-center' />
      <Suspense
        fallback={
          <div className='min-vh-100 d-flex align-items-center justify-content-center'>
            <div className='spinner-border text-primary' role='status'>
              <span className='visually-hidden'>Loading...</span>
            </div>
          </div>
        }
      >
        <Routes>
          <Route path='*' element={<Home />} />

          <Route path='/' element={<Home />} />

          <Route path='/signin' element={<Auth />} />

          <Route path='/edubyte' element={<Edubyte />} />

          <Route path='/courses' element={<Course />} />

          <Route path='/js-full-stack-web-developer' element={<Fswd />} />

          <Route path='/ecommerce-toserba' element={<Ecom />} />

          <Route path='/products' element={<Products />} />

          <Route path='/product/:id/:name' element={<Detail />} />

          <Route path='/:type/:id/:name/status' element={<Status />} />

          <Route path='/seni-menguasai-ai' element={<AI />} />

          <Route path='/:id/:name/status' element={<Status />} />

          {/* Admin Routes */}
          <Route path='/admin' element={<AdminDash />} />

          <Route path='/admin/products' element={<AdminProducts />} />

          <Route path='/admin/courses' element={<AdminCourse />} />

          <Route path='/admin/courses/:id/:name' element={<DetailPage />} />

          <Route path='/admin/projects' element={<AdminProject />} />

          <Route path='/admin/settings' element={<AdminSetting />} />

          <Route path='/admin/orders' element={<AdminOrder />} />

          {/* User Routes */}
          <Route path='/user-dashboard' element={<UserDash user={user} />} />

          <Route path='/user-payment' element={<UserPayment />} />

          <Route path='/user-learning' element={<UserLearning />} />

          <Route path='/user-product' element={<UserProduct />} />

          <Route path='/referal-program' element={<UserReferal />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
