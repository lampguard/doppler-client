import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import AuthPane from './components/AuthPane';

import { Provider } from 'react-redux';

import { store } from './store.js';

import {
	createBrowserRouter,
	RouterProvider,
	createRoutesFromElements,
	Route,
} from 'react-router-dom';
import ResetPassword from './pages/ResetPassword.jsx';
import DashboardLayout from './components/DashboardLayout/index.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Template from './components/DashboardLayout/Template.jsx';
import Apps from './pages/Apps.jsx';
import NewApp from './pages/NewApp.jsx';
import Profile from './pages/Profile.jsx';
import ApplicationPage from './pages/ApplicationPage.jsx';
import { TeamProvider } from './context/TeamContext.jsx';
import NewTeam from './pages/NewTeam.jsx';
import TeamInfo from './pages/TeamInfo.jsx';
// import Flags from './pages/Flags.jsx';
import Tasks from './pages/Tasks.jsx';
import Task from './pages/Task.jsx';
import PasswordReset from './pages/PasswordReset.jsx';
import AppLayout from './components/Layouts/AppLayout.jsx';
import Notifications from './pages/Notifications.jsx';
import { PageProvider } from './context/PageContext.jsx';
import Pricing from './pages/Pricing.jsx';
import GuestLayout from './components/GuestLayout.jsx';

const routes = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/">
			<Route element={<GuestLayout />}>
				<Route element={<App />} index />
				<Route path="/docs/guide" element={<App />} />
				<Route path="/pricing" element={<Pricing />} />
			</Route>
			<Route element={<AuthPane />}>
				<Route element={<Login />} path="/verify-2fa" />
				<Route element={<Login />} path="/login" />
				<Route element={<Signup />} path="/signup" />
				<Route element={<ResetPassword />} path="/reset-password" />
				<Route element={<PasswordReset />} path="/password-reset" />
			</Route>
			<Route element={<AppLayout />}>
				{/* <Route index element={<Dashboard />} /> */}
				<Route path="/tasks">
					<Route index element={<Tasks />} />
					<Route path=":id" element={<Task />} />
				</Route>
				<Route path="/apps">
					<Route index element={<Apps />} />
					<Route path={':id'} element={<ApplicationPage />} />
				</Route>
				<Route path="/dashboard" element={<Dashboard />} />
				<Route path="/account/profile" element={<Profile />} />
				<Route path="/dashboard/create-app" element={<NewApp />} />
				<Route path="/dashboard/create-team" element={<NewTeam />} />
				<Route path="/teams/:id" element={<TeamInfo />} />
				<Route path="/notifications" element={<Notifications />} />
			</Route>
		</Route>
	)
);

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<Provider store={store}>
			<PageProvider>
				<RouterProvider router={routes} />
			</PageProvider>
		</Provider>
	</React.StrictMode>
);
