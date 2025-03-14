import { lazy } from "react";

// project import
import MainLayout from "layout/MainLayout";
import CommonLayout from "layout/CommonLayout";
import Loadable from "components/Loadable";
import AuthGuard from "utils/route-guard/AuthGuard";
import MyAircrafts from "pages/aircrafts/me";

// render - dashboard
const DashboardDefault = Loadable(lazy(() => import("pages/dashboard/default")));

// render - users
const UserProfile = Loadable(lazy(() => import("pages/users/me")));
// render - aircrafts
const AircraftDetails = Loadable(lazy(() => import("pages/aircrafts/[id]")));

// auth routing
const AuthLogin = Loadable(lazy(() => import("pages/auth/login")));
const AuthRegister = Loadable(lazy(() => import("pages/auth/register")));
const AuthForgotPassword = Loadable(lazy(() => import("pages/auth/forgot-password")));
const AuthResetPassword = Loadable(lazy(() => import("pages/auth/reset-password")));
const AuthCodeVerification = Loadable(lazy(() => import("pages/auth/code-verification")));

// error routing
const MaintenanceError = Loadable(lazy(() => import("pages/maintenance/404")));
const MaintenanceError500 = Loadable(lazy(() => import("pages/maintenance/500")));
const MaintenanceUnderConstruction = Loadable(lazy(() => import("pages/maintenance/under-construction")));
const MaintenanceComingSoon = Loadable(lazy(() => import("pages/maintenance/coming-soon")));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
	path: "/",
	children: [
		{
			path: "/",
			element: (
				<AuthGuard>
					<MainLayout />
				</AuthGuard>
			),
			children: [
				{
					path: "dashboard",
					children: [
						{
							path: "default",
							element: <DashboardDefault />,
						},
					],
				},
				{
					path: "users",
					children: [
						{
							path: "me",
							element: <UserProfile />,
						},
					],
				},
				{
					path: "aircrafts",
					children: [
						{
							path: "me",
							element: <MyAircrafts />,
						},
						{
							path: ":id",
							element: <AircraftDetails />,
						},
					],
				},
			],
		},
		{
			path: "/maintenance",
			element: <CommonLayout />,
			children: [
				{
					path: "500",
					element: <MaintenanceError500 />,
				},
				{
					path: "under-construction",
					element: <MaintenanceUnderConstruction />,
				},
				{
					path: "coming-soon",
					element: <MaintenanceComingSoon />,
				},
			],
		},
		{
			path: "/auth",
			element: <CommonLayout />,
			children: [
				{
					path: "login",
					element: <AuthLogin />,
				},
				{
					path: "register",
					element: <AuthRegister />,
				},
				{
					path: "forgot-password",
					element: <AuthForgotPassword />,
				},
				{
					path: "reset-password",
					element: <AuthResetPassword />,
				},
				{
					path: "code-verification",
					element: <AuthCodeVerification />,
				},
			],
		},
		{
			path: "*",
			element: <MaintenanceError />,
		},
	],
};

export default MainRoutes;
