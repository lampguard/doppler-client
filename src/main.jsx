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

const routes = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/">
			<Route element={<AuthPane />}>
				<Route element={<Login />} path="/login" />
				<Route element={<Signup />} path="/signup" />
				<Route element={<ResetPassword />} path="/reset-password" />
			</Route>
			<Route element={<DashboardLayout />}>
				<Route index element={<></>} />
				<Route path="/tasks" element={<></>} />
				<Route path="/apps" element={<></>} />
				<Route path="/dashboard" element={<></>} />
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
