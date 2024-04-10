import { useEffect, useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { IoLogOut } from 'react-icons/io5';

import { useLazyGetAuthQuery } from '../../services/index';
import { navLinks } from '../../config';
import logo from '../../assets/logo.svg';
import UserContext from '../../context/Auth';
import { BsPlus } from 'react-icons/bs';
import Loader from '../Loaders';

const DashboardLayout = () => {
	const location = useLocation();
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
							<Link to={'/dashboard/create-app'} className="flex w-full items-center justify-start rounded-full p-4 transition-[colors_2s] hover:bg-theme hover:text-white">
								<BsPlus className="inline mr-[20px]" size={30} />
								<span className="inline">Add New App</span>
							</Link>
							<div className="md:pb-[40px]"></div>

							<ul>
								{navLinks.map((link) => (
									<li className="pb-3" key={link.slug}>
										<Link
											to={link.slug}
											target={link.blankTarget ? '_blank' : undefined}
											className={
												'py-3 px-4 rounded-full w-full text-lg flex items-center ' +
												(location.pathname == link.slug
													? 'bg-theme text-white '
													: null)
											}
										>
											{location.pathname == link.slug
												? link.activeIcon || link.icon
												: link.icon}
											<div className="px-2"></div>
											<span>{link.title}</span>
										</Link>
									</li>
								))}
							</ul>
						</div>

						<Link
							to={'/login'}
							className="flex w-full items-center py-3 px-4 border hover:bg-red-500 hover:text-white hover:border-red-500 rounded-full"
						>
							<span className="pr-5">
								<IoLogOut size={25} />
							</span>
							Log out
						</Link>
					</div>

					{/* Page Content */}
					<div className="md:ml-[20%] w-full">
						<Outlet />
					</div>
				</div>
			)}
		</UserContext.Provider>
	);
};

export default DashboardLayout;
