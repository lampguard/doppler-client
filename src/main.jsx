import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import AuthPane from './components/AuthPane';

import {
	createBrowserRouter,
	RouterProvider,
	createRoutesFromElements,
	Route,
} from 'react-router-dom';
import ResetPassword from './pages/ResetPassword.jsx';

const routes = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/">
			<Route element={<AuthPane />}>
				<Route element={<Login />} index />
				<Route element={<Login />} path="/login" />
				<Route element={<Signup />} path="/signup" />
				<Route element={<ResetPassword />} path="/reset-password" />
			</Route>
		</Route>
	)
);

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<RouterProvider router={routes}></RouterProvider>
	</React.StrictMode>
);
