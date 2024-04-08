import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

import Login from './pages/Login.jsx';
import AuthPane from './components/AuthPane';

import {
	createBrowserRouter,
	RouterProvider,
	createRoutesFromElements,
	Route,
} from 'react-router-dom';

const routes = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/">
			<Route element={<App />} index />
			<Route element={<AuthPane/>}>
				<Route element={<Login />} path="/login" />
			</Route>
		</Route>
	)
);

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<RouterProvider router={routes}></RouterProvider>
	</React.StrictMode>
);
