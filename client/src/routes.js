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
import { API } from "./configs/config";

import { useNavigate } from "react-router-dom";

// ! bug = masih bisa tembus di beberapa halaman
const ProtectedRouteNonAuth = ({ children }) => {
	const navigate = useNavigate();
	const cekUser = () => {
		const verify = fetch(API + "/users/verify", {
			method: "GET",
			redirect: "follow",
			credentials: "include",
		});

		verify
			.then((res) => {
				if (res.status === 200) {
					navigate("/", { replace: true });
				}
			})
			.catch((err) => {
				console.log("error verify user = ", err);
			});
	};

	cekUser();

	return children;
};

const ProtectedRouteAuth = ({ children }) => {
	const navigate = useNavigate();
	const cekUser = () => {
		const verify = fetch(API + "/users/verify", {
			method: "GET",
			redirect: "follow",
			credentials: "include",
		});

		verify
			.then((res) => {
				if (res.status === 403) {
					navigate("/login", { replace: true });
				}
			})
			.catch((err) => {
				console.log("error verify user = ", err);
			});
	};

	cekUser();

	return children;
};

// ! Error
const ProtectedRouteAdmin = ({ children }) => {
	const navigate = useNavigate();
	const cekAdmin = () => {
		const verify = fetch(API + "/admin/verify", {
			method: "GET",
			redirect: "follow",
			credentials: "include",
		});

		verify
			.then((res) => {
				if (res.status === 403) {
					navigate("/admin/login");
				}
			})
			.catch((err) => {
				console.log("error verify admin = ", err);
			});
	};

	cekAdmin();
	return children;
};

const ProtectedRouteNonAuthAdmin = ({ children }) => {
	const navigate = useNavigate();
	const cekUser = () => {
		const verify = fetch(API + "/admin/verify", {
			method: "GET",
			redirect: "follow",
			credentials: "include",
		});

		verify
			.then((res) => {
				if (res.status === 200) {
					navigate("/admin");
				}
			})
			.catch((err) => {
				console.log("error verify admin = ", err);
			});
	};

	cekUser();
	return children;
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
		path: "product/category/:categoryId",
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
		path: "admin/login",
		page: (
			<ProtectedRouteNonAuthAdmin>
				<LoginAdmin />
			</ProtectedRouteNonAuthAdmin>
		),
	},
	{
		path: "/cart",
		page: (
			<ProtectedRouteAuth>
				<CartPage />
			</ProtectedRouteAuth>
		),
	},
	{
		path: "/order/:orderId",
		page: (
			<ProtectedRouteAuth>
				<OrderPage />
			</ProtectedRouteAuth>
		),
	},
	{
		path: "/admin",
		page: (
			<ProtectedRouteAdmin>
				<Admin />
			</ProtectedRouteAdmin>
		),
	},
	// {
	// 	path: "/test",
	// 	page: <Test />,
	// },
];

export default routes;
