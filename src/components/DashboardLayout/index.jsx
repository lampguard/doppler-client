import { useEffect, useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { IoLogOut } from 'react-icons/io5';

import { useLazyGetAuthQuery } from '../../services/index';
import { navLinks } from '../../config';
import logo from '../../assets/logo.svg';
import UserContext from '../../context/Auth';
import { BsPlus } from 'react-icons/bs';
import Loader from '../Loaders';
import NavList from '../Navlist';

const DashboardLayout = () => {
	const navigate = useNavigate();
	const [userData, setUserData] = useState(undefined);
	const [getAuth, { isLoading, isUninitialized }] = useLazyGetAuthQuery();

	useEffect(() => {
		getAuth()
			.unwrap()
			.then((res) => {
				setUserData(res.data?.user);
				navigate('/');
			})
			.catch(() => navigate('/login'));
		return () => {};
	}, []);

	return (
		<UserContext.Provider value={userData}>
			{isLoading || isUninitialized ? (
				<Loader />
			) : (
				<div className="font-[230] font-articulat md:flex">
					{/* Left Sidenav */}
					<div className="container w-[20%] flex-col items-stretch justify-between h-svh border-r border-[#ccc] px-[30px] py-[40px] hidden md:flex sm:fixed bg-white z-[100]">
						<div>
							<img src={logo} alt="" className="w-[130px]" />
							<div className="md:pt-[40px]"></div>
							<Link
								to={'/dashboard/create-app'}
								className="btn w-full h-fit"
							>
								<BsPlus className="inline" size={30} />
								<span className="inline">Add New App</span>
							</Link>
							<div className="md:pb-[40px]"></div>

							<NavList />
						</div>

						<Link
							to={'/login'}
							className="btn hover:btn-error hover:text-white rounded-full flex h-fit"
						>
							<span className="pr-5">
								<IoLogOut size={25} />
							</span>
							Log out
						</Link>
					</div>
					<div className="hidden md:block md:w-[20%]"></div>

					{/* Page Content */}
					<div className="w-[80%]">
						<Outlet />
					</div>
				</div>
			)}
		</UserContext.Provider>
	);
};

export default DashboardLayout;
