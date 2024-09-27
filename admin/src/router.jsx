import { Navigate, createBrowserRouter, redirect } from "react-router-dom";
import Login from "./pages/Login";
import Layout from "./layout/Layout";
import Product from "./pages/Product";
import Users from "./pages/Users";
import Category from "./pages/Category";
import Dashboard from "./pages/Dashboard";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";

const redirectIfLoggedInLoader = async () => {
  const isAuthenthicated = true;
  if (isAuthenthicated) {
    return redirect("/admin/dashboard");
  }
  return null;
};
const checkAuthLoader = async () => {
  const isAuthenthicated = true;
  if (!isAuthenthicated) {
    return redirect("/login");
  }
  return null;
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/admin/dashboard" />,
  },
  {
    path: "login",
    element: <Login />,
    loader: redirectIfLoggedInLoader,
  },
  {
    path: "admin",
    element: <Layout />,
    loader: checkAuthLoader,
    children: [
      {
        index: true,
        element: <Navigate to="/admin/dashboard" />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "product",
        element: <Product />,
      },
      {
        path: "product/add",
        element: <AddProduct />,
      },
      {
        path: "product/edit",
        element: <EditProduct />,
      },
      {
        path: "users",
        element: <Users />,
      },
      {
        path: "category",
        element: <Category />,
      },
    ],
  },
  {
    path: "*",
    element: <div>Not Found Route</div>,
  },
]);
