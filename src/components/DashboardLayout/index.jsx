import { useEffect, useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { IoLogOut } from 'react-icons/io5';

import { useGetAuthQuery } from '../../services/index';
import { navLinks } from '../../config';
import logo from '../../assets/logo.svg';
import UserContext from '../../context/Auth';

const DashboardLayout = () => {
	const location = useLocation();
	const navigate = useNavigate();

	const [userData, setUserData] = useState(undefined);

	const { data, isLoading, isError, isSuccess, error } = useGetAuthQuery();

	useEffect(() => {
		if (isError) {
			console.error(error);
			navigate('/login');
		}

		if (isSuccess) {
			setUserData(data.data);
		}

		return () => {};
	}, [isError, isSuccess, data]);

	return (
		<UserContext.Provider value={userData}>
			{isError ? null : (
				<div className="font-[230] md:flex">
					{/* Left Sidenav */}
					<div className="container max-w-[20%] flex-col items-stretch justify-between h-svh border-r border-[#ccc] px-[30px] py-[40px] hidden md:flex">
						<div>
							<img src={logo} alt="" className="w-[130px]" />
							<div className="py-10"></div>

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
					<Outlet />
				</div>
			)}
		</UserContext.Provider>
	);
};

export default DashboardLayout;
