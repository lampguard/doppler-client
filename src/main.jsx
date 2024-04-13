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

const routes = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/">
			<Route element={<AuthPane />}>
				<Route element={<Login />} path="/login" />
				<Route element={<Signup />} path="/signup" />
				<Route element={<ResetPassword />} path="/reset-password" />
			</Route>
			<Route element={<DashboardLayout />}>
				<Route index element={<Dashboard />} />
				<Route path="/tasks" element={<Template title="Tasks"></Template>} />
				<Route path="/apps">
					<Route
						index
						element={
							<Template title="Apps">
								<Apps />
							</Template>
						}
					/>
					<Route
						path={':id'}
						element={
							<Template title="App">
								<ApplicationPage />
							</Template>
						}
					/>
				</Route>
				<Route path="/dashboard" element={<Dashboard />} />
				<Route
					path="/account/profile"
					element={
						<Template title="Profile">
							<Profile />
						</Template>
					}
				/>
				<Route
					path="/dashboard/create-app"
					element={
						<Template title="New App">
							<NewApp />
						</Template>
					}
				/>
			</Route>
		</Route>
	)
);

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<Provider store={store}>
			<RouterProvider router={routes} />
		</Provider>
	</React.StrictMode>
);
