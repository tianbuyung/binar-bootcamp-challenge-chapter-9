import HomePage from "./pages/home";
import ProductDetailPage from "./pages/product-detail";
import ProfilePage from "./pages/profile";
import LoginUser from "./pages/login/LoginUser";
import LoginAdmin from "./pages/login-admin";
import RegisterPage from "./pages/register";
import Admin from "./pages/admin";
import CartPage from "./pages/cart";
import OrderPage from "./pages/order";
import ProductListPage from "./pages/product-list";
import { useNavigate } from "react-router-dom";

const ProtectedRouteNonAuth = ({ children }) => {
  const navigate = useNavigate();
  fetch("/users/verify", {
    method: "GET",
    redirect: "follow",
  })
    .then((res) => {
      if (res.status === 200) {
        alert("Anda sudah login");
        navigate("/");
      } else if (res.status === 403) {
        return children;
      }
    })
    .catch((err) => {
      alert(err.message);
    });

  return children;
};

const ProtectedRouteAuth = ({ children }) => {
  const navigate = useNavigate();
  const cekUser = async () => {
    const res = await fetch("/users/verify", {
      method: "GET",
      redirect: "follow",
    });

    if (res.status === 200) {
      return children;
    } else if (res.status === 403) {
      alert("Anda harus login!");
      navigate("/login", { replace: true });
    }
    return children;
  };

  cekUser();
};

const routes = [
  {
    path: "/",
    page: <HomePage />,
  },
  {
    path: "product/:product_id",
    page: <ProductDetailPage />,
  },
  {
    path: "product/category/:product_id",
    page: <ProductListPage />,
  },
  {
    path: "profile",
    page: (
      <ProtectedRouteAuth>
        <ProfilePage />
      </ProtectedRouteAuth>
    ),
  },
  {
    path: "login",
    page: (
      <ProtectedRouteNonAuth>
        <LoginUser />
      </ProtectedRouteNonAuth>
    ),
  },
  {
    path: "register",
    page: (
      <ProtectedRouteNonAuth>
        <RegisterPage />
      </ProtectedRouteNonAuth>
    ),
  },
  {
    path: "admin",
    page: (
      <ProtectedRouteAuth>
        <LoginAdmin />
      </ProtectedRouteAuth>
    ),
  },
  {
    path: "/cart",
    page: (
      // < ProtectedRouteAuth >
      <CartPage />
      // </ProtectedRouteAuth >
    ),
  },
  {
    path: "/order/:orderId",
    page: (
      // <ProtectedRouteAuth>
      <OrderPage />
      // </ProtectedRouteAuth >
    ),
  },
  {
    path: "/admin",
    page: (
      // <ProtectedRouteAuth>
      <Admin />
      // </ProtectedRouteAuth >
    ),
  },
];

export default routes;
