import { lazy, Suspense, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useLoadUserMutation } from "../src/controller/api/ApiAuth";
import MetaPixel from "./components/MetaPixel/MetaPixel";

import Home from "./pages/Home/Home";
import Auth from "./pages/auth/Auth";
const Edubyte = lazy(() => import("./pages/EduByte/Edubtye"));
const Course = lazy(() => import("./pages/course/Course"));
const Fswd = lazy(() => import("./pages/course/Fswd"));
const Ecom = lazy(() => import("./pages/course/Ecom"));
const Products = lazy(() => import("./pages/product/Products"));
const Detail = lazy(() => import("./pages/product/Detail"));
import Status from "./pages/product/Status";
import AI from "./pages/Landing/AI";
import { useSelector } from "react-redux";

// admin
const AdminDash = lazy(() => import("./pages/admin/dashboard/AdminDash"));
const AdminProducts = lazy(() => import("./pages/admin/product/AdminProducts"));
const AdminCourse = lazy(() => import("./pages/admin/course/AdminCourse"));
const AdminProject = lazy(() => import("./pages/admin/project/AdminProject"));
const AdminSetting = lazy(() => import("./pages/admin/setting/AdminSetting"));
const AdminOrder = lazy(() => import("./pages/admin/order/AdminOrder"));

// User
const UserDash = lazy(() => import("./pages/user/dashboard/UserDash"));
const UserPayment = lazy(() => import("./pages/user/payment/UserPayment"));
const UserLearning = lazy(() => import("./pages/user/learning/UserLearning"));
const UserProduct = lazy(() => import("./pages/user/product/UserProduct"));
const UserReferal = lazy(() => import("./pages/user/referal/UserReferal"));

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadUser] = useLoadUserMutation();

  const { user: userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data } = await loadUser().unwrap();
        setUser(data.user);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [loadUser]);

  if (loading) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <MetaPixel />
      <Toaster position="top-center" />
      <Suspense
        fallback={
          <div className="min-vh-100 d-flex align-items-center justify-content-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        }
      >
        <Routes>
          <Route path="*" element={<Home />} />

          <Route path="/" element={<Home />} />

          <Route
            path="/auth"
            element={user ? <Navigate to="/" replace /> : <Auth />}
          />

          <Route path="/edubyte" element={<Edubyte />} />

          <Route path="/courses" element={<Course />} />

          <Route path="/full-stack-web-developer" element={<Fswd />} />

          <Route path="/ecommerce-toserba" element={<Ecom />} />

          <Route path="/products" element={<Products />} />

          <Route path="/product/:id/:name" element={<Detail />} />

          <Route path="/product/:id/:name/status" element={<Status />} />

          <Route path="/seni-menguasai-ai" element={<AI />} />

          <Route path="/:id/:name/status" element={<Status />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminDash />} />

          <Route path="/admin/products" element={<AdminProducts />} />

          <Route path="/admin/courses" element={<AdminCourse />} />

          <Route path="/admin/projects" element={<AdminProject />} />

          <Route path="/admin/settings" element={<AdminSetting />} />

          <Route path="/admin/orders" element={<AdminOrder />} />

          {/* User Routes */}
          <Route
            path="/user-dashboard"
            element={<UserDash user={userInfo} />}
          />

          <Route path="/user-payment" element={<UserPayment />} />

          <Route path="/user-learning" element={<UserLearning />} />

          <Route path="/user-product" element={<UserProduct />} />

          <Route path="/referal-program" element={<UserReferal />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
